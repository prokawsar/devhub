import CustomizeLinks from '@/components/CustomizeLinks'
import Header from '@/components/Header'
import ProfileDetails from '@/components/ProfileDetails'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, ProfileData } from '@/utils/types'
import MobilePreview from '@/components/MobilePreview'
import { useUserStore } from '@/store'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('links')
  const [links, setLinks] = useState<Link[]>([])

  const handleSection = (section: string) => {
    setActiveSection(section)
  }

  const { userData } = useUserStore()

  const [profileDetails, setProfileDetails] = useState({
    firstName: '',
    lastName: '',
    photo: null,
    email: userData?.email || '',
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileData>()

  const handleSubmitData = (data: ProfileData) => {
    console.log(data)
  }
  const handleProfileUpdate = useCallback((field: string, value: string) => {
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }))
  }, [])
  return (
    <div className="flex flex-col gap-4 h-full items-center max-w-7xl mx-auto w-full py-5">
      <Header handleSection={handleSection} activeSection={activeSection} />
      <div className="flex flex-row gap-4 h-full w-full">
        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 w-2/6">
          <MobilePreview links={links} profileDetails={profileDetails} />
        </div>
        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 w-4/6">
          {activeSection === 'links' ? (
            <CustomizeLinks links={links} setLinks={setLinks} />
          ) : (
            <ProfileDetails
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              isUpdating={isSubmitting}
              onSubmitData={handleSubmitData}
              profileDetails={profileDetails}
              onProfileUpdate={handleProfileUpdate}
            />
          )}
        </div>
      </div>
    </div>
  )
}
