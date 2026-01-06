# Chat Component Setup Guide

## Overview
The chat component has been successfully implemented with the following features:
- Circular chat icon button in bottom right corner (background color: #fdc5c7)
- Form popup with fields: First Name, Last Name, Email, Subject, Contact Reason
- Contact Reason dropdown with options: Product, Tracking, Career
- Styled to match the Create Item form
- Submit button with background color #fdc5c7
- Responsive design (15% width on desktop, 100% width on mobile)

## Backend Setup (Nodemailer)

### 1. Install Dependencies
Run the following command to install the required backend packages:
```bash
npm install express nodemailer cors
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
RECEIVING_EMAIL=your-receiving-email@gmail.com
PORT=3001
```

**Important Notes:**
- For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- To generate an App Password:
  1. Go to your Google Account settings
  2. Enable 2-Step Verification
  3. Go to App Passwords
  4. Generate a new app password for "Mail"
  5. Use this 16-character password in `EMAIL_PASS`

### 3. Start the Backend Server
Run the server with:
```bash
npm run server
```

Or manually:
```bash
node server.js
```

The server will run on `http://localhost:3001` by default.

### 4. Configure Frontend API URL (Optional)
If your backend is running on a different URL, create a `.env` file in the `src` directory (or add to your existing `.env`):

```env
REACT_APP_API_URL=http://localhost:3001
```

### 5. Testing
1. Start the React app: `npm start`
2. Start the backend server: `npm run server`
3. Click the chat icon in the bottom right corner
4. Fill out the form and submit
5. Check the email address specified in `RECEIVING_EMAIL`

## File Structure

```
FNY/
├── server.js                    # Express backend server with Nodemailer
├── src/
│   ├── components/
│   │   └── ReusableComponents/
│   │       └── Chat.js          # Chat component
│   └── Scss/
│       └── components/
│           └── _chat.scss       # Chat component styles
└── package.json                 # Updated with express, nodemailer, cors
```

## Features

### Chat Icon
- Small circular button (56px)
- Fixed position in bottom right corner
- Background color: #fdc5c7
- Hover effects

### Chat Form
- Dark grey header (#4A4A4A) with "Chat" title
- Header controls: Minimize, Submit (checkmark), Close (X)
- Form fields styled to match Create Item form
- Input borders: #fdc5c7
- Submit button: #fdc5c7 background
- Responsive: 15% width on desktop, 100% width on mobile

### Form Validation
- All fields are required (marked with *)
- Email field validates email format
- Form submission sends data to backend API

## Troubleshooting

### Email Not Sending
1. Verify your `.env` file has correct credentials
2. Check that you're using an App Password for Gmail (not regular password)
3. Ensure the backend server is running
4. Check browser console for errors
5. Check server console for nodemailer errors

### CORS Errors
- The server includes CORS middleware
- If you still see CORS errors, verify the `REACT_APP_API_URL` matches your server URL

### Form Not Submitting
- Check that the backend server is running
- Verify the API endpoint URL in Chat.js matches your server
- Check browser console for network errors

## Production Deployment

For production, you'll need to:
1. Set up environment variables on your hosting platform
2. Update `REACT_APP_API_URL` to point to your production API
3. Consider using a service like SendGrid, Mailgun, or AWS SES instead of direct SMTP
4. Add rate limiting to prevent spam
5. Add proper error handling and logging

