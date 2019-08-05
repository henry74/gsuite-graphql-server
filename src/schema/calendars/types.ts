import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Time {
    dateTime: String
    timeZone: String
  }

  type CalendarEvent {
    kind: String
    etag: String
    status: String
    htmlLink: String
    id: ID
    summary: String
    description: String
    location: String
    start: Time
    end: Time
  }

  type CalendarListEntry {
    id: String
    summary: String
    accessRole: String
  }
`;

export const resolvers = {};
