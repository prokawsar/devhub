import { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDraggable } from '@dnd-kit/core'
import { Icon } from '@iconify/react'
import { socialPlatforms } from '../utils/constants'
import { Link } from '../utils/types'

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
    platform?: string
    url?: string
  }) => void
}) {
  const [isLinkBoxOpen, setIsLinkBoxOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState(link.link)

  function handlePlatformChange(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    setIsLinkBoxOpen((prev) => !prev)
  }

  const { id } = link
  const { listeners, setNodeRef, transform, transition } = useSortable({ id })
  const { attributes: draggableAttributes } = useDraggable({
    id: `item-${id}`,
  })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      className="mb-5 rounded-lg bg-[#fafafa] p-8"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-[#737373]">Link #{link.id}</h3>
        </div>
        <p
          className="cursor-pointer text-[#737373]"
          onClick={() => handleRemoveLink()}
        >
          Remove
        </p>
      </div>

      <form className="relative flex flex-col gap-[1.2rem] pt-5">
        <div>
          <label htmlFor="platform" className="text-[#333]">
            Platform
          </label>

          <div className="">
            <button
              type="button"
              className="z-[999] flex w-full items-center rounded-lg border border-solid border-[#d9d9d9] bg-white h-10 px-4 text-[#333] caret-[#633cff] outline-none focus:border-[#633cff] focus:shadow-purple-sh"
              onClick={handlePlatformChange}
            >
              <p>{link.name}</p>
            </button>

            {isLinkBoxOpen && (
              <div className="absolute top-20 z-[3] flex  h-40 w-full flex-col overflow-y-scroll border border-solid border-[#d9d9d9] bg-white shadow-dark-sh">
                <div className="flex flex-col">
                  {socialPlatforms.map((platform) => (
                    <div
                      onClick={() =>
                        handleUpdateLink({ platform: platform.name })
                      }
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
          <label htmlFor="link" className="text-[#333]">
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
              className="w-full rounded-lg border py-2 px-4 border-solid border-[#d9d9d9] bg-white text-[#333] caret-[#633cff] outline-none focus:border-[#633cff] focus:shadow-purple-sh disabled:cursor-not-allowed disabled:bg-[#ccc]"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
