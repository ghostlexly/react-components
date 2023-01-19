/** @author Tolga Malkoc <ghostlexly@gmail.com> */

import { useId } from "react";
import { useField } from "formik";
import cn from "classnames";

export default function LabelledInput({
  label,
  className = "",
  containerClassName = null,
  name,
  placeholder = "",
  type = "text",
  onChange = null,
}) {
  const random = useId();

  const [field, meta] = useField(name);

  return (
    <>
      <div className={containerClassName}>
        <label className="block text-sm text-gray-800" htmlFor={random}>
          {label}
        </label>
        <input
          {...field}
          id={random}
          type={type}
          placeholder={placeholder}
          className={cn([
            className
              ? className
              : "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring",
            meta.error
              ? "border-red-600 focus:border-red-400 focus:ring-red-300"
              : "border-gray-200 focus:border-blue-400 focus:ring-blue-300",
          ])}
        />
        {meta.error && <p className={"text-red-600"}>{meta.error}</p>}
      </div>
    </>
  );
}
