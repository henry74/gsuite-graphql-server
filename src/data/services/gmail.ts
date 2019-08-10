import { google } from "googleapis";
import { fetchAuthClient } from "./auth";
import { Label, MessageList, Message } from "../../generatedTypes";
import { ApolloError } from "apollo-server-core";
import * as parsedMessage from "gmail-api-parse-message";

export const labels = async (
  emailAddress: string = "me"
): Promise<Array<Label>> => {
  const auth = await fetchAuthClient();
  const gmail = google.gmail({ version: "v1", auth });
  try {
    const { data } = await gmail.users.labels.list({ userId: emailAddress });
    const response = data.labels.map(label => {
      const { id, name, type } = label;

      return {
        id,
        name,
        type
      };
    });
    return response;
  } catch (err) {
    throw new ApolloError(err);
  }
};

export const fetchMessages = async (
  emailAddress: string = "me",
  query: string,
  maxResults: number,
  labelIds: Array<string> = [],
  nextPageToken: string
): Promise<MessageList> => {
  const auth = await fetchAuthClient();
  const gmail = google.gmail({ version: "v1", auth });
  try {
    const { data } = await gmail.users.messages.list({
      userId: emailAddress,
      q: query,
      maxResults,
      labelIds,
      pageToken: nextPageToken
    });
    const messages = data.messages.map(message => {
      const { id } = message;
      return {
        id
      };
    });
    return {
      messages,
      resultSizeEstimate: data.resultSizeEstimate,
      nextPageToken: data.nextPageToken ? data.nextPageToken : ""
    };
  } catch (err) {
    throw new ApolloError(err);
  }
};

export const message = async (messageId: string): Promise<Message> => {
  const auth = await fetchAuthClient();
  const gmail = google.gmail({ version: "v1", auth });
  try {
    const { data } = await gmail.users.messages.get({
      id: messageId,
      userId: "me"
    });

    const {
      id,
      threadId,
      labelIds,
      snippet,
      internalDate,
      attachments,
      inline,
      textPlain,
      textHtml,
      headers: { from, to, cc, subject, date }
    } = parsedMessage(data);

    return {
      id,
      threadId,
      labelIds,
      snippet,
      headers: {
        from,
        to,
        cc: cc ? cc : "",
        subject,
        date
      },
      internalDate,
      attachments: attachments ? attachments : [],
      inline: inline ? inline : [],
      textPlain,
      textHtml
    };
  } catch (err) {
    throw new ApolloError(err);
  }
};
