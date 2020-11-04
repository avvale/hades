import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ModuleResponse } from './../../domain/module.response';
import { ModuleMapper } from './../../domain/module.mapper';
import { GetModulesQuery } from './get-modules.query';
import { GetModulesService } from './get-modules.service';

@QueryHandler(GetModulesQuery)
export class GetModulesQueryHandler implements IQueryHandler<GetModulesQuery>
{
    private readonly mapper: ModuleMapper = new ModuleMapper();

    constructor(
        private readonly getModulesService: GetModulesService,
    ) {}

    async execute(query: GetModulesQuery): Promise<ModuleResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getModulesService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}