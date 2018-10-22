export interface Slide {
  id: string;
  index: number;
}

export interface SlideProvider {
  getVNodeByIndex(index: number): Slide
  getVNodeById(id: string): Slide
}
