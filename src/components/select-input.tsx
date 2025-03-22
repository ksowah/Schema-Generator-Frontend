import { cn } from "@/utils/cn";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import lodash from "lodash";
import { FC } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  id: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any;
  defaultValue?: string;
  options: (string | Option)[];
  labelHidden?: boolean;
  raw?: boolean;
}

export const SelectInput: FC<SelectInputProps> = ({
  id,
  disabled,
  required,
  options,
  values,
  handleChange,
  handleBlur,
  label,
  labelHidden,
  errors,
  touched,
  defaultValue,
  raw
}) => {
  return (
    <>
      {!labelHidden && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required ? <span className="text-red-600">*</span> : ""}
        </label>
      )}
      <div className={cn(labelHidden ? "" : "mt-1", "relative")}>
        <select
          name={id}
          id={id}
          value={lodash.get(values, id, "")}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          defaultValue={defaultValue}
          className={cn(
            lodash.get(values, id, "") === ""
              ? "font-light text-xs"
              : "text-sm",
            lodash.get(errors, id) && lodash.get(touched, id)
              ? "focus:ring-red-500 focus:border-red-500 border-red-600"
              : "focus:ring-primary-500 focus:border-primary-500 border-gray-300",
            disabled ? "cursor-not-allowed bg-gray-100" : "",
            "shadow-sm block w-full rounded-md placeholder:font-light placeholder:text-xs h-[38px]",
            raw? "rounded-none":""
          )}
        >
          {options?.map((option, idx) => (
            <option key={idx} value={(option as Option)?.value ?? option}>
              {(option as Option)?.label ?? option}
            </option>
          ))}
        </select>
        <button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none pointer-events-none'>
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </button>
      </div>
      {lodash.get(errors, id) && lodash.get(touched, id) ? (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {lodash.get(errors, id)}
        </p>
      ) : null}
    </>
  );
};

export default SelectInput;
