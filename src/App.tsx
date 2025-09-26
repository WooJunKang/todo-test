import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styled from "@emotion/styled";
import { TodoBoard } from "./components/TodoBoard";
import { SearchBar } from "./components/SearchBar";
import { useTodoAction } from "./hooks/useTodoAction";
import { OverlayProvider } from "overlay-kit";
import { isTodoStatus } from "./types/todo";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

const queryClient = new QueryClient();

function AppContent() {
  const { createTodo, updateTodo, updateTodoStatus } = useTodoAction();
  const [search, debouncedSearch, setSearch] = useDebouncedValue("", 500);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    const numDraggableId = Number(draggableId);
    const newStatus = destination?.droppableId;

    if (destination == null || source == null || isNaN(numDraggableId)) {
      return;
    }

    if (newStatus != null && isTodoStatus(newStatus)) {
      updateTodoStatus({ id: numDraggableId, status: newStatus });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <MainContent>
        <Header>
          <Title>TODO BOARD</Title>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <SearchBar value={search} onChange={setSearch} />
            <CreateButton onClick={createTodo}>할일 만들기</CreateButton>
          </div>
        </Header>
        <TodoBoard searchQuery={debouncedSearch} onEditTodo={updateTodo} />
      </MainContent>
    </DragDropContext>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <AppContent />
      </OverlayProvider>
    </QueryClientProvider>
  );
}

export default App;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;
