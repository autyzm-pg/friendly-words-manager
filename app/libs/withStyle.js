import React from "react"

export const withStyle = styles => Component => (props) => <Component style={styles} {...props}/>