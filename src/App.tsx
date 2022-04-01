import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './components/AppRoot';
import '@fontsource/roboto';

function App() {
  return (
    <div>
      <AppRoot />
    </div>
  );
}

ReactDOM.render(App(), document.getElementById('root'));
