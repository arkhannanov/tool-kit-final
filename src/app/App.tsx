// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "../ui/layout/Layout";
import RepositoryList from "../features/repository-list/RepositoryList";
import RepositoryDetail from "../features/repository-detail/RepositoryDetail";
import SearchBar from "../features/search/SearchBar";
import client from '../../src/api/graphqlClient'
import {ApolloProvider} from "@apollo/client";


const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<RepositoryList/>}/>
                        <Route path="/details/:id" element={<RepositoryDetail/>}/>
                        <Route path="/search" element={<SearchBar/>}/>
                    </Routes>
                </Layout>
            </Router>
        </ApolloProvider>
    );
};

export default App;
