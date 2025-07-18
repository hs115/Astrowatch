import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Header from './Header'
import Profile from './Profile'
import Horoscope from './Horoscope'
import Compatibility from './Compatibility'
import MoonPhase from './MoonPhase'
import BirthChart from './BirthChart'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile')

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />
      case 'horoscope':
        return <Horoscope />
      case 'compatibility':
        return <Compatibility />
      case 'moon':
        return <MoonPhase />
      case 'chart':
        return <BirthChart />
      default:
        return <Profile />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}