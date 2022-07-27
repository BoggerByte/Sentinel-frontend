<script setup lang="ts">
import { ButtonVariant, InputSize, LinkTarget } from "bootstrap-vue-3/dist/types";
import { RouterLinkProps } from "vue-router";


const {
  loading = false,
  active = false,
  disabled = false,
  href,
  pill = false,
  pressed,
  rel,
  size,
  squared = false,
  tag = 'button',
  target = '_self',
  to = '_self',
  type = 'button',
  variant = 'secondary'
} = defineProps<{
  loading?: boolean;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  pill?: boolean;
  pressed?: boolean;
  rel?: string;
  size?: InputSize;
  squared?: boolean;
  tag?: string;
  target?: LinkTarget;
  to?: RouterLinkProps | string;
  type?: string;
  variant?: ButtonVariant;
}>();
</script>

<template>
  <b-overlay
      :show="loading"
      rounded
      opacity="0.6"
      spinner-small
      :spinner-variant="variant"
      class="d-inline-block"
  >
    <b-button
        :active="active"
        :disabled="loading || disabled"
        :href="href"
        :pill="pill"
        :pressed="pressed"
        :rel="rel"
        :size="size"
        :squared="squared"
        :tag="tag"
        :target="target"
        :to="to"
        :type="type"
        :variant="variant"
        @click="$emit('click', $event)"
    >
      <slot/>
    </b-button>
  </b-overlay>
</template>

<style scoped>

</style>