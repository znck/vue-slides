<template>
  <Keynote :plugin-progress="{ position: { left: '2kem', bottom: '2kem' }, props: { title: 'Test Presentation', author: { name: 'Rahul Kadyan'} } }">
    <div class="slide">
      <input />
    </div>
    <div class="slide">2</div>
    <div class="slide">3</div>
    <div class="slide">4</div>
    <div class="slide">5</div>
  </Keynote>
</template>

<script>
export default {
  methods: {
    next: () => console.log('next'), // eslint-disable-line
    previous: () => console.log('previous') // eslint-disable-line
  }
}
</script>

<style>
.slide {
  height: 100%;
  font-size: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}
</style>
