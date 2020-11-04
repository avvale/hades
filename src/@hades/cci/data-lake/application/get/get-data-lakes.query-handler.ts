import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataLakeResponse } from './../../domain/data-lake.response';
import { DataLakeMapper } from './../../domain/data-lake.mapper';
import { GetDataLakesQuery } from './get-data-lakes.query';
import { GetDataLakesService } from './get-data-lakes.service';

@QueryHandler(GetDataLakesQuery)
export class GetDataLakesQueryHandler implements IQueryHandler<GetDataLakesQuery>
{
    private readonly mapper: DataLakeMapper = new DataLakeMapper();

    constructor(
        private readonly getDataLakesService: GetDataLakesService,
    ) {}

    async execute(query: GetDataLakesQuery): Promise<DataLakeResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getDataLakesService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}