import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { updateOrder } from '../../services/apiRestaurant';
import { useFetcher } from 'react-router-dom';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  if (order.priority || order.status.toLowerCase() !== 'preparing') return null;

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button>
        Pay extra {formatCurrency(order.orderPrice * 0.2)} for priority
      </Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  await updateOrder(params.orderId, { priority: true });
  return null;
}

export default UpdateOrder;
