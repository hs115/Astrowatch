import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getCompatibility, zodiacSigns } from '../../utils/astrology'
import { Heart, Users, Star } from 'lucide-react'

export default function Compatibility() {
  const { profile } = useAuth()
  const [selectedSign, setSelectedSign] = useState('')
  
  const userZodiac = profile?.zodiac_sign
  const compatibility = userZodiac && selectedSign ? getCompatibility(userZodiac, selectedSign) : null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Cosmic Compatibility</h2>
          <p className="text-gray-300">Discover your astrological connections with others</p>
        </div>

        {userZodiac ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-xl font-semibold text-white mb-4">Your Sign</h3>
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{zodiacSigns.find(sign => sign.name === userZodiac)?.symbol}</div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{userZodiac}</h4>
                  <p className="text-purple-300">{zodiacSigns.find(sign => sign.name === userZodiac)?.dates}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Compare with another sign</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {zodiacSigns.map((sign) => (
                  <button
                    key={sign.name}
                    onClick={() => setSelectedSign(sign.name)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedSign === sign.name
                        ? 'bg-purple-600 border-purple-400 text-white'
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-2xl mb-2">{sign.symbol}</div>
                    <div className="text-sm font-medium">{sign.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {compatibility && selectedSign && (
              <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-xl p-8 border border-pink-400/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Heart className="w-8 h-8 text-pink-400" />
                    <h3 className="text-2xl font-bold text-white">Compatibility Score</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-pink-400">{compatibility.score}%</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(compatibility.score / 20)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-8 mb-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{zodiacSigns.find(sign => sign.name === userZodiac)?.symbol}</div>
                    <div className="font-semibold text-white">{userZodiac}</div>
                  </div>
                  <Heart className="w-8 h-8 text-pink-400" />
                  <div className="text-center">
                    <div className="text-4xl mb-2">{zodiacSigns.find(sign => sign.name === selectedSign)?.symbol}</div>
                    <div className="font-semibold text-white">{selectedSign}</div>
                  </div>
                </div>

                <p className="text-lg text-gray-200 text-center leading-relaxed">
                  {compatibility.description}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Friendship</h4>
                <p className="text-sm text-gray-300">Platonic connections</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Romance</h4>
                <p className="text-sm text-gray-300">Love compatibility</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Partnership</h4>
                <p className="text-sm text-gray-300">Business & life goals</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center bg-white/5 rounded-lg p-8">
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Complete Your Profile</h3>
            <p className="text-gray-300">Add your birth date to explore cosmic compatibility with others.</p>
          </div>
        )}
      </div>
    </div>
  )
}