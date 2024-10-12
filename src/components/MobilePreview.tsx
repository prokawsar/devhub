import { Link } from '@/utils/types'

export default function MobilePreview({ links }: { links: Link[] }) {
  return (
    <div className="flex flex-col gap-4">
      {links.map((link) => (
        <div key={link.id} className="flex flex-row gap-4">
          <p>{link.name}</p>
          <p>{link.link}</p>
        </div>
      ))}
    </div>
  )
}
