import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { increasePizzaQuantity, decreasePizzaQuantity } from './cartSlice';

function UpdateItemQuantity({ id, quantity }) {
  const dispatch = useDispatch();

  function handleIncreaseItemQuantity() {
    dispatch(increasePizzaQuantity(id));
  }

  function handleDecreaseItemQuantity() {
    dispatch(decreasePizzaQuantity(id));
  }

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        disabled={quantity === 1}
        onClick={handleDecreaseItemQuantity}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button type="round" onClick={handleIncreaseItemQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
