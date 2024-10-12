import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import EmptyList from './EmptyList'
import LinkItem from './LinkItem'
import { makeid, socialPlatforms } from '@/utils/constants'
import { Button } from 'antd'
import type { Link, SocialPlatform } from '@/utils/types'

export default function CustomizeLinks({
  links,
  setLinks,
}: {
  links: Link[]
  setLinks: (links: Link[]) => void
}) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
  }

  function addLinks() {
    setLinks([
      ...links,
      { id: links.length + 1, platform: socialPlatforms[0], link: '' },
    ])
  }
  return (
    <div className="flex flex-col bg-white p-10 pb-0 w-full h-full">
      <h1 className="text-3xl font-bold text-gray-800">Customize your links</h1>
      <h3 className="text-xl my-5 text-gray-500">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </h3>
      <button
        onClick={() => addLinks()}
        disabled={links.length >= 5}
        className="mb-10 flex items-center justify-center rounded-xl border border-solid border-primary py-3 text-xl font-medium text-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:border-disabled-bg disabled:bg-disabled-bg disabled:text-disabled-text"
      >
        <span>Add link</span>
      </button>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {links.length > 0 ? (
          <SortableContext items={links} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col overflow-y-auto h-[600px]">
              {links.map((link) => (
                <LinkItem
                  key={makeid(6)}
                  link={link}
                  handleRemoveLink={() => {
                    setLinks(links.filter((l) => l.id !== link.id))
                  }}
                  handleUpdateLink={({
                    platform,
                    url,
                  }: {
                    platform?: SocialPlatform
                    url?: string
                  }) => {
                    setLinks(
                      links.map((l) => {
                        if (l.id === link.id) {
                          return {
                            ...l,
                            platform: platform || l.platform,
                            link: url || l.link,
                          }
                        }
                        return l
                      }),
                    )
                  }}
                />
              ))}
            </div>
          </SortableContext>
        ) : (
          <EmptyList />
        )}
      </DndContext>
      {links.length > 0 && (
        <div className="mt-10 flex items-center justify-end">
          <button className="bg-primary hover:bg-primary-hover hover:text-primary border border-primary text-white px-7 py-3 rounded-xl">
            Save
          </button>
        </div>
      )}
    </div>
  )
}
