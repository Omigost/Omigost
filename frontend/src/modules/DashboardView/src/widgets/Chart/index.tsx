import * as React from "react";

export default (app) => ({
    name: "chart",
    description: "Budgets chart",
    initialOptions: {
        graphType: "line",
    },
    optionsForm: {
        type: "object",
        title: "Chart widget",
        description: "Shows your budgets performance",
        properties: {
            graphType: {
                type: "string",
                title: "Default graphing mode",
            },
        },
    },
    content: (options) => (
        <app.client.component
            request={(client) => client.getUserSpendings({
                userId: "815845460664",
                "dateInterval": {
                    "start": "2019-01-01",
                    "end": "2019-04-29",
                },
            })}
        >
            {({data, error, loading}, refresh) => {
                if (loading || !data) return null;
                return (
                    <app.UI.DataProvider
                        data={{
                            columns: [
                                {
                                    name: "Day",
                                    field: "day",
                                    type: "date",
                                    parseFormat: "YYYY-MM-DD",
                                    cursorFormat: "YYYY-MM-DD",
                                    axisFormat: "YYYY-MM-DD",
                                },
                                {
                                    name: "Spending",
                                    field: "spending",
                                    type: "number",
                                },
                            ],
                            rows: data,
                        }}
                    >
                        <app.UI.DataFilter>
                            {(updateFilter) => {
                                return (
                                    <div>
                                        <app.UI.Chart
                                            graphType={options.graphType}
                                            input={"day"}
                                            output={["spending"]}
                                        >
                                            <app.UI.ChartTypeSwitchPanel />
                                            <app.UI.ChartDataOptionsPanel />
                                        </app.UI.Chart>
                                    </div>
                                );
                            }}
                        </app.UI.DataFilter>
                    </app.UI.DataProvider>
                );
            }}
        </app.client.component>
    ),
    width: 7,
    height: 9,
});