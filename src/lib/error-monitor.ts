import { ErrorMonitorFactory } from "./ext-sentry-integration";

export const ErrorMonitor = ErrorMonitorFactory({
  dsn: "https://c11af95f3f3b40db82a7a7147efe159e@o273281.ingest.sentry.io/6256249",
  release: process.env.GIT_COMMIT_HASH!,
});
