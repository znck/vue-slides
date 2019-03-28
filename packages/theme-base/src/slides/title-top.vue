<script>
export default {
  props: {
    title: String
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

      <slot />
    </div>
  </BlankSlide>
</template>

<style>
.vue-slides-slide {
  /* Tier 3 */
  --title-top-slide--body--Padding: var(--slide--body--Padding);
  
  --title-top-slide--content--Margin: -2.395833kem 0 0; /* -46pt 0 0 0 */
  --title-top-slide--content--Color: var(--slide--content--Color);
  --title-top-slide--content--FontSize: var(--slide--content--FontSize);
  
  --title-top-slide--title--Margin: 0;
  --title-top-slide--title--AlignItems: center;
  --title-top-slide--title--JustifyContent: center;
  --title-top-slide--title--Color: var(--slide--title--Color);
  --title-top-slide--title--FontFamily: var(--slide--title--FontFamily);
  --title-top-slide--title--FontSize: var(--slide--title--FontSize);
  --title-top-slide--title--FontWeight: var(--slide--title--FontWeight);
  --title-top-slide--title--TextAlign: var(--slide--title--TextAlign);
  --title-top-slide--title--Border: none;
  --title-top-slide--title--Height: 9.375kem; /* 180pt */
  --title-top-slide--title--Background: transparent;
}
</style>

<style module>
.body {
  padding: var(--title-top-slide--body--Padding);
}

.content {
  margin: var(--title-top-slide--content--Margin);
  color: var(--title-top-slide--content--Color);
  font-size: var(--title-top-slide--content--FontSize);
}

.title {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--title-top-slide--title--Margin);

  /* Position */
  align-items: var(--title-top-slide--title--AlignItems);
  justify-content: var(--title-top-slide--title--JustifyContent);

  /* Text */
  color: var(--title-top-slide--title--Color);
  font-size: var(--title-top-slide--title--FontSize);
  font-family:  var(--title-top-slide--title--FontFamily);
  font-weight:  var(--title-top-slide--title--FontWeight);
  text-align: var(--title-top-slide--title--TextAlign);

  /* Shape */
  border: var(--title-top-slide--title--Border);
  height: var(--title-top-slide--title--Height);

  /* Surface */
  background: var(--title-top-slide--title--Background);
}
</style>