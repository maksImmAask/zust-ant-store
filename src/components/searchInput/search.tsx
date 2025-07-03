import { Input } from "antd";
import { useState } from "react";
import { useProductStore } from "@store/useProductStore";

function SearchInput() {
  const setSearch = useProductStore(state => state.setSearch);
  const [value, setValue] = useState('');

  return (
    <Input.Search
      placeholder="Поиск продуктов"
      style={{ width: '100%' }}
      value={value}
      onChange={e => setValue(e.target.value)}
      onSearch={val => setSearch(val)} 
      allowClear
    />
  );
}
export default SearchInput;