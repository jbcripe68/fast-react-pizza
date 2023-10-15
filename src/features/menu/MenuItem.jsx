import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addPizza, getQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const numInCart = useSelector(getQuantityById(id));
  const classPrice =
    'm-auto text-sm font-bold uppercase text-stone-500 md:text-base';
  const data = {
    id,
    name,
    unitPrice,
  };

  function handleAdd() {
    dispatch(addPizza(data));
  }

  return (
    <li
      className={`flex h-28 items-center md:h-20 ${
        soldOut ? 'bg-stone-300' : 'bg-yellow-100'
      }`}
    >
      <img
        src={imageUrl}
        alt={name}
        className={`inline aspect-square h-16 w-16 md:h-20 md:w-20 ${
          soldOut ? 'opacity-80 grayscale' : ''
        }`}
      />
      <div className={'mx-2 flex w-full items-center justify-between md:mx-4'}>
        <p className="basis-24 text-xs font-medium md:basis-40 md:text-lg">
          {name}
        </p>
        <p className="md-text-base basis-32 text-sm capitalize italic md:basis-40">
          {ingredients.join(', ')}
        </p>
        <div className="flex basis-32 flex-col md:basis-40">
          {!soldOut ? (
            <>
              <p className={classPrice}>{formatCurrency(unitPrice)}</p>
              {numInCart ? (
                <DeleteItem id={id} />
              ) : (
                <Button type="short" data={data} onClick={handleAdd}>
                  Add to Cart
                </Button>
              )}
            </>
          ) : (
            <p className={classPrice}>Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
