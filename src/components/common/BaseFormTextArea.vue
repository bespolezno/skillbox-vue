<template>
  <BaseFormField :error="error" :title="title">
    <textarea class="form__input form__input--area" v-model="dataValue" :placeholder="placeholder"></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";

export default {
  mixins: [formFieldMixin]
}
</script>