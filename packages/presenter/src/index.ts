import { SlideProvider } from "../../core/src/slide-provider";

export interface PresenterProps {
  provider: SlideProvider,
  previousSlideIndex: number,
  currentSlideIndex: number
}
