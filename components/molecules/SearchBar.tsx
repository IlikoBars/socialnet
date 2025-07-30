import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Поиск...',
  onSearch,
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex space-x-3 ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        size="md"
        className="flex-1"
      />
      <Button
        variant="primary"
        size="md"
        onClick={handleSearch}
        disabled={!query.trim()}
      >
        🔍
      </Button>
    </div>
  );
};

export default SearchBar; 