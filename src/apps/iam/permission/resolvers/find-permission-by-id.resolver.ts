import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';
import { IamPermission } from './../../../../graphql';

@Resolver()
export class FindPermissionByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindPermissionById')
    async main(@Args('id') id: string): Promise<IamPermission>
    {
        return await this.queryBus.ask(new FindPermissionByIdQuery(id));
    }
}