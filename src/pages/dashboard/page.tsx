import CustomizeLinks from '@/components/CustomizeLinks'
import Header from '@/components/Header'
import ProfileDetails from '@/components/ProfileDetails'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('links')

  const handleSection = (section: string) => {
    setActiveSection(section)
  }

  // TODO: add profile details
  const [profileDetails, setProfileDetails] = useState({
    firstName: '',
    lastName: '',
    photo: '',
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<{
    firstName: string
    lastName: string
  }>()

  const handleSubmitData = (data: { firstName: string; lastName: string }) => {
    console.log(data)
  }
  return (
    <div className="flex flex-col gap-4 h-full items-center max-w-7xl mx-auto w-full">
      <Header handleSection={handleSection} activeSection={activeSection} />
      <div className="flex flex-row gap-4 w-full">
        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 w-2/6">
          <p>Mobile</p>
        </div>
        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 w-4/6">
          {activeSection === 'links' ? (
            <CustomizeLinks />
          ) : (
            <ProfileDetails
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              isUpdating={isSubmitting}
              onSubmitData={handleSubmitData}
            />
          )}
        </div>
      </div>
    </div>
  )
}
