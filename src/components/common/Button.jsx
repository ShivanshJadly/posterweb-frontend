export const Button = ({ children, onClick, className, variant }) => {
    return (
      <button
        onClick={onClick}
        className={`${className} ${variant === 'outline' ? 'border border-gray-300' : ''}`}
      >
        {children}
      </button>
    );
  };
  