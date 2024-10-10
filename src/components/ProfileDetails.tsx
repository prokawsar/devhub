import { useUserStore } from '@/store'
import { Button } from 'antd'
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

type FormData = {
  firstName: string
  lastName: string
}
type ProfileDetailsProps = {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  handleSubmit: UseFormHandleSubmit<FormData>
  isUpdating: boolean
  onSubmitData: (data: FormData) => void
}

export default function ProfileDetails({
  register,
  errors,
  handleSubmit,
  isUpdating,
  onSubmitData,
}: ProfileDetailsProps) {
  const { userData } = useUserStore()

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = event.target.files![0]

    const reader = new FileReader()
    reader.readAsDataURL(newPhoto)
    reader.onloadend = () => {
      // updatePhoto(reader.result as string);
    }
  }

  return (
    <div className="w-full border-solid border-[#d9d9d9] bg-white p-10 pb-0">
      <h1 className="pb-5 text-3xl font-bold text-[#333]">Profile Details</h1>
      <p className="text-xl text-[#737373]">
        Add your details to create a personal touch to your profile.
      </p>

      <form onSubmit={handleSubmit(onSubmitData)}>
        <div className="flex-row flex w-full items-center justify-between gap-2 p-5">
          <span className="text-xl text-[#737373]">Profile picture</span>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            accept="image/jpg, image/png"
            onChange={handlePhotoChange}
          />
          <div className="flex-row flex items-center gap-5">
            <label
              htmlFor="image"
              className={`flex w-56 cursor-pointer flex-col items-center gap-2 rounded-lg bg-[#efebff] bg-cover bg-center px-5 py-10`}
            >
              <span className="text-xl font-semibold">+ Upload Image</span>
            </label>
            <p className="w-36 text-[#737373]">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>
        <div className="space-y-5 p-8">
          <div className="flex-row flex items-center gap-5">
            <label htmlFor="firstName" className="w-[24rem] text-[#737373]">
              First name*
            </label>
            <div className="relative flex w-full">
              <input
                type="text"
                placeholder="e.g. John"
                id="firstName"
                className={`w-full rounded-lg border border-solid bg-white p-2 text-xl leading-[2.4rem] text-[#333] outline-none focus:shadow-purple-sh  disabled:cursor-not-allowed disabled:bg-[#ccc] ${errors.firstName?.message ? 'border-[#ff3939]' : 'border-[#d9d9d9] caret-[#633cff] focus:border-[#633cff] '}`}
                {...register('firstName', {
                  required: 'Can’t be empty',
                  minLength: {
                    value: 3,
                    message: 'Must be at least 3 characters',
                  },
                })}
                disabled={isUpdating}
              />
              {errors.firstName?.message && (
                <p className="absolute right-[2.5%] top-[40%] text-[1.2rem] leading-[1.8rem] text-[#ff3939]">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>
          <div className="mobile:flex-col mobile:items-start mobile:gap-2 flex items-center gap-[1.6rem]">
            <label htmlFor="lastName" className="w-[24rem] text-[#737373]">
              Last name*
            </label>
            <div className="relative flex w-full">
              <input
                type="text"
                placeholder="e.g. Appleseed"
                id="lastName"
                className={`w-full rounded-lg border border-solid bg-white p-2 text-xl leading-[2.4rem] text-[#333] outline-none focus:shadow-purple-sh  disabled:cursor-not-allowed disabled:bg-[#ccc] ${errors.lastName?.message ? 'border-[#ff3939]' : 'border-[#d9d9d9] caret-[#633cff] focus:border-[#633cff] '}`}
                {...register('lastName', {
                  required: 'Can’t be empty',
                  minLength: {
                    value: 3,
                    message: 'Must be at least 3 characters',
                  },
                })}
                disabled={isUpdating}
              />
              {errors.lastName?.message && (
                <p className="absolute right-[2.5%] top-[40%] text-sm leading-[1.8rem] text-[#ff3939]">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex-row flex items-center gap-5">
            <label htmlFor="email" className="w-[24rem] text-[#737373]">
              Email
            </label>
            <div className="relative flex w-full">
              <input
                type="text"
                placeholder="e.g. John"
                id="email"
                defaultValue={userData?.email}
                className={`w-full rounded-[0.8rem] border border-solid border-[#d9d9d9] bg-white p-2 text-xl leading-[2.4rem] text-[#333] caret-[#633cff]  outline-none focus:border-[#633cff] focus:shadow-purple-sh disabled:cursor-not-allowed disabled:bg-[#ddd] `}
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="text-xl"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
