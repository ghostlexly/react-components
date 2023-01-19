/** @author Tolga Malkoc <ghostlexly@gmail.com> */

import React, { Component, useId, useState } from "react";

// fork from: https://github.com/suweya/react-verification-code-input/blob/master/src/index.js

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

export default function SecurityCode({
  type = "number",
  handleChange,
  onComplete,
  fields = 6,
  fieldWidth = 58,
  id,
  fieldHeight = 54,
  autoFocus = true,
  className,
  containerClassName,
  prevalues,
  disabled = false,
  required = false,
  placeholder = [],
}) {
  const [values, setValues] = useState(Array(fields).fill(""));

  let vals;
  let autoFocusIndex = 0;
  if (prevalues && prevalues.length) {
    setValues(prevalues);

    vals = [];
    for (let i = 0; i < fields; i++) {
      vals.push(values[i] || "");
    }
    autoFocusIndex = values.length >= fields ? 0 : values.length;
  }

  let iRefs = [];
  for (let i = 0; i < fields; i++) {
    iRefs.push(React.createRef());
  }
  id = useId();

  /**
   * Clear all field value & focus first field
   */
  const __clearvalues__ = () => {
    setValues(Array(fields).fill(""));
    iRefs[0].current.focus();
  };

  const triggerChange = (values) => {
    const val = values.join("");

    handleChange && handleChange(val);

    if (onComplete && val.length >= fields) {
      onComplete(val);
      __clearvalues__();
    }
  };

  const onChange = (e) => {
    const index = parseInt(e.target.dataset.id);
    if (type === "number") {
      e.target.value = e.target.value.replace(/[^\d]/gi, "");
    }

    if (e.target.value === "" || (type === "number" && !e.target.validity.valid)) {
      return;
    }

    let next;
    const value = e.target.value;
    setValues(Object.assign([], values));

    if (value.length > 1) {
      let nextIndex = value.length + index - 1;
      if (nextIndex >= fields) {
        nextIndex = fields - 1;
      }

      next = iRefs[nextIndex];

      const split = value.split("");
      split.forEach((item, i) => {
        const cursor = index + i;
        if (cursor < fields) {
          let newArr = [...values];
          newArr[cursor] = item;
          setValues(newArr);

          triggerChange(newArr);
        }
      });
    } else {
      next = iRefs[index + 1];

      let newArr = [...values];
      newArr[index] = value;
      setValues(newArr);

      triggerChange(newArr);
    }

    if (next) {
      next.current.focus();
      next.current.select();
    }
  };

  const onKeyDown = (e) => {
    const index = parseInt(e.target.dataset.id);
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prev = iRefs[prevIndex];
    const next = iRefs[nextIndex];

    switch (e.keyCode) {
      case KEY_CODE.backspace:
        e.preventDefault();
        const vals = [...values];
        if (values[index]) {
          vals[index] = "";
          setValues(vals);
          triggerChange(vals);
        } else if (prev) {
          vals[prevIndex] = "";
          prev.current.focus();
          setValues(vals);
          triggerChange(vals);
        }
        break;
      case KEY_CODE.left:
        e.preventDefault();
        if (prev) {
          prev.current.focus();
        }
        break;
      case KEY_CODE.right:
        e.preventDefault();
        if (next) {
          next.current.focus();
        }
        break;
      case KEY_CODE.up:
      case KEY_CODE.down:
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  const onFocus = (e) => {
    e.target.select(e);
  };

  const INPUT_STYLE = {
    width: fieldWidth,
    height: fieldHeight,
  };
  const ROOT_STYLE = {
    width: fields * fieldWidth,
  };

  return (
    <div className={containerClassName}>
      {values.map((value, index) => (
        <input
          type={type === "number" ? "tel" : type}
          pattern={type === "number" ? "[0-9]*" : null}
          autoFocus={autoFocus && index === autoFocusIndex}
          className={
            className
              ? className
              : "max-w-[50px] md:max-w-[65px] p-2 rounded-none border border-r-0 border-gray-400 text-center text-lg focus-visible:outline-gray-700 first:rounded-l-xl last:rounded-r-xl last:border"
          }
          key={`${id}-${index}`}
          data-id={index}
          value={value}
          id={id ? `${id}-${index}` : null}
          ref={iRefs[index]}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          placeholder={placeholder[index]}
          autoComplete={"new-password"}
        />
      ))}
    </div>
  );
}
