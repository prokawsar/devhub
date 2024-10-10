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
    <div className="flex flex-col bg-white p-10 pb-0 w-full">
      <h1 className="text-3xl font-bold text-[#333]">Customize your links</h1>
      <h3 className="text-xl my-5 text-[#737373]">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </h3>
      <button className="mb-10 flex items-center justify-center rounded-xl border border-solid border-[#633cff] py-3 text-xl font-medium text-[#633cff] hover:bg-[#efebff] disabled:cursor-not-allowed disabled:border-[#ccc] disabled:bg-[#ccc] disabled:text-[#666]">
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
