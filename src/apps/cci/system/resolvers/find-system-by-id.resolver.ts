import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';
import { CciSystem } from './../../../../graphql';

@Resolver()
export class FindSystemByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindSystemById')
    async main(@Args('id') id: string): Promise<CciSystem>
    {
        return await this.queryBus.ask(new FindSystemByIdQuery(id));
    }
}