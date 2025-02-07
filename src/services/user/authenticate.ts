import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../../repositories/user/UserRepository";

interface AuthenticateUser {
  email: string;
  password: string;
}

export class AuthenticateUserService {
    constructor(private userRepository: UserRepository){}
  
  async handle({ email, password }: AuthenticateUser) {
    const userExists = await this.userRepository.findByEmail(email);

    if (!userExists) {
      throw new Error("Email/Senha incorretos");
    }

    const match = await compare(password, userExists.password);

    if (!match) {
      throw new Error("Email/Senha incorretos");      
    }

    const token = sign(
      {
        role: userExists.role,
      },
      "estoquer",
      {
        subject: userExists.id,
        expiresIn: "7d",
      }
    );

    return {
      token,
      user: userExists,
    }
  }
}
