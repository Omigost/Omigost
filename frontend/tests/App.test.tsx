import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import App from "../src/components/App";

it("App is rendered", () => {
    // Render App in the document
    TestUtils.renderIntoDocument(
        <App/>,
    );

    //const appNode = ReactDOM.findDOMNode(appElement);

    // Verify text content
    //expect(appNode.textContent).toEqual('Hello World!Foo to the barz');
});
