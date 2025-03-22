import { gql } from "@apollo/client";

export const STREAM_CHAT = gql`
  mutation StreamChat($prompt: String!, $chatId: ID) {
    streamChat(prompt: $prompt, chatId: $chatId) {
      chat
    }
  }
`;

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

export const GET_CHAT = gql`
  query GetChat($id: ID!) {
    chat: getChat(id: $id) {
      name
      createdBy
    }
  }
`;
