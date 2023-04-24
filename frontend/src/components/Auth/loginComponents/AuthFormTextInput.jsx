
export const AuthFormTextInput = ({ label, name, register, required, autoComplete, type }) => {
  return (
    <div className='text-input-wrapper'>
      <label htmlFor={name} className='text-input-label'>
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        name={name}
        className='form-text-input'
        autoComplete={autoComplete}
      />
    </div>
  );
}
