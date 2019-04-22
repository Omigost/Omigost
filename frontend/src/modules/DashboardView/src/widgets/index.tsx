import * as React from "react";

import Meter from "./Meter";
import Grid from "./Grid";
import Chart from "./Chart";
import Bar from "./Bar";

const WIDGETS = (app) => ([
    Meter(app),
    Grid(app),
    Chart(app),
    Bar(app),
])

export default WIDGETS;