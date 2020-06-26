import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModuleResponse } from './../../domain/module.response';
import { FindModuleQuery } from './find-module.query';
import { FindModuleService } from './find-module.service';

@QueryHandler(FindModuleQuery)
export class FindModuleQueryHandler implements IQueryHandler<FindModuleQuery>
{
    constructor(
        private readonly findModuleService: FindModuleService
    ) { }

    async execute(query: FindModuleQuery): Promise<ModuleResponse>
    {
        const module = await this.findModuleService.main(query.queryStatements);

        return new ModuleResponse(
                module.id.value,
                module.name.value,
                module.root.value,
                module.sort.value,
                module.isActive.value,
                module.createdAt.value,
                module.updatedAt.value,
                module.deletedAt.value,
                
            );
    }
}