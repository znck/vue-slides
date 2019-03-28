<script>
export default {
  props: {
    title: String,
    bullets: Array
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
      </div>
    </div>
  </BlankSlide>
</template>

<style>
.vue-slides-slide {
  /* Tier 3 */
  --title-bullets-slide--body--Padding: var(--slide--body--Padding);
  
  --title-bullets-slide--content--Margin: -2.395833kem 0 0; /* -46pt 0 0 0 */
  --title-bullets-slide--content--Color: var(--slide--content--Color);
  --title-bullets-slide--content--FontSize: var(--slide--content--FontSize);
  
  --title-bullets-slide--title--Margin: 0;
  --title-bullets-slide--title--AlignItems: center;
  --title-bullets-slide--title--JustifyContent: center;
  --title-bullets-slide--title--Color: var(--slide--title--Color);
  --title-bullets-slide--title--FontFamily: var(--slide--title--FontFamily);
  --title-bullets-slide--title--FontSize: var(--slide--title--FontSize);
  --title-bullets-slide--title--FontWeight: var(--slide--title--FontWeight);
  --title-bullets-slide--title--TextAlign: var(--slide--title--TextAlign);
  --title-bullets-slide--title--Border: none;
  --title-bullets-slide--title--Height: 9.375kem; /* 180pt */
  --title-bullets-slide--title--Background: transparent;
  
  --title-bullets-slide--container--Padding: 2.083333kem 0.15625kem 1.458333kem; /* 40pt 3pt 28pt 3pt */
  
  --title-bullets-slide--bullets--Margin: 0;
}
</style>

<style module>
.body {
  padding: var(--title-bullets-slide--body--Padding);
}

.content {
  margin: var(--title-bullets-slide--content--Margin);
  color: var(--title-bullets-slide--content--Color);
  font-size: var(--title-bullets-slide--content--FontSize);
}

.title {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--title-bullets-slide--title--Margin);

  /* Position */
  align-items: var(--title-bullets-slide--title--AlignItems);
  justify-content: var(--title-bullets-slide--title--JustifyContent);

  /* Text */
  color: var(--title-bullets-slide--title--Color);
  font-size: var(--title-bullets-slide--title--FontSize);
  font-family:  var(--title-bullets-slide--title--FontFamily);
  font-weight:  var(--title-bullets-slide--title--FontWeight);
  text-align: var(--title-bullets-slide--title--TextAlign);

  /* Shape */
  border: var(--title-bullets-slide--title--Border);
  height: var(--title-bullets-slide--title--Height);

  /* Surface */
  background: var(--title-bullets-slide--title--Background);
}


.container {
  display: flex;
  flex-direction: row;
  padding: var(--title-bullets-slide--container--Padding);
}

.bullets {
  flex: 1;
  margin: var(--title-bullets-slide--bullets--Margin);
}
</style>