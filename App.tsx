// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Nav from './src/navigation';

function App() {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
}

export default App;
