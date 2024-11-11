import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { ObjectId } from 'mongodb'; // Assuming you are using MongoDB ObjectId

// Extending Express Request to include userId and auth0Id
declare global {
  namespace Express {
    interface Request {
      userId?: string;  // Use primitive `string`
      auth0Id?: string;
    }
  }
}

// Auth0 JWT validation middleware
export const jwtCheck = auth({
  audience: process.env.Auth0_AUDIENCE,
  issuerBaseURL: process.env.Auth0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

// Middleware to parse JWT and extract user information
export const jwtParse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.sendStatus(401);  // Unauthorized
    return;
  }

  const token = authorization.split(" ")[1];  // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;  // Extract auth0Id (subject)

    if (!auth0Id) {
      res.sendStatus(401);  // Unauthorized if no sub found
      return;
    }

    // Find user in the database using the auth0Id
    const user = await User.findOne({ auth0Id });

    if (!user) {
      res.sendStatus(401);  // Unauthorized if user not found
      return;
    }

    // Attach auth0Id and userId to the request object
    req.auth0Id = auth0Id;  // No need for type casting
    req.userId = (user._id as ObjectId).toString();  // Convert ObjectId to string

    next();  // Proceed to the next middleware

  } catch (error) {
    res.sendStatus(401);  // Unauthorized on any error
    return;
  }
};
