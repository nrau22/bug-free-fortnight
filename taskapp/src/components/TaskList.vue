<template>
  <div>
    <input v-model="title" placeholder="New task" />
    <button @click="addTask">Add</button>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" v-model="task.completed" @change="update(task)" />
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../db";

const title = ref("");
const tasks = ref([]);

async function load() {
  tasks.value = await db.tasks.toArray();
}

async function addTask() {
  if (!title.value) return;
  await db.tasks.add({ title: title.value, completed: false });
  title.value = "";
  load();
}

async function update(task) {
  await db.tasks.update(task.id, { completed: task.completed });
}

onMounted(load);
</script>
