<template>
  <v-card-title>
    {{ isVersionCard ? version.displayName : version.version }}
    <v-chip
      v-if="isVersionCard && version.unity != null"
      size="x-small"
      color="primary"
    >
      {{ version.version }}
    </v-chip>
    <v-chip
      v-if="isVersionCard && version.unity != null"
      class="mx-1"
      size="x-small"
    >
      <v-icon start icon="mdi-unity" />
      {{ version.unity }}
    </v-chip>
    <v-chip
      v-if="isVersionCard && version.vrchatVersion != null"
      size="x-small"
    >
      <v-icon start icon="mdi-virtual-reality" />
      {{ version.vrchatVersion }}
    </v-chip>
  </v-card-title>
  <v-card-subtitle v-if="isVersionCard">{{ id }}</v-card-subtitle>
  <v-card-text>{{ version.description }}</v-card-text>
  <v-card-title v-if="version.dependencies != undefined"
    >Dependencies</v-card-title
  >
  <v-card-text v-if="version.dependencies != undefined">
    <p v-for="depend in Object.keys(version.dependencies)" :key="depend">
      {{ depend }} - {{ version.dependencies[depend] }}
    </p>
  </v-card-text>
  <v-card-title v-if="version.vpmDependencies != undefined"
    >VPM Dependencies</v-card-title
  >
  <v-card-text v-if="version.vpmDependencies != undefined">
    <p v-for="depend in Object.keys(version.vpmDependencies)" :key="depend">
      {{ depend }} - {{ version.vpmDependencies[depend] }}
    </p>
  </v-card-text>
  <v-card-title v-if="version.samples != undefined">Samples</v-card-title>
  <v-card-text v-if="version.samples != undefined">
    <v-card
      v-for="sample in version.samples"
      :key="sample.displayName"
      class="mb-3"
      variant="outlined"
      :title="sample.displayName"
      :subtitle="sample.path"
      :text="sample.description"
    >
    </v-card>
  </v-card-text>
</template>

<script setup lang="ts">
import { PackageVersion } from "@/types/Repo";
import { computed } from "vue";

const props = defineProps<{
  version: PackageVersion;
  id?: string;
}>();

const isVersionCard = computed(() => props.id != undefined);
</script>
