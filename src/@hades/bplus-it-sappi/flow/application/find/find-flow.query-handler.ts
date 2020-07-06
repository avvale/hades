import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FlowResponse } from './../../domain/flow.response';
import { FindFlowQuery } from './find-flow.query';
import { FindFlowService } from './find-flow.service';

@QueryHandler(FindFlowQuery)
export class FindFlowQueryHandler implements IQueryHandler<FindFlowQuery>
{
    constructor(
        private readonly findFlowService: FindFlowService
    ) { }

    async execute(query: FindFlowQuery): Promise<FlowResponse>
    {
        const flow = await this.findFlowService.main(query.queryStatements);

        return new FlowResponse(
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
                
            );
    }
}