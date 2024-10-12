import { useUserStore } from '@/store'
import { Button } from 'antd'
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import Input from './Input'

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
    <div className="w-full border-solid border-gray-300 bg-white p-10 pb-0">
      <h1 className="pb-5 text-3xl font-bold text-gray-800">Profile Details</h1>
      <p className="text-xl text-gray-500">
        Add your details to create a personal touch to your profile.
      </p>

      <form onSubmit={handleSubmit(onSubmitData)}>
        <div className="flex-row flex w-full items-center justify-between gap-2 p-5">
          <span className="text-xl text-gray-500">Profile picture</span>
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
              className={`flex w-56 cursor-pointer flex-col items-center gap-2 rounded-lg bg-primary-hover bg-cover bg-center px-5 py-10`}
            >
              <span className="text-xl font-semibold">+ Upload Image</span>
            </label>
            <p className="w-36 text-gray-500">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>
        <div className="space-y-5 p-8">
          <Input
            id="firstName"
            label="First name"
            placeholder="e.g. John"
            register={register}
            error={errors.firstName}
            disabled={isUpdating}
            required
            minLength={3}
          />
          <Input
            id="lastName"
            label="Last name"
            placeholder="e.g. Appleseed"
            register={register}
            error={errors.lastName}
            disabled={isUpdating}
            required
            minLength={3}
          />
          <Input
            id="email"
            label="Email"
            placeholder="e.g. email@example.com"
            register={register}
            disabled={true}
            type="email"
            value={userData?.email}
          />
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
