import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MIDIProvider from './MIDIProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <MIDIProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MIDIProvider>
);

