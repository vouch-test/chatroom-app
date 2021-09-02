function PrimaryInput({ placeholder = '', className = '', onChange }) {
  return (
    <input
      className={`p-2 ${className}`}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default PrimaryInput;
