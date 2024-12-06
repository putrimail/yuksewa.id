function FormInput({ label, type, value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={`form${label}`} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={`form${label}`}
        placeholder={`masukkan ${label}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormInput;
