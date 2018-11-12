import React from 'react'

import * as styles from './SideDescription.css'
import ReactMarkdown from 'react-markdown'
import withContent from 'utils/withContent.js'

function LinkBlank(props) {
  return <a href={props.href} target="_blank">{props.children}</a> || '';
}

class SideDescription extends React.Component {

    render() {
        const data = this.props.content[`${this.props.for}Description`];
        const content = (data && data.join)?(data.join('\n')):(''+data);
        return (
            <div styleName='SideDescription' className={this.props.className}>
                <table styleName='Table'>
                    <tbody>
                        <tr>
                            <td styleName='Description'>
                                <ReactMarkdown
                                  source={content || ''}
                                  renderers={{link: LinkBlank}}
                                  styleName='DescriptionContent'
                                />
                            </td>
                            <td styleName='Content'>
                                {this.props.children}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
};

export default withContent(SideDescription);
