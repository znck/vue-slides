<template>
  <Keynote>
    <AuthorSlide 
      transition="push"
      photo="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" name="Author Name">
      Developer, Foo Company
    </AuthorSlide>

    <TitleSlide 
      transition="dissolve"
      name="slide 2" title="A Bold Title">
      A little description about it.
    </TitleSlide>

    <PhotoTitleSlide transition="push" name="slide 3" photo="https://unsplash.it/1200/800?random=1" title="An unsplash photo">
      There is a random unsplash photo at top.
    </PhotoTitleSlide>

    <Slide transition="dissolve" name="slide 4">
      <Fit>
        <Heading>And some code.</Heading>
        <CodePreview language="javascript">{{`
          export default {
            name: 'Example'
          }
        `}}</CodePreview>
      </Fit>
    </Slide>
    
    <PhotoTitleSlide name="slide 5" photo="https://unsplash.it/1200/800?random=2" title="A vertical photo" vertical>
      There is a random unsplash photo on right.
    </PhotoTitleSlide>

    <PhotoTitleSlide name="slide 6" photo="https://unsplash.it/1200/800?random=3" title="A vertical photo" vertical left>
      There is a random unsplash photo on left.
    </PhotoTitleSlide>

    <PhotoSlide photo="https://unsplash.it/1200/800?random=4"/>

    <Slide>
      <Fit position="left">
        <Title>On click build ups</Title>
        <Build name="first">
          <transition name="slide">
            <Type value="Hello World! The quick brown fox jumped over the lazy dog."/>
          </transition>
        </Build>

        <Build name="second" after="first" :delay="1000">
          <Heading>
            <transition name="slide">
              <Type value="This should auto start in 500 miliseconds."/>
            </transition>
          </Heading>
        </Build>

        <Build name="third" with="second">
          <Heading>
            <transition name="slide">
              <Type value="This should auto start with above."/>
            </transition>
          </Heading>
        </Build>
      </Fit>
    </Slide>

    <TitleSlide title="Next Clothesline" transition="clothesline" />
    <TitleSlide title="Next Dissolve" transition="dissolve" />
    <TitleSlide title="Next Drop" transition="drop" />
    <TitleSlide title="Next Fall" transition="fall" />
    <TitleSlide title="Next MoveIn" transition="move-in" />
    <TitleSlide title="Next Pivot" transition="pivot" />
    <TitleSlide title="Next Push" transition="push" />
    <TitleSlide title="Next Reveal" transition="reveal" />
    <TitleSlide title="Next RevolvingDoor" transition="revolving-door" />
    <TitleSlide title="Next Scale" transition="scale" />
    <TitleSlide title="Next Swap" transition="swap" />
    <TitleSlide title="Next Switch" transition="switch" />
    <TitleSlide title="Next Twirl" transition="twirl" />
    <TitleSlide title="Fin.">
      <a href="https://keynote.sh">Go to keynote.sh</a>
    </TitleSlide>
    
  </Keynote>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: all 2s ease;
}
.slide-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
