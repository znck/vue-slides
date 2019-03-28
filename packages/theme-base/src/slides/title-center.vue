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
    </div>
  </BlankSlide>
</template>

<style>
.vue-slides-slide {
  /* Tier 3 */
  --title-center-slide--body--Padding: var(--slide--body--Padding);
  
  --title-center-slide--content--Margin: 14.739583kem 0.520834kem; /* 283pt 10pt */
  
  --title-center-slide--title--Margin: 0;
  --title-center-slide--title--AlignItems: center;
  --title-center-slide--title--JustifyContent: center;
  --title-center-slide--title--Color: var(--slide--title--Color);
  --title-center-slide--title--FontFamily: var(--slide--title--FontFamily);
  --title-center-slide--title--FontSize: var(--slide--title--FontSize);
  --title-center-slide--title--FontWeight: var(--slide--title--FontWeight);
  --title-center-slide--title--TextAlign: var(--slide--title--TextAlign);
  --title-center-slide--title--Border: none;
  --title-center-slide--title--Height: 19.0625kem; /* 366pt */
  --title-center-slide--title--Background: transparent;
}
</style>

<style module>
.body {
  padding: var(--title-center-slide--body--Padding);
}

.content {
  margin: var(--title-center-slide--content--Margin);
}

.title {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--title-center-slide--title--Margin);

  /* Position */
  align-items: var(--title-center-slide--title--AlignItems);
  justify-content: var(--title-center-slide--title--JustifyContent);

  /* Text */
  color: var(--title-center-slide--title--Color);
  font-size: var(--title-center-slide--title--FontSize);
  font-family:  var(--title-center-slide--title--FontFamily);
  font-weight:  var(--title-center-slide--title--FontWeight);
  text-align: var(--title-center-slide--title--TextAlign);

  /* Shape */
  border: var(--title-center-slide--title--Border);
  height: var(--title-center-slide--title--Height);

  /* Surface */
  background: var(--title-center-slide--title--Background);
}
</style>