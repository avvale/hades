import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRoleByIdQuery } from '@hades/admin/role/application/find/find-role-by-id.query';
import { AdminRole } from './../../../../graphql';

@Resolver()
export class FindRoleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindRoleById')
    async main(@Args('id') id: string): Promise<AdminRole>
    {
        return await this.queryBus.ask(new FindRoleByIdQuery(id));
    }
}