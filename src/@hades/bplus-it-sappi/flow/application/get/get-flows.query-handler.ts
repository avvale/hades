import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FlowResponse } from './../../domain/flow.response';
import { GetFlowsQuery } from './get-flows.query';
import { GetFlowsService } from './get-flows.service';

@QueryHandler(GetFlowsQuery)
export class GetFlowsQueryHandler implements IQueryHandler<GetFlowsQuery>
{
    constructor(
        private readonly getFlowsService: GetFlowsService
    ) { }

    async execute(query: GetFlowsQuery): Promise<FlowResponse[]>
    {
        return (await this.getFlowsService.main(query.queryStatements)).map(flow => new FlowResponse(
                flow.id.value,
                flow.tenantId.value,
                flow.systemId.value,
                flow.systemName.value,
                flow.scenario.value,
                flow.party.value,
                flow.component.value,
                flow.interfaceName.value,
                flow.interfaceNamespace.value,
                flow.iflowName.value,
                flow.responsibleUserAccount.value,
                flow.lastChangeUserAccount.value,
                flow.lastChangedAt.value,
                flow.folderPath.value,
                flow.description.value,
                flow.application.value,
                flow.isCritical.value,
                flow.isComplex.value,
                flow.fieldGroupId.value,
                flow.data.value,
                flow.contactsIdId.value,
                flow.createdAt.value,
                flow.updatedAt.value,
                flow.deletedAt.value,
                
            ));
    }
}