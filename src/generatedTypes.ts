export type Maybe<T> = T | null;

export enum NumberFormatType {
  Text = "TEXT",
  Number = "NUMBER",
  Currency = "CURRENCY",
  Date = "DATE"
}

/** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type JsonObject = any;

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type Json = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  unused?: Maybe<string>;
  /** Fetch last modified date for a spreadsheet */
  lastModifiedDate: string;
  /** Fetch spreadsheet properties */
  spreadsheet: Spreadsheet;
  /** Fetch worksheet values as a table for a given range (A1 notation) */
  fetchTable: Table;
  /** List available calendars */
  calendars: (Maybe<CalendarListEntry>)[];
  /** Fetch events for a calendar */
  events?: Maybe<(Maybe<CalendarEvent>)[]>;
  /** Fetch events across multiple calendars */
  aggregateEvents?: Maybe<(Maybe<CalendarEvent>)[]>;
  /** Generate auth URL for authentication */
  authUrl: string;
  /** Fetch labels for Gmail */
  labels?: Maybe<(Maybe<Label>)[]>;
  /** Fetch messages from Gmail */
  messages?: Maybe<MessageList>;
}

export interface Spreadsheet {
  spreadsheetId: string;

  lastModifiedDate: string;

  worksheets: Worksheet[];
}

export interface Worksheet {
  sheetId?: Maybe<number>;

  title?: Maybe<string>;

  index?: Maybe<number>;

  sheetType?: Maybe<string>;

  rowCount?: Maybe<number>;

  columnCount?: Maybe<number>;
}

export interface Table {
  worksheetTitle?: Maybe<string>;

  headers?: Maybe<(Maybe<string>)[]>;

  formats?: Maybe<(Maybe<NumberFormat>)[]>;

  rows?: Maybe<(Maybe<JsonObject>)[]>;
}

export interface NumberFormat {
  type: NumberFormatType;

  pattern?: Maybe<string>;
}

export interface CalendarListEntry {
  id?: Maybe<string>;

  summary?: Maybe<string>;

  accessRole?: Maybe<string>;
}

export interface CalendarEvent {
  kind?: Maybe<string>;

  etag?: Maybe<string>;

  status?: Maybe<string>;

  htmlLink?: Maybe<string>;

  id?: Maybe<string>;

  summary?: Maybe<string>;

  description?: Maybe<string>;

  location?: Maybe<string>;

  start?: Maybe<Time>;

  end?: Maybe<Time>;
}

export interface Time {
  dateTime?: Maybe<string>;

  timeZone?: Maybe<string>;
}

export interface Label {
  id?: Maybe<string>;

  name?: Maybe<string>;

  type?: Maybe<string>;
}

export interface MessageList {
  messages?: Maybe<(Maybe<Message>)[]>;

  nextPageToken?: Maybe<string>;

  resultSizeEstimate?: Maybe<number>;
}

export interface Message {
  id: string;

  threadId?: Maybe<string>;

  internalDate?: Maybe<string>;

  headers?: Maybe<Headers>;

  labelIds?: Maybe<(Maybe<string>)[]>;

  snippet?: Maybe<string>;

  textPlain?: Maybe<string>;

  textHtml?: Maybe<string>;

  attachments?: Maybe<(Maybe<Attachment>)[]>;

  inline?: Maybe<(Maybe<Attachment>)[]>;
}

export interface Headers {
  from?: Maybe<string>;

  date?: Maybe<string>;

  subject?: Maybe<string>;

  to?: Maybe<string>;

  cc?: Maybe<string>;
}

export interface Attachment {
  filename?: Maybe<string>;

  mimeType?: Maybe<string>;

  size?: Maybe<number>;

  attachmentId?: Maybe<string>;
}

export interface Mutation {
  unused?: Maybe<string>;

  setOAuthCode?: Maybe<JsonObject>;
}

export interface Subscription {
  unused?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface LastModifiedDateQueryArgs {
  spreadsheetId: string;
}
export interface SpreadsheetQueryArgs {
  spreadsheetId: string;
}
export interface FetchTableQueryArgs {
  spreadsheetId: string;
  /** Name of worksheet (tab name) */
  worksheetTitle: string;
  /** Table headers included in range */
  rangeHeaders: boolean;
  /** Table range in A1 notation */
  worksheetRange?: Maybe<string>;
}
export interface EventsQueryArgs {
  calendarId: string;

  maxResults?: Maybe<number>;
}
export interface AggregateEventsQueryArgs {
  calendarList: (Maybe<string>)[];

  maxResults?: Maybe<number>;
}
export interface LabelsQueryArgs {
  emailAddress?: Maybe<string>;
}
export interface MessagesQueryArgs {
  emailAddress?: Maybe<string>;

  query?: Maybe<string>;

  maxResults?: Maybe<number>;

  labelIds?: Maybe<(Maybe<string>)[]>;

  nextPageToken?: Maybe<string>;
}
export interface SetOAuthCodeMutationArgs {
  code: string;
}
