import type { SocialPlatform } from './types'

export const PROTECTED_ROUTES = ['/']
export const PUBLIC_ROUTES = ['/login', '/signup']

export const socialPlatforms: SocialPlatform[] = [
  {
    name: 'Github',
    icon: 'mdi:github',
    url: 'https://github.com/',
    color: '#181717',
  },
  {
    name: 'Dev.to',
    icon: 'mdi:dev-to',
    url: 'https://dev.to/',
    color: '#0A0A0A',
  },
  {
    name: 'Frontend Mentor',
    icon: 'mdi:frontend-mentor',
    url: 'https://www.frontendmentor.io/profile/',
    color: '#0A0A0A',
  },
  {
    name: 'Gitlab',
    icon: 'mdi:gitlab',
    url: 'https://gitlab.com/',
    color: '#FCA326',
  },
  {
    name: 'Twitter',
    icon: 'mdi:twitter',
    url: 'https://twitter.com/',
    color: '#1D9BF0',
  },
  {
    name: 'LinkedIn',
    icon: 'mdi:linkedin',
    url: 'https://www.linkedin.com/in/',
    color: '#0A66C2',
  },
  {
    name: 'YouTube',
    icon: 'mdi:youtube',
    url: 'https://www.youtube.com/@',
    color: '#FF0000',
  },
  {
    name: 'Facebook',
    icon: 'mdi:facebook',
    url: 'https://www.facebook.com/',
    color: '#1877F2',
  },
  {
    name: 'Codepen',
    icon: 'mdi:codepen',
    url: 'https://codepen.io/',
    color: '#0A0A0A',
  },
  {
    name: 'StackOverflow',
    icon: 'mdi:stackoverflow',
    url: 'https://stackoverflow.com/users/',
    color: '#EC7100',
  },
]

export function makeid(length: number) {
  let str = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return str
}

// Function to determine if a color is light or dark
export function isLightColor(color: string) {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128
}

export function isValidUrl(platform: string, url: string): boolean {
  const patterns: { [key: string]: RegExp } = {
    Facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/i,
    Twitter: /^https?:\/\/(www\.)?twitter\.com\/.+/i,
    Instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
    LinkedIn: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/.+/i,
    Github: /^https?:\/\/(www\.)?github\.com\/.+/i,
    'Dev.to': /^https?:\/\/(www\.)?dev\.to\/.+/i,
    'Frontend Mentor': /^https?:\/\/(www\.)?frontendmentor\.io\/profile\/.+/i,
    Gitlab: /^https?:\/\/(www\.)?gitlab\.com\/.+/i,
    Youtube: /^https?:\/\/(www\.)?youtube\.com\/@.+\/.+/i,
    Codepen: /^https?:\/\/(www\.)?codepen\.io\/.+/i,
    StackOverflow: /^https?:\/\/(www\.)?stackoverflow\.com\/users\/.+/i,
  }
  return patterns[platform].test(url)
}
