import React from "react";
import cls from "classnames";

interface InutGrouppProps {
  // classNam? 의 의미: className이 들어올 수도 안들어올 수도 있을 경우
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InutGrouppProps> = ({
  className = "mb-2",
  type = "text",
  placeholder = "",
  value,
  error,
  setValue,
}) => {
  return (
    <div className="{className}">
      <input
        type={type}
        style={{ minWidth: 300 }}
        className={cls(
          `w-full p-3 transition duration-200 border border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white text-black`,
          { "border-red-500": error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-500">{error}</small>
    </div>
  );
};

export default InputGroup;
