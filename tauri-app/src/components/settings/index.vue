<template>
  <div className="cursor-pointer pr-10 pt-5" @click="openDialog">⚙</div>
  <el-dialog v-model="dialogFormVisible">
    <div className="font-bold mb-5 text-center text-lg">设置</div>
    <div className="w-full flex">
      <div className="w-2/12 h-96" style="border-right: 1px solid #ccc">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          style="border: none"
        >
          <el-menu-item index="1">
            <el-icon><Mic /></el-icon>
            <span>麦克风</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><VideoCamera /></el-icon>
            <span>摄像头</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Headset /></el-icon>
            <span>音量测试</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div className="w-9/12 flex justify-center">
        <component :is="currentComponent"></component>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ElDialog } from "element-plus";
import { Headset, VideoCamera, Mic } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import MicComp from "./devices/Mic.vue";
import CameraComp from "./devices/Camera.vue";
import VolumeComp from "./devices/Volume.vue";

const dialogFormVisible = ref(false);
const deviceType = ref("1");
const currentComponent = computed(() => {
  let device = MicComp;
  switch (deviceType.value) {
    case "1":
      {
        device = MicComp;
      }
      break;
    case "2":
      {
        device = CameraComp;
      }
      break;
    case "3": {
      {
        device = VolumeComp;
      }
    }
  }
  return device;
});
const openDialog = () => {
  dialogFormVisible.value = true;
};
const handleSelect = (e) => {
  deviceType.value = e;
};
</script>
