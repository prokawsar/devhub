import CustomizeLinks from '@/components/CustomizeLinks'
import Header from '@/components/Header'
import ProfileDetails from '@/components/ProfileDetails'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, ProfileData } from '@/utils/types'
import MobilePreview from '@/components/MobilePreview'
import { useUserStore } from '@/store'
import {
  checkExistingLinks,
  insertProfileData,
  supabase,
  updateProfileData,
} from '@/utils/supabase'
import { toast } from 'sonner'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('links')
  const [links, setLinks] = useState<Link[]>([])
  const previewUrl = useRef<string | undefined>(undefined)

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

  const handleSection = (section: string) => {
    setActiveSection(section)
  }
  const getLinks = async () => {
    if (userData?.id) {
      const { data: links, error } = await supabase
        .from('links')
        .select('*')
        .eq('user', userData.id)
      if (error) {
        console.error(error)
        return
      }
      setLinks(links?.[0]?.links || [])
      previewUrl.current = links?.[0]?.preview_url
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        firstName: links?.[0]?.first_name || '',
        lastName: links?.[0]?.last_name || '',
      }))
    }
  }

  useEffect(() => {
    getLinks()
  }, [])

  const handleSubmitData = async (data: ProfileData) => {
    if (data.firstName || data.lastName) {
      const { data: existingData, error: fetchError } =
        await checkExistingLinks(userData?.id as string)

      if (fetchError && fetchError.code !== 'PGRST116') {
        toast.error('Error checking existing record')
        return
      }
      console.log(existingData)
      let result

      if (existingData) {
        result = await updateProfileData(userData?.id as string, {
          first_name: data.firstName,
          last_name: data.lastName,
          email: userData?.email,
        })
        if (!result.error) {
          toast.success('Profile updated successfully')
        }
      } else {
        result = insertProfileData(userData?.id as string, {
          first_name: data.firstName,
          last_name: data.lastName,
          email: userData?.email,
        })
        toast.success('Profile updated successfully')
      }
    }
  }
  const handleProfileUpdate = useCallback((field: string, value: string) => {
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }))
  }, [])

  document.title = 'Dashboard | LinkInBio'

  return (
    <div className="flex flex-col gap-4 h-full items-center max-w-7xl mx-auto w-full py-5">
      <Header
        handleSection={handleSection}
        activeSection={activeSection}
        url={previewUrl.current}
      />
      <div className="flex flex-row gap-4 h-full w-full">
        <div className="flex-col hidden md:flex gap-4 bg-white rounded-lg p-4 w-2/6">
          <MobilePreview
            preview={activeSection === 'links'}
            links={links}
            profileDetails={profileDetails}
          />
        </div>
        <div className="flex flex-col gap-4 bg-white rounded-lg w-full md:w-4/6">
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
