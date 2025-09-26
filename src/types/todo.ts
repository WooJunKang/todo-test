export type TodoStatus = "pending" | "in-progress" | "completed" | "archived";

export interface Todo {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  status: TodoStatus;
  creator: string;
}

export interface CreateTodoRequest {
  title: string;
  content: string;
  creator: string;
}

export interface UpdateTodoRequest extends Todo {}

export interface SearchParams {
  query?: string;
  status?: TodoStatus;
  page?: number;
  limit?: number;
}

export function isTodoStatus(status: string): status is TodoStatus {
  return ["pending", "in-progress", "completed", "archived"].includes(status);
}
