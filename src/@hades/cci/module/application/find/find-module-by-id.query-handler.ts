import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModuleResponse } from './../../domain/module.response';
import { ModuleMapper } from './../../domain/module.mapper';
import { ModuleId } from './../../domain/value-objects';
import { FindModuleByIdQuery } from './find-module-by-id.query';
import { FindModuleByIdService } from './find-module-by-id.service';

@QueryHandler(FindModuleByIdQuery)
export class FindModuleByIdQueryHandler implements IQueryHandler<FindModuleByIdQuery>
{
    private readonly mapper: ModuleMapper = new ModuleMapper();

    constructor(
        private readonly findModuleByIdService: FindModuleByIdService,
    ) {}

    async execute(query: FindModuleByIdQuery): Promise<ModuleResponse>
    {
        const module = await this.findModuleByIdService.main(
            new ModuleId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(module);
    }
}