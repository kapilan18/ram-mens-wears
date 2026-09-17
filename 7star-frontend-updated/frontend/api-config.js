// Set this to the deployed backend API origin before publishing the static frontend.
// Example: window.RAM_API_BASE = 'https://your-backend.onrender.com/api';
const localApiBase = window.location.protocol === 'file:'
	? 'http://localhost:5000/api'
	: `${window.location.protocol}//${window.location.hostname}:5000/api`;
window.RAM_API_BASE = window.RAM_API_BASE || localApiBase;
