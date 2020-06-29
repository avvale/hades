import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataLakeResponse } from './../../domain/data-lake.response';
import { DataLakeId } from './../../domain/value-objects';
import { FindDataLakeByIdQuery } from './find-data-lake-by-id.query';
import { FindDataLakeByIdService } from './find-data-lake-by-id.service';

@QueryHandler(FindDataLakeByIdQuery)
export class FindDataLakeByIdQueryHandler implements IQueryHandler<FindDataLakeByIdQuery>
{
    constructor(
        private readonly findDataLakeByIdService: FindDataLakeByIdService
    ) { }

    async execute(query: FindDataLakeByIdQuery): Promise<DataLakeResponse>
    {
        const dataLake = await this.findDataLakeByIdService.main(new DataLakeId(query.id));

        return new DataLakeResponse(
                dataLake.id.value,
                dataLake.data.value,
                dataLake.createdAt.value,
                dataLake.updatedAt.value,
                dataLake.deletedAt.value,
                
            );
    }
}