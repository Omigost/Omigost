import * as React from "react";

import Meter from "./Meter";
import Grid from "./Grid";
import Chart from "./Chart";

const WIDGETS = (app) => ([
    Meter(app),
    Grid(app),
    Chart(app),
])

export default WIDGETS;