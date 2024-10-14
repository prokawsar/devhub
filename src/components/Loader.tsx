import { Icon } from '@iconify/react/dist/iconify.js'

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <Icon icon="eos-icons:loading" className="animate-spin" fontSize={50} />
    </div>
  )
}
