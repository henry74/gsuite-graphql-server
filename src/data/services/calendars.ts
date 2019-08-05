import { google } from "googleapis";
import { CalendarListEntry, CalendarEvent } from "../../generatedTypes";
import { ApolloError } from "apollo-server-core";
import { fetchAuthClient } from "./auth";

export const list = async (): Promise<Array<CalendarListEntry>> => {
  const auth = await fetchAuthClient();
  const calendar = google.calendar({ version: "v3", auth });
  try {
    const { data } = await calendar.calendarList.list();
    const response = data.items.map(calendar => {
      const { id, summary, primary, accessRole } = calendar;
      return {
        id,
        summary,
        primary,
        accessRole
      };
    });
    return response;
  } catch (err) {
    throw new ApolloError(err);
  }
};

export const aggregateEvents = async (
  calendarList: Array<string>,
  maxResults: number = 10
): Promise<Array<CalendarEvent>> => {
  const results = await Promise.all(
    calendarList.map(calendarId => {
      return events(calendarId, maxResults);
    })
  );

  return results
    .flat()
    .sort((a, b) => {
      return Date.parse(a.start.dateTime) - Date.parse(b.start.dateTime);
    })
    .slice(0, maxResults);
};

export const events = async (
  calendarId: string,
  maxResults: number = 10
): Promise<Array<CalendarEvent>> => {
  const auth = await fetchAuthClient();
  const calendar = google.calendar({ version: "v3", auth });
  try {
    const { data } = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: "startTime"
    });
    const response = data.items.map(event => {
      const {
        kind,
        etag,
        status,
        htmlLink,
        id,
        summary,
        description,
        location,
        start,
        end
      } = event;

      return {
        kind,
        etag,
        status,
        htmlLink,
        id,
        summary,
        description: description ? description : "",
        location: location ? location : "",
        start: {
          ...start,
          ...{
            dateTime: start.dateTime || start.date,
            timeZone: start.timeZone ? start.timeZone : ""
          }
        },
        end: {
          ...end,
          ...{
            dateTime: end.dateTime || end.date,
            timeZone: end.timeZone ? end.timeZone : ""
          }
        }
      };
    });
    return response;
  } catch (err) {
    throw new ApolloError(err);
  }
};
