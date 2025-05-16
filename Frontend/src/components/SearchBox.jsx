import React, { useState } from 'react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { RouteSearch } from '@/helpers/RouteName';

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const getInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(RouteSearch(query.trim()));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <Input
        name="q"
        value={query}
        onChange={getInput}
        placeholder="Search here..."
        className="h-9 rounded-full bg-gray-50 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </form>
  );
};

export default SearchBox;
