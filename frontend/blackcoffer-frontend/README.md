Frontend Overview
This React dashboard visualizes data using D3.js charts and interactive filters.

How It Works
Filters: Controlled by the Filterbar component, filter settings are stored in the App state and passed to all charts.

Data Fetching: Each chart fetches filtered data from backend APIs via Axios when filters change.

Charts: Rendered with D3 inside SVGs, featuring animations and tooltips.

Filtering
Click the Filterbar to open a modal.
Choose a key to filter the data.
Scroll down and click the Close button to apply the filter.

Running the Frontend
Start the backend server.

Run the React app (npm start).

Interact with filters to update visualizations dynamically.