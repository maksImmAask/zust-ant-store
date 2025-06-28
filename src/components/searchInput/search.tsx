import { Input } from "antd";

function SearchInput() {
  return (
    <Input.Search
      placeholder="Поиск продуктов"
      style={{ width: '100%' }}
    />
  );
}
export default SearchInput;