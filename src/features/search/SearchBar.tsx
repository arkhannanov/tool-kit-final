import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState<string>("");

    const handleSearch = () => {
        onSearch(input);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div>
            <input value={input} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
