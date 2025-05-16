import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService,private prisma: PrismaClient){
        super({
            datasources:{
                db:{
                    url:config.get('DATABASE_URL')
                }
            }
        });
    }
    async deleteById<T extends keyof PrismaClient>(model: T, id: number): Promise<boolean> {
        try {
            const table = this.prisma[model] as any;
            await table.delete({ where: { id } });
            return true;
        } catch {
            return false;
        }
    }
}
