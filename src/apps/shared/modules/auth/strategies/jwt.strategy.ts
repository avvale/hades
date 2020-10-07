
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { EnvironmentService } from '@hades/shared/domain/environment/environment.service';
import { Jwt } from '@hades/shared/domain/lib/hades.types';
import { FindAccountQuery } from '@hades/iam/account/application/find/find-account.query';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly environmentService: EnvironmentService,
    ) 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: environmentService.get('OAUTH_JWT_PUBLIC_KEY'),
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