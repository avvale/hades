import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindDataLakeByIdQuery } from '@hades/bplus-it-sappi/data-lake/application/find/find-data-lake-by-id.query';
import { BplusItSappiDataLake } from './../../../../graphql';

@Resolver()
export class FindDataLakeByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindDataLakeById')
    async main(@Args('id') id: string): Promise<BplusItSappiDataLake>
    {
        return await this.queryBus.ask(new FindDataLakeByIdQuery(id));
    }
}