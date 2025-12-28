import serverless from 'serverless-http';
import app from '../../backend/server.js';
import connectMongoDB from '../../backend/db/connectMongoDB.js';

// Connect to database context
connectMongoDB();

export const handler = serverless(app);
