// Set window.RAM_API_BASE before this file when using another API environment.
const deployedApiBase = 'https://ram-mens-website.onrender.com/api';
const localApiBase = window.location.protocol === 'file:'
	? 'http://localhost:5000/api'
	: `${window.location.protocol}//${window.location.hostname}:5000/api`;
window.RAM_API_BASE = window.RAM_API_BASE || (window.location.hostname === 'localhost' || window.location.protocol === 'file:' ? localApiBase : deployedApiBase);
