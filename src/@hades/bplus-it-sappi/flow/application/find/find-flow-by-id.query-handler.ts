import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FlowResponse } from './../../domain/flow.response';
import { FlowId } from './../../domain/value-objects';
import { FindFlowByIdQuery } from './find-flow-by-id.query';
import { FindFlowByIdService } from './find-flow-by-id.service';

@QueryHandler(FindFlowByIdQuery)
export class FindFlowByIdQueryHandler implements IQueryHandler<FindFlowByIdQuery>
{
    constructor(
        private readonly findFlowByIdService: FindFlowByIdService
    ) { }

    async execute(query: FindFlowByIdQuery): Promise<FlowResponse>
    {
        const flow = await this.findFlowByIdService.main(new FlowId(query.id));

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