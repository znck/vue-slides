import Slide from './Slide.vue'
import AuthorSlide from './AuthorSlide.vue'
import PhotoSlide from './PhotoSlide.vue'
import PhotoTitleSlide from './PhotoTitleSlide.vue'
import TitleSlide from './TitleSlide.vue'

export default function Default(Keynote) {
  Keynote.slides({
    Slide,
    AuthorSlide,
    PhotoSlide,
    PhotoTitleSlide,
    TitleSlide
  })
}
