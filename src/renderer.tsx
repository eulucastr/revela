import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  const rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);

  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
