<template>
  <div class="slide">
    <slot />
  </div>
</template>

<style>
.slide {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  background-color: white;

  backface-visibility: hidden;
}
</style>
