import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataLakeResponse } from './../../domain/data-lake.response';
import { DataLakeMapper } from './../../domain/data-lake.mapper';
import { FindDataLakeQuery } from './find-data-lake.query';
import { FindDataLakeService } from './find-data-lake.service';

@QueryHandler(FindDataLakeQuery)
export class FindDataLakeQueryHandler implements IQueryHandler<FindDataLakeQuery>
{
    private readonly mapper: DataLakeMapper = new DataLakeMapper();

    constructor(
        private readonly findDataLakeService: FindDataLakeService
    ) { }

    async execute(query: FindDataLakeQuery): Promise<DataLakeResponse>
    {
        const dataLake = await this.findDataLakeService.main(query.queryStatement);

        return this.mapper.mapAggregateToResponse(dataLake);
    }
}