import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciFlow } from './flow.aggregate';
import { FlowResponse } from './flow.response';
import {
    FlowId,
    FlowHash,
    FlowTenantId,
    FlowTenantCode,
    FlowSystemId,
    FlowSystemName,
    FlowVersion,
    FlowScenario,
    FlowParty,
    FlowReceiverParty,
    FlowComponent,
    FlowReceiverComponent,
    FlowInterfaceName,
    FlowInterfaceNamespace,
    FlowIflowName,
    FlowResponsibleUserAccount,
    FlowLastChangeUserAccount,
    FlowLastChangedAt,
    FlowFolderPath,
    FlowDescription,
    FlowApplication,
    FlowIsCritical,
    FlowIsComplex,
    FlowFieldGroupId,
    FlowData,
    FlowCreatedAt,
    FlowUpdatedAt,
    FlowDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';

export class FlowMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param flow
     */
    mapModelToAggregate(flow: ObjectLiteral, cQMetadata?: CQMetadata): CciFlow
    {
        if (!flow) return;

        return this.makeAggregate(flow, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param flows
     */
    mapModelsToAggregates(flows: ObjectLiteral[], cQMetadata?: CQMetadata): CciFlow[]
    {
        if (!Array.isArray(flows)) return;

        return flows.map(flow  => this.makeAggregate(flow, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param flow
     */
    mapAggregateToResponse(flow: CciFlow): FlowResponse
    {
        return this.makeResponse(flow);
    }

    /**
     * Map array of aggregates to array responses
     * @param flows
     */
    mapAggregatesToResponses(flows: CciFlow[]): FlowResponse[]
    {
        if (!Array.isArray(flows)) return;

        return flows.map(flow => this.makeResponse(flow));
    }

    private makeAggregate(flow: ObjectLiteral, cQMetadata?: CQMetadata): CciFlow
    {
        return CciFlow.register(
            new FlowId(flow.id),
            new FlowHash(flow.hash),
            new FlowTenantId(flow.tenantId),
            new FlowTenantCode(flow.tenantCode),
            new FlowSystemId(flow.systemId),
            new FlowSystemName(flow.systemName),
            new FlowVersion(flow.version),
            new FlowScenario(flow.scenario),
            new FlowParty(flow.party),
            new FlowReceiverParty(flow.receiverParty),
            new FlowComponent(flow.component),
            new FlowReceiverComponent(flow.receiverComponent),
            new FlowInterfaceName(flow.interfaceName),
            new FlowInterfaceNamespace(flow.interfaceNamespace),
            new FlowIflowName(flow.iflowName),
            new FlowResponsibleUserAccount(flow.responsibleUserAccount),
            new FlowLastChangeUserAccount(flow.lastChangeUserAccount),
            new FlowLastChangedAt(flow.lastChangedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new FlowFolderPath(flow.folderPath),
            new FlowDescription(flow.description),
            new FlowApplication(flow.application),
            new FlowIsCritical(flow.isCritical),
            new FlowIsComplex(flow.isComplex),
            new FlowFieldGroupId(flow.fieldGroupId),
            new FlowData(flow.data),
            new FlowCreatedAt(flow.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new FlowUpdatedAt(flow.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new FlowDeletedAt(flow.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(flow.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(flow.system) : undefined,
        );
    }

    private makeResponse(flow: CciFlow): FlowResponse
    {
        if (!flow) return;

        return new FlowResponse(
            flow.id.value,
            flow.hash.value,
            flow.tenantId.value,
            flow.tenantCode.value,
            flow.systemId.value,
            flow.systemName.value,
            flow.version.value,
            flow.scenario.value,
            flow.party.value,
            flow.receiverParty.value,
            flow.component.value,
            flow.receiverComponent.value,
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
            flow.createdAt.value,
            flow.updatedAt.value,
            flow.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(flow.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(flow.system) : undefined,
        );
    }
}