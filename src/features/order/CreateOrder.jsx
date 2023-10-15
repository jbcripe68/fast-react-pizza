import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/Button';
import { createOrder } from '../../services/apiRestaurant';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../user/userSlice';
import EmptyCart from '../cart/EmptyCart';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData();
  const navigation = useNavigation();
  const {
    username,
    address,
    status: positionStatus,
    position,
    error: positionError,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const isSubmitting = navigation.state === 'submitting';
  const isLoadingAddress = positionStatus === 'loading';

  function handleClick(e) {
    e.preventDefault();

    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="my-10">
      <h2 className="mb-8 text-xl font-bold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="sm: mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            defaultValue={username.split(' ')[0]}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="sm: mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full " type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="sm: mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
            {address === '' && (
              <Button
                disabled={isLoadingAddress}
                onClick={handleClick}
                type="round"
              >
                {!isLoadingAddress ? 'Get Position' : 'Searching...'}
              </Button>
            )}
            {positionStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {positionError}
              </p>
            )}
          </div>
          <input
            type="hidden"
            name="position"
            value={
              position?.longitude && position?.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
        </div>

        <div className="mb-12 flex items-center gap-4">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  //const data = Object.fromEntries(formData);
  //console.log(`cart: ${formData.get("cart")}`);
  const phone = formData.get('phone');
  const position = formData.get('position');
  console.log(`position is ${position}`);
  const errors = {};
  if (!isValidPhone(phone)) {
    errors.phone =
      'Please enter a valid phone number, we may need to contact you about your order.';
  }

  if (Object.keys(errors).length > 0) return errors;

  // create if ok and redirect
  const resp = await createOrder({
    customer: formData.get('customer'),
    phone,
    address: formData.get('address'),
    priority: formData.get('priority') === 'true',
    cart: JSON.parse(formData.get('cart')),
    position,
  });
  //console.log(resp);

  // do NOT overuse (messes up optimization)
  store.dispatch(clearCart());

  return redirect(`/order/${resp.id}`);
}

export default CreateOrder;
