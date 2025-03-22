import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query Query($pagination: Pagination) {
    rows: getProjects(pagination: $pagination) {
      _id
      code
      name
      description
      AIResponse
      createdAt
      updatedAt
    }
    count: getProjectsCount
  }
`;
