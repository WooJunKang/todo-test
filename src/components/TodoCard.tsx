import React from "react";
import styled from "@emotion/styled";
import { Draggable } from "@hello-pangea/dnd";
import { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  index: number;
  onEdit: () => void;
}

export function TodoCard({ todo, index, onEdit }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          onClick={onEdit}
        >
          <TodoTitle>{todo.title}</TodoTitle>
          <TodoContent>{todo.content}</TodoContent>
          <TodoMeta>
            <div style={{ display: "flex", gap: "4px" }}>
              <MetaText>{todo.id}</MetaText>
              <MetaText>{todo.creator}</MetaText>
            </div>
            <MetaText>{formatDate(todo.createdAt)}</MetaText>
          </TodoMeta>
        </CardContainer>
      )}
    </Draggable>
  );
}

const CardContainer = styled.div<{ isDragging: boolean }>`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.isDragging
      ? "0 4px 8px rgba(0, 0, 0, 0.2)"
      : "0 1px 2px rgba(0, 0, 0, 0.1)"};
  transform: ${(props) => (props.isDragging ? "rotate(5deg)" : "none")};

  &:hover {
    border-color: #007bff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const TodoTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  word-break: break-word;
`;

const TodoContent = styled.p`
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TodoMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: #999;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #eee;
`;

const MetaText = styled.span`
  font-weight: 500;
`;
