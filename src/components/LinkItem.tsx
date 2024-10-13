import { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import { socialPlatforms } from '../utils/constants'
import { Link, SocialPlatform } from '../utils/types'
import { MouseEvent } from 'react'
export default function LinkItem({
  link,
  handleRemoveLink,
  handleUpdateLink,
}: {
  link: Link
  handleRemoveLink: () => void
  handleUpdateLink: ({
    platform,
    url,
  }: {
    platform?: SocialPlatform
    url?: string
  }) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id })
  const [isLinkBoxOpen, setIsLinkBoxOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState(link.link)
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  function handlePlatformChange(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    setIsLinkBoxOpen((prev) => !prev)
  }

  function handlePlatformSelect(platform: SocialPlatform) {
    handleUpdateLink({ platform: platform })
  }

  useEffect(() => {
    setIsLinkBoxOpen(false)
  }, [link.platform])

  return (
    <div
      className="mb-5 rounded-lg bg-gray-50 p-8 cursor-default"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div {...listeners} className="cursor-move">
            <Icon icon="mdi:drag" className="text-2xl text-gray-500" />
          </div>
          <h3 className="font-bold text-gray-500">Link #{link.id}</h3>
        </div>
        <p
          className="cursor-pointer text-gray-500 hover:text-yellow-500 hover:underline"
          onClick={() => handleRemoveLink()}
        >
          Remove
        </p>
      </div>

      <div className="relative flex flex-col gap-4 pt-5">
        <div>
          <label htmlFor="platform" className="text-gray-800">
            Platform
          </label>

          <div className="">
            <button
              type="button"
              className="z-[999] flex w-full items-center rounded-lg border border-solid border-gray-300 bg-white h-10 px-4 text-gray-800 caret-primary outline-none focus:border-primary focus:shadow-purple-sh"
              onClick={handlePlatformChange}
            >
              <p>{link.platform.name}</p>
            </button>

            {isLinkBoxOpen && (
              <div className="absolute top-22 z-[3] flex  h-40 w-full flex-col overflow-y-scroll border border-solid border-gray-300 bg-white shadow-dark-sh">
                <div className="flex flex-col">
                  {socialPlatforms.map((platform) => (
                    <div
                      onClick={() => {
                        handlePlatformSelect(platform)
                      }}
                      className="flex flex-row gap-2 items-center hover:bg-gray-50 px-3 py-2 border-b cursor-pointer"
                      key={platform.name}
                    >
                      <Icon icon={platform.icon} />
                      <p>{platform.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="link" className="text-gray-800">
            Link
          </label>
          <div className="relative flex">
            <input
              type="text"
              placeholder="e.g. https://www.github.com/"
              id="link"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onBlur={() => handleUpdateLink({ url: linkUrl })}
              className="w-full rounded-lg border py-2 px-4 border-solid border-gray-300 bg-white text-gray-800 caret-primary outline-none focus:border-primary focus:shadow-purple-sh disabled:cursor-not-allowed disabled:bg-disabled-bg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
