import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModuleResponse } from './../../domain/module.response';
import { GetModulesQuery } from './get-modules.query';
import { GetModulesService } from './get-modules.service';

@QueryHandler(GetModulesQuery)
export class GetModulesQueryHandler implements IQueryHandler<GetModulesQuery>
{
    constructor(
        private readonly getModulesService: GetModulesService
    ) { }

    async execute(query: GetModulesQuery): Promise<ModuleResponse[]>
    {
        return (await this.getModulesService.main(query.queryStatements)).map(module => new ModuleResponse(
                module.id.value,
                module.name.value,
                module.root.value,
                module.sort.value,
                module.isActive.value,
                module.createdAt.value,
                module.updatedAt.value,
                module.deletedAt.value,
                
            ));
    }
}