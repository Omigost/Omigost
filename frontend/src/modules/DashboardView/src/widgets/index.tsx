
import Bar from "./Bar";
import Chart from "./Chart";
import Grid from "./Grid";
import Meter from "./Meter";

const WIDGETS = (app) => ([
    Meter(app),
    Grid(app),
    Chart(app),
    Bar(app),
]);

export default WIDGETS;