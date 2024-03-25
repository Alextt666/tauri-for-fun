<script setup>
import Videobox from "./components/Videobox.vue";
import Navbar from "./components/Navbar.vue";
// When using the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";
import { ref, Suspense } from "vue";

// When using the Tauri global script (if not using the npm package)
// Be sure to set `build.withGlobalTauri` in `tauri.conf.json` to true
// Invoke the command
</script>

<template>
  <Navbar></Navbar>
  <div class="container">
    <Suspense>
      <Videobox></Videobox>
    </Suspense>
  </div>
</template>

<style scoped></style>
