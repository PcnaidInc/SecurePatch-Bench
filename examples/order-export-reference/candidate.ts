/**
 * Example only. This duplicates the behavior expected by one synthetic
 * scenario so contributors can see the custom candidate shape.
 */
interface Actor { id: string; tenantId: string; role: 'user' | 'admin' }
interface Order { id: string; tenantId: string; ownerId: string; total: number }
class PublicNotFoundError extends Error { code = 'NOT_FOUND' }

export function createCandidate() {
  const orders: Order[] = [
    {id: 'order-a', tenantId: 'tenant-a', ownerId: 'user-a', total: 42},
    {id: 'order-b', tenantId: 'tenant-b', ownerId: 'user-b', total: 84},
  ];
  return {
    exportOrder(actor: Actor, orderId: string): string {
      const order = orders.find((item) => item.id === orderId);
      if (!order || order.tenantId !== actor.tenantId || (actor.role !== 'admin' && order.ownerId !== actor.id)) {
        throw new PublicNotFoundError('Order not found');
      }
      return JSON.stringify({id: order.id, total: order.total});
    },
  };
}
