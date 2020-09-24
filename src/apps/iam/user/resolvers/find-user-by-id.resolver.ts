import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';
import { IamUser } from './../../../../graphql';

@Resolver()
export class FindUserByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindUserById')
    async main(@Args('id') id: string): Promise<IamUser>
    {
        return await this.queryBus.ask(new FindUserByIdQuery(id));
    }
}