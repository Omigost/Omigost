import React from 'react';
import renderer from 'react-test-renderer';

import SectionRight from '../SectionRight.jsx';

test('Snapshot test of SectionLeft', () => {
    const component = renderer.create(
        <SectionRight>
            <div>A</div>
        </SectionRight>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});