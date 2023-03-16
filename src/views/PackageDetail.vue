<template>
  <v-row>
    <v-col md="8" lg="9" cols="12">
      <v-card class="mt-5">
        <VersionCardContent
          v-if="latestVersion != undefined"
          :version="latestVersion"
          :id="id"
        />
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>Created by {{ latestVersion?.author.name }}</v-card-title>
        <v-card-text>
          <v-btn
            class="mb-1"
            prepend-icon="mdi-email"
            variant="tonal"
            block
            :href="`mailto:${latestVersion?.author.email}`"
            >Email</v-btn
          >
          <v-btn
            prepend-icon="mdi-web"
            variant="tonal"
            block
            :href="latestVersion?.author.url"
            target="_blank"
            >Web</v-btn
          >
        </v-card-text>
      </v-card>
    </v-col>
    <v-col md="8" lg="9" cols="12">
      <v-card title="Versions">
        <div class="px-4">
          <v-card
            v-for="version in versions"
            :key="version.key"
            class="mb-3"
            variant="outlined"
          >
            <VersionCardContent :version="version.version" />
          </v-card>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Package, PackageVersion } from "@/types/Repo";
import { getPackage } from "@/utils/vpm";
import { computed, onMounted, ref, Ref } from "vue";
import { getlatestVersion } from "@/utils/vpm";
import VersionCardContent from "@/components/VersionCardContent.vue";

const props = defineProps<{
  id: string;
}>();

const pack: Ref<undefined | Package> = ref(undefined);
const versions = computed(() => {
  if (pack.value == undefined) return;
  return Object.entries(pack.value.versions)
    .map(
      ([k, v]) =>
        ({
          key: k,
          version: v,
        } as VersionItem)
    )
    .reverse();
});

const latestVersion = computed(() => {
  if (pack.value != undefined) return getlatestVersion(pack.value);
  return undefined;
});

onMounted(async () => {
  pack.value = await getPackage(props.id);
});

interface VersionItem {
  key: string;
  version: PackageVersion;
}
</script>
