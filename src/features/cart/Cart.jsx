import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { clearCart, getTotalCartPrice, getCart } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const totalPrice = useSelector(getTotalCartPrice);

  function handleClear() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="text-sl my-7 font-semibold">
        Your cart, {username.split(' ')[0]}
      </h2>

      <ul className="dive-stone-200 divide-y border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between">
        <p className="font-bold">Total:</p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <div className="mt-6 space-x-2">
        <Button disabled={totalPrice === 0} to="/order/new">
          Order pizzas
        </Button>
        <Button
          disabled={totalPrice === 0}
          type="secondary"
          onClick={handleClear}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
