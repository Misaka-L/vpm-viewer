<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon icon="mdi-home" @click="router.push('/')" />
      </template>
      <v-app-bar-title>VRChat Packages Browser</v-app-bar-title>
      <v-spacer />
      <v-btn href="https://vcc.docs.vrchat.com/" target="_blank"
        >Creator Companion</v-btn
      >
      <v-btn href="https://vcc.docs.vrchat.com/vpm/" target="_blank"
        >Docs</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
      <v-footer border>
        <div>
          <h2 class="text-h5">VRChat Packages Browser</h2>
          <p class="text-subtitle-2">
            Personal works, have no affiliation with VRChat officials.
          </p>
        </div>
        <v-spacer />
        <v-btn
          class="mx-4"
          href="https://github.com"
          target="_blank"
          icon="mdi-github"
          variant="plain"
        />
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
