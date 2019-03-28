<script>
export default {
  props: {
    author: String,
    quote: String
  }
}
</script>

<template>
  <BlankSlide :class="$style.body">
    <div :class="$style.content">
      <h1 :class="$style.quote">
        <FitText :max=1>
          <q>
            <slot name="quote">
              {{ quote }}
            </slot>
          </q>
        </FitText>
      </h1>

      <div :class="$style.author">
        <FitText :max=1>
          <span>
            <slot name="author">
              {{ author }}
            </slot>
          </span>
        </FitText>
      </div>
    </div>
  </BlankSlide>
</template>

<style>
.vue-slides-slide {
  /* Tier 3 */
  --quote-slide--body--Padding: var(--slide--body--Padding);
  
  --quote-slide--content--Margin: 14.739583kem 0.520834kem; /* 283pt 10pt */
  
  --quote-slide--title--Margin: 0;
  --quote-slide--title--AlignItems: center;
  --quote-slide--title--JustifyContent: center;
  --quote-slide--title--Color: var(--slide--title--Color);
  --quote-slide--title--FontFamily: var(--slide--title--FontFamily);
  --quote-slide--title--FontSize: 3.020833kem; /* 58pt */
  --quote-slide--title--FontWeight: var(--slide--title--FontWeight);
  --quote-slide--title--TextAlign: var(--slide--title--TextAlign);
  --quote-slide--title--Border: none;
  --quote-slide--title--Height: 19.0625kem; /* 366pt */
  --quote-slide--title--Background: transparent;

  --quote-slide--author--Margin: 0;
  --quote-slide--author--AlignItems: center;
  --quote-slide--author--JustifyContent: center;
  --quote-slide--author--Color: var(--slide--title--Color);
  --quote-slide--author--FontFamily: cursive;
  --quote-slide--author--FontSize: 2.291666kem; /* 44pt */
  --quote-slide--author--FontWeight: var(--slide--title--FontWeight);
  --quote-slide--author--TextAlign: var(--slide--title--TextAlign);
  --quote-slide--author--Border: none;
  --quote-slide--author--Height: auto; /* 366pt */
  --quote-slide--author--Background: transparent;
}
</style>

<style module>
.body {
  padding: var(--quote-slide--body--Padding);
}

.content {
  position: relative;
  margin: var(--quote-slide--content--Margin);
}

.quote {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: var(--quote-slide--title--Margin);

  /* Position */
  align-items: var(--quote-slide--title--AlignItems);
  justify-content: var(--quote-slide--title--JustifyContent);

  /* Text */
  color: var(--quote-slide--title--Color);
  font-size: var(--quote-slide--title--FontSize);
  font-family:  var(--quote-slide--title--FontFamily);
  font-weight:  var(--quote-slide--title--FontWeight);
  text-align: var(--quote-slide--title--TextAlign);

  /* Shape */
  border: var(--quote-slide--title--Border);
  height: var(--quote-slide--title--Height);

  /* Surface */
  background: var(--quote-slide--title--Background);
}

.quote q {
  font-style: italic;
}

.quote q:before {
  content: "“"
}
.quote q:after {
  content: "”"
}

.author {
  display: flex;
  flex-direction: column;
  position: absolute; top: 25kem; left: 0; right: 0;
  margin: var(--quote-slide--author--Margin);

  /* Position */
  align-items: var(--quote-slide--author--AlignItems);
  justify-content: var(--quote-slide--author--JustifyContent);

  /* Text */
  color: var(--quote-slide--author--Color);
  font-size: var(--quote-slide--author--FontSize);
  font-family:  var(--quote-slide--author--FontFamily);
  font-weight:  var(--quote-slide--author--FontWeight);
  text-align: var(--quote-slide--author--TextAlign);

  /* Shape */
  border: var(--quote-slide--author--Border);
  height: var(--quote-slide--author--Height);
  width: auto;

  /* Surface */
  background: var(--quote-slide--author--Background);
}

.author span:before {
  content: "—"
}
</style>