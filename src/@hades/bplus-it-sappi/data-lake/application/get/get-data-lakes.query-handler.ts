import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataLakeResponse } from './../../domain/data-lake.response';
import { GetDataLakesQuery } from './get-data-lakes.query';
import { GetDataLakesService } from './get-data-lakes.service';

@QueryHandler(GetDataLakesQuery)
export class GetDataLakesQueryHandler implements IQueryHandler<GetDataLakesQuery>
{
    constructor(
        private readonly getDataLakesService: GetDataLakesService
    ) { }

    async execute(query: GetDataLakesQuery): Promise<DataLakeResponse[]>
    {
        return (await this.getDataLakesService.main(query.queryStatements)).map(dataLake => new DataLakeResponse(
                dataLake.id.value,
                dataLake.data.value,
                dataLake.createdAt.value,
                dataLake.updatedAt.value,
                dataLake.deletedAt.value,
                
            ));
    }
}