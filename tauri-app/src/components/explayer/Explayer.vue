<template>
  <div className="cursor-pointer pr-10 pt-5" @click="handleExplayer">🌳</div>
</template>
<script setup>
import { createSecWindow, windowWithLabel } from "@/utils/tauri_tools.js";
const handleExplayer = async () => {
  await createSecWindow();
  // const window = await windowWithLabel("alex");
  // console.log(window) // no instance is a tauri-bug-not-fix-yet
};
</script>
