import styled from "@emotion/styled";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <SearchInput
      type="text"
      placeholder="할일 검색..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 300px;
`;
