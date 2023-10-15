import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { removePizza } from './cartSlice';

function DeleteItem({ id }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removePizza(id));
  }

  return (
    <Button type="short" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteItem;
