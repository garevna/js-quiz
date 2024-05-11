<template>
  <v-autocomplete
    v-if="items"
    label="Select category"
    :items="items"
    v-model="selected"
  />
</template>

<script>

import { categories } from '@/categories'

export default {
  name: 'SelectCategory',

  props: {
    selectedCategory: {
      type: String
    }
  },

  data: () => ({
    items: categories()
  }),

  computed: {
    selected: {
      get () {
        return this.selectedCategory
      },
      set (val) {
        this.$emit('update:selectedCategory', val)
      }
    }
  }
}
</script>
