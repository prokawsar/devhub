import { UseFormRegister, FieldError } from 'react-hook-form'

type InputProps = {
  id: string
  label: string
  placeholder: string
  register: UseFormRegister<any>
  error?: FieldError
  disabled?: boolean
  type?: string
  required?: boolean
  minLength?: number
  value?: string
  readonly?: boolean
}

export default function Input({
  id,
  label,
  placeholder,
  register,
  error,
  disabled = false,
  type = 'text',
  required = false,
  minLength,
  value,
  readonly = false,
}: InputProps) {
  return (
    <div className="flex-row flex items-center gap-5">
      <label htmlFor={id} className="w-[24rem] text-gray-500">
        {label}
        {required && '*'}
      </label>
      <div className="relative flex w-full">
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          className={`w-full rounded-lg border border-solid bg-white p-2 text-xl leading-[2.4rem] text-gray-800 outline-none focus:shadow-purple-sh disabled:cursor-not-allowed disabled:bg-disabled-bg ${
            error
              ? 'border-[#ff3939]'
              : 'border-gray-300 caret-primary focus:border-primary'
          }`}
          {...register(id, {
            required: required ? 'Can’t be empty' : false,
            minLength: minLength
              ? {
                  value: minLength,
                  message: `Must be at least ${minLength} characters`,
                }
              : undefined,
          })}
          disabled={disabled}
          value={value}
          readOnly={readonly}
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
