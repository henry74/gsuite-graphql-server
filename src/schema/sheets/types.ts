import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Worksheet {
    sheetId: Int
    title: String
    index: Int
    sheetType: String
    rowCount: Int
    columnCount: Int
  }

  type Spreadsheet {
    spreadsheetId: String!
    lastModifiedDate: String!
    worksheets: [Worksheet!]!
  }

  type Table {
    worksheetTitle: String
    headers: [String]
    formats: [NumberFormat]
    rows: [JSONObject]
  }

  type NumberFormat {
    type: NumberFormatType!
    pattern: String
  }

  enum NumberFormatType {
    TEXT
    NUMBER
    CURRENCY
    DATE
  }
`;

export const resolvers = {
  Spreadsheet: {
    lastModifiedDate: (spreadsheet, _, { services: { sheets } }) => {
      return sheets.lastModifiedDate(spreadsheet.spreadsheetId);
    },
    worksheets: (spreadsheet, _, { services: { sheets } }) => {
      return sheets.worksheets(spreadsheet.spreadsheetId);
    }
  }
};
