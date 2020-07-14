import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SystemResponse } from './../../domain/system.response';
import { SystemMapper } from './../../domain/system.mapper';
import { SystemId } from './../../domain/value-objects';
import { FindSystemByIdQuery } from './find-system-by-id.query';
import { FindSystemByIdService } from './find-system-by-id.service';

@QueryHandler(FindSystemByIdQuery)
export class FindSystemByIdQueryHandler implements IQueryHandler<FindSystemByIdQuery>
{
    private readonly mapper: SystemMapper = new SystemMapper();

    constructor(
        private readonly findSystemByIdService: FindSystemByIdService
    ) { }

    async execute(query: FindSystemByIdQuery): Promise<SystemResponse>
    {
        const system = await this.findSystemByIdService.main(new SystemId(query.id));

        return this.mapper.mapAggregateToResponse(system);
    }
}