import React from 'react'

import ReactMarkdown from 'react-markdown'

function LinkBlank(props) {
  return <a href={props.href} target="_blank">{props.children}</a> || '';
}

class MD extends React.Component {
  render() {
    const { children } = this.props;
    
    return (
      <div>
        <ReactMarkdown
          source={children || ''}
          renderers={{link: LinkBlank}}
        />
      </div>
    )
  }
}

export default MD