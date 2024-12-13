import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface CustomRequest extends Request {
  userId?: string;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ success: false, message: 'Not Authorized' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ) as { _id: string };
    req.userId = decoded._id;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
    return; 
  }
};

export default authMiddleware;
