import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindDataLakeByIdQuery } from '@hades/cci/data-lake/application/find/find-data-lake-by-id.query';
import { CciDataLake } from './../../../../graphql';

@Resolver()
export class FindDataLakeByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindDataLakeById')
    async main(@Args('id') id: string): Promise<CciDataLake>
    {
        return await this.queryBus.ask(new FindDataLakeByIdQuery(id));
    }
}