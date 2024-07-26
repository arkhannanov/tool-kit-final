// В SearchBar добавьте пропс для обработки изменений (onChange)
import {useState} from "react";

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        onSearch(input);
    };

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
