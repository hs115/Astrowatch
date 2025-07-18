import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Stars, User, Calendar, Heart, Moon, MapPin, LogOut } from 'lucide-react'

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { user, signOut } = useAuth()

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'horoscope', label: 'Horoscope', icon: Calendar },
    { id: 'compatibility', label: 'Compatibility', icon: Heart },
    { id: 'moon', label: 'Moon Phase', icon: Moon },
    { id: 'chart', label: 'Birth Chart', icon: MapPin },
  ]

  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Stars className="w-8 h-8 text-yellow-400 mr-3" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              AstroWatch
            </h1>
          </div>

          <nav className="hidden md:flex space-x-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-gray-300 hidden sm:block">{user?.email}</span>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:block">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}