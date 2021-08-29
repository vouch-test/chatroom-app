function PrimaryInput({ placeholder = '', className = '', onChange }) {
  return (
    <input
      className={className}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default PrimaryInput;
