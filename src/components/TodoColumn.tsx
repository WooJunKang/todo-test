import styled from "@emotion/styled";
import { Droppable } from "@hello-pangea/dnd";
import { TodoCard } from "./TodoCard";
import { SearchParams, Todo, TodoStatus } from "../types/todo";
import { useInfiniteQuery } from "@tanstack/react-query";
import { todoApi } from "../api/todoApi";
import { useScrollShadow } from "../hooks/useScrollShadow";
import { useRef } from "react";

interface Props {
  status: TodoStatus;
  title: string;
  color: string;
  searchQuery: string;
  onEditTodo: (todo: Todo) => void;
}

export function TodoColumn({
  status,
  title,
  color,
  searchQuery,
  onEditTodo,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    shadowState: { showTopShadow, showBottomShadow },
    updateShadowState,
  } = useScrollShadow(scrollRef);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["todos", status, searchQuery],
    queryFn: ({ pageParam = 1 }) => {
      const params: SearchParams = {
        status,
        query: searchQuery,
        page: pageParam,
        limit: 10,
      };
      return todoApi.getTodoList(params);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
  const todoList = data?.pages.flatMap((page) => page.list) || [];

  if (isLoading) {
    return (
      <ColumnContainer>
        <ColumnHeader color={color}>{title}</ColumnHeader>
        <ColumnContent>
          <EmptyMessage>로딩 중...</EmptyMessage>
        </ColumnContent>
      </ColumnContainer>
    );
  }

  if (error) {
    return (
      <ColumnContainer>
        <ColumnHeader color={color}>{title}</ColumnHeader>
        <ColumnContent>
          <EmptyMessage>오류가 발생했습니다.</EmptyMessage>
        </ColumnContent>
      </ColumnContainer>
    );
  }

  return (
    <ColumnContainer>
      <ColumnHeader color={color}>{title}</ColumnHeader>
      <Droppable droppableId={status}>
        {(provided) => (
          <ColumnContent ref={provided.innerRef} {...provided.droppableProps}>
            <ScrollContainer>
              {showTopShadow && <TopShadow />}
              <TodoList ref={scrollRef} onScroll={updateShadowState}>
                {todoList.map((todo, index) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    index={index}
                    onEdit={() => onEditTodo(todo)}
                  />
                ))}
                {provided.placeholder}
                {hasNextPage && (
                  <LoadMoreButton
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "로딩 중..." : "더 보기"}
                  </LoadMoreButton>
                )}
              </TodoList>
              {showBottomShadow && <BottomShadow />}
            </ScrollContainer>
          </ColumnContent>
        )}
      </Droppable>
    </ColumnContainer>
  );
}

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ColumnHeader = styled.div<{ color: string }>`
  padding: 16px;
  background-color: ${(props) => props.color};
  color: white;
  font-weight: 600;
  text-align: center;
`;

const ColumnContent = styled.div`
  flex: 1;
  padding: 8px;
  min-height: 400px;
`;

const ScrollContainer = styled.div`
  position: relative;
  height: 70vh;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const TopShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
  pointer-events: none;
  z-index: 1;
  border-radius: 8px 8px 0 0;
`;

const BottomShadow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
  pointer-events: none;
  z-index: 1;
  border-radius: 0 0 8px 8px;
`;

const LoadMoreButton = styled.button`
  padding: 8px;
  margin-top: 8px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #e9ecef;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
`;
