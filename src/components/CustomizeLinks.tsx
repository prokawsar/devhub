import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import EmptyList from './EmptyList'
import { useState } from 'react'

export default function CustomizeLinks() {
  const [links, setLinks] = useState([])

  function getLinksPosition(id: number): number {
    return links.findIndex((link) => link.id === id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
  }

  return (
    <div className="flex flex-col bg-white p-16 pb-0 w-4/6">
      <h1 className="pb-[0.8rem] text-[3.2rem] font-bold leading-[4.8rem] text-[#333]">
        Customize your links
      </h1>
      <h3 className="pb-16 text-[1.6rem] leading-[2.4rem] text-[#737373]">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </h3>
      <button className="mb-[2.4rem] flex items-center justify-center gap-[0.8rem] rounded-[0.8rem] border border-solid border-[#633cff] px-11 py-4 text-[1.6rem] font-medium leading-[2.4rem] text-[#633cff] hover:bg-[#efebff] disabled:cursor-not-allowed disabled:border-[#ccc] disabled:bg-[#ccc] disabled:text-[#666]">
        <span>Add link</span>
      </button>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {links.length > 0 ? (
          <SortableContext items={links} strategy={verticalListSortingStrategy}>
            {links.map((link, index) => (
              <p key={index}>{link.name}</p>
            ))}
          </SortableContext>
        ) : (
          <EmptyList />
        )}
      </DndContext>
    </div>
  )
}
