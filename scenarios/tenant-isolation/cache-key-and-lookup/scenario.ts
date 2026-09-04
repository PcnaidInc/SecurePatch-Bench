import{fail}from'../../../src/core/errors.js';import{equal,rejects,runCase}from'../../../src/core/testing.js';import type{CandidateFactory,ScenarioHarness,VariantName}from'../../../src/core/types.js';
interface Customer{id:string;tenantId:string;name:string}interface Candidate{get(tenantId:string,id:string):Customer}
const rows:Customer[]=[{id:'shared-1',tenantId:'a',name:'Alpha Customer'},{id:'shared-1',tenantId:'b',name:'Beta Customer'},{id:'only-b',tenantId:'b',name:'Private Beta'}];
const make=(mode:'vulnerable'|'naive'|'reference'):Candidate=>{const cache=new Map<string,Customer>();return{get(tenant,id){const key=mode==='reference'?`${tenant}:${id}`:id;const cached=cache.get(key);if(cached)return{...cached};const row=mode==='vulnerable'?rows.find((x)=>x.id===id):rows.find((x)=>x.id===id&&x.tenantId===tenant);if(!row)fail('NOT_FOUND','Customer not found.');cache.set(key,{...row});return{...row};}}};
const variants:Record<VariantName,CandidateFactory>={vulnerable:()=>make('vulnerable'),naive:()=>make('naive'),reference:()=>make('reference')};const s=(f:CandidateFactory)=>f()as Candidate;
const harness:ScenarioHarness={async runFunctional(f){return[await runCase('tenant retrieves own summary','functional',()=>equal(s(f).get('a','shared-1').name,'Alpha Customer','tenant A record'))];},async runSecurity(f){return[
 await runCase('cache collision remains isolated','security',()=>{const c=s(f);c.get('a','shared-1');equal(c.get('b','shared-1').name,'Beta Customer','tenant B after A warmup');}),
 await runCase('reverse warmup remains isolated','security',()=>{const c=s(f);c.get('b','shared-1');equal(c.get('a','shared-1').name,'Alpha Customer','tenant A after B warmup');}),
 await runCase('foreign unique id denied','security',()=>rejects(()=>s(f).get('a','only-b'),'NOT_FOUND','foreign id'))
];}};export{harness,variants};
