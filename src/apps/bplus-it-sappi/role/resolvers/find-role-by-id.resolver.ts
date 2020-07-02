import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindRoleByIdQuery } from '@hades/bplus-it-sappi/role/application/find/find-role-by-id.query';
import { BplusItSappiRole } from './../../../../graphql';

@Resolver()
export class FindRoleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindRoleById')
    async main(@Args('id') id: string): Promise<BplusItSappiRole>
    {
        return await this.queryBus.ask(new FindRoleByIdQuery(id));
    }
}