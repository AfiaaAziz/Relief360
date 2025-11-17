import React, { useState } from "react";

const Select = ({ value, onValueChange, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || "Select an option"}
        </span>
        <svg
          className={`h-4 w-4 opacity-50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="p-1">{children}</div>
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, ...props }) => {
  return React.cloneElement(children, props);
};

const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};

const SelectContent = ({ children }) => {
  return children;
};

const SelectItem = ({ children, value, onSelect }) => {
  return (
    <div
      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
export default Select;
