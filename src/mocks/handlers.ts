import { Request, Response } from "express";
import {
  SearchParams,
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoStatus,
} from "../types/todo";
import { mockTodoList } from "./mockData";

let todoList = [...mockTodoList];
let idCounter = mockTodoList[mockTodoList.length - 1].id + 1;

export const getTodoList = (
  req: Request<{}, {}, {}, SearchParams>,
  res: Response
) => {
  const { query, status, page = 1, limit = 10 } = req.query;

  let filteredTodoList: Todo[] = [...todoList];

  if (status) {
    filteredTodoList = filteredTodoList.filter(
      (todo) => todo.status === status
    );
  }

  if (query) {
    filteredTodoList = filteredTodoList.filter(
      (todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase()) ||
        todo.content.toLowerCase().includes(query.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTodoList = filteredTodoList.slice(startIndex, endIndex);
  const hasMore = endIndex < filteredTodoList.length;
  const sortedTodoList = paginatedTodoList.sort((a, b) => a.id - b.id);

  res.json({
    list: sortedTodoList,
    hasMore,
    total: filteredTodoList.length,
  });
};

export const createTodo = (
  req: Request<{}, CreateTodoRequest>,
  res: Response
) => {
  const { title, content, creator } = req.body;
  const now = new Date().toISOString();

  const newTodo: Todo = {
    id: idCounter,
    title,
    content,
    creator,
    createdAt: now,
    updatedAt: now,
    status: "pending",
  };

  todoList.push(newTodo);
  idCounter++;

  res.status(201).json(newTodo);
};

export const updateTodo = (
  req: Request<{ id: string }, UpdateTodoRequest>,
  res: Response
) => {
  const { id } = req.params;
  const numberId = Number(id);
  const updateData = req.body;

  if (isNaN(numberId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const todoIndex = todoList.findIndex((todo) => todo.id === numberId);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const updatedTodo = {
    ...todoList[todoIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };

  todoList[todoIndex] = updatedTodo;

  res.json(updatedTodo);
};

export const updateTodoStatus = (
  req: Request<{ id: string }, { status: TodoStatus }>,
  res: Response
) => {
  const { id } = req.params;
  const { status } = req.body;
  const numberId = Number(id);

  if (isNaN(numberId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const todoIndex = todoList.findIndex((todo) => todo.id === numberId);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todoList[todoIndex].status = status;

  res.json(todoList[todoIndex]);
};

export const deleteTodo = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const numberId = Number(id);

  if (isNaN(numberId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const todoIndex = todoList.findIndex((todo) => todo.id === numberId);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todoList.splice(todoIndex, 1);

  res.json({ message: "Todo deleted successfully" });
};
