import React from "react";
import styled from "@emotion/styled";
import { Todo } from "../types/todo";
import { TodoColumn } from "./TodoColumn";

const STATUS_COLUMN_LIST = [
  { status: "pending", title: "진행전", color: "#6c757d" },
  { status: "in-progress", title: "진행중", color: "#ffc107" },
  { status: "completed", title: "완료", color: "#28a745" },
  { status: "archived", title: "아카이브", color: "#dc3545" },
] as const;

interface Props {
  searchQuery: string;
  onEditTodo: (todo: Todo) => void;
}

export function TodoBoard({ searchQuery, onEditTodo }: Props) {
  return (
    <BoardContainer>
      {STATUS_COLUMN_LIST.map(({ status, title, color }) => (
        <TodoColumn
          key={status}
          status={status}
          title={title}
          color={color}
          searchQuery={searchQuery}
          onEditTodo={onEditTodo}
        />
      ))}
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  flex: 1;
`;
