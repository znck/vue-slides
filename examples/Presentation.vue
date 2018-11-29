<template>
  <Keynote :plugin-progress="{ $presentation: { title: 'Test Presentation', author: { name: 'Rahul Kadyan'} } }">
    <TitleSubtitleSlide title="Lorem Ipsum Dolor" subtitle="Lorem Ipsum Dolor" />
    <TitleSlide title="Lorem Ipsum Dolor" />
    <TitleBodySlide title="Lorem Ipsum Dolor">
      <p>Lorem Ipsum Dolor</p>
    </TitleBodySlide>
    <TitleBulletsSlide title="Lorem Ipsum Dolor" :bullets="['Lorem', 'Ipsum', 'Dolor']" />
    <TitleBulletsPhotoSlide title="Lorem Ipsum Dolor" :bullets="['Lorem', 'Ipsum', 'Dolor']" photo="./assets/one.jpg" />
    <PhotoHorizontalSlide title="Lorem Ipsum Dolor" subtitle="Lorem Ipsum Dolor" photo="./assets/hor.jpg" />
    <PhotoVerticalSlide title="Lorem Ipsum Dolor" subtitle="Lorem Ipsum Dolor" photo="./assets/hor.jpg" />
    <PhotoVerticalSlide title="Lorem Ipsum Dolor" subtitle="Lorem Ipsum Dolor" photo="./assets/hor.jpg" alternate />
    <PhotoCaptionSlide photo="./assets/hor.jpg" caption="Lorem Ipsum Dolor" />
    <PhotoSlide photo="./assets/hor.jpg" />
    <Photo2UpSlide left="./assets/hor.jpg" right="./assets/one.jpg" />
    <Photo3UpSlide first="./assets/one.jpg" second="./assets/two.jpg" third="./assets/three.jpg" />
    <QuoteSlide quote="Lorem Ipsum Dolor"  author="Jane Doe" />
    <Slide>
      <p>Lorem Ipsum Dolor</p>
    </Slide>
  </Keynote>
</template>