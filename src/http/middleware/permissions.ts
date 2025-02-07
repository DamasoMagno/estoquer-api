import { Request, Response, NextFunction } from "express";

interface RoleProps {
  roles: string[];
}

export function permissions({ roles }: RoleProps) {
  return (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;

    if (!roles.includes(user.role)) {
      response.status(500).json({
        error: "Você não tem permissão para acessar essa rota.",
      });

      return;
    }

    return next();
  };
}
