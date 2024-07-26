// src/api/repositoryQueries.ts
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 100) {
      nodes {
        ... on Repository {
          id
          name
          viewerHasStarred
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_DETAIL = gql`
  query getRepositoryDetail($id: ID!) {
    repository(id: $id) {
      name
      description
      stargazers {
        totalCount
      }
      forkCount
    }
  }
`;
