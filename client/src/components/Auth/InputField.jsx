import ShowPasswordIcon from "./ShowPasswordIcon";
import HidePassWordIcon from "./HidePassWordIcon";

const InputField = ({ name, label, type, value, handleShowPassword,handleChange }) => {
  return (
    <div className="relative">
      <label
        className='text-white capitalize dark:text-gray-200'
        htmlFor={name}
      >
        {label} *
      </label>
      <input
        name={name}
        id={name}
        type={type}
        placeholder={`Enter your ${label}`}
        required
        className='w-full px-4 py-2 mt-2 text-gray-700 bg-gray-800 border rounded-md dark:text-gray-300 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring'
        onChange={handleChange}
        value={value}
      />
      {/* logic to render show/hide password button for 2 password fields */}
      {(name === "password" || name === "confirmPassword") &&
        (type === "password" ? (
          <ShowPasswordIcon handleShowPassword={handleShowPassword} />
        ) : (
          <HidePassWordIcon handleShowPassword={handleShowPassword} />
        ))}
    </div>
  );
};

export default InputField;
