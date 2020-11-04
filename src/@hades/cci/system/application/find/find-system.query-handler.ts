import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SystemResponse } from './../../domain/system.response';
import { SystemMapper } from './../../domain/system.mapper';
import { FindSystemQuery } from './find-system.query';
import { FindSystemService } from './find-system.service';

@QueryHandler(FindSystemQuery)
export class FindSystemQueryHandler implements IQueryHandler<FindSystemQuery>
{
    private readonly mapper: SystemMapper = new SystemMapper();

    constructor(
        private readonly findSystemService: FindSystemService,
    ) {}

    async execute(query: FindSystemQuery): Promise<SystemResponse>
    {
        const system = await this.findSystemService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(system);
    }
}