#!/usr/bin/env node

// Set the PORT environment variable and start React
process.env.PORT = '3001';
process.env.BROWSER = 'none'; // Don't auto-open browser

// Start the React development server
require('react-scripts/scripts/start');