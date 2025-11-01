import React, { Component } from 'react'

import NavBar from './components/NavBar';
import News from './components/News';
export  class App extends Component {
  render() {
    return (
     
       <div>
             <NavBar/>
              
              <News pageSize={6} country='in' category='science'/>
            </div>
      
    )
  }
}
export default App;
