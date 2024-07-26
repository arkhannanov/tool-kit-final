// src/features/search/SearchBar.tsx
import React, { useState } from 'react';
import './SearchBar.module.css';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackageQuery(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSubmit(query);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search repositories..."
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
