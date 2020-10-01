import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';
import { CciModule } from './../../../../graphql';

@Resolver()
export class FindModuleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindModuleById')
    async main(@Args('id') id: string): Promise<CciModule>
    {
        return await this.queryBus.ask(new FindModuleByIdQuery(id));
    }
}