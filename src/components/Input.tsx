import { UseFormRegister, FieldError } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

type InputProps = {
  id: string
  label: string
  register: UseFormRegister<any>
  error?: FieldError
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({
  id,
  label,
  register,
  error,
  ...rest
}: InputProps) {
  return (
    <div className="flex-col md:flex-row flex md:items-center gap-5">
      <label htmlFor={id} className="md:w-[24rem] text-gray-500">
        {label}
        {rest.required && '*'}
      </label>
      <div className="relative flex w-full">
        <input
          id={id}
          className={`w-full rounded-lg border border-solid bg-white p-2 text-xl text-gray-800 outline-none focus:shadow-purple-sh disabled:cursor-not-allowed disabled:bg-disabled-bg ${
            error
              ? 'border-red-500'
              : 'border-gray-300 caret-primary focus:border-primary'
          }`}
          {...register(id, {
            required: rest.required ? 'Can’t be empty' : false,
            minLength: rest.minLength
              ? {
                  value: rest.minLength,
                  message: `Must be at least ${rest.minLength} characters`,
                }
              : undefined,
          })}
          {...rest}
        />
        {error && (
          <p className="absolute right-[2.5%] top-[40%] text-sm text-red-500">
            {error.message}
          </p>
        )}
      </div>
    </div>
  )
}
