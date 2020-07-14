import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindModuleByIdQuery } from '@hades/bplus-it-sappi/module/application/find/find-module-by-id.query';
import { BplusItSappiModule } from './../../../../graphql';

@Resolver()
export class FindModuleByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindModuleById')
    async main(@Args('id') id: string): Promise<BplusItSappiModule>
    {
        return await this.queryBus.ask(new FindModuleByIdQuery(id));
    }
}