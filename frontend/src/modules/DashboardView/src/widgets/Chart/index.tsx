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
        <app.UI.Chart
            graphType={options.graphType}
            input={"x"}
            output={["z", "y"]}
        >
            <app.UI.ChartTypeSwitchPanel />
            <app.UI.ChartDataOptionsPanel />
        </app.UI.Chart>
    ),
    width: 7,
    height: 9,
});