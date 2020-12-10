import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Query = {
  __typename?: 'Query';
  unused?: Maybe<Scalars['String']>;
  /** Fetch last modified date for a spreadsheet */
  lastModifiedDate: Scalars['String'];
  /** Fetch spreadsheet properties */
  spreadsheet: Spreadsheet;
  /** Fetch worksheet values as a table for a given range (A1 notation) */
  fetchTable: Table;
  /** List available calendars */
  calendars: Array<Maybe<CalendarListEntry>>;
  /** Fetch events for a calendar */
  events?: Maybe<Array<Maybe<CalendarEvent>>>;
  /** Fetch events across multiple calendars */
  aggregateEvents?: Maybe<Array<Maybe<CalendarEvent>>>;
  /** Generate auth URL for authentication */
  authUrl: Scalars['String'];
  /** Fetch labels for Gmail */
  labels?: Maybe<Array<Maybe<Label>>>;
  /** Fetch messages from Gmail */
  messages?: Maybe<MessageList>;
};


export type QueryLastModifiedDateArgs = {
  spreadsheetId: Scalars['String'];
};


export type QuerySpreadsheetArgs = {
  spreadsheetId: Scalars['String'];
};


export type QueryFetchTableArgs = {
  spreadsheetId: Scalars['String'];
  worksheetTitle: Scalars['String'];
  rangeHeaders: Scalars['Boolean'];
  worksheetRange?: Maybe<Scalars['String']>;
};


export type QueryEventsArgs = {
  calendarId: Scalars['String'];
  maxResults?: Maybe<Scalars['Int']>;
};


export type QueryAggregateEventsArgs = {
  calendarList: Array<Maybe<Scalars['String']>>;
  maxResults?: Maybe<Scalars['Int']>;
};


export type QueryLabelsArgs = {
  emailAddress?: Maybe<Scalars['String']>;
};


export type QueryMessagesArgs = {
  emailAddress?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  maxResults?: Maybe<Scalars['Int']>;
  labelIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  nextPageToken?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  unused?: Maybe<Scalars['String']>;
  setOAuthCode?: Maybe<Scalars['JSONObject']>;
};


export type MutationSetOAuthCodeArgs = {
  code: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  unused?: Maybe<Scalars['String']>;
};

export type Worksheet = {
  __typename?: 'Worksheet';
  sheetId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  sheetType?: Maybe<Scalars['String']>;
  rowCount?: Maybe<Scalars['Int']>;
  columnCount?: Maybe<Scalars['Int']>;
};

export type Spreadsheet = {
  __typename?: 'Spreadsheet';
  spreadsheetId: Scalars['String'];
  lastModifiedDate: Scalars['String'];
  worksheets: Array<Worksheet>;
};

export type Table = {
  __typename?: 'Table';
  worksheetTitle?: Maybe<Scalars['String']>;
  headers?: Maybe<Array<Maybe<Scalars['String']>>>;
  formats?: Maybe<Array<Maybe<NumberFormat>>>;
  rows?: Maybe<Array<Maybe<Scalars['JSONObject']>>>;
};

export type NumberFormat = {
  __typename?: 'NumberFormat';
  type: NumberFormatType;
  pattern?: Maybe<Scalars['String']>;
};

export enum NumberFormatType {
  Text = 'TEXT',
  Number = 'NUMBER',
  Currency = 'CURRENCY',
  Date = 'DATE'
}

export type Time = {
  __typename?: 'Time';
  dateTime?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
};

export type CalendarEvent = {
  __typename?: 'CalendarEvent';
  kind?: Maybe<Scalars['String']>;
  etag?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  htmlLink?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  start?: Maybe<Time>;
  end?: Maybe<Time>;
};

export type CalendarListEntry = {
  __typename?: 'CalendarListEntry';
  id?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  accessRole?: Maybe<Scalars['String']>;
};



export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  threadId?: Maybe<Scalars['String']>;
  internalDate?: Maybe<Scalars['String']>;
  headers?: Maybe<Headers>;
  labelIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  snippet?: Maybe<Scalars['String']>;
  textPlain?: Maybe<Scalars['String']>;
  textHtml?: Maybe<Scalars['String']>;
  attachments?: Maybe<Array<Maybe<Attachment>>>;
  inline?: Maybe<Array<Maybe<Attachment>>>;
};

export type Headers = {
  __typename?: 'Headers';
  from?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  cc?: Maybe<Scalars['String']>;
};

export type MessageList = {
  __typename?: 'MessageList';
  messages?: Maybe<Array<Maybe<Message>>>;
  nextPageToken?: Maybe<Scalars['String']>;
  resultSizeEstimate?: Maybe<Scalars['Int']>;
};

export type Attachment = {
  __typename?: 'Attachment';
  filename?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  attachmentId?: Maybe<Scalars['String']>;
};

