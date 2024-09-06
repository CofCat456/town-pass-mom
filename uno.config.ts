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
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Noto Sans TC',
      },
    }),
  ],
})
