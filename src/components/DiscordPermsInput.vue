<script setup lang="ts">
import { DiscordPermissions, packPermissions, unpackPermissions } from "../modules/discord.module";
import { onMounted, ref, watch } from "vue";


const props = defineProps<{
  modelValue: number,
  disabled?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>();

const options = ref<{ name: string, value: DiscordPermissions }[]>([
  {
    name: 'Administrator',
    value: DiscordPermissions.ADMINISTRATOR
  },
  {
    name: 'Manage guild',
    value: DiscordPermissions.MANAGE_GUILD
  },
  {
    name: 'Kick members',
    value: DiscordPermissions.KICK_MEMBERS
  },
  {
    name: 'Ban members',
    value: DiscordPermissions.BAN_MEMBERS
  },
]);
const selectedPerms = ref<DiscordPermissions[]>([]);

onMounted(() => {
  selectedPerms.value = unpackPermissions(props.modelValue);
});

watch(props, () => {
  selectedPerms.value = unpackPermissions(props.modelValue);
});

watch(selectedPerms, () => {
  emit('update:modelValue', packPermissions(selectedPerms.value));
});
</script>

<template>
  <b-input-group>
    <b-form-input v-model="props.modelValue" disabled/>
    <template #append>
      <b-dropdown text="Permissions" variant="success" right>
        <b-dropdown-header>Select options</b-dropdown-header>
        <b-dropdown-item
            v-for="(option, idx) in options"
            :key="idx"
            :disabled="selectedPerms.includes(DiscordPermissions.EVERYONE)">
          <b-form-checkbox v-model="selectedPerms" :value="option.value"
                           :disabled="props.disabled">
            {{ option.name }}
          </b-form-checkbox>
        </b-dropdown-item>
        <b-dropdown-divider/>
        <b-dropdown-item>
          <b-form-checkbox v-model="selectedPerms" :value="DiscordPermissions.EVERYONE"
                           :disabled="props.disabled">
            Everyone
          </b-form-checkbox>
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-input-group>
</template>

<style scoped>

</style>