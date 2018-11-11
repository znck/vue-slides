import './base.css'

export default {
  slides: {
    Slide: () => import('./slides/blank.vue'),
    BlankSlide: () => import('./slides/blank.vue'),
    TitleSlide: () => import('./slides/title-center.vue'),
    TitleBodySlide: () => import('./slides/title-top.vue'),
    TitleSubtitleSlide: () => import('./slides/title-subtitle.vue'),
    TitleBulletsSlide: () => import('./slides/title-bullets.vue'),
    TitleBulletsPhotoSlide: () => import('./slides/title-bullets-photo.vue'),
    PhotoCaptionSlide: () => import('./slides/photo-caption.vue'),
    PhotoSlide: () => import('./slides/photo.vue'),
    Photo2UpSlide: () => import('./slides/photo-2up.vue'),
    Photo3UpSlide: () => import('./slides/photo-3up.vue'),
    PhotoHorizontalSlide: () => import('./slides/photo-horizontal.vue'),
    PhotoVerticalSlide: () => import('./slides/photo-vertical.vue'),
    QuoteSlide: () => import('./slides/quote.vue')
  }
}
