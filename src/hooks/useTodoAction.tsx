import { overlay } from "overlay-kit";
import { TodoEditModal } from "../containers/TodoEditModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todoApi";
import {
  CreateTodoRequest,
  Todo,
  TodoStatus,
  UpdateTodoRequest,
} from "../types/todo";

export function useTodoAction() {
  const queryClient = useQueryClient();

  const onSuccessHandler = () => {
    alert("success");
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  const onErrorHandler = (error: Error) => {
    alert(`error: ${error.message}`);
  };

  const createMutation = useMutation({
    mutationFn: (data: CreateTodoRequest) => todoApi.createTodo(data),
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateTodoRequest) => todoApi.updateTodo(data),
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });

  const updateTodoStatusMutation = useMutation({
    mutationFn: (data: { id: number; status: TodoStatus }) =>
      todoApi.updateTodoStatus(data.id, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: onErrorHandler,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => todoApi.deleteTodo(id),
    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
  });

  const createTodo = () => {
    return overlay.open(({ isOpen, close, unmount }) => {
      return (
        <TodoEditModal
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          onSubmit={(draft) => {
            createMutation.mutate(draft);
            close();
          }}
        />
      );
    });
  };

  const updateTodo = (todo: Todo) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <TodoEditModal
        defaultValue={{
          title: todo.title,
          content: todo.content,
          creator: todo.creator,
        }}
        isOpen={isOpen}
        onClose={close}
        onExit={unmount}
        onSubmit={(draft) => {
          updateMutation.mutate({ ...todo, ...draft });
          close();
        }}
      />
    ));
  };

  const updateTodoStatus = (data: { id: number; status: TodoStatus }) => {
    updateTodoStatusMutation.mutate(data);
  };

  const deleteTodo = (id: number) => {
    deleteMutation.mutate(id);
  };

  return {
    loading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    createTodo,
    updateTodo,
    updateTodoStatus,
    deleteTodo,
  };
}
