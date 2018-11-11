<script>
export default {
  props: {
    title: String,
    bullets: Array,
    photo: String
  }
}
</script>

<template>
  <BlankSlide :class="$style.body">
    <div :class="$style.content">
      <h1 :class="$style.title">
        <FitText :max=1>
          <slot name="title">
            {{ title }}
          </slot>
        </FitText>
      </h1>

      <div :class="$style.container">
        <ul :class="$style.bullets">
          <li v-for="(bullet, index) in bullets" :key="index">
            <slot v-bind="bullet">{{ bullet }}</slot>
          </li>
        </ul>
        <img :src="photo" :class="$style.photo" />
      </div>
    </div>
  </BlankSlide>
</template>

<style>
.keynote-slide {
  /* Tier 3 */
  --title-bullets-photo-slide--body--Padding: var(--slide--body--Padding);
  
  --title-bullets-photo-slide--content--Margin: -2.395833kem 0 0; /* -46pt 0 0 0 */
  --title-bullets-photo-slide--content--Color: var(--slide--content--Color);
  --title-bullets-photo-slide--content--FontSize: var(--slide--content--FontSize);
  
  --title-bullets-photo-slide--title--Margin: 0;
  --title-bullets-photo-slide--title--AlignItems: center;
  --title-bullets-photo-slide--title--JustifyContent: center;
  --title-bullets-photo-slide--title--Color: var(--slide--title--Color);
  --title-bullets-photo-slide--title--FontFamily: var(--slide--title--FontFamily);
  --title-bullets-photo-slide--title--FontSize: var(--slide--title--FontSize);
  --title-bullets-photo-slide--title--FontWeight: var(--slide--title--FontWeight);
  --title-bullets-photo-slide--title--TextAlign: var(--slide--title--TextAlign);
  --title-bullets-photo-slide--title--Border: none;
  --title-bullets-photo-slide--title--Height: 9.375kem; /* 180pt */
  --title-bullets-photo-slide--title--Background: transparent;
  
  --title-bullets-photo-slide--container--Padding: 2.083333kem 0.15625kem 1.458333kem; /* 40pt 3pt 28pt 3pt */
  
  --title-bullets-photo-slide--bullets--Margin: 0 5.15625kem 0 0; /* 0 99pt 0 0 */
  
  --title-bullets-photo-slide--photo--Height: 38.125kem; /* 732pt */
  --title-bullets-photo-slide--photo--Width: 39.0625kem; /* 750pt */
}
</style>

<style module>
.body {
  padding: var(--title-bullets-photo-slide--body--Padding);
}

.content {
  margin: var(--title-bullets-photo-slide--content--Margin);
  color: var(--title-bullets-photo-slide--content--Color);
  font-size: var(--title-bullets-photo-slide--content--FontSize);
}

.title {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--title-bullets-photo-slide--title--Margin);

  /* Position */
  align-items: var(--title-bullets-photo-slide--title--AlignItems);
  justify-content: var(--title-bullets-photo-slide--title--JustifyContent);

  /* Text */
  color: var(--title-bullets-photo-slide--title--Color);
  font-size: var(--title-bullets-photo-slide--title--FontSize);
  font-family:  var(--title-bullets-photo-slide--title--FontFamily);
  font-weight:  var(--title-bullets-photo-slide--title--FontWeight);
  text-align: var(--title-bullets-photo-slide--title--TextAlign);

  /* Shape */
  border: var(--title-bullets-photo-slide--title--Border);
  height: var(--title-bullets-photo-slide--title--Height);

  /* Surface */
  background: var(--title-bullets-photo-slide--title--Background);
}


.container {
  display: flex;
  flex-direction: row;
  padding: var(--title-bullets-photo-slide--container--Padding);
}

.bullets {
  flex: 1;
  margin: var(--title-bullets-photo-slide--bullets--Margin);
}

.photo {
  object-fit: cover;
  height: var(--title-bullets-photo-slide--photo--Height);
  width: var(--title-bullets-photo-slide--photo--Width);
}
</style>