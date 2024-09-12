import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'
import { collections } from './unocss.config.collections'

export default defineConfig({
  shortcuts: [
    {
      'app-container': 'px-12px sm:px-1.5rem max-w-1400px m-auto w-full',
      'custom-link': 'text-app-text-grey hover:underline underline-offset-4px text-18px font-400 leading-32px cursor-pointer',
    },
    {
      'custom-link-active': 'text-app-white! underline',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      customizations: {
        transform(svg, collection) {
          if (collection === 'web') {
            svg = svg.replace(/stroke="#[a-zA-Z0-9]+"/, 'stroke="currentColor"')
            svg = svg.replace(/fill="#[a-zA-Z0-9]+"/, 'fill="currentColor"')
          }
          return svg
        },
      },
      collections,
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        archivo: 'Archivo',
      },
    }),
  ],
  theme: {
    colors: {
      app: {
        white: '#fff',
        black: '#000',
        green: '#B5E26B',
        red: '#FF5252',
        bg: {
          grey: '#ffffff33',
          dark_grey: '#161616',
          rating: {
            default: '#494949',
            red: '#FF4218',
            orange: '#FF9900',
            yellow: '#FFE600',
            green: '#42FF00',
            hover: '#202020',
          },
          team: {
            grey: '#404040',
          },
          funding: {
            card: '#101010',
          },
          audits: {
            card: '#191919',
          },
        },
        text: {
          grey: '#909090',
          rating: {
            negative: '#FFB800',
          },
        },
      },
    },
  },
})
