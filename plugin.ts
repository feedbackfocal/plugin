import AppSettings from "appsettings.json";

export type FeedbackMechanism = "dom-to-image" | "screen-capture-api";

export interface FeedbackFocalOptions {
  projectCode: string;
  screenshotMechanism: FeedbackMechanism;
  testId?: number;
}

declare global {
  interface Window {
    FeedbackFocalClient?: {
      Client?: {
        new (options: FeedbackFocalOptions): any;
      };
      BUILD_VERSION: string;
    };
  }
}

const SCRIPT_ID = "feedbackfocal-client";

function loadScript(scriptId: string, src: string, callback: () => void): void {
  if (document.getElementById(scriptId)) {
    console.warn(format("Script already loaded."));
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = src;
  script.async = true;
  script.onload = callback;
  script.onerror = () =>
    console.error(format("Failed to load FeedbackFocal script"));

  document.head.appendChild(script);
}

export function addFeedbackFocal(options: FeedbackFocalOptions): void {
  loadScript(SCRIPT_ID, AppSettings.CLIENT_BUNDLE_URL, () => {
    if (typeof window.FeedbackFocalClient === "undefined") {
      console.error(format("module not found"));
      return;
    }

    const { Client: FeedbackFocalClient, BUILD_VERSION = "Unknown" } =
      window.FeedbackFocalClient;

    const buildVersionTag = `(build: ${BUILD_VERSION})`;

    if (typeof FeedbackFocalClient === "undefined") {
      console.error(format(`client ${buildVersionTag} not found`));
      return;
    }

    try {
      new FeedbackFocalClient(options);
    } catch (error) {
      console.error(error);
      console.error(format(`failed to register client`));
    }
  });
}

function format(message: string): string {
  return `FeedbackFocalPlugin: ${message}`;
}
