import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRoleByIdQuery } from '@hades/cci/role/application/find/find-role-by-id.query';
import { CciRole } from './../../../../graphql';

@Resolver()
export class FindRoleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindRoleById')
    async main(@Args('id') id: string): Promise<CciRole>
    {
        return await this.queryBus.ask(new FindRoleByIdQuery(id));
    }
}