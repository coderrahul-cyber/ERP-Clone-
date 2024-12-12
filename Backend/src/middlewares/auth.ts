import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a custom type for Request to include `userId`
interface CustomRequest extends Request {
  userId?: string;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
//   console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Not Authorized' });
    return; 
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, "anehgjad" ) as { _id: string };
    req.userId = decoded._id; // Add userId to the request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
    return; 
  }
};

export default authMiddleware;
