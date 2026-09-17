# Security Notes

The original `.env` file was previously committed to Git history before being removed from tracking. Rotate all values that may have appeared in that file before production use:

- MongoDB username/password and connection credentials
- `JWT_SECRET`
- Any administrator password

Do not rewrite Git history from this project workflow. Rotate the credentials in MongoDB Atlas and Render, then update the local `.env` and Render environment variables. Never commit `.env` or real credentials.

## Render CORS

Set the Render environment variable `CLIENT_ORIGIN` to the deployed Vercel frontend URL. Include local origins too when needed, separated by commas:

`http://localhost:5500,http://127.0.0.1:5500,https://ram-mens-wears.vercel.app`
