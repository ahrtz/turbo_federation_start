
interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
  }
  const Button2: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  };

  export default Button2;