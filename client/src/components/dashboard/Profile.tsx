import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getZodiacSign, zodiacSigns } from '../../utils/astrology'
import { User, Calendar, Clock, MapPin, Save } from 'lucide-react'

export default function Profile() {
  const { profile, updateProfile } = useAuth()
  const [editing, setEditing] = useState(!profile?.birth_date)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    birth_date: profile?.birth_date || '',
    birth_time: profile?.birth_time || '',
    birth_place: profile?.birth_place || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const zodiacSign = getZodiacSign(formData.birth_date)
    
    const { error } = await updateProfile({
      ...formData,
      zodiac_sign: zodiacSign,
    })

    if (!error) {
      setEditing(false)
    }
    setLoading(false)
  }

  const userZodiac = profile?.zodiac_sign ? zodiacSigns.find(sign => sign.name === profile.zodiac_sign) : null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Your Cosmic Profile</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={formData.birth_time}
                  onChange={(e) => setFormData({ ...formData, birth_time: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Birth Place"
                  value={formData.birth_place}
                  onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? 'Saving...' : 'Save Profile'}</span>
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            {userZodiac && (
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-400/30">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-6xl">{userZodiac.symbol}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{userZodiac.name}</h3>
                    <p className="text-purple-300">{userZodiac.dates}</p>
                    <p className="text-gray-300">{userZodiac.element} Sign</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Personal Information</h4>
                <div className="space-y-2">
                  <p className="text-gray-300"><span className="text-purple-300">Name:</span> {profile?.full_name}</p>
                  <p className="text-gray-300"><span className="text-purple-300">Birth Date:</span> {profile?.birth_date}</p>
                  <p className="text-gray-300"><span className="text-purple-300">Birth Time:</span> {profile?.birth_time || 'Not specified'}</p>
                  <p className="text-gray-300"><span className="text-purple-300">Birth Place:</span> {profile?.birth_place || 'Not specified'}</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Astrological Details</h4>
                <div className="space-y-2">
                  <p className="text-gray-300"><span className="text-purple-300">Zodiac Sign:</span> {profile?.zodiac_sign}</p>
                  <p className="text-gray-300"><span className="text-purple-300">Element:</span> {userZodiac?.element}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}