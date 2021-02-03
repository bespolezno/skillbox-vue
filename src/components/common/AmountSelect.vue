<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="amount--">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" name="count" v-model.number="amount">

    <button type="button" aria-label="Добавить один товар" @click="amount++">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AmountSelect',
  props: ['value'],
  computed: {
    amount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value < 1 ? 1 : value);
      }
    }
  }
}
</script>