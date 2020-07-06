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