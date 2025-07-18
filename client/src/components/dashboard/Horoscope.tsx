import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { zodiacSigns } from '../../utils/astrology'
import { Calendar, Star, Sparkles } from 'lucide-react'

export default function Horoscope() {
  const { profile } = useAuth()
  const [selectedType, setSelectedType] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  const userZodiac = profile?.zodiac_sign ? zodiacSigns.find(sign => sign.name === profile.zodiac_sign) : null

  const horoscopes = {
    daily: {
      'Aries': 'Today brings dynamic energy and new opportunities. Trust your instincts and take bold action.',
      'Taurus': 'Focus on stability and practical matters today. Your patience will be rewarded.',
      'Gemini': 'Communication is key today. Share your ideas and connect with others.',
      'Cancer': 'Your intuition is heightened. Trust your emotional wisdom.',
      'Leo': 'Shine bright today! Your natural charisma attracts positive attention.',
      'Virgo': 'Attention to detail serves you well. Organization leads to success.',
      'Libra': 'Balance and harmony are your themes today. Seek peaceful solutions.',
      'Scorpio': 'Deep insights emerge today. Trust your transformative power.',
      'Sagittarius': 'Adventure calls! Expand your horizons and explore new possibilities.',
      'Capricorn': 'Steady progress toward your goals. Your discipline pays off.',
      'Aquarius': 'Innovation and originality set you apart today.',
      'Pisces': 'Your creativity and compassion guide you to meaningful connections.',
    },
    weekly: {
      'Aries': 'This week, your leadership skills shine. Take charge of important projects and inspire others with your confidence.',
      'Taurus': 'A week of building solid foundations. Focus on long-term investments in relationships and career.',
      'Gemini': 'Communication opportunities abound this week. Network, learn, and share your knowledge.',
      'Cancer': 'Family and home take center stage. Nurture your closest relationships and create a harmonious environment.',
      'Leo': 'Your creative energy is at its peak. Express yourself boldly and embrace recognition.',
      'Virgo': 'Perfect timing for organizing your life. Health and wellness improvements bring lasting benefits.',
      'Libra': 'Partnerships flourish this week. Collaboration and compromise lead to mutual success.',
      'Scorpio': 'Transformation is in the air. Embrace change and let go of what no longer serves you.',
      'Sagittarius': 'Learning and travel opportunities expand your worldview. Say yes to new experiences.',
      'Capricorn': 'Professional advancement is highlighted. Your hard work gains recognition and rewards.',
      'Aquarius': 'Humanitarian efforts and group activities bring fulfillment. Make a difference in your community.',
      'Pisces': 'Spiritual growth and artistic pursuits nourish your soul. Trust your intuitive guidance.',
    },
    monthly: {
      'Aries': 'This month marks a powerful new beginning. Your pioneering spirit opens doors to exciting ventures.',
      'Taurus': 'Financial stability and material security improve significantly. Your persistence creates lasting value.',
      'Gemini': 'Mental stimulation and variety keep you engaged. Multiple projects bring diverse rewards.',
      'Cancer': 'Emotional depth and family connections strengthen. Home becomes your sanctuary of peace.',
      'Leo': 'Creative self-expression reaches new heights. Your authentic self attracts admiration and opportunities.',
      'Virgo': 'Health and service bring fulfillment. Your attention to detail creates meaningful improvements.',
      'Libra': 'Relationships and beauty are highlighted. Harmony in partnerships creates lasting happiness.',
      'Scorpio': 'Deep transformation and regeneration occur. You emerge stronger and more authentic.',
      'Sagittarius': 'Philosophy and higher learning expand your perspective. Wisdom guides your decisions.',
      'Capricorn': 'Authority and achievement mark this month. Your reputation grows through dedicated effort.',
      'Aquarius': 'Innovation and friendship bring unexpected benefits. Your unique vision inspires others.',
      'Pisces': 'Compassion and creativity flow freely. Your empathy creates healing for yourself and others.',
    }
  }

  const currentHoroscope = userZodiac ? horoscopes[selectedType][userZodiac.name as keyof typeof horoscopes.daily] : ''

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Your Cosmic Guidance</h2>
          {userZodiac && (
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-4xl">{userZodiac.symbol}</div>
              <div>
                <h3 className="text-xl font-semibold text-white">{userZodiac.name}</h3>
                <p className="text-purple-300">{userZodiac.dates}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white/10 rounded-lg p-1 flex space-x-1">
            {(['daily', 'weekly', 'monthly'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-md transition-all ${
                  selectedType === type
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {userZodiac ? (
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-8 border border-purple-400/30">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Horoscope
              </h3>
            </div>
            <p className="text-lg text-gray-200 leading-relaxed">{currentHoroscope}</p>
          </div>
        ) : (
          <div className="text-center bg-white/5 rounded-lg p-8">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Complete Your Profile</h3>
            <p className="text-gray-300">Add your birth date to unlock personalized horoscopes and cosmic insights.</p>
          </div>
        )}

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white">Daily Guidance</h4>
            <p className="text-sm text-gray-300">Fresh insights for today</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white">Weekly Overview</h4>
            <p className="text-sm text-gray-300">Plan your week ahead</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white">Monthly Forecast</h4>
            <p className="text-sm text-gray-300">Long-term cosmic trends</p>
          </div>
        </div>
      </div>
    </div>
  )
}