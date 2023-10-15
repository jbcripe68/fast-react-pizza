import { Link } from 'react-router-dom';

function Button({ children, disabled, to, onClick, type = 'primary' }) {
  const baseClassName =
    'inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const classNames = {
    primary: baseClassName + ' text-sm px-4 py-3 sm:px-6 sm:py-4',
    short: baseClassName + ' px-1 py-1 text-xs',
    round: baseClassName + ' px-2.5 py-1 md:px3.5 text-sm',
    secondary:
      'inline-block rounded-full border-2 border-stone-200 font-semibold uppercase text-sm tracking-wide text-stone-400 transition-colors duration-300 px-4 py-2.5 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800hover:border-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed text-base sm:px-6 sm:py-3.5',
  };

  if (to)
    return (
      <Link disabled={disabled} to={to} className={classNames[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={classNames[type]}
      >
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={classNames[type]}>
      {children}
    </button>
  );
}

export default Button;
