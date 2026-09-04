import { fail } from '../../../src/core/errors.js';
import { equal, rejects, runCase } from '../../../src/core/testing.js';
import type { CandidateFactory, ScenarioHarness, VariantName } from '../../../src/core/types.js';
type Role='member'|'admin'; interface Actor{id:string;tenantId:string;role:Role} interface Order{id:string;tenantId:string;ownerId:string;total:number} interface Candidate{exportOrder(actor:Actor,id:string):Order}
const orders:Order[]=[{id:'ord-a1',tenantId:'tenant-a',ownerId:'alice',total:12500},{id:'ord-b1',tenantId:'tenant-b',ownerId:'bob',total:8800}];
const alice:Actor={id:'alice',tenantId:'tenant-a',role:'member'}, peer:Actor={id:'amy',tenantId:'tenant-a',role:'member'}, admin:Actor={id:'admin-a',tenantId:'tenant-a',role:'admin'}, foreign:Actor={id:'bob',tenantId:'tenant-b',role:'member'};
function find(id:string):Order{const o=orders.find((x)=>x.id===id);if(!o)fail('NOT_FOUND','Order not found.');return {...o};}
const variants:Record<VariantName,CandidateFactory>={
 vulnerable:()=>({exportOrder:(_a:Actor,id:string)=>find(id)} satisfies Candidate),
 naive:()=>({exportOrder:(a:Actor,id:string)=>{const o=find(id);if(o.tenantId!==a.tenantId)fail('NOT_FOUND','Order not found.');return o;}} satisfies Candidate),
 reference:()=>({exportOrder:(a:Actor,id:string)=>{const o=find(id);if(o.tenantId!==a.tenantId||(a.role!=='admin'&&o.ownerId!==a.id))fail('NOT_FOUND','Order not found.');return o;}} satisfies Candidate)
};
const subject=(f:CandidateFactory)=>f() as Candidate;
const harness:ScenarioHarness={
 async runFunctional(f){return[
  await runCase('owner can export own order','functional',()=>equal(subject(f).exportOrder(alice,'ord-a1').total,12500,'total preserved')),
  await runCase('same-tenant admin can export','functional',()=>equal(subject(f).exportOrder(admin,'ord-a1').id,'ord-a1','admin export'))
 ];},
 async runSecurity(f){return[
  await runCase('same-tenant peer denied','security',()=>rejects(()=>subject(f).exportOrder(peer,'ord-a1'),'NOT_FOUND','peer access')),
  await runCase('cross-tenant actor denied','security',()=>rejects(()=>subject(f).exportOrder(foreign,'ord-a1'),'NOT_FOUND','cross-tenant access')),
  await runCase('identifier errors are uniform','security',async()=>{await rejects(()=>subject(f).exportOrder(alice,'missing'),'NOT_FOUND','missing');await rejects(()=>subject(f).exportOrder(alice,'ord-b1'),'NOT_FOUND','foreign');})
 ];}
};
export {harness,variants};
