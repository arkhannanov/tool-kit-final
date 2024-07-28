
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
          owner {
            login
            avatarUrl
            url
          }
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
query GetRepositoryDetail($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    id
    name
    owner {
      login
      avatarUrl
      url
    }
    stargazerCount
    updatedAt
    languages(first: 10) {
      edges {
        node {
          name
        }
      }
    }
    description
  }
}

`;

