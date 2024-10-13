import { useParams } from 'react-router-dom'
import Header from '@/components/Header'
import { useEffect, useCallback, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Link, ProfileData } from '@/utils/types'
import MobilePreview from '@/components/MobilePreview'

export default function Preview() {
  const { url } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  const [profileDetails, setProfileDetails] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
  })

  const getLinks = useCallback(async () => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('preview_url', url)
    setLinks(data?.[0]?.links || [])
    setProfileDetails({
      firstName: data?.[0]?.full_name?.split(' ')[0] || '',
      lastName: data?.[0]?.full_name?.split(' ')[1] || '',
      email: data?.[0]?.email || '',
    })
    return data
  }, [url])

  useEffect(() => {
    document.title = `Preview | ${profileDetails.firstName} ${profileDetails.lastName}`
    getLinks()
  }, [url])
  return (
    <div className="flex flex-col gap-4 h-full items-center max-w-7xl mx-auto w-full py-5">
      <Header />
      <div className="flex flex-col gap-4">
        <MobilePreview links={links} profileDetails={profileDetails} />
      </div>
    </div>
  )
}
