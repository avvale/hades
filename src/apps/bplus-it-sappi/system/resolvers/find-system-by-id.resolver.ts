import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindSystemByIdQuery } from '@hades/bplus-it-sappi/system/application/find/find-system-by-id.query';
import { BplusItSappiSystem } from './../../../../graphql';

@Resolver()
export class FindSystemByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindSystemById')
    async main(@Args('id') id: string): Promise<BplusItSappiSystem>
    {
        return await this.queryBus.ask(new FindSystemByIdQuery(id));
    }
}