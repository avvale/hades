import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';
import { IamRole } from './../../../../graphql';

@Resolver()
export class FindRoleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindRoleById')
    async main(@Args('id') id: string): Promise<IamRole>
    {
        return await this.queryBus.ask(new FindRoleByIdQuery(id));
    }
}