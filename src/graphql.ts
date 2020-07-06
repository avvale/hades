
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum BplusItSappiChannelOverviewExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum BplusItSappiExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum BplusItSappiJobDetailExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum BplusItSappiJobDetailStatus {
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
    RUNNING = "RUNNING",
    ERROR = "ERROR"
}

export enum BplusItSappiJobOverviewExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum BplusItSappiMessageOverviewExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum Command {
    COUNT = "COUNT",
    LIMIT = "LIMIT",
    OFFSET = "OFFSET",
    ORDER_BY = "ORDER_BY",
    WHERE = "WHERE"
}

export enum Operator {
    ASC = "ASC",
    CONTAINS = "CONTAINS",
    DESC = "DESC",
    EQUALS = "EQUALS",
    GREATER = "GREATER",
    GREATER_OR_EQ = "GREATER_OR_EQ",
    IN = "IN",
    IS_NOT_NULL = "IS_NOT_NULL",
    IS_NULL = "IS_NULL",
    LOWER = "LOWER",
    LOWER_OR_EQ = "LOWER_OR_EQ",
    NOT_CONTAINS = "NOT_CONTAINS",
    NOT_EQUALS = "NOT_EQUALS"
}

export interface AdminCreateBoundedContextInput {
    id: string;
    name: GraphQLString;
    root: GraphQLString;
    sort: GraphQLInt;
    isActive: GraphQLBoolean;
}

export interface AdminUpdateBoundedContextInput {
    id: string;
    name?: GraphQLString;
    root?: GraphQLString;
    sort?: GraphQLInt;
    isActive?: GraphQLBoolean;
}

export interface AdminCreateLangInput {
    id: string;
    name: GraphQLString;
    image?: GraphQLString;
    iso6392: GraphQLString;
    iso6393: GraphQLString;
    ietf: GraphQLString;
    sort?: GraphQLInt;
    isActive: GraphQLBoolean;
}

export interface AdminUpdateLangInput {
    id: string;
    name?: GraphQLString;
    image?: GraphQLString;
    iso6392?: GraphQLString;
    iso6393?: GraphQLString;
    ietf?: GraphQLString;
    sort?: GraphQLInt;
    isActive?: GraphQLBoolean;
}

export interface AdminCreatePermissionInput {
    id: string;
    boundedContextId: string;
    name: GraphQLString;
}

export interface AdminUpdatePermissionInput {
    id: string;
    boundedContextId?: string;
    name?: GraphQLString;
}

export interface AdminCreateResourceInput {
    id: string;
    boundedContextId: string;
    name: GraphQLString;
    hasCustomFields: GraphQLBoolean;
    hasAttachments: GraphQLBoolean;
}

export interface AdminUpdateResourceInput {
    id: string;
    boundedContextId?: string;
    name?: GraphQLString;
    hasCustomFields?: GraphQLBoolean;
    hasAttachments?: GraphQLBoolean;
}

export interface AdminCreateTenantInput {
    id: string;
    name: GraphQLString;
    code: GraphQLString;
    logo?: GraphQLString;
    isActive: GraphQLBoolean;
    data?: JSON;
}

export interface AdminUpdateTenantInput {
    id: string;
    name?: GraphQLString;
    code?: GraphQLString;
    logo?: GraphQLString;
    isActive?: GraphQLBoolean;
    data?: JSON;
}

export interface BplusItSappiCreateChannelOverviewInput {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiChannelOverviewExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    error?: GraphQLInt;
    inactive?: GraphQLInt;
    successful?: GraphQLInt;
    stopped?: GraphQLInt;
    unknown?: GraphQLInt;
    unregistered?: GraphQLInt;
}

export interface BplusItSappiUpdateChannelOverviewInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: BplusItSappiChannelOverviewExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    error?: GraphQLInt;
    inactive?: GraphQLInt;
    successful?: GraphQLInt;
    stopped?: GraphQLInt;
    unknown?: GraphQLInt;
    unregistered?: GraphQLInt;
}

export interface BplusItSappiCreateChannelInput {
    id: string;
    tenantId: string;
    systemId: string;
    party?: GraphQLString;
    component: GraphQLString;
    name: GraphQLString;
    flowParty: GraphQLString;
    flowComponent: GraphQLString;
    flowInterfaceName: GraphQLString;
    flowInterfaceNamespace: GraphQLString;
    adapterType?: GraphQLString;
    direction?: GraphQLString;
    transportProtocol?: GraphQLString;
    messageProtocol?: GraphQLString;
    adapterEngineName?: GraphQLString;
    url?: GraphQLString;
    username?: GraphQLString;
    remoteHost?: GraphQLString;
    remotePort?: GraphQLString;
    directory?: GraphQLString;
    fileSchema?: GraphQLString;
    proxyHost?: GraphQLString;
    proxyPort?: GraphQLString;
    destination?: GraphQLString;
    adapterStatus?: GraphQLString;
    softwareComponentName?: GraphQLString;
    responsibleUserAccountName?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
}

export interface BplusItSappiUpdateChannelInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    party?: GraphQLString;
    component?: GraphQLString;
    name?: GraphQLString;
    flowParty?: GraphQLString;
    flowComponent?: GraphQLString;
    flowInterfaceName?: GraphQLString;
    flowInterfaceNamespace?: GraphQLString;
    adapterType?: GraphQLString;
    direction?: GraphQLString;
    transportProtocol?: GraphQLString;
    messageProtocol?: GraphQLString;
    adapterEngineName?: GraphQLString;
    url?: GraphQLString;
    username?: GraphQLString;
    remoteHost?: GraphQLString;
    remotePort?: GraphQLString;
    directory?: GraphQLString;
    fileSchema?: GraphQLString;
    proxyHost?: GraphQLString;
    proxyPort?: GraphQLString;
    destination?: GraphQLString;
    adapterStatus?: GraphQLString;
    softwareComponentName?: GraphQLString;
    responsibleUserAccountName?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
}

export interface BplusItSappiCreateDataLakeInput {
    id: string;
    data: JSON;
}

export interface BplusItSappiUpdateDataLakeInput {
    id: string;
    data?: JSON;
}

export interface BplusItSappiCreateExecutionInput {
    id: string;
    tenantId: string;
    systemId: string;
    type: BplusItSappiExecutionType;
    monitoringStartAt: GraphQLTimestamp;
    monitoringEndAt: GraphQLTimestamp;
    executedAt: GraphQLTimestamp;
}

export interface BplusItSappiUpdateExecutionInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    type?: BplusItSappiExecutionType;
    monitoringStartAt?: GraphQLTimestamp;
    monitoringEndAt?: GraphQLTimestamp;
    executedAt?: GraphQLTimestamp;
}

export interface BplusItSappiCreateFlowInput {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    scenario: GraphQLString;
    party?: GraphQLString;
    component: GraphQLString;
    interfaceName: GraphQLString;
    interfaceNamespace: GraphQLString;
    iflowName?: GraphQLString;
    responsibleUserAccount?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
    folderPath?: GraphQLString;
    description?: GraphQLString;
    application?: GraphQLString;
    isCritical: GraphQLBoolean;
    isComplex: GraphQLBoolean;
    fieldGroupId?: string;
    data?: JSON;
}

export interface BplusItSappiUpdateFlowInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    systemName?: GraphQLString;
    scenario?: GraphQLString;
    party?: GraphQLString;
    component?: GraphQLString;
    interfaceName?: GraphQLString;
    interfaceNamespace?: GraphQLString;
    iflowName?: GraphQLString;
    responsibleUserAccount?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
    folderPath?: GraphQLString;
    description?: GraphQLString;
    application?: GraphQLString;
    isCritical?: GraphQLBoolean;
    isComplex?: GraphQLBoolean;
    fieldGroupId?: string;
    data?: JSON;
}

export interface BplusItSappiCreateJobDetailInput {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiJobDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    status: BplusItSappiJobDetailStatus;
    detail: GraphQLString;
    example: GraphQLString;
}

export interface BplusItSappiUpdateJobDetailInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: BplusItSappiJobDetailExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    status?: BplusItSappiJobDetailStatus;
    detail?: GraphQLString;
    example?: GraphQLString;
}

export interface BplusItSappiCreateJobOverviewInput {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiJobOverviewExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    cancelled?: GraphQLInt;
    completed?: GraphQLInt;
    error?: GraphQLInt;
}

export interface BplusItSappiUpdateJobOverviewInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: BplusItSappiJobOverviewExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    cancelled?: GraphQLInt;
    completed?: GraphQLInt;
    error?: GraphQLInt;
}

export interface BplusItSappiCreateMessageOverviewInput {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiMessageOverviewExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    numberMax?: GraphQLInt;
    numberDays?: GraphQLInt;
    success?: GraphQLInt;
    cancelled?: GraphQLInt;
    delivering?: GraphQLInt;
    error?: GraphQLInt;
    holding?: GraphQLInt;
    toBeDelivered?: GraphQLInt;
    waiting?: GraphQLInt;
}

export interface BplusItSappiUpdateMessageOverviewInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: BplusItSappiMessageOverviewExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    numberMax?: GraphQLInt;
    numberDays?: GraphQLInt;
    success?: GraphQLInt;
    cancelled?: GraphQLInt;
    delivering?: GraphQLInt;
    error?: GraphQLInt;
    holding?: GraphQLInt;
    toBeDelivered?: GraphQLInt;
    waiting?: GraphQLInt;
}

export interface BplusItSappiCreateModuleInput {
    id: string;
    tenantId: string;
}

export interface BplusItSappiUpdateModuleInput {
    id: string;
    tenantId?: string;
}

export interface BplusItSappiCreateRoleInput {
    id: string;
    tenantId: string;
    name: GraphQLString;
}

export interface BplusItSappiUpdateRoleInput {
    id: string;
    tenantId?: string;
    name?: GraphQLString;
}

export interface BplusItSappiCreateSystemInput {
    id: string;
    tenantId: string;
    name: GraphQLString;
    tenantCode: GraphQLString;
    environment: GraphQLString;
    version: GraphQLString;
    isActive: GraphQLBoolean;
    cancelledAt?: GraphQLTimestamp;
}

export interface BplusItSappiUpdateSystemInput {
    id: string;
    tenantId?: string;
    name?: GraphQLString;
    tenantCode?: GraphQLString;
    environment?: GraphQLString;
    version?: GraphQLString;
    isActive?: GraphQLBoolean;
    cancelledAt?: GraphQLTimestamp;
}

export interface QueryStatementInput {
    command: Command;
    column?: string;
    operator?: Operator;
    value?: Any;
}

export interface AdminBoundedContext {
    id: string;
    name: GraphQLString;
    root: GraphQLString;
    sort: GraphQLInt;
    isActive: GraphQLBoolean;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IQuery {
    adminFindBoundedContext(query?: QueryStatementInput[]): AdminBoundedContext | Promise<AdminBoundedContext>;
    adminFindBoundedContextById(id?: string): AdminBoundedContext | Promise<AdminBoundedContext>;
    adminGetBoundedContexts(query?: QueryStatementInput[]): AdminBoundedContext[] | Promise<AdminBoundedContext[]>;
    adminPaginateBoundedContexts(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    adminFindLang(query?: QueryStatementInput[]): AdminLang | Promise<AdminLang>;
    adminFindLangById(id?: string): AdminLang | Promise<AdminLang>;
    adminGetLangs(query?: QueryStatementInput[]): AdminLang[] | Promise<AdminLang[]>;
    adminPaginateLangs(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    adminFindPermission(query?: QueryStatementInput[]): AdminPermission | Promise<AdminPermission>;
    adminFindPermissionById(id?: string): AdminPermission | Promise<AdminPermission>;
    adminGetPermissions(query?: QueryStatementInput[]): AdminPermission[] | Promise<AdminPermission[]>;
    adminPaginatePermissions(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    adminFindResource(query?: QueryStatementInput[]): AdminResource | Promise<AdminResource>;
    adminFindResourceById(id?: string): AdminResource | Promise<AdminResource>;
    adminGetResources(query?: QueryStatementInput[]): AdminResource[] | Promise<AdminResource[]>;
    adminPaginateResources(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    adminFindTenant(query?: QueryStatementInput[]): AdminTenant | Promise<AdminTenant>;
    adminFindTenantById(id?: string): AdminTenant | Promise<AdminTenant>;
    adminGetTenants(query?: QueryStatementInput[]): AdminTenant[] | Promise<AdminTenant[]>;
    adminPaginateTenants(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindChannelOverview(query?: QueryStatementInput[]): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiFindChannelOverviewById(id?: string): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiGetChannelsOverview(query?: QueryStatementInput[]): BplusItSappiChannelOverview[] | Promise<BplusItSappiChannelOverview[]>;
    bplusItSappiPaginateChannelsOverview(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindChannel(query?: QueryStatementInput[]): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiFindChannelById(id?: string): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiGetChannels(query?: QueryStatementInput[]): BplusItSappiChannel[] | Promise<BplusItSappiChannel[]>;
    bplusItSappiPaginateChannels(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindDataLake(query?: QueryStatementInput[]): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiFindDataLakeById(id?: string): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiGetDataLakes(query?: QueryStatementInput[]): BplusItSappiDataLake[] | Promise<BplusItSappiDataLake[]>;
    bplusItSappiPaginateDataLakes(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindExecution(query?: QueryStatementInput[]): BplusItSappiExecution | Promise<BplusItSappiExecution>;
    bplusItSappiFindExecutionById(id?: string): BplusItSappiExecution | Promise<BplusItSappiExecution>;
    bplusItSappiGetExecutions(query?: QueryStatementInput[]): BplusItSappiExecution[] | Promise<BplusItSappiExecution[]>;
    bplusItSappiPaginateExecutions(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindFlow(query?: QueryStatementInput[]): BplusItSappiFlow | Promise<BplusItSappiFlow>;
    bplusItSappiFindFlowById(id?: string): BplusItSappiFlow | Promise<BplusItSappiFlow>;
    bplusItSappiGetFlows(query?: QueryStatementInput[]): BplusItSappiFlow[] | Promise<BplusItSappiFlow[]>;
    bplusItSappiPaginateFlows(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindJobDetail(query?: QueryStatementInput[]): BplusItSappiJobDetail | Promise<BplusItSappiJobDetail>;
    bplusItSappiFindJobDetailById(id?: string): BplusItSappiJobDetail | Promise<BplusItSappiJobDetail>;
    bplusItSappiGetJobsDetail(query?: QueryStatementInput[]): BplusItSappiJobDetail[] | Promise<BplusItSappiJobDetail[]>;
    bplusItSappiPaginateJobsDetail(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindJobOverview(query?: QueryStatementInput[]): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiFindJobOverviewById(id?: string): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiGetJobsOverview(query?: QueryStatementInput[]): BplusItSappiJobOverview[] | Promise<BplusItSappiJobOverview[]>;
    bplusItSappiPaginateJobsOverview(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindMessageOverview(query?: QueryStatementInput[]): BplusItSappiMessageOverview | Promise<BplusItSappiMessageOverview>;
    bplusItSappiFindMessageOverviewById(id?: string): BplusItSappiMessageOverview | Promise<BplusItSappiMessageOverview>;
    bplusItSappiGetMessagesOverview(query?: QueryStatementInput[]): BplusItSappiMessageOverview[] | Promise<BplusItSappiMessageOverview[]>;
    bplusItSappiPaginateMessagesOverview(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindModule(query?: QueryStatementInput[]): BplusItSappiModule | Promise<BplusItSappiModule>;
    bplusItSappiFindModuleById(id?: string): BplusItSappiModule | Promise<BplusItSappiModule>;
    bplusItSappiGetModules(query?: QueryStatementInput[]): BplusItSappiModule[] | Promise<BplusItSappiModule[]>;
    bplusItSappiPaginateModules(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindRole(query?: QueryStatementInput[]): BplusItSappiRole | Promise<BplusItSappiRole>;
    bplusItSappiFindRoleById(id?: string): BplusItSappiRole | Promise<BplusItSappiRole>;
    bplusItSappiGetRoles(query?: QueryStatementInput[]): BplusItSappiRole[] | Promise<BplusItSappiRole[]>;
    bplusItSappiPaginateRoles(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindSystem(query?: QueryStatementInput[]): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiFindSystemById(id?: string): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiGetSystems(query?: QueryStatementInput[]): BplusItSappiSystem[] | Promise<BplusItSappiSystem[]>;
    bplusItSappiPaginateSystems(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
}

export interface IMutation {
    adminCreateBoundedContext(payload: AdminCreateBoundedContextInput): AdminBoundedContext | Promise<AdminBoundedContext>;
    adminInsertBoundedContexts(payload: AdminCreateBoundedContextInput[]): boolean | Promise<boolean>;
    adminUpdateBoundedContext(payload: AdminUpdateBoundedContextInput): AdminBoundedContext | Promise<AdminBoundedContext>;
    adminDeleteBoundedContextById(id: string): AdminBoundedContext | Promise<AdminBoundedContext>;
    adminDeleteBoundedContexts(query?: QueryStatementInput[]): AdminBoundedContext[] | Promise<AdminBoundedContext[]>;
    adminCreateLang(payload: AdminCreateLangInput): AdminLang | Promise<AdminLang>;
    adminInsertLangs(payload: AdminCreateLangInput[]): boolean | Promise<boolean>;
    adminUpdateLang(payload: AdminUpdateLangInput): AdminLang | Promise<AdminLang>;
    adminDeleteLangById(id: string): AdminLang | Promise<AdminLang>;
    adminDeleteLangs(query?: QueryStatementInput[]): AdminLang[] | Promise<AdminLang[]>;
    adminCreatePermission(payload: AdminCreatePermissionInput): AdminPermission | Promise<AdminPermission>;
    adminInsertPermissions(payload: AdminCreatePermissionInput[]): boolean | Promise<boolean>;
    adminUpdatePermission(payload: AdminUpdatePermissionInput): AdminPermission | Promise<AdminPermission>;
    adminDeletePermissionById(id: string): AdminPermission | Promise<AdminPermission>;
    adminDeletePermissions(query?: QueryStatementInput[]): AdminPermission[] | Promise<AdminPermission[]>;
    adminCreateResource(payload: AdminCreateResourceInput): AdminResource | Promise<AdminResource>;
    adminInsertResources(payload: AdminCreateResourceInput[]): boolean | Promise<boolean>;
    adminUpdateResource(payload: AdminUpdateResourceInput): AdminResource | Promise<AdminResource>;
    adminDeleteResourceById(id: string): AdminResource | Promise<AdminResource>;
    adminDeleteResources(query?: QueryStatementInput[]): AdminResource[] | Promise<AdminResource[]>;
    adminCreateTenant(payload: AdminCreateTenantInput): AdminTenant | Promise<AdminTenant>;
    adminInsertTenants(payload: AdminCreateTenantInput[]): boolean | Promise<boolean>;
    adminUpdateTenant(payload: AdminUpdateTenantInput): AdminTenant | Promise<AdminTenant>;
    adminDeleteTenantById(id: string): AdminTenant | Promise<AdminTenant>;
    adminDeleteTenants(query?: QueryStatementInput[]): AdminTenant[] | Promise<AdminTenant[]>;
    bplusItSappiCreateChannelOverview(payload: BplusItSappiCreateChannelOverviewInput): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiInsertChannelsOverview(payload: BplusItSappiCreateChannelOverviewInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateChannelOverview(payload: BplusItSappiUpdateChannelOverviewInput): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiDeleteChannelOverviewById(id: string): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiDeleteChannelsOverview(query?: QueryStatementInput[]): BplusItSappiChannelOverview[] | Promise<BplusItSappiChannelOverview[]>;
    bplusItSappiCreateChannel(payload: BplusItSappiCreateChannelInput): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiInsertChannels(payload: BplusItSappiCreateChannelInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateChannel(payload: BplusItSappiUpdateChannelInput): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiDeleteChannelById(id: string): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiDeleteChannels(query?: QueryStatementInput[]): BplusItSappiChannel[] | Promise<BplusItSappiChannel[]>;
    bplusItSappiCreateDataLake(payload: BplusItSappiCreateDataLakeInput): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiInsertDataLakes(payload: BplusItSappiCreateDataLakeInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateDataLake(payload: BplusItSappiUpdateDataLakeInput): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiDeleteDataLakeById(id: string): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiDeleteDataLakes(query?: QueryStatementInput[]): BplusItSappiDataLake[] | Promise<BplusItSappiDataLake[]>;
    bplusItSappiCreateExecution(payload: BplusItSappiCreateExecutionInput): BplusItSappiExecution | Promise<BplusItSappiExecution>;
    bplusItSappiInsertExecutions(payload: BplusItSappiCreateExecutionInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateExecution(payload: BplusItSappiUpdateExecutionInput): BplusItSappiExecution | Promise<BplusItSappiExecution>;
    bplusItSappiDeleteExecutionById(id: string): BplusItSappiExecution | Promise<BplusItSappiExecution>;
    bplusItSappiDeleteExecutions(query?: QueryStatementInput[]): BplusItSappiExecution[] | Promise<BplusItSappiExecution[]>;
    bplusItSappiCreateFlow(payload: BplusItSappiCreateFlowInput): BplusItSappiFlow | Promise<BplusItSappiFlow>;
    bplusItSappiInsertFlows(payload: BplusItSappiCreateFlowInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateFlow(payload: BplusItSappiUpdateFlowInput): BplusItSappiFlow | Promise<BplusItSappiFlow>;
    bplusItSappiDeleteFlowById(id: string): BplusItSappiFlow | Promise<BplusItSappiFlow>;
    bplusItSappiDeleteFlows(query?: QueryStatementInput[]): BplusItSappiFlow[] | Promise<BplusItSappiFlow[]>;
    bplusItSappiCreateJobDetail(payload: BplusItSappiCreateJobDetailInput): BplusItSappiJobDetail | Promise<BplusItSappiJobDetail>;
    bplusItSappiInsertJobsDetail(payload: BplusItSappiCreateJobDetailInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateJobDetail(payload: BplusItSappiUpdateJobDetailInput): BplusItSappiJobDetail | Promise<BplusItSappiJobDetail>;
    bplusItSappiDeleteJobDetailById(id: string): BplusItSappiJobDetail | Promise<BplusItSappiJobDetail>;
    bplusItSappiDeleteJobsDetail(query?: QueryStatementInput[]): BplusItSappiJobDetail[] | Promise<BplusItSappiJobDetail[]>;
    bplusItSappiCreateJobOverview(payload: BplusItSappiCreateJobOverviewInput): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiInsertJobsOverview(payload: BplusItSappiCreateJobOverviewInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateJobOverview(payload: BplusItSappiUpdateJobOverviewInput): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiDeleteJobOverviewById(id: string): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiDeleteJobsOverview(query?: QueryStatementInput[]): BplusItSappiJobOverview[] | Promise<BplusItSappiJobOverview[]>;
    bplusItSappiCreateMessageOverview(payload: BplusItSappiCreateMessageOverviewInput): BplusItSappiMessageOverview | Promise<BplusItSappiMessageOverview>;
    bplusItSappiInsertMessagesOverview(payload: BplusItSappiCreateMessageOverviewInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateMessageOverview(payload: BplusItSappiUpdateMessageOverviewInput): BplusItSappiMessageOverview | Promise<BplusItSappiMessageOverview>;
    bplusItSappiDeleteMessageOverviewById(id: string): BplusItSappiMessageOverview | Promise<BplusItSappiMessageOverview>;
    bplusItSappiDeleteMessagesOverview(query?: QueryStatementInput[]): BplusItSappiMessageOverview[] | Promise<BplusItSappiMessageOverview[]>;
    bplusItSappiCreateModule(payload: BplusItSappiCreateModuleInput): BplusItSappiModule | Promise<BplusItSappiModule>;
    bplusItSappiInsertModules(payload: BplusItSappiCreateModuleInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateModule(payload: BplusItSappiUpdateModuleInput): BplusItSappiModule | Promise<BplusItSappiModule>;
    bplusItSappiDeleteModuleById(id: string): BplusItSappiModule | Promise<BplusItSappiModule>;
    bplusItSappiDeleteModules(query?: QueryStatementInput[]): BplusItSappiModule[] | Promise<BplusItSappiModule[]>;
    bplusItSappiCreateRole(payload: BplusItSappiCreateRoleInput): BplusItSappiRole | Promise<BplusItSappiRole>;
    bplusItSappiInsertRoles(payload: BplusItSappiCreateRoleInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateRole(payload: BplusItSappiUpdateRoleInput): BplusItSappiRole | Promise<BplusItSappiRole>;
    bplusItSappiDeleteRoleById(id: string): BplusItSappiRole | Promise<BplusItSappiRole>;
    bplusItSappiDeleteRoles(query?: QueryStatementInput[]): BplusItSappiRole[] | Promise<BplusItSappiRole[]>;
    bplusItSappiCreateSystem(payload: BplusItSappiCreateSystemInput): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiInsertSystems(payload: BplusItSappiCreateSystemInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateSystem(payload: BplusItSappiUpdateSystemInput): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiDeleteSystemById(id: string): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiDeleteSystems(query?: QueryStatementInput[]): BplusItSappiSystem[] | Promise<BplusItSappiSystem[]>;
}

export interface AdminLang {
    id: string;
    name: GraphQLString;
    image?: GraphQLString;
    iso6392: GraphQLString;
    iso6393: GraphQLString;
    ietf: GraphQLString;
    sort?: GraphQLInt;
    isActive: GraphQLBoolean;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminPermission {
    id: string;
    boundedContextId: string;
    name: GraphQLString;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminResource {
    id: string;
    boundedContextId: string;
    name: GraphQLString;
    hasCustomFields: GraphQLBoolean;
    hasAttachments: GraphQLBoolean;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminTenant {
    id: string;
    name: GraphQLString;
    code: GraphQLString;
    logo?: GraphQLString;
    isActive: GraphQLBoolean;
    data?: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiChannelOverview {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiChannelOverviewExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    error?: GraphQLInt;
    inactive?: GraphQLInt;
    successful?: GraphQLInt;
    stopped?: GraphQLInt;
    unknown?: GraphQLInt;
    unregistered?: GraphQLInt;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiChannel {
    id: string;
    tenantId: string;
    systemId: string;
    party?: GraphQLString;
    component: GraphQLString;
    name: GraphQLString;
    flowParty: GraphQLString;
    flowComponent: GraphQLString;
    flowInterfaceName: GraphQLString;
    flowInterfaceNamespace: GraphQLString;
    adapterType?: GraphQLString;
    direction?: GraphQLString;
    transportProtocol?: GraphQLString;
    messageProtocol?: GraphQLString;
    adapterEngineName?: GraphQLString;
    url?: GraphQLString;
    username?: GraphQLString;
    remoteHost?: GraphQLString;
    remotePort?: GraphQLString;
    directory?: GraphQLString;
    fileSchema?: GraphQLString;
    proxyHost?: GraphQLString;
    proxyPort?: GraphQLString;
    destination?: GraphQLString;
    adapterStatus?: GraphQLString;
    softwareComponentName?: GraphQLString;
    responsibleUserAccountName?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiDataLake {
    id: string;
    data: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiExecution {
    id: string;
    tenantId: string;
    systemId: string;
    type: BplusItSappiExecutionType;
    monitoringStartAt: GraphQLTimestamp;
    monitoringEndAt: GraphQLTimestamp;
    executedAt: GraphQLTimestamp;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiFlow {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    scenario: GraphQLString;
    party?: GraphQLString;
    component: GraphQLString;
    interfaceName: GraphQLString;
    interfaceNamespace: GraphQLString;
    iflowName?: GraphQLString;
    responsibleUserAccount?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
    folderPath?: GraphQLString;
    description?: GraphQLString;
    application?: GraphQLString;
    isCritical: GraphQLBoolean;
    isComplex: GraphQLBoolean;
    fieldGroupId?: string;
    data?: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiJobDetail {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiJobDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    status: BplusItSappiJobDetailStatus;
    detail: GraphQLString;
    example: GraphQLString;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiJobOverview {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiJobOverviewExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    cancelled?: GraphQLInt;
    completed?: GraphQLInt;
    error?: GraphQLInt;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiMessageOverview {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiMessageOverviewExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    numberMax?: GraphQLInt;
    numberDays?: GraphQLInt;
    success?: GraphQLInt;
    cancelled?: GraphQLInt;
    delivering?: GraphQLInt;
    error?: GraphQLInt;
    holding?: GraphQLInt;
    toBeDelivered?: GraphQLInt;
    waiting?: GraphQLInt;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiModule {
    id: string;
    tenantId: string;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiRole {
    id: string;
    tenantId: string;
    name: GraphQLString;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiSystem {
    id: string;
    tenantId: string;
    name: GraphQLString;
    tenantCode: GraphQLString;
    environment: GraphQLString;
    version: GraphQLString;
    isActive: GraphQLBoolean;
    cancelledAt?: GraphQLTimestamp;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface Pagination {
    total: number;
    count: number;
    rows: JSON[];
}

export type JSON = any;
export type Any = any;
export type Upload = any;
export type GraphQLString = any;
export type GraphQLInt = any;
export type GraphQLFloat = any;
export type GraphQLBoolean = any;
export type GraphQLISODateTime = any;
export type GraphQLTimestamp = any;
