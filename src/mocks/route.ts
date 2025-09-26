import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  updateTodoStatus,
  getTodoList,
  updateTodo,
} from "./handlers";

const router = Router();

router.get("/api/todoList", getTodoList);
router.post("/api/todo", createTodo);
router.put("/api/todo/:id/status", updateTodoStatus);
router.put("/api/todo/:id", updateTodo);
router.delete("/api/todo/:id", deleteTodo);

export default router;
