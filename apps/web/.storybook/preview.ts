import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Warm Canvas",
      values: [
        { name: "Warm Canvas", value: "#faf9f7" },
        { name: "Dark Surface", value: "#1a1f2c" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "390px", height: "844px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "1024px", height: "768px" },
        },
      },
    },
  },
};

export default preview;
