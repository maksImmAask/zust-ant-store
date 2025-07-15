import { MantineProvider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { Input } from 'antd';
import { useProductStore } from '@store/useProductStore';

function SearchInput() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 300);
  const setSearch = useProductStore(state => state.setSearch);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced, setSearch]);

  return (
    <MantineProvider>
      <Input
        placeholder="Поиск продуктов"
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        style={{ width: '100%' }}
      />
    </MantineProvider>
  );
}

export default SearchInput;
