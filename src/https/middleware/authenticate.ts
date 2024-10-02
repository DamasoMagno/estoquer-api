import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Token {
  sub: string;
  role: string;
}

export function userAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      throw new Error("Unauthorized");
    }

    const tokenValid = verify(token, "estoquer") as Token;

    request.user = {
      id: tokenValid.sub,
      role: tokenValid.role,
    };
    return next();
  } catch (error) {
    console.log(error);
  }
}
