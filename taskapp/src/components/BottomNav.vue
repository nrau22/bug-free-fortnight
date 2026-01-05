<template>
  <nav class="bottom-nav">
    <button
      :class="{ active: active === 'tasks' }"
      @click="set('tasks')"
    >
      📝
      <span>Tasks</span>
    </button>

    <button
      :class="{ active: active === 'shopping' }"
      @click="set('shopping')"
    >
      🛒
      <span>Shop</span>
    </button>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["change"]);
const active = ref("tasks");

function set(view) {
  active.value = view;
  emit("change", view);
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  display: flex;
  background: #ffffff;
  border-top: 1px solid #ddd;
}

button {
  flex: 1;
  border: none;
  background: none;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

button.active {
  background: #eef2ff;
  font-weight: bold;
}

button:active {
  background: #e0e7ff;
}
</style>
