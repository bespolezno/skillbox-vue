<template>
  <ul class="colors" :class="{'colors--black': black}">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" v-model="currentColor" :value="color.id">
        <span class="colors__value" :style="{backgroundColor: color.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
import colors from "@/data/colors";

export default {
  name: "ColorPicker",
  model: {
    prop: "colorId",
    event: "change"
  },
  props: ["colorIds", "colorId", "black"],
  computed: {
    colors() {
      return this.colorIds.map(this.getColor);
    },
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
    getColor(id) {
      return colors.find(el => el.id === id);
    }
  }
}
</script>