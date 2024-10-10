import CustomizeLinks from '@/components/CustomizeLinks'
import Header from '@/components/Header'
import { useState } from 'react'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('links')

  const handleSection = (section: string) => {
    setActiveSection(section)
  }

  return (
    <div className="flex flex-col gap-4 h-full items-center max-w-7xl mx-auto w-full">
      <Header handleSection={handleSection} activeSection={activeSection} />
      <div className="flex flex-row gap-4 w-full">
        <div className="flex flex-col gap-4 bg-white rounded-lg p-4 w-2/6">
          <p>Mobile</p>
        </div>
        {activeSection === 'links' ? <CustomizeLinks /> : <p>Profile</p>}
      </div>
    </div>
  )
}
