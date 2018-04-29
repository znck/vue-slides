<template>
  <span>{{ text }}</span>
</template>

<script>
export default {
  name: 'Type',
  props: {
    value: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default() {
        if (typeof this.duration === 'number') return this.duration

        const chars = this.value.length

        return Math.max(1, Math.min(3, chars * 0.04))
      }
    }
  },
  data: () => ({ len: 0 }),
  computed: {
    delay() {
      if (this.value.length === 0) return this.duration * 1000

      return this.duration * 1000 / this.value.length
    },
    text() {
      return this.value.substr(0, this.len)
    }
  },
  methods: {
    typeChar() {
      this.len += 1
      if (this.len < this.value.length) {
        setTimeout(this.typeChar, this.delay)
      }
    }
  },
  mounted() {
    this.$nextTick(this.typeChar)
  },
  watch: {
    value() {
      this.len = 0
      this.$nextTick(this.typeChar)
    }
  }
}
</script>
