import styled from "@emotion/styled";
import { CreateTodoRequest } from "../../types/todo";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "../../components/Modal";
import { ErrorMessage } from "@hookform/error-message";
import { InputField } from "./InputField";

interface Props {
  defaultValue?: CreateTodoRequest;
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  onSubmit: (form: CreateTodoRequest) => void;
}

export function TodoEditModal({
  defaultValue,
  isOpen,
  onClose,
  onSubmit,
  onExit,
}: Props) {
  const editorType = defaultValue != null ? "edit" : "create";
  const editorFormMethods = useForm<CreateTodoRequest>({
    defaultValues: defaultValue ?? {},
  });

  return (
    <Modal isOpen={isOpen} onExit={onExit}>
      <Wrapper>
        <Header>
          <Title>{editorType === "edit" ? "할일 수정" : "할일 생성"}</Title>
        </Header>
        <FormProvider {...editorFormMethods}>
          <form noValidate onSubmit={editorFormMethods.handleSubmit(onSubmit)}>
            <Body>
              <InputField
                {...editorFormMethods.register("title", {
                  required: "제목을 입력해주세요.",
                })}
                label="제목"
                placeholder="투두앱 스캐폴딩"
                bottomAddon={
                  <ErrorMessage
                    errors={editorFormMethods.formState.errors}
                    name="title"
                    render={({ message }) => <ErrorText>{message}</ErrorText>}
                  />
                }
              />

              <InputField
                {...editorFormMethods.register("content", {
                  required: "내용을 입력해주세요.",
                })}
                label="내용"
                placeholder="스캐폴딩을 위한 스크립트, 템플릿 만들기"
                bottomAddon={
                  <ErrorMessage
                    errors={editorFormMethods.formState.errors}
                    name="content"
                    render={({ message }) => <ErrorText>{message}</ErrorText>}
                  />
                }
              />

              <InputField
                {...editorFormMethods.register("creator", {
                  required: "작성자을 입력해주세요.",
                })}
                label="작성자"
                placeholder="만든 사람"
                bottomAddon={
                  <ErrorMessage
                    errors={editorFormMethods.formState.errors}
                    name="creator"
                    render={({ message }) => <ErrorText>{message}</ErrorText>}
                  />
                }
              />

              <CTASection>
                <Button onClick={onClose}>닫기</Button>
                <Button type="submit" variant="primary">
                  {editorType === "edit" ? "수정하기" : "생성하기"}
                </Button>
              </CTASection>
            </Body>
          </form>
        </FormProvider>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.div`
  width: 400px;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333;
`;

const Body = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputSection = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;

const CTASection = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: "primary" | "default" }>`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "primary" ? "#007bff" : "#6c757d"};
  color: white;

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#0056b3" : "#5a6268"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;
