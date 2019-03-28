<script>
export default {
  props: {
    photo: String,
    caption: String,
  }
}
</script>

<template>
  <BlankSlide :class="$style.body">
    <div :class="$style.content">
      <img :src="photo" :class="$style.photo" />
      <p :class="$style.caption">
        <FitText :max=1>
          <slot name="caption">
            {{ caption }}
          </slot>
        </FitText>
      </p>
    </div>
  </BlankSlide>
</template>

<style>
.vue-slides-slide {
  /* Tier 3 */
  --photo-caption-slide--body--Padding: var(--slide--body--Padding);
  
  --photo-caption-slide--content--Margin: 4.375kem 0.9375kem; /* 84pt 18pt */

  --photo-caption-slide--photo--Height: 32.760417kem; /* 629pt */
  --photo-caption-slide--photo--Width: 84.583333kem; /* 1624pt */
  
  --photo-caption-slide--caption--Margin: 0.520834kem 0 0 0; /* 10pt 0 0 0 */
  --photo-caption-slide--caption--AlignItems: flex-start;
  --photo-caption-slide--caption--JustifyContent: flex-end;
  --photo-caption-slide--caption--Color: var(--slide--title--Color);
  --photo-caption-slide--caption--FontFamily: var(--slide--title--FontFamily);
  --photo-caption-slide--caption--FontSize: 1.666667kem; /* 32pt */
  --photo-caption-slide--caption--FontWeight: var(--slide--title--FontWeight);
  --photo-caption-slide--caption--TextAlign: left;
  --photo-caption-slide--caption--Border: none;
  --photo-caption-slide--caption--Height: initial;
  --photo-caption-slide--caption--Background: transparent;
}
</style>

<style module>
.body {
  padding: var(--photo-caption-slide--body--Padding);
}

.content {
  margin: var(--photo-caption-slide--content--Margin);
}

.photo {
  margin: 0 auto;
  display: block;
  object-fit: cover;
  height: var(--photo-caption-slide--photo--Height);
  width: var(--photo-caption-slide--photo--Width);
}

.caption {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--photo-caption-slide--caption--Margin);

  /* Position */
  align-items: var(--photo-caption-slide--caption--AlignItems);
  justify-content: var(--photo-caption-slide--caption--JustifyContent);

  /* Text */
  color: var(--photo-caption-slide--caption--Color);
  font-size: var(--photo-caption-slide--caption--FontSize);
  font-style: italic;
  font-family:  var(--photo-caption-slide--caption--FontFamily);
  font-weight:  var(--photo-caption-slide--caption--FontWeight);
  text-align: var(--photo-caption-slide--caption--TextAlign);

  /* Shape */
  border: var(--photo-caption-slide--caption--Border);
  height: var(--photo-caption-slide--caption--Height);

  /* Surface */
  background: var(--photo-caption-slide--caption--Background);
}
</style>