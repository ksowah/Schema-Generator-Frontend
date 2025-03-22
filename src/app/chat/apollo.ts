import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects($pagination: Pagination) {
    projects: getProjects(pagination: $pagination) {
      _id
      name
    }
  }
`;
