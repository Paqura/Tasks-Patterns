import React from 'react'
import ReactDOM from 'react-dom'

export const getNode = (anchor: HTMLElement | React.Component | null) => {
    if (!anchor) {
        return null
    }

    if (anchor instanceof React.Component) {
        // eslint-disable-next-line
        return ReactDOM.findDOMNode(anchor)
    }

    return anchor
}
