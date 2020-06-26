import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModuleResponse } from './../../domain/module.response';
import { ModuleId } from './../../domain/value-objects';
import { FindModuleByIdQuery } from './find-module-by-id.query';
import { FindModuleByIdService } from './find-module-by-id.service';

@QueryHandler(FindModuleByIdQuery)
export class FindModuleByIdQueryHandler implements IQueryHandler<FindModuleByIdQuery>
{
    constructor(
        private readonly findModuleByIdService: FindModuleByIdService
    ) { }

    async execute(query: FindModuleByIdQuery): Promise<ModuleResponse>
    {
        const module = await this.findModuleByIdService.main(new ModuleId(query.id));

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