import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold  md:text-3xl">
        The best pizza.
        <br />
        <p className="text-yellow-500">Straight out of the oven,</p>
        <p className="text-yellow-500">straight to you.</p>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu">Continue Ordering. {username}</Button>
      )}
    </div>
  );
}

export default Home;
