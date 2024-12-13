import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  // console.log("token: ", token);

  if (!token) {
    res.status(401).json({ message: "Access token missing or invalid" });
    return;
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET as string);
    console.log("decoded user: ", decoded);
    // req.user = decoded;
    next(); 
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};


// const token = req.headers.authorization
//   if (token) {
//     try {
//       const user = jwt.verify(token.split(' ')[1], parsedenv.JWTPRIVATEKEY)
//       ;(req as any).user = user
//       next()
//     } catch (error) {
//       res.status(HttpStatusCode.FORBIDDEN).json(getErrorMessage(error))
//     }
//   } else {
//     res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' })
//   }
// }