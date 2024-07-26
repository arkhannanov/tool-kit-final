// src/features/repository-list/RepositoryList.tsx
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../api/repositoryQueries';
import Repository from "../repository/Repository";


const RepositoryList = () => {
    const [repositories, setRepositories] = useState([]);
    const [loadRepositories, { called, loading, data }] = useLazyQuery(GET_REPOSITORIES, {
        variables: { query: "stars:>500" }
    });

    useEffect(() => {
        if (data && data.search && data.search.nodes) {
            setRepositories(data.search.nodes);
        }
    }, [data]);

    useEffect(() => {
        loadRepositories();
    }, [loadRepositories]);

    if (loading) return <div>Loading...</div>;
    if (!called || !data) return <div>Start searching...</div>;

    return (
        <div>
            {repositories.map(repo => (
                <Repository key={repo.id} details={repo} />
            ))}
        </div>
    );
};

export default RepositoryList;
