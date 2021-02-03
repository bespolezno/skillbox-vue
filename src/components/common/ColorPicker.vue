<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" v-model="currentColor" :value="color.id">
        <span class="colors__value" :style="{backgroundColor: color.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ColorPicker",
  model: {
    prop: "colorId",
    event: "change"
  },
  props: ["colors", "colorId"],
  computed: {
    currentColor: {
      get() {
        return this.colorId;
      },
      set(value) {
        this.$emit('change', value);
      }
    }
  },
  methods: {
  }
}
</script>