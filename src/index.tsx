import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerSW, sendPerformanceMetrics } from './utils/serviceWorker';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for performance and offline support
registerSW();

// Enhanced performance monitoring with Web Vitals
reportWebVitals((metric) => {
  console.log('Web Vital:', metric);
  
  // Send to service worker for potential analytics
  sendPerformanceMetrics(metric);
  
  // You can also send to your analytics service here
  // analytics.track('Web Vital', metric);
});
