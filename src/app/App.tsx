import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "../ui/layout/Layout";
import RepositoryList from "../features/repository-list/RepositoryList";
import SearchBar from "../features/search/SearchBar";
import client from '../../src/api/graphqlClient';
import { ApolloProvider } from "@apollo/client";
import RepositoryDetailWrapper from "../features/repository-detail/RepositoryDetailWrapper.tsx";

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<RepositoryList/>}/>
                        <Route path="/repository/:owner/:name" element={<RepositoryDetailWrapper />} />
                        <Route path="/search" element={<SearchBar/>}/>
                    </Routes>
                </Layout>
            </Router>
        </ApolloProvider>
    );  // Добавлена закрывающая скобка
};

export default App;
