<template>
  <v-card link :to="`/package/${id}`">
    <v-card-title>
      {{ latestVersion?.displayName }}
      <v-chip size="x-small" color="primary">
        {{ latestVersion?.version }}
      </v-chip>
      <v-chip v-if="latestVersion?.unity != null" class="mx-1" size="x-small">
        <v-icon start icon="mdi-unity" />
        {{ latestVersion.unity }}
      </v-chip>
      <v-chip v-if="latestVersion?.vrchatVersion != null" size="x-small">
        <v-icon start icon="mdi-virtual-reality" />
        {{ latestVersion.vrchatVersion }}
      </v-chip>
    </v-card-title>
    <v-card-subtitle>{{ id }}</v-card-subtitle>
    <v-card-text>{{ latestVersion?.description }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Package } from "@/types/Repo";
import { computed } from "vue";
import { getlatestVersion } from "@/utils/vpm";

const props = defineProps<{
  pack: Package;
  id: string;
}>();

const latestVersion = computed(() => getlatestVersion(props.pack));
</script>
