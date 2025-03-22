import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project: getProject(id: $id) {
      _id
      name
      description
      AIResponse
      createdBy
    }
  }
`;
