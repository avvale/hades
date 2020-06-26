import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindModuleByIdQuery } from '@hades/admin/module/application/find/find-module-by-id.query';
import { AdminModule } from './../../../../graphql';

@Resolver()
export class FindModuleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindModuleById')
    async main(@Args('id') id: string): Promise<AdminModule>
    {
        return await this.queryBus.ask(new FindModuleByIdQuery(id));
    }
}