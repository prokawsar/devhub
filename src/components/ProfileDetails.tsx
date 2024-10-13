import { useUserStore } from '@/store'
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import Input from './Input'
import { ProfileData } from '@/utils/types'
import { ChangeEvent } from 'react'

type ProfileDetailsProps = {
  register: UseFormRegister<ProfileData>
  errors: FieldErrors<ProfileData>
  handleSubmit: UseFormHandleSubmit<ProfileData>
  isUpdating: boolean
  onSubmitData: (data: ProfileData) => void
  profileDetails: ProfileData
  onProfileUpdate: (field: keyof ProfileData, value: string) => void
}

export default function ProfileDetails({
  register,
  errors,
  handleSubmit,
  isUpdating,
  onSubmitData,
  onProfileUpdate,
  profileDetails,
}: ProfileDetailsProps) {
  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        onProfileUpdate('photo', imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full border-solid border-gray-300 bg-white p-10 h-[968px]">
      <h1 className="pb-5 text-3xl font-bold text-gray-800">Profile Details</h1>
      <p className="text-xl text-gray-500">
        Add your details to create a personal touch to your profile.
      </p>

      <form
        onSubmit={handleSubmit(onSubmitData)}
        className="flex flex-col gap-5 mt-10 justify-between h-[88%]"
      >
        <div className="flex flex-col gap-5">
          <div className="flex-row bg-gray-50 flex w-full h-40 rounded-lg items-center justify-between gap-2 p-5">
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
                style={
                  profileDetails.photo
                    ? { backgroundImage: `url(${profileDetails.photo})` }
                    : {}
                }
                htmlFor="image"
                className={`relative flex w-56 cursor-pointer flex-col items-center gap-2 rounded-lg bg-primary-hover bg-cover bg-center px-5 py-10`}
              >
                {profileDetails.photo ? (
                  <div className="absolute inset-0 w-56 px-5 rounded-lg bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-xl font-semibold text-white ">
                      Change Image
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-semibold">+ Upload Image</span>
                )}
              </label>
              <p className="w-36 text-gray-500">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>
          <div className="space-y-5 p-8 bg-gray-50 rounded-lg">
            <Input
              id="firstName"
              label="First name"
              placeholder="e.g. John"
              register={register}
              error={errors.firstName}
              disabled={isUpdating}
              required
              minLength={3}
              value={profileDetails.firstName}
              onChange={(e) => onProfileUpdate('firstName', e.target.value)}
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
              value={profileDetails.lastName}
              onChange={(e) => onProfileUpdate('lastName', e.target.value)}
            />
            <Input
              id="email"
              label="Email"
              placeholder="e.g. email@example.com"
              register={register}
              type="email"
              disabled={true}
              value={profileDetails.email}
            />
          </div>
        </div>
        <div className="flex justify-end border-t border-gray-300 pt-5">
          <button className="bg-primary hover:bg-primary-hover hover:text-primary border border-primary text-white px-7 py-3 rounded-xl">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
