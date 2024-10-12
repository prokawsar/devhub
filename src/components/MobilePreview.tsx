import { Link } from '@/utils/types'
import { ProfileData } from '@/utils/types'
import { Link as RouterLink } from 'react-router-dom'
import { isLightColor } from '@/utils/constants'

export default function MobilePreview({
  links,
  profileDetails,
}: {
  links: Link[]
  profileDetails: Omit<ProfileData, 'email'>
}) {
  return (
    <div className="flex flex-col gap-4 items-center h-full justify-center">
      <div className="flex flex-col gap-1 border border-gray-600 rounded-xl p-2 w-[300px]">
        <div className="flex flex-row gap-1 font-bold justify-center">
          <p>{profileDetails.firstName}</p>
          <p>{profileDetails.lastName}</p>
        </div>
        {links.map((link) => (
          <div key={link.id} className="flex flex-row gap-4 w-full">
            <RouterLink
              className="rounded-lg p-4 w-full flex items-center justify-between hover:bg-opacity-50  cursor-pointer"
              to={link.link}
              style={{
                backgroundColor: link.platform.color,
                color: isLightColor(link.platform.color) ? '#000' : '#fff',
              }}
            >
              {link.platform.name}
            </RouterLink>
          </div>
        ))}
      </div>
    </div>
  )
}
