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
                module.tenantId.value,
                module.systemId.value,
                module.systemName.value,
                module.channelId.value,
                module.channelParty.value,
                module.channelComponent.value,
                module.channelName.value,
                module.flowParty.value,
                module.flowComponent.value,
                module.flowInterfaceName.value,
                module.flowInterfaceNamespace.value,
                module.parameterGroup.value,
                module.name.value,
                module.parameterName.value,
                module.parameterValue.value,
                module.createdAt.value,
                module.updatedAt.value,
                module.deletedAt.value,
                
            ));
    }
}