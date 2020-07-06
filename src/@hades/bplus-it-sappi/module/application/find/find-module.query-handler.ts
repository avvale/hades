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
                
            );
    }
}