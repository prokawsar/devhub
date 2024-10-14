import { Link } from '@/utils/types'
import { ProfileData } from '@/utils/types'
import { Link as RouterLink } from 'react-router-dom'
import { isLightColor } from '@/utils/constants'
import { Icon } from '@iconify/react'

export default function MobilePreview({
  links,
  profileDetails,
  preview,
}: {
  links: Link[]
  profileDetails: ProfileData
  preview?: boolean
}) {
  const displayLinks = Array(5)
    .fill(null)
    .map((_, index) => links[index] || null)

  return (
    <div className="flex flex-col gap-4 items-center h-full justify-center">
      <div className="flex flex-col gap-3 border items-center border-gray-600 rounded-3xl p-8 w-[300px]">
        {profileDetails.photo ? (
          <img
            src={profileDetails.photo}
            alt="profile"
            className="rounded-full w-24 h-24 border-4 border-primary"
          />
        ) : (
          <div className="rounded-full w-24 h-24 bg-gray-200 border-4 border-primary"></div>
        )}
        <div className="flex flex-col gap-3 font-bold text-2xl w-full items-center mb-10">
          {profileDetails.firstName || profileDetails.lastName ? (
            <div className="flex flex-row gap-1 text-center">
              <p>
                {profileDetails.firstName} {profileDetails.lastName}
              </p>
            </div>
          ) : (
            <div className="w-24 h-8 bg-gray-300"></div>
          )}

          <p className="text-gray-500 text-sm">{profileDetails.email}</p>
        </div>

        {displayLinks.map((link, index) => (
          <div
            key={link?.id || `placeholder-${index}`}
            className="flex flex-row gap-4 w-full"
          >
            {link ? (
              <RouterLink
                target="_blank"
                className="rounded-lg px-4 py-3 w-full flex items-center justify-between hover:bg-opacity-50  cursor-pointer"
                to={link.link}
                style={{
                  backgroundColor: link.platform.color,
                  color: isLightColor(link.platform.color) ? '#000' : '#fff',
                }}
              >
                <span className="flex flex-row gap-2 items-center">
                  <Icon icon={link.platform.icon} />
                  {link.platform.name}
                </span>
                <Icon icon="material-symbols:arrow-forward-rounded" />
              </RouterLink>
            ) : preview ? (
              <div className="rounded-lg p-6 w-full flex items-center justify-between bg-gray-200 text-gray-400"></div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
