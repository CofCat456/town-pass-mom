import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'color-base': 'text-[#5B6B86]',
      'color-primary': 'text-[#2D3142]',
      'color-secondary': 'text-[#9C9EB9]',
      'color-annotation': 'text-[#6B7280]',
      'bg-base': 'bg-[#FFFDFB]',
      'shadow-base': 'shadow-[0px_10px_30px_0px_rgba(112,136,210,.2)]',
      'rounded-base': 'rounded-[1.25rem]',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Noto Sans TC',
        rubik: 'Rubik',
      },
    }),
  ],
})
