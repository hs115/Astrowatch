import React from 'react'
import { moonPhases } from '../../utils/astrology'
import { Moon, Calendar, Star } from 'lucide-react'

export default function MoonPhase() {
  const currentDate = new Date()
  const currentPhaseIndex = Math.floor((currentDate.getDate() / 31) * 8) % 8
  const currentPhase = moonPhases[currentPhaseIndex]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Lunar Wisdom</h2>
          <p className="text-gray-300">Connect with the moon's cosmic energy</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-400/30 mb-8">
          <div className="text-center">
            <div className="text-8xl mb-4">{currentPhase.symbol}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{currentPhase.name}</h3>
            <p className="text-lg text-blue-200">{currentPhase.meaning}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {moonPhases.map((phase, index) => (
            <div
              key={phase.name}
              className={`p-4 rounded-lg border transition-all ${
                index === currentPhaseIndex
                  ? 'bg-blue-600/20 border-blue-400'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{phase.symbol}</div>
                <h4 className="font-semibold text-white text-sm">{phase.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{phase.meaning}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Moon className="w-6 h-6 text-blue-400 mr-2" />
              Today's Lunar Guidance
            </h3>
            <p className="text-gray-200 leading-relaxed">
              The {currentPhase.name} brings powerful energy for {currentPhase.meaning.toLowerCase()}. 
              This is an ideal time to align your intentions with the moon's natural rhythm. 
              {currentPhaseIndex < 4 
                ? " Focus on growth, manifestation, and building toward your goals."
                : " Embrace release, reflection, and letting go of what no longer serves you."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Lunar Calendar</h4>
              <p className="text-sm text-gray-300">Track moon phases</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Cosmic Events</h4>
              <p className="text-sm text-gray-300">Celestial happenings</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Moon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Rituals</h4>
              <p className="text-sm text-gray-300">Moon phase practices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}