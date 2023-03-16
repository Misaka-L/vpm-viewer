<template>
  <div v-if="repo != undefined" class="search-container">
    <div class="my-12 d-flex align-center flex-column">
      <h2 class="text-h2">VRChat Packages Browser</h2>
      <p class="text-subtitle-1">
        Check out all the packages in the repository.
      </p>
    </div>
    <v-text-field
      label="Search packages"
      variant="solo"
      v-model="searchKeyword"
      prepend-inner-icon="mdi-magnify"
      clearable
    />
    <div v-if="repo != undefined">
      <PackageItem
        class="my-4"
        v-for="item in results"
        :key="item.key"
        :pack="item.package"
        :id="item.key"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Repo, Package } from "@/types/Repo";
import { computed, onMounted, Ref, ref } from "vue";
import PackageItem from "@/components/PackageItem.vue";
import { getlatestVersion, getRepo } from "@/utils/vpm";

const repo: Ref<Repo | undefined> = ref(undefined);

const searchKeyword = ref("");
const results = computed(() => {
  if (repo.value == undefined) return;
  const packages = Object.entries(repo.value?.packages).map(
    ([k, v]) =>
      ({
        key: k,
        package: v,
      } as PackItem)
  );

  const keyword = searchKeyword.value.toLowerCase();
  const items = packages.filter((pack) => {
    const latestVersion = getlatestVersion(pack.package);
    return (
      pack.key.toLowerCase().includes(keyword) ||
      latestVersion?.displayName.toLowerCase().includes(keyword)
    );
  });

  return items;
});

onMounted(async () => {
  repo.value = await getRepo();
});

interface PackItem {
  key: string;
  package: Package;
}
</script>

<style scoped>
.search-container {
  margin: 0 auto;
  max-width: 1140px;
}
</style>
