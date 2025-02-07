import { hash } from "bcryptjs";
import { Role } from "@prisma/client";
import { UserRepository } from "../../repositories/user/UserRepository";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  cpf: string;
  role: Role;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository){}

  async handle({ email, password, birthday, cpf, name, role }: CreateUser) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("Usuário já cadastrado no sistema.");
    }

    const passwordHashed = await hash(password, 10);

    await this.userRepository.create({
      birthday,
      cpf,
      name,
      password: passwordHashed,
      email,
      role
    }) 
  }
}
