import * as React from "react";
import styled from "styled-components";

import { setAddon, configure, addDecorator } from "@storybook/react";
import { withThemes } from "storybook-styled-components";
import { jsxDecorator } from "storybook-addon-jsx";
import { withKnobs } from "@storybook/addon-knobs";

import JSXAddon from "storybook-addon-jsx";
setAddon(JSXAddon);


import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChartArea, faChartBar, faChartLine,
  faClock, faCommentAlt, faDollarSign, faDownload, faFlag,
  faPlus, faRulerHorizontal, faRulerVertical, faSearchDollar,
  faShieldAlt, faTachometerAlt, faTools, faUpload, faUserCircle,
  faWindowClose, faWindowMaximize, faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faUserCircle, faTachometerAlt, faSearchDollar,
    faTools, faChartBar, faDownload, faUpload, faShieldAlt,
    faCommentAlt, faFlag, faPlus, faDollarSign,
    faRulerHorizontal, faRulerVertical, faChartArea, faClock, faChartLine,
    faWindowMinimize, faWindowMaximize, faWindowClose,
);

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /(\.stories|\.story)\.tsx?$/);
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

const Wrapper = styled.div`
  font-family: Raleway, sans-serif;
  text-align: center;
`;

const WrapperDecorator = storyFn => (
    <Wrapper>
      {storyFn()}
    </Wrapper>
);

addDecorator(withKnobs);
addDecorator(withThemes(themes));
addDecorator(WrapperDecorator);

configure(loadStories, module);