export type Label = {
  __typename?: 'Label';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Worksheet: ResolverTypeWrapper<Worksheet>;
  Spreadsheet: ResolverTypeWrapper<Spreadsheet>;
  Table: ResolverTypeWrapper<Table>;
  NumberFormat: ResolverTypeWrapper<NumberFormat>;
  NumberFormatType: NumberFormatType;
  Time: ResolverTypeWrapper<Time>;
  CalendarEvent: ResolverTypeWrapper<CalendarEvent>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CalendarListEntry: ResolverTypeWrapper<CalendarListEntry>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Message: ResolverTypeWrapper<Message>;
  Headers: ResolverTypeWrapper<Headers>;
  MessageList: ResolverTypeWrapper<MessageList>;
  Attachment: ResolverTypeWrapper<Attachment>;
  Label: ResolverTypeWrapper<Label>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Mutation: {};
  Subscription: {};
  Worksheet: Worksheet;
  Spreadsheet: Spreadsheet;
  Table: Table;
  NumberFormat: NumberFormat;
  Time: Time;
  CalendarEvent: CalendarEvent;
  ID: Scalars['ID'];
  CalendarListEntry: CalendarListEntry;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Message: Message;
  Headers: Headers;
  MessageList: MessageList;
  Attachment: Attachment;
  Label: Label;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  unused?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastModifiedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryLastModifiedDateArgs, 'spreadsheetId'>>;
  spreadsheet?: Resolver<ResolversTypes['Spreadsheet'], ParentType, ContextType, RequireFields<QuerySpreadsheetArgs, 'spreadsheetId'>>;
  fetchTable?: Resolver<ResolversTypes['Table'], ParentType, ContextType, RequireFields<QueryFetchTableArgs, 'spreadsheetId' | 'worksheetTitle' | 'rangeHeaders'>>;
  calendars?: Resolver<Array<Maybe<ResolversTypes['CalendarListEntry']>>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<Maybe<ResolversTypes['CalendarEvent']>>>, ParentType, ContextType, RequireFields<QueryEventsArgs, 'calendarId'>>;
  aggregateEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['CalendarEvent']>>>, ParentType, ContextType, RequireFields<QueryAggregateEventsArgs, 'calendarList'>>;
  authUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<Maybe<ResolversTypes['Label']>>>, ParentType, ContextType, RequireFields<QueryLabelsArgs, never>>;
  messages?: Resolver<Maybe<ResolversTypes['MessageList']>, ParentType, ContextType, RequireFields<QueryMessagesArgs, never>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  unused?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  setOAuthCode?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType, RequireFields<MutationSetOAuthCodeArgs, 'code'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  unused?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "unused", ParentType, ContextType>;
};

export type WorksheetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Worksheet'] = ResolversParentTypes['Worksheet']> = {
  sheetId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sheetType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rowCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  columnCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpreadsheetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Spreadsheet'] = ResolversParentTypes['Spreadsheet']> = {
  spreadsheetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModifiedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  worksheets?: Resolver<Array<ResolversTypes['Worksheet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Table'] = ResolversParentTypes['Table']> = {
  worksheetTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  headers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  formats?: Resolver<Maybe<Array<Maybe<ResolversTypes['NumberFormat']>>>, ParentType, ContextType>;
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSONObject']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NumberFormatResolvers<ContextType = any, ParentType extends ResolversParentTypes['NumberFormat'] = ResolversParentTypes['NumberFormat']> = {
  type?: Resolver<ResolversTypes['NumberFormatType'], ParentType, ContextType>;
  pattern?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Time'] = ResolversParentTypes['Time']> = {
  dateTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeZone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalendarEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['CalendarEvent'] = ResolversParentTypes['CalendarEvent']> = {
  kind?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  etag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  htmlLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  end?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalendarListEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CalendarListEntry'] = ResolversParentTypes['CalendarListEntry']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accessRole?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  threadId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  internalDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  headers?: Resolver<Maybe<ResolversTypes['Headers']>, ParentType, ContextType>;
  labelIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  snippet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  textPlain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  textHtml?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attachments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attachment']>>>, ParentType, ContextType>;
  inline?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attachment']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HeadersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Headers'] = ResolversParentTypes['Headers']> = {
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageListResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageList'] = ResolversParentTypes['MessageList']> = {
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  nextPageToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resultSizeEstimate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attachment'] = ResolversParentTypes['Attachment']> = {
  filename?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  attachmentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Worksheet?: WorksheetResolvers<ContextType>;
  Spreadsheet?: SpreadsheetResolvers<ContextType>;
  Table?: TableResolvers<ContextType>;
  NumberFormat?: NumberFormatResolvers<ContextType>;
  Time?: TimeResolvers<ContextType>;
  CalendarEvent?: CalendarEventResolvers<ContextType>;
  CalendarListEntry?: CalendarListEntryResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Headers?: HeadersResolvers<ContextType>;
  MessageList?: MessageListResolvers<ContextType>;
  Attachment?: AttachmentResolvers<ContextType>;
  Label?: LabelResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
