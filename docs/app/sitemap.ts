import type { MetadataRoute } from 'next'

const BASE = 'https://patiya-ui.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const components = [
    'button','badge','spinner','input','textarea','switch','checkbox',
    'radio','select','slider','alert','progress','skeleton','modal',
    'drawer','tooltip','popover','dropdown-menu','toast','spotlightCard',
    'tiltCard','card','avatar','chip','table','timeline','stepper',
    'tabs','accordion','collapse','breadcrumb','pagination','navbar',
    'command','chart','rich-text-editor','scratchToReveal','magnetic',
    'dock','flipCard','directionAwareHover','shimmerButton','compareSlider',
    'carousel','videoModal','imageZoom','gradientText','typingText',
    'flipText','blurText','meteorShower','auroraBackground','borderBeam',
    'spotlight','sparkles'
  ]

  const componentUrls = components.map((slug) => ({
    url: `${BASE}/docs/components/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/docs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...componentUrls,
  ]
}
