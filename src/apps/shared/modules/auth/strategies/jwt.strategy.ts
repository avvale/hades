import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { Jwt } from '@hades/shared/domain/lib/hades.types';
import { FindAccountQuery } from '@hades/iam/account/application/find/find-account.query';
import * as fs from 'fs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private readonly queryBus: IQueryBus
    ) 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: fs.readFileSync('src/oauth-public.key'),
            algorithms: ['RS256'],
        });
    }
    
    async validate(payload: Jwt) 
    {
        const user = await this.queryBus.ask(new FindAccountQuery({
            where: {
                id: payload.aci
            },
            include: ['user']
        }));
        
        return user;
    }
}