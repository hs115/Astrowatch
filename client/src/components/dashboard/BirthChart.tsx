import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { zodiacSigns } from '../../utils/astrology'
import { MapPin, Clock, Calendar, Star } from 'lucide-react'

export default function BirthChart() {
  const { profile } = useAuth()
  const userZodiac = profile?.zodiac_sign ? zodiacSigns.find(sign => sign.name === profile.zodiac_sign) : null

  const chartElements = [
    { name: 'Sun Sign', value: profile?.zodiac_sign || 'Not set', description: 'Your core personality and ego' },
    { name: 'Rising Sign', value: userZodiac?.name || 'Calculate needed', description: 'How others perceive you' },
    { name: 'Moon Sign', value: userZodiac?.name || 'Calculate needed', description: 'Your emotional nature' },
    { name: 'Element', value: userZodiac?.element || 'Unknown', description: 'Your elemental energy' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Your Birth Chart</h2>
          <p className="text-gray-300">A cosmic blueprint of your celestial DNA</p>
        </div>

        {profile?.birth_date ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-indigo-400/30">
              <h3 className="text-xl font-semibold text-white mb-4">Birth Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Birth Date</p>
                    <p className="text-white font-medium">{profile.birth_date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Birth Time</p>
                    <p className="text-white font-medium">{profile.birth_time || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Birth Place</p>
                    <p className="text-white font-medium">{profile.birth_place || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {chartElements.map((element) => (
                <div key={element.name} className="bg-white/5 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white">{element.name}</h4>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold text-purple-300 mb-2">{element.value}</p>
                  <p className="text-sm text-gray-400">{element.description}</p>
                </div>
              ))}
            </div>

            {userZodiac && (
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-8 border border-purple-400/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">{userZodiac.symbol}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{userZodiac.name} Insights</h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    As a {userZodiac.name}, you embody the {userZodiac.element.toLowerCase()} element's qualities. 
                    Your celestial blueprint reveals a unique combination of cosmic influences that shape 
                    your personality, relationships, and life path. The stars were aligned in a special 
                    way at the moment of your birth, creating your personal cosmic signature.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> For a complete birth chart reading including houses, aspects, and detailed planetary positions, 
                birth time and location are required. Consider consulting with a professional astrologer for deeper insights.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center bg-white/5 rounded-lg p-8">
            <MapPin className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Complete Your Profile</h3>
            <p className="text-gray-300">Add your birth date, time, and location to generate your personalized birth chart.</p>
          </div>
        )}
      </div>
    </div>
  )
}