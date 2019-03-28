<script>
export default {
  props: {
    title: String,
    subtitle: String,
    photo: String,
    alternate: Boolean
  }
}
</script>

<template>
  <BlankSlide :class="$style.body">
    <div :class="$style.content">
      <div :class="[$style.container, alternate && $style.alternate ]">
        <div :class="$style.wrapper">
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
        <img :src="photo" :class="$style.photo" />
      </div>
    </div>
  </BlankSlide>
</template>

<style>
.vue-slides-slide {
  /* Tier 3 */
  --photo-vertical-slide--body--Padding: var(--slide--body--Padding);
  
  --photo-vertical-slide--content--Margin: 0;

  --photo-vertical-slide--photo--Height: 40.520833kem; /* 778pt */
  --photo-vertical-slide--photo--Width: 42.8125kem; /* 822pt */

  --photo-vertical-slide--container--Padding: 2.083333kem 0.15625kem; /* 40pt 3pt */
  
  --photo-vertical-slide--wrapper--Width: 40.520833kem; /* 778pt */
  --photo-vertical-slide--wrapper--Margin: 0 4.270833kem 0 0; /* 0 82pt 0 0 */
  --photo-vertical-slide--wrapper-alternate--Margin: 0 0 0 4.270833kem; /* 0 0 0 82pt */
  
  --photo-vertical-slide--title--Margin: 0.520834kem 0 0 0; /* 10pt 0 0 0 */
  --photo-vertical-slide--title--AlignItems: center;
  --photo-vertical-slide--title--JustifyContent: flex-end;
  --photo-vertical-slide--title--Color: var(--slide--title--Color);
  --photo-vertical-slide--title--FontFamily: var(--slide--title--FontFamily);
  --photo-vertical-slide--title--FontSize: 4.375kem; /* 84kem */
  --photo-vertical-slide--title--FontWeight: var(--slide--title--FontWeight);
  --photo-vertical-slide--title--TextAlign: var(--slide--title--TextAlign);
  --photo-vertical-slide--title--Border: none;
  --photo-vertical-slide--title--Height: 9.635417kem; /* 185pt */
  --photo-vertical-slide--title--Background: transparent;
  
  --photo-vertical-slide--subtitle--Margin: 0;
  --photo-vertical-slide--subtitle--AlignItems: center;
  --photo-vertical-slide--subtitle--JustifyContent: flex-start;
  --photo-vertical-slide--subtitle--Color: var(--slide--subtitle--Color);
  --photo-vertical-slide--subtitle--FontFamily: var(--slide--subtitle--FontFamily);
  --photo-vertical-slide--subtitle--FontSize: var(--slide--subtitle--FontSize);
  --photo-vertical-slide--subtitle--FontWeight: var(--slide--subtitle--FontWeight);
  --photo-vertical-slide--subtitle--TextAlign: var(--slide--subtitle--TextAlign);
  --photo-vertical-slide--subtitle--Border: none;
  --photo-vertical-slide--subtitle--Height: 7.552083kem; /* 145pt */
  --photo-vertical-slide--subtitle--Background: transparent;
}
</style>

<style module>
.body {
  padding: var(--photo-vertical-slide--body--Padding);
}

.content {
  margin: var(--photo-vertical-slide--content--Margin);
}

.container {
  display: flex;
  flex-direction: row;
  padding: var(--photo-vertical-slide--container--Padding);
}

.photo {
  margin: 0 auto;
  display: block;
  object-fit: cover;
  height: var(--photo-vertical-slide--photo--Height);
  width: var(--photo-vertical-slide--photo--Width);
}

.wrapper {
  display: flex;
  flex-direction: column;
  margin: var(--photo-vertical-slide--wrapper--Margin);
  width: var(--photo-vertical-slide--wrapper--Width);
}

.alternate .wrapper {
  order: 2;
  margin: var(--photo-vertical-slide--wrapper-alternate--Margin);
}

.title {
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--photo-vertical-slide--title--Margin);

  /* Position */
  align-items: var(--photo-vertical-slide--title--AlignItems);
  justify-content: var(--photo-vertical-slide--title--JustifyContent);

  /* Text */
  color: var(--photo-vertical-slide--title--Color);
  font-size: var(--photo-vertical-slide--title--FontSize);
  font-family:  var(--photo-vertical-slide--title--FontFamily);
  font-weight:  var(--photo-vertical-slide--title--FontWeight);
  text-align: var(--photo-vertical-slide--title--TextAlign);

  /* Shape */
  border: var(--photo-vertical-slide--title--Border);
  height: var(--photo-vertical-slide--title--Height);

  /* Surface */
  background: var(--photo-vertical-slide--title--Background);
}

.subtitle {
  flex: 1;
  margin: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;

  /* Position */
  align-items: var(--photo-vertical-slide--subtitle--AlignItems);
  justify-content: var(--photo-vertical-slide--subtitle--JustifyContent);

  /* Text */
  color: var(--photo-vertical-slide--subtitle--Color);
  font-size: var(--photo-vertical-slide--subtitle--FontSize);
  font-family:  var(--photo-vertical-slide--subtitle--FontFamily);
  font-weight:  var(--photo-vertical-slide--subtitle--FontWeight);

  /* Shape */
  border: var(--photo-vertical-slide--subtitle--Border);
  height: var(--photo-vertical-slide--subtitle--Height);

  /* Surface */
  background: var(--photo-vertical-slide--subtitle--Background);
}
</style>