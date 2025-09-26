import styled from "@emotion/styled";
import { ComponentPropsWithRef, ReactNode } from "react";

interface Props extends ComponentPropsWithRef<"input"> {
  label: string;
  bottomAddon?: ReactNode;
}

export function InputField({ label, bottomAddon, ...props }: Props) {
  return (
    <InputSection>
      <Label>{label}</Label>
      <Input {...props} />
      {bottomAddon}
    </InputSection>
  );
}

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
