import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataLakeResponse } from './../../domain/data-lake.response';
import { DataLakeMapper } from './../../domain/data-lake.mapper';
import { DataLakeId } from './../../domain/value-objects';
import { FindDataLakeByIdQuery } from './find-data-lake-by-id.query';
import { FindDataLakeByIdService } from './find-data-lake-by-id.service';

@QueryHandler(FindDataLakeByIdQuery)
export class FindDataLakeByIdQueryHandler implements IQueryHandler<FindDataLakeByIdQuery>
{
    private readonly mapper: DataLakeMapper = new DataLakeMapper();

    constructor(
        private readonly findDataLakeByIdService: FindDataLakeByIdService,
    ) {}

    async execute(query: FindDataLakeByIdQuery): Promise<DataLakeResponse>
    {
        const dataLake = await this.findDataLakeByIdService.main(
            new DataLakeId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(dataLake);
    }
}