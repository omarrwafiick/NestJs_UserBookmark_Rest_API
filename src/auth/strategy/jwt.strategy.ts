import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'generated/prisma';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
   constructor(config: ConfigService, private dbservice: PrismaService) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) 
      throw new Error('JWT_SECRET is not defined in environment variables');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }
  
  async validate(payload: any): Promise<User | null> { 
    return await this.dbservice.user.findUnique({
      where:{
        email: payload.email
      }
    });
  }
}
