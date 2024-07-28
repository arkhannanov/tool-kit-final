import React from 'react';
import { useQuery, gql } from '@apollo/client';
import client from "../../api/graphqlClient.ts";

const GET_REPOSITORY_DETAIL = gql`
  query GetRepositoryDetail($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      stargazerCount
      updatedAt
      description
      owner {
        login
        avatarUrl
        url
      }
      languages(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;

const RepositoryDetail = ({ owner, name }) => {
    const { loading, error, data } = useQuery(GET_REPOSITORY_DETAIL, {
        variables: { owner, name },
        client,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const repository = data.repository;

    return (
        <div>
            <h1>{repository.name} - ⭐ {repository.stargazerCount}</h1>
            <p>Последний коммит: {new Date(repository.updatedAt).toLocaleDateString()}</p>
            {repository.owner.avatarUrl && (
                <img src={repository.owner.avatarUrl} alt={`${repository.owner.login} avatar`} width="50" />
            )}
            <p>
                Владелец: <a href={repository.owner.url}>{repository.owner.login}</a>
            </p>
            <h3>Используемые языки:</h3>
            <ul>
                {repository.languages.nodes.map((language) => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <p>{repository.description}</p>
        </div>
    );
};

export default RepositoryDetail;
