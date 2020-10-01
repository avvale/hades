import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModuleResponse } from './../../domain/module.response';
import { ModuleMapper } from './../../domain/module.mapper';
import { FindModuleQuery } from './find-module.query';
import { FindModuleService } from './find-module.service';

@QueryHandler(FindModuleQuery)
export class FindModuleQueryHandler implements IQueryHandler<FindModuleQuery>
{
    private readonly mapper: ModuleMapper = new ModuleMapper();

    constructor(
        private readonly findModuleService: FindModuleService
    ) { }

    async execute(query: FindModuleQuery): Promise<ModuleResponse>
    {
        const module = await this.findModuleService.main(query.queryStatement);

        return this.mapper.mapAggregateToResponse(module);
    }
}