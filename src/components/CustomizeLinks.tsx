import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import EmptyList from './EmptyList'
import LinkItem from './LinkItem'
import { isValidUrl, makeid, socialPlatforms } from '@/utils/constants'
import type { Link, SocialPlatform } from '@/utils/types'
import { useState, FormEvent } from 'react'
import { supabase } from '@/utils/supabase'
import { useUserStore } from '@/store'
import { toast } from 'sonner'

export default function CustomizeLinks({
  links,
  setLinks,
}: {
  links: Link[]
  setLinks: (links: Link[]) => void
}) {
  const [errors, setErrors] = useState<{ [key: number]: string }>({})
  const { userData } = useUserStore()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link.id === active.id)
      const newIndex = links.findIndex((link) => link.id === over.id)

      const newLinks = arrayMove(links, oldIndex, newIndex)
      setLinks(newLinks)
    }
  }

  function validateLinks() {
    const newErrors: { [key: number]: string } = {}
    links.forEach((link) => {
      if (!link.link) {
        newErrors[link.id] = 'URL cannot be empty'
      } else if (!isValidUrl(link.platform.name, link.link)) {
        newErrors[link.id] = `Invalid URL for ${link.platform.name}`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (validateLinks() && links.length > 0) {
      const { data: existingLinks, error: existingLinksError } = await supabase
        .from('links')
        .select('*')
        .eq('user', userData?.id)
      if (existingLinksError) {
        toast.error('Failed to check existing links')
        return
      }
      if (existingLinks.length > 0) {
        const { error: updateError } = await supabase
          .from('links')
          .update({ links })
          .eq('user', userData?.id)
        if (updateError) {
          toast.error('Failed to update links')
          return
        }
        toast.success('Links updated successfully')
        return
      }
      const { error } = await supabase
        .from('links')
        .insert({ links, user: userData?.id, preview_url: makeid(6) })
      if (error) {
        toast.error('Failed to save links')
      } else {
        toast.success('Links saved successfully')
      }
    }
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
      <form onSubmit={handleSubmit} className="flex flex-col bg-white w-full">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          {links.length > 0 ? (
            <SortableContext
              items={links}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col overflow-y-auto h-full md:h-[600px]">
                {links.map((link) => (
                  <LinkItem
                    key={link.id}
                    link={link}
                    errors={errors}
                    handleRemoveLink={() => {
                      const newLinks = links.filter((l) => l.id !== link.id)
                      if (newLinks.length === 0) {
                        setErrors({})
                      }
                      setLinks(newLinks)
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
        <div className="mt-10 flex items-center justify-end border-t py-5">
          <button
            disabled={links.length === 0}
            className="bg-primary w-full md:w-auto hover:bg-primary-hover hover:text-primary border border-primary text-white px-7 py-3 rounded-xl disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-disabled-text"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
