import { Resolver, Query, Args, Context } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { IamAccount } from './../../../../graphql';

@Resolver()
export class FindMeAccountResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindMeAccount')
    async main(@Context() context): Promise<IamAccount>
    {
        // return await this.queryBus.ask(new FindAccountByIdQuery(id));

        console.log(context.req.headers.authorization);
        

        return null;
    }
}