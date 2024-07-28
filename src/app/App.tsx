import React, {ChangeEvent, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "../ui/layout/Layout";
import RepositoryList from "../features/repository-list/RepositoryList";
import client from '../../src/api/graphqlClient';
import { ApolloProvider } from "@apollo/client";
import RepositoryDetailWrapper from "../features/repository-detail/RepositoryDetailWrapper.tsx";

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

const App = () => {
    const handleSearch = (query: string) => {
        console.log("Search query:", query);
    };

    return (
        <ApolloProvider client={client}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<RepositoryList/>}/>
                        <Route path="/repository/:owner/:name" element={<RepositoryDetailWrapper />} />
                        <Route path="/search" element={<SearchBar onSearch={handleSearch} />} />
                    </Routes>
                </Layout>
            </Router>
        </ApolloProvider>
    );  // Добавлена закрывающая скобка
};

export default App;



