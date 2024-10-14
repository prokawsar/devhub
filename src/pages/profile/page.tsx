import { useParams } from 'react-router-dom'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Link, ProfileData } from '@/utils/types'
import MobilePreview from '@/components/MobilePreview'
import Loader from '@/components/Loader'

export default function Preview() {
  const { url } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [profileDetails, setProfileDetails] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
  })

  const getLinks = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('preview_url', url)
    setLinks(data?.[0]?.links || [])
    setProfileDetails({
      firstName: data?.[0]?.first_name || '',
      lastName: data?.[0]?.last_name || '',
      email: data?.[0]?.email || '',
    })
    setIsLoading(false)
  }

  useEffect(() => {
    document.title = `Preview | ${profileDetails.firstName} ${profileDetails.lastName}`
    getLinks()
  }, [url])
  return (
    <div className="flex flex-col gap-4 h-full items-center max-w-7xl mx-auto w-full py-5">
      <Header />
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : links.length > 0 ? (
          <MobilePreview links={links} profileDetails={profileDetails} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-xl font-semibold text-yellow-600">
              No profile details found
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
