<template>
  <div className="cursor-pointer pr-10 pt-5" @click="handleConfiguare">❀</div>
  <el-dialog v-model="configVisible">
    <div className="font-bold mb-5 text-center text-lg">网域选择</div>
    <template #footer>
      <div className="flex">
        <el-radio-group v-model="netOption" className="ml-4">
          <el-radio value="local" size="large">局域网</el-radio>
          <el-radio value="remote" size="large">公网</el-radio>
        </el-radio-group>
      </div>

      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
const configVisible = ref(false);
const netOption = ref("local");
const handleConfiguare = () => {
  configVisible.value = true;
};
const handleCancel = () => {
  configVisible.value = false;
  console.log(import.meta.url)
};
const handleConfirm = () => {
  configVisible.value = false;
  invoke("set_net_config", { netConfig: "localhost:2024" });
};
</script>
