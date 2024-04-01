<template>
  <div className="w-full flex justify-end">
    <Setting />
    <Explayer />
    <Configuare />
  </div>
</template>
<script setup>
import Setting from "@/components/settings/index.vue";
import Explayer from "@/components/explayer/Explayer.vue";
import Configuare from "@/components/configuare/Configuare.vue";
</script>
