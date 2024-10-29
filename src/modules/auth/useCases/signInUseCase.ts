import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/entities/User';
import { UserPayload } from '../models/userPayload';
import { UserRepository } from '../../../modules/user/repositories/userRepository';
import { AuthValueIncorrectException } from '../exceptions/authValueIncorrectException';

interface SignInRequest {
  user?: User;
  emailOfUserLoggedWithGoogle?: string;
}

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async execute({ user, emailOfUserLoggedWithGoogle }: SignInRequest) {
    if (emailOfUserLoggedWithGoogle) {
      const user = await this.userRepository.findByEmail(
        emailOfUserLoggedWithGoogle,
      );

      if (!user) {
        throw new AuthValueIncorrectException();
      }

      const payload: UserPayload = {
        created_at: user.created_at,
        email: user.email,
        name: user.name,
        sub: user.id,
      };

      const jwtToken = this.jwtService.sign(payload);

      return jwtToken;
    }

    const payload: UserPayload = {
      created_at: user.created_at,
      email: user.email,
      name: user.name,
      sub: user.id,
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
