function PrimaryButton({ name = '', className = '', onClick }) {
  return (
    <button className={`primary-btn ${className}`} onClick={onClick}>
      {name}
    </button>
  );
}

export default PrimaryButton;
