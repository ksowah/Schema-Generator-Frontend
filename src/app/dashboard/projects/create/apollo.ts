import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String!
    $aiResponse: String!
  ) {
    createProject(
      name: $name
      description: $description
      AIResponse: $aiResponse
    ) {
      _id
    }
  }
`;
