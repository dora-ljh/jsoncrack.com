// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://8cf6a347488043f4f9d3c29deade3e9a@o933729.ingest.us.sentry.io/4507060250935296",
    tracesSampleRate: 0.2,
    debug: false,
    release: `${process.env.SENTRY_RELEASE || "production"}`,
    allowUrls: ["https://jsoncrack.com/editor"],
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}
