import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import Button from "./index";

storiesOf("Button", module)
  .add("with text", () => (
    <Button>
        {text("Content", "Hello!")}
    </Button>
  ));
