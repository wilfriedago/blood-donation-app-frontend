type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function TextInput({ label, ...props }: InputProps) {
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          className={`${
            props.className ?? ''
          } block   w-full appearance-none rounded-md border border-gray-400 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
        />
      </div>
    </div>
  );
}

export function CheckBox({ label, ...props }: InputProps) {
  return (
    <div className="flex items-center">
      <input
        id={props.id || props.name}
        name={props.name}
        type="checkbox"
        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="ml-2 block cursor-pointer text-sm text-gray-900"
        >
          {label}
        </label>
      )}
    </div>
  );
}
