import { gql } from "apollo-server-express";

export const typeDef = gql`
  extend type Query {
    "List available calendars"
    calendars: [CalendarListEntry]!
    "Fetch events for a calendar"
    events(calendarId: String!, maxResults: Int): [CalendarEvent]
    "Fetch events across multiple calendars"
    aggregateEvents(calendarList: [String]!, maxResults: Int): [CalendarEvent]
  }
`;

export const resolvers = {
  Query: {
    calendars: (root, {}, { services: { calendars } }) => {
      return calendars.list();
    },
    events: (root, { calendarId, maxResults }, { services: { calendars } }) => {
      return calendars.events(calendarId, maxResults);
    },
    aggregateEvents: (
      root,
      { calendarList, maxResults },
      { services: { calendars } }
    ) => {
      return calendars.aggregateEvents(calendarList, maxResults);
    }
  }
};
