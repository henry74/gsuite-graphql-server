import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Message {
    id: ID!
    threadId: String
    internalDate: String
    headers: Headers
    labelIds: [String]
    snippet: String
    textPlain: String
    textHtml: String
    attachments: [Attachment]
    inline: [Attachment]
  }

  type Headers {
    from: String
    date: String
    subject: String
    to: String
    cc: String
  }

  type MessageList {
    messages: [Message]
    nextPageToken: String
    resultSizeEstimate: Int
  }

  type Attachment {
    filename: String
    mimeType: String
    size: Int
    attachmentId: String
  }

  type Label {
    id: ID
    name: String
    type: String
  }
`;

export const resolvers = {
  MessageList: {
    messages: (parent, {}, { services: { gmail } }) => {
      return parent.messages.map(({ id }) => {
        return gmail.message(id);
      });
    }
  }
};
