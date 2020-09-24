import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { IamAccount } from './../../../../graphql';

@Resolver()
export class FindAccountByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindAccountById')
    async main(@Args('id') id: string): Promise<IamAccount>
    {
        return await this.queryBus.ask(new FindAccountByIdQuery(id));
    }
}