import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import EmptyList from './EmptyList'
import LinkItem from './LinkItem'
import { makeid } from '@/utils/constants'
import { Button } from 'antd'
import { Link } from '@/utils/types'

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
    setLinks([...links, { id: links.length + 1, name: '', link: '' }])
  }
  return (
    <div className="flex flex-col bg-white p-10 pb-0 w-full">
      <h1 className="text-3xl font-bold text-[#333]">Customize your links</h1>
      <h3 className="text-xl my-5 text-[#737373]">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </h3>
      <button
        onClick={() => addLinks()}
        className="mb-10 flex items-center justify-center rounded-xl border border-solid border-[#633cff] py-3 text-xl font-medium text-[#633cff] hover:bg-[#efebff] disabled:cursor-not-allowed disabled:border-[#ccc] disabled:bg-[#ccc] disabled:text-[#666]"
      >
        <span>Add link</span>
      </button>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {links.length > 0 ? (
          <SortableContext items={links} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col overflow-y-auto min-h-96 max-h-[700px]">
              {links.map((link) => (
                <LinkItem
                  key={makeid(6)}
                  link={link}
                  handleRemoveLink={() => {
                    setLinks(links.filter((l) => l.id !== link.id))
                  }}
                  handleUpdateLink={({ platform, url }) => {
                    setLinks(
                      links.map((l) => {
                        if (l.id === link.id) {
                          return {
                            ...l,
                            name: platform || l.name,
                            link: url || '',
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
          <Button type="primary" size="large">
            Save
          </Button>
        </div>
      )}
    </div>
  )
}
