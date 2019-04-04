import { configure, addDecorator } from "@storybook/react";
import { withThemes } from "storybook-styled-components";
import { jsxDecorator } from "storybook-addon-jsx";
import { withKnobs } from '@storybook/addon-knobs';

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /(\.stories|\.story)\.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const defaultTheme = {
  primaryFont: "Raleway, sans-serif",
  colors: {
    background: "#F7F7F7",
    primary: "#EB3349",
    secondary: "#F45C43",
    palette: [
      "#47A0ED",
    ],
    primaryText: "#1B0000",
    accent: "#474747",
    primaryGradient: "linear-gradient(to right, #EB3349, #F45C43)",
    lightAccent: "white",
  },
  fontSize: {
    S: "0.7vw",
    default: "1vw",
    M: "1.2vw",
    L: "1.5vw",
    XL: "2vw",
    XXL: "3vw",
  },
};

const themes = {
  "Default": defaultTheme,
};

addDecorator(withKnobs);
addDecorator(jsxDecorator);
addDecorator(withThemes(themes));

configure(loadStories, module);
