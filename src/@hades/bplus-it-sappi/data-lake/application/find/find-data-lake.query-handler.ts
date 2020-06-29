import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataLakeResponse } from './../../domain/data-lake.response';
import { FindDataLakeQuery } from './find-data-lake.query';
import { FindDataLakeService } from './find-data-lake.service';

@QueryHandler(FindDataLakeQuery)
export class FindDataLakeQueryHandler implements IQueryHandler<FindDataLakeQuery>
{
    constructor(
        private readonly findDataLakeService: FindDataLakeService
    ) { }

    async execute(query: FindDataLakeQuery): Promise<DataLakeResponse>
    {
        const dataLake = await this.findDataLakeService.main(query.queryStatements);

        return new DataLakeResponse(
                dataLake.id.value,
                dataLake.data.value,
                dataLake.createdAt.value,
                dataLake.updatedAt.value,
                dataLake.deletedAt.value,
                
            );
    }
}