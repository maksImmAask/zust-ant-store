import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { Input, Button, List } from 'antd';
import { useProductStore } from '@store/useProductStore';

function SearchInput() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const products = useProductStore((state) => state.products);
  const setSearch = useProductStore((state) => state.setSearch);

  useEffect(() => {
    if (debounced.trim()) {
      const filtered = products
        .filter((product) =>
          product.title.toLowerCase().includes(debounced.trim().toLowerCase())
        )
  .slice(0, 5)
        .map((product) => product.title);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debounced, products]);

  const handleSearch = () => {
    if (value.trim()) {
      setSearch(value.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Input
          placeholder="Поиск продуктов"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onPressEnter={handleSearch}
        />
        <Button type="primary" onClick={handleSearch}>
          Поиск
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <List
          size="small"
          bordered
          style={{
            position: 'absolute',
            top: '100%',
            marginTop: 4,
            zIndex: 1000,
            width: '100%',
            backgroundColor: 'white',
          }}
          dataSource={suggestions}
          renderItem={(item) => (
            <List.Item
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setValue(item);
                setShowSuggestions(false);
              }}
            >
              {item}
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default SearchInput;
