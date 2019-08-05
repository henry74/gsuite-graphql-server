import { gql } from "apollo-server-express";

export const typeDef = gql`
  extend type Query {
    "Fetch last modified date for a spreadsheet"
    lastModifiedDate(spreadsheetId: String!): String!
    "Fetch spreadsheet properties"
    spreadsheet(spreadsheetId: String!): Spreadsheet!
    "Fetch worksheet values as a table for a given range (A1 notation)"
    fetchTable(
      spreadsheetId: String!
      "Name of worksheet (tab name)"
      worksheetTitle: String!
      "Table headers included in range"
      rangeHeaders: Boolean!
      "Table range in A1 notation"
      worksheetRange: String
    ): Table!
  }
`;

export const resolvers = {
  Query: {
    lastModifiedDate: (root, { spreadsheetId }, { services: { sheets } }) => {
      return sheets.lastModifiedDate(spreadsheetId);
    },
    spreadsheet: (root, { spreadsheetId }, { services: { sheets } }) => {
      return { spreadsheetId };
    },
    fetchTable: (
      root,
      { spreadsheetId, worksheetTitle, rangeHeaders, worksheetRange },
      { services: { sheets } }
    ) => {
      return sheets.table(
        spreadsheetId,
        worksheetTitle,
        rangeHeaders,
        worksheetRange
      );
    }
  }
};
