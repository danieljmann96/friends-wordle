import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './components/AppRoot';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div>
      <AppRoot />
    </div>
  );
}

ReactDOM.render(App(), document.getElementById('root'));
