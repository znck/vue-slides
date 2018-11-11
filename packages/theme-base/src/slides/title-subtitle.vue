<script>
export default {
  props: {
    title: String,
    subtitle: String
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
      <h3 :class="$style.subtitle">
        <FitText :max=1>
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </FitText>
      </h3>
    </div>
  </BlankSlide>
</template>

<style>
.keynote-slide {
  /* Tier 3 */
  --title-subtitle-slide--body--Padding: var(--slide--body--Padding);
  
  --title-subtitle-slide--content--Margin: 5.572917kem 0.520834kem 16.875kem; /* 107pt 10pt 324pt */
  
  --title-subtitle-slide--title--Margin: 0 0 0.520834kem; /* 0 0 10pt */
  --title-subtitle-slide--title--AlignItems: center;
  --title-subtitle-slide--title--JustifyContent: flex-end;
  --title-subtitle-slide--title--Color: var(--slide--title--Color);
  --title-subtitle-slide--title--FontFamily: var(--slide--title--FontFamily);
  --title-subtitle-slide--title--FontSize: var(--slide--title--FontSize);
  --title-subtitle-slide--title--FontWeight: var(--slide--title--FontWeight);
  --title-subtitle-slide--title--TextAlign: var(--slide--title--TextAlign);
  --title-subtitle-slide--title--Border: none;
  --title-subtitle-slide--title--Height: 19.0625kem; /* 366pt */
  --title-subtitle-slide--title--Background: transparent;
  
  --title-subtitle-slide--subtitle--Margin: 0;
  --title-subtitle-slide--subtitle--AlignItems: center;
  --title-subtitle-slide--subtitle--JustifyContent: flex-start;
  --title-subtitle-slide--subtitle--Color: var(--slide--subtitle--Color);
  --title-subtitle-slide--subtitle--FontFamily: var(--slide--subtitle--FontFamily);
  --title-subtitle-slide--subtitle--FontSize: var(--slide--subtitle--FontSize);
  --title-subtitle-slide--subtitle--FontWeight: var(--slide--subtitle--FontWeight);
  --title-subtitle-slide--subtitle--TextAlign: var(--slide--subtitle--TextAlign);
  --title-subtitle-slide--subtitle--Border: none;
  --title-subtitle-slide--subtitle--Height: 6.510417kem; /* 125pt */
  --title-subtitle-slide--subtitle--Background: transparent;
}
</style>

<style module>
.body {
  padding: var(--title-subtitle-slide--body--Padding);
}

.content {
  margin: var(--title-subtitle-slide--content--Margin);
}

.title {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--title-subtitle-slide--title--Margin);

  /* Position */
  align-items: var(--title-subtitle-slide--title--AlignItems);
  justify-content: var(--title-subtitle-slide--title--JustifyContent);

  /* Text */
  color: var(--title-subtitle-slide--title--Color);
  font-size: var(--title-subtitle-slide--title--FontSize);
  font-family:  var(--title-subtitle-slide--title--FontFamily);
  font-weight:  var(--title-subtitle-slide--title--FontWeight);
  text-align: var(--title-subtitle-slide--title--TextAlign);

  /* Shape */
  border: var(--title-subtitle-slide--title--Border);
  height: var(--title-subtitle-slide--title--Height);

  /* Surface */
  background: var(--title-subtitle-slide--title--Background);
}

.subtitle {
  display: flex;
  margin: 0;
  overflow: hidden;
  flex-direction: column;

  /* Position */
  align-items: var(--title-subtitle-slide--subtitle--AlignItems);
  justify-content: var(--title-subtitle-slide--subtitle--JustifyContent);

  /* Text */
  color: var(--title-subtitle-slide--subtitle--Color);
  font-size: var(--title-subtitle-slide--subtitle--FontSize);
  font-family:  var(--title-subtitle-slide--subtitle--FontFamily);
  font-weight:  var(--title-subtitle-slide--subtitle--FontWeight);

  /* Shape */
  border: var(--title-subtitle-slide--subtitle--Border);
  height: var(--title-subtitle-slide--subtitle--Height);

  /* Surface */
  background: var(--title-subtitle-slide--subtitle--Background);
}
</style>