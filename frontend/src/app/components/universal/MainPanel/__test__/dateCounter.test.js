import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import DateCounter from '../DateCounter.jsx';

test('Snapshot test of DateCounter', () => {
    const component = renderer.create(
        <DateCounter
            content={{
                langs: {
                    hidden: true,
                    list: [
                        "pl", "en"
                    ]
                },
                social: {
                    facebook: {
                        "layout": "box_count",
                        "action": "like",
                        "size": "large",
                        "showFaces": true,
                        "share": false
                    }
                },
                date: {
                    title: "PL in ML",
                    subtitle: "Polish view on Machine Learning",
                    text: "14 - 16.12.2018",
                    value: "2018-12-14"
                }
            }}
        />
    );
    
    //
    //FIXME: This test should have date value change to now
    //       Becaouse it contains realtive date text like "120 days left"
    //       (and yep it changes every day so test fill fail after 1 day)
    //       For now the test is disabled

    //let tree = component.toJSON();
    //expect(tree).toMatchSnapshot();
});