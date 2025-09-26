import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  SearchParams,
  TodoStatus,
} from "../types/todo";

const API_BASE = "http://localhost:3001/api";

export const todoApi = {
  getTodoList: async (
    params: SearchParams = {}
  ): Promise<{
    list: Todo[];
    hasMore: boolean;
    total: number;
  }> => {
    const searchParams = new URLSearchParams();

    if (params.query) searchParams.append("query", params.query);
    if (params.status) searchParams.append("status", params.status);
    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());

    const response = await fetch(`${API_BASE}/todoList?${searchParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch todoList");
    }
    return response.json();
  },

  createTodo: async (data: CreateTodoRequest): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    return response.json();
  },

  updateTodo: async (data: UpdateTodoRequest): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todo/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return response.json();
  },

  updateTodoStatus: async (id: number, status: TodoStatus): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todo/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo status");
    }
    return response.json();
  },

  deleteTodo: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/todo/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  },
};
