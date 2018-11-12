import React from 'react';
import renderer from 'react-test-renderer';

import SectionLeft from '../SectionLeft.jsx';

test('Snapshot test of SectionLeft', () => {
    const component = renderer.create(
        <SectionLeft>
            <div>A</div>
        </SectionLeft>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});