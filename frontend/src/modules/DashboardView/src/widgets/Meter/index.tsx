import * as React from "react";

export default (app) => ({
    name: "meter",
    description: "Widget to meter things",
    initialOptions: {
        title: "Test!",
    },
    optionsForm: {
        type: "object",
        title: "Meter widget",
        description: "Shows single value",
        properties: {
            title: {
                type: "string",
            },
        },
    },
    content: (options) => (
        <div>
            <app.UI.TinyButtons info="This meter shows something and here we have a little description of what exactly it shows."/>
            <app.UI.Meter
                value={30}
                label={options.title}
                format={(value) => `\$ ${value}`}
                tooltipContent={<div>{options.title}</div>}
            />
        </div>
    ),
    width: 2,
    height: 6,
});