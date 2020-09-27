import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { JwtToken } from '@hades/shared/domain/lib/hades.types';
import { IamAccount } from './../../../../graphql';

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
        // return await this.queryBus.ask(new FindAccountByIdQuery(id));

        const token: JwtToken = context.req.headers.authorization.replace('Bearer ', '');


        // this.jwtService.verify(context.req.headers.authorization)
        this.jwtService.decode(token));

        return null;
    }
}