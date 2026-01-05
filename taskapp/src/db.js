import Dexie from "dexie";

export const db = new Dexie("TaskAppDB");

db.version(1).stores({
  tasks: "++id, title, completed",
  shopping: "++id, name, checked"
});
