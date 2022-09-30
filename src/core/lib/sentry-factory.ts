import { BrowserClient, EventHint, Hub } from "@sentry/browser";
import {
  OPTIONS_BROWSER_SDK,
  OPTIONS_REACT_SDK,
  startSessionTracking,
} from "./sentry-internal";

export interface Params {
  dsn: string;
  release: string;
}

export const ErrorMonitorFactory = ({ dsn, release }: Params) => {
  const client = new BrowserClient({
    ...OPTIONS_BROWSER_SDK,
    ...OPTIONS_REACT_SDK,
    dsn,
    environment: "production",
    release,
    enabled: process.env.NODE_ENV === "production",

    // integrations: [new BrowserTracing()],
    // tracesSampleRate: 1.0,
  });

  const hub = new Hub(client);
  hub.bindClient(client);

  if (OPTIONS_BROWSER_SDK.autoSessionTracking) startSessionTracking(hub);

  return {
    logException: (error: any) => {
      hub.run((currentHub) => {
        const eventHint: EventHint = {};

        // special handling for network errors
        if (error.status && error.url) {
          const { status, url, data } = error;

          error = new Error(`HTTP ${status} - ${url}`);

          eventHint.captureContext = {
            fingerprint: [String(status), url],
            contexts: data ? { "response body": data } : undefined,
          };
        }

        currentHub.captureException(error, eventHint);
      });
    },
  };
};
