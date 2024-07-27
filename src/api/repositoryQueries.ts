// src/api/repositoryQueries.ts
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 100) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          viewerHasStarred
          stargazers {
            totalCount
          }
          url  # Ссылка на GitHub
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  edges {
                    node {
                      committedDate  # Дата последнего коммита
                    }
                  }
                }
              }
            }
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
