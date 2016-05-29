import React from 'react'
import ReactDOM from 'react-dom'

console.log("Hi!")

class Root extends React.Component {
  render(){
    return (<h3> Hi from react! </h3>)
  }
}

ReactDOM.render(<Root />, document.getElementById("react-root"))
