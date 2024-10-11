export const PROTECTED_ROUTES = ['/dashboard']
export const PUBLIC_ROUTES = ['/', '/login', '/signup']

export const socialPlatforms = [
  {
    name: 'Github',
    icon: 'mdi:github',
    url: 'https://github.com/',
  },
  {
    name: 'Dev.to',
    icon: 'mdi:dev-to',
    url: 'https://dev.to/',
  },
  {
    name: 'Frontend Mentor',
    icon: 'mdi:frontend-mentor',
    url: 'https://www.frontendmentor.io/profile/',
  },
  {
    name: 'Gitlab',
    icon: 'mdi:gitlab',
    url: 'https://gitlab.com/',
  },
  {
    name: 'Twitter',
    icon: 'mdi:twitter',
    url: 'https://twitter.com/',
  },
  {
    name: 'LinkedIn',
    icon: 'mdi:linkedin',
    url: 'https://www.linkedin.com/in/',
  },
  {
    name: 'YouTube',
    icon: 'mdi:youtube',
    url: 'https://www.youtube.com/@',
  },
  {
    name: 'Facebook',
    icon: 'mdi:facebook',
    url: 'https://www.facebook.com/',
  },
  {
    name: 'Codepen',
    icon: 'mdi:codepen',
    url: 'https://codepen.io/',
  },
  {
    name: 'StackOverflow',
    icon: 'mdi:stackoverflow',
    url: 'https://stackoverflow.com/users/',
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
