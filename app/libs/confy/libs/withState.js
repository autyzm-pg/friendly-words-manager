import * as React from "react"

export default withState = (initialState = {}, stateToProps = () => ({}), setStateToProps = () => ({})) => Component => (
    class StateWrapper extends React.Component {
        constructor() {
            super()
            this.state = initialState
        }

        render() {
            const stateProps = stateToProps(this.state, this.props)
            const handlersProps = setStateToProps(this.setState.bind(this), {...stateProps,  ...this.props})
            return <Component {...stateProps} {...handlersProps} {...this.props}/>
        }

    }
)