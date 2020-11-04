import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SystemResponse } from './../../domain/system.response';
import { SystemMapper } from './../../domain/system.mapper';
import { GetSystemsQuery } from './get-systems.query';
import { GetSystemsService } from './get-systems.service';

@QueryHandler(GetSystemsQuery)
export class GetSystemsQueryHandler implements IQueryHandler<GetSystemsQuery>
{
    private readonly mapper: SystemMapper = new SystemMapper();

    constructor(
        private readonly getSystemsService: GetSystemsService,
    ) {}

    async execute(query: GetSystemsQuery): Promise<SystemResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getSystemsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}