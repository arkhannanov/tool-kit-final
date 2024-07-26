// src/features/repository-detail/RepositoryDetail.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_DETAIL } from '../../api/repositoryQueries';

const RepositoryDetail = ({ match }) => {
    const { id } = match.params;
    const { loading, error, data } = use_query(GET_REPOSITORY_DETAIL, {
        variables: { id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    return (
        <div>
            <h1>{data.repository.name}</h1>
            <p>{data.repository.description}</p>
            <strong>Stars: {data.repository.stargazers.totalCount}</strong>
            <strong>Forks: {data.repository.forkCount}</strong>
        </div>
    );
};

export default RepositoryDetail;
