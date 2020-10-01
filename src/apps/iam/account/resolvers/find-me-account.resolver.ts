import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';
import { JwtToken } from '@hades/shared/domain/lib/hades.types';
import { IamAccount } from './../../../../graphql';
import { FindAccountQuery } from '@hades/iam/account/application/find/find-account.query';

@Resolver()
export class FindMeAccountResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService
    ) {}

    @Query('iamFindMeAccount')
    async main(@Context() context): Promise<IamAccount>
    {
        // get token from Headers
        const jwtToken: JwtToken = <JwtToken>this.jwtService.decode(context.req.headers.authorization.replace('Bearer ', ''));

        // get access token from database
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(jwtToken.jit));

        // get account who belongs this token
        const account = await this.queryBus.ask(new FindAccountQuery({
            where: {
                id: accessToken.accountId
            },
            include: ['user', 'tenants']
        }));

        return account;
    }
}