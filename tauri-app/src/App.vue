<script setup>
import Videobox from "./components/Videobox.vue";
// When using the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";
import { ref, Suspense } from "vue";
// When using the Tauri global script (if not using the npm package)
// Be sure to set `build.withGlobalTauri` in `tauri.conf.json` to true
// Invoke the command
const greeting = ref("");
const count = ref(0);
invoke("greet", { name: "word" }).then((res) => {
  greeting.value = res;
  console.log(res);
});
const add = () => {
  invoke("increse", { num: count.value }).then((res) => {
    count.value = res;
    console.log(`Increse Number from Rust:  ${count.value}`);
  });
};
</script>

<template>
  <div class="container">
    <p>{{ greeting }}</p>
    <div>
      <div>
        {{ count }}
      </div>
      <button @click="add">increse</button>
    </div>
    <Suspense>
      <Videobox></Videobox>
    </Suspense>
  </div>
</template>

<style scoped></style>
