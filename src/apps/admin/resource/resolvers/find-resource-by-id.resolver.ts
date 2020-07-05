import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { AdminResource } from './../../../../graphql';

@Resolver()
export class FindResourceByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindResourceById')
    async main(@Args('id') id: string): Promise<AdminResource>
    {
        return await this.queryBus.ask(new FindResourceByIdQuery(id));
    }
}