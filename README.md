# Feedback Focal - Plugin

TypeScript Plugin for [Feedback Focal](https://feedbackfocal.com).

## Installation

**npm**
`npm install @feedbackfocal/plugin`

**yarn**
`yarn add @feedbackfocal/plugin`

## Usage

### React

1. Import `addFeedbackFocal` from `@feedbackfocal/plugin`.
2. Call `addFeedbackFocal` in `main.tsx` and pass configuration:

```tsx
import { addFeedbackFocal } from "@feedbackfocal/plugin";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

addFeedbackFocal({
  projectCode: "<project-code>",
  screenshotMechanism: "<screenshot-mechanism>",
});
```

## Configuration

### Project Code

**Key:** `projectCode`

**Description:** A UUID associated with a project in Feedback Focal. All logins, feedback, and review sessions will be routed to the associated project.

### Screenshot Mechanism

**Key:** `screenshotMechanism`

**Description:** Specifies the mechanism through which screenshots should be taken.

**Options:**

`screen-capture-api`

- Captures visually accurate screenshot using [Screen Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API).
  - This method will prompt the user to allow the screenshot to be taken and manually select the current tab unless their browser supports the experimental [preferCurrentTab](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia#prefercurrenttab) option.
- All major mobile browsers do not support the Screen Capture API.

`dom-to-image`

- Mimics a screenshot by cloning the DOM, painting it on a canvas, and converting that to an image.
  - Currently uses [bubkoo/html-to-image](https://github.com/bubkoo/html-to-image) to handle the DOM to image conversion.
- Does not require additional prompting of the user and (theoretically) should work in all browsers, unlike the Screen Capture API, but produces lower quality images which commonly have artifacts or other rendering issues, and may not accurately represent what the user sees.
