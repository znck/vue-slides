<script>
export default {
  props: {
    title: String,
    subtitle: String,
    photo: String
  }
}
</script>

<template>
  <BlankSlide :class="$style.body">
    <div :class="$style.content">
      <img :src="photo" :class="$style.photo" />
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
  --photo-horizontal-slide--body--Padding: var(--slide--body--Padding);
  
  --photo-horizontal-slide--content--Margin: 4.375kem 1.510417kem -2.239583kem; /* 84pt 29pt -43pt */

  --photo-horizontal-slide--photo--Height: 28.385417kem; /* 545pt */
  --photo-horizontal-slide--photo--Width: 74.322917kem; /* 1427pt */
  
  --photo-horizontal-slide--title--Margin: 0.520834kem 0 0 0; /* 10pt 0 0 0 */
  --photo-horizontal-slide--title--AlignItems: center;
  --photo-horizontal-slide--title--JustifyContent: flex-end;
  --photo-horizontal-slide--title--Color: var(--slide--title--Color);
  --photo-horizontal-slide--title--FontFamily: var(--slide--title--FontFamily);
  --photo-horizontal-slide--title--FontSize: var(--slide--title--FontSize);
  --photo-horizontal-slide--title--FontWeight: var(--slide--title--FontWeight);
  --photo-horizontal-slide--title--TextAlign: var(--slide--title--TextAlign);
  --photo-horizontal-slide--title--Border: none;
  --photo-horizontal-slide--title--Height: 9.635417kem; /* 185pt */
  --photo-horizontal-slide--title--Background: transparent;
  
  --photo-horizontal-slide--subtitle--Margin: 0;
  --photo-horizontal-slide--subtitle--AlignItems: center;
  --photo-horizontal-slide--subtitle--JustifyContent: flex-start;
  --photo-horizontal-slide--subtitle--Color: var(--slide--subtitle--Color);
  --photo-horizontal-slide--subtitle--FontFamily: var(--slide--subtitle--FontFamily);
  --photo-horizontal-slide--subtitle--FontSize: var(--slide--subtitle--FontSize);
  --photo-horizontal-slide--subtitle--FontWeight: var(--slide--subtitle--FontWeight);
  --photo-horizontal-slide--subtitle--TextAlign: var(--slide--subtitle--TextAlign);
  --photo-horizontal-slide--subtitle--Border: none;
  --photo-horizontal-slide--subtitle--Height: 7.552083kem; /* 145pt */
  --photo-horizontal-slide--subtitle--Background: transparent;
}
</style>

<style module>
.body {
  padding: var(--photo-horizontal-slide--body--Padding);
}

.content {
  margin: var(--photo-horizontal-slide--content--Margin);
}

.photo {
  margin: 0 auto;
  display: block;
  object-fit: cover;
  height: var(--photo-horizontal-slide--photo--Height);
  width: var(--photo-horizontal-slide--photo--Width);
}

.title {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--photo-horizontal-slide--title--Margin);

  /* Position */
  align-items: var(--photo-horizontal-slide--title--AlignItems);
  justify-content: var(--photo-horizontal-slide--title--JustifyContent);

  /* Text */
  color: var(--photo-horizontal-slide--title--Color);
  font-size: var(--photo-horizontal-slide--title--FontSize);
  font-family:  var(--photo-horizontal-slide--title--FontFamily);
  font-weight:  var(--photo-horizontal-slide--title--FontWeight);
  text-align: var(--photo-horizontal-slide--title--TextAlign);

  /* Shape */
  border: var(--photo-horizontal-slide--title--Border);
  height: var(--photo-horizontal-slide--title--Height);

  /* Surface */
  background: var(--photo-horizontal-slide--title--Background);
}

.subtitle {
  display: flex;
  margin: 0;
  overflow: hidden;
  flex-direction: column;

  /* Position */
  align-items: var(--photo-horizontal-slide--subtitle--AlignItems);
  justify-content: var(--photo-horizontal-slide--subtitle--JustifyContent);

  /* Text */
  color: var(--photo-horizontal-slide--subtitle--Color);
  font-size: var(--photo-horizontal-slide--subtitle--FontSize);
  font-family:  var(--photo-horizontal-slide--subtitle--FontFamily);
  font-weight:  var(--photo-horizontal-slide--subtitle--FontWeight);

  /* Shape */
  border: var(--photo-horizontal-slide--subtitle--Border);
  height: var(--photo-horizontal-slide--subtitle--Height);

  /* Surface */
  background: var(--photo-horizontal-slide--subtitle--Background);
}
</style>