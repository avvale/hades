import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindPermissionByIdQuery } from '@hades/admin/permission/application/find/find-permission-by-id.query';
import { AdminPermission } from './../../../../graphql';

@Resolver()
export class FindPermissionByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindPermissionById')
    async main(@Args('id') id: string): Promise<AdminPermission>
    {
        return await this.queryBus.ask(new FindPermissionByIdQuery(id));
    }
}