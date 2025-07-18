export const zodiacSigns = [
  { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire' },
  { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth' },
  { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air' },
  { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water' },
  { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire' },
  { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth' },
  { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air' },
  { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water' },
  { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire' },
  { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth' },
  { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air' },
  { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water' },
]

export function getZodiacSign(birthDate: string): string {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  return 'Pisces'
}

export function getCompatibility(sign1: string, sign2: string): { score: number; description: string } {
  const compatibilityMap: Record<string, Record<string, number>> = {
    'Aries': { 'Leo': 95, 'Sagittarius': 90, 'Gemini': 85, 'Aquarius': 80, 'Libra': 70, 'Aries': 75 },
    'Taurus': { 'Virgo': 95, 'Capricorn': 90, 'Cancer': 85, 'Pisces': 80, 'Scorpio': 70, 'Taurus': 75 },
    'Gemini': { 'Libra': 95, 'Aquarius': 90, 'Aries': 85, 'Leo': 80, 'Sagittarius': 70, 'Gemini': 75 },
    'Cancer': { 'Scorpio': 95, 'Pisces': 90, 'Taurus': 85, 'Virgo': 80, 'Capricorn': 70, 'Cancer': 75 },
    'Leo': { 'Aries': 95, 'Sagittarius': 90, 'Gemini': 85, 'Libra': 80, 'Aquarius': 70, 'Leo': 75 },
    'Virgo': { 'Taurus': 95, 'Capricorn': 90, 'Cancer': 85, 'Scorpio': 80, 'Pisces': 70, 'Virgo': 75 },
    'Libra': { 'Gemini': 95, 'Aquarius': 90, 'Leo': 85, 'Sagittarius': 80, 'Aries': 70, 'Libra': 75 },
    'Scorpio': { 'Cancer': 95, 'Pisces': 90, 'Virgo': 85, 'Capricorn': 80, 'Taurus': 70, 'Scorpio': 75 },
    'Sagittarius': { 'Leo': 95, 'Aries': 90, 'Libra': 85, 'Aquarius': 80, 'Gemini': 70, 'Sagittarius': 75 },
    'Capricorn': { 'Virgo': 95, 'Taurus': 90, 'Scorpio': 85, 'Pisces': 80, 'Cancer': 70, 'Capricorn': 75 },
    'Aquarius': { 'Libra': 95, 'Gemini': 90, 'Sagittarius': 85, 'Aries': 80, 'Leo': 70, 'Aquarius': 75 },
    'Pisces': { 'Scorpio': 95, 'Cancer': 90, 'Capricorn': 85, 'Taurus': 80, 'Virgo': 70, 'Pisces': 75 },
  }

  const score = compatibilityMap[sign1]?.[sign2] || 50

  let description = ''
  if (score >= 90) description = 'Excellent match! You complement each other perfectly.'
  else if (score >= 80) description = 'Great compatibility with strong potential.'
  else if (score >= 70) description = 'Good match with some areas to work on.'
  else if (score >= 60) description = 'Moderate compatibility, requires understanding.'
  else description = 'Challenging match that needs extra effort.'

  return { score, description }
}

export const moonPhases = [
  { name: 'New Moon', symbol: '🌑', meaning: 'New beginnings and fresh starts' },
  { name: 'Waxing Crescent', symbol: '🌒', meaning: 'Growth and manifestation' },
  { name: 'First Quarter', symbol: '🌓', meaning: 'Decision making and action' },
  { name: 'Waxing Gibbous', symbol: '🌔', meaning: 'Refinement and adjustment' },
  { name: 'Full Moon', symbol: '🌕', meaning: 'Culmination and completion' },
  { name: 'Waning Gibbous', symbol: '🌖', meaning: 'Gratitude and sharing' },
  { name: 'Last Quarter', symbol: '🌗', meaning: 'Release and letting go' },
  { name: 'Waning Crescent', symbol: '🌘', meaning: 'Rest and reflection' },
]