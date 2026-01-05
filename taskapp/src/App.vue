<template>
  <div class="app">
    <TaskList v-if="view === 'tasks'" />
    <ShoppingList v-if="view === 'shopping'" />

    <BottomNav @change="view = $event" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskList from "./components/TaskList.vue";
import ShoppingList from "./components/ShoppingList.vue";
import BottomNav from "./components/BottomNav.vue";

const view = ref("tasks");
</script>

<style>
.app {
  padding-bottom: 64px; /* space for bottom nav */
}
</style>
