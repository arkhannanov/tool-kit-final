
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($query: String!, $first: Int = 10, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
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
          url 
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  edges {
                    node {
                      committedDate 
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
