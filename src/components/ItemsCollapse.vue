<script setup lang="ts">
import { ref } from "vue";


const { items, loading, toggled, itemKey, itemClass } = defineProps<{
  items: object[];
  loading: boolean;
  toggled?: boolean;
  itemClass: object | string
  itemKey?: string
}>();

const isVisible = ref<boolean>(!!toggled);
</script>

<template>
  <div class="d-flex flex-row align-items-center">
    <div class="d-flex flex-row align-items-center">
      <slot name="header"/>
      <h4 class="text-secondary mx-1">({{ items.length }})</h4>
    </div>
    <b-button variant="outline-primary" class="d-block ms-auto"
              @click="isVisible = !isVisible">
      <i :class="['bi',  { 'bi-chevron-up': isVisible, 'bi-chevron-down': !isVisible }]"/>
    </b-button>
  </div>
  <b-collapse :visible="isVisible">
    <div v-if="loading" class="d-flex">
      <b-spinner class="mx-auto"/>
    </div>
    <div v-else class="row">
      <div v-if="items.length === 0" class="text-secondary fst-italic">
        Nothing to view here...
      </div>
      <div v-for="(item, idx) in items" :class="itemClass" :key="itemKey ? item[itemKey] : idx">
        <slot name="item" v-bind="item"/>
      </div>
    </div>
  </b-collapse>
</template>

<style scoped>

</style>