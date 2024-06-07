import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type TAppFormInputProps = {
  label: string;
  placeholder?: string;
  type: "text" | "number" | "password" | "url" | "email";
  name: string;
  required?: true | false;
  register: UseFormRegister<any>;
  error?: unknown;
  defaultValue?: string | number;
  readOnly?: boolean;
};

const AppFormInput = ({
  label,
  defaultValue,
  readOnly,
  error,
  type,
  required,
  name,
  register,
}: TAppFormInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {readOnly ? (
        <div className="bg-[#f9f8f8] rounded select-none border border-[#D0D2D5] h-11 2xl:h-12 w-full flex items-center min-w-[200px] px-3 2xl:px-4 py-2.5 font-sans text-base 2xl:text-lg font-normal text-textBlack/50">
          {defaultValue}
        </div>
      ) : (
        <>
          <div className="relative float-label-input w-full min-w-[200px]">
            <input
              // {...register(name, { ...(required && { required: true }) })}
              {...register(name, {
                ...(required && { required: true }),
                ...(type === "number" && { valueAsNumber: true }),
              })}
              type={
                type !== "password"
                  ? type
                  : type === "password" && !show
                    ? "password"
                    : "text"
              }
              placeholder={" "}
              // className="peer h-full w-full rounded border border-[#D0D2D5] border-t-transparent bg-transparent px-3 2xl:px-4 py-2.5 font-sans text-base 2xl:text-lg font-normal text-textBlack outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#D0D2D5] placeholder-shown:border-t-[#D0D2D5] focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 caret-primary"
              className="block w-full bg-white focus:outline-none focus:shadow-outline border 2xl:border-[1.5px] border-[#D0D2D5] rounded 2xl:rounded-md py-2 md:py-2.5 2xl:py-3 px-2 2xl:px-3 appearance-none leading-normal focus:border-primary"
            />
            <label
              // className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 2xl:-top-1 flex h-full w-full select-none !overflow-visible truncate text-xs 2xl:text-base font-normal leading-tight text-textBlack transition-all duration-200 before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl before:border-t before:border-l before:border-[#D0D2D5] before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr after:border-t after:border-r after:border-[#D0D2D5] after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-textBlack peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs 2xl:peer-focus:text-sm peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              className="absolute top-2 md:top-2.5 2xl:top-3 left-0 2xl:left-1 text-sm md:text-base text-textDarkGrey pointer-events-none transition duration-200 ease-in-out px-2"
            >
              {label}
            </label>
            {type === "password" &&
              (show ? (
                <IoEyeOffOutline
                  onClick={() => setShow(false)}
                  className="absolute right-4 text-lg 2xl:text-xl cursor-pointer 2xl:right-4 top-3.5 2xl:top-4"
                />
              ) : (
                <IoEyeOutline
                  onClick={() => setShow(true)}
                  className="absolute right-4 text-lg 2xl:text-xl cursor-pointer 2xl:right-4 top-3.5 2xl:top-4"
                />
              ))}
          </div>
          {error && (
            <span className="text-xs tracking-wide text-red">
              {label} field is required
            </span>
          )}
        </>
      )}
    </>
  );
};

export default AppFormInput;
