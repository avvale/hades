
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum BplusItSappiChannelDetailExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum BplusItSappiChannelDetailStatus {
    ERROR = "ERROR",
    INACTIVE = "INACTIVE",
    SUCCESSFUL = "SUCCESSFUL",
    STOPPED = "STOPPED",
    UNKNOWN = "UNKNOWN",
    UNREGISTERED = "UNREGISTERED"
}

export enum BplusItSappiChannelOverviewExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum BplusItSappiChannelDirection {
    SENDER = "SENDER",
    RECEIVER = "RECEIVER"
}

export enum BplusItSappiChannelAdapterStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
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

export interface BplusItSappiCreateChannelDetailInput {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiChannelDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    status: BplusItSappiChannelDetailStatus;
    channelId: string;
    channelParty?: GraphQLString;
    channelComponent: GraphQLString;
    channelName: GraphQLString;
    detail?: GraphQLString;
    example?: GraphQLString;
}

export interface BplusItSappiUpdateChannelDetailInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: BplusItSappiChannelDetailExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    status?: BplusItSappiChannelDetailStatus;
    channelId?: string;
    channelParty?: GraphQLString;
    channelComponent?: GraphQLString;
    channelName?: GraphQLString;
    detail?: GraphQLString;
    example?: GraphQLString;
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
    direction: BplusItSappiChannelDirection;
    transportProtocol?: GraphQLString;
    messageProtocol?: GraphQLString;
    adapterEngineName?: GraphQLString;
    url?: GraphQLString;
    username?: GraphQLString;
    remoteHost?: GraphQLString;
    remotePort?: GraphQLInt;
    directory?: GraphQLString;
    fileSchema?: GraphQLString;
    proxyHost?: GraphQLString;
    proxyPort?: GraphQLInt;
    destination?: GraphQLString;
    adapterStatus: BplusItSappiChannelAdapterStatus;
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
    direction?: BplusItSappiChannelDirection;
    transportProtocol?: GraphQLString;
    messageProtocol?: GraphQLString;
    adapterEngineName?: GraphQLString;
    url?: GraphQLString;
    username?: GraphQLString;
    remoteHost?: GraphQLString;
    remotePort?: GraphQLInt;
    directory?: GraphQLString;
    fileSchema?: GraphQLString;
    proxyHost?: GraphQLString;
    proxyPort?: GraphQLInt;
    destination?: GraphQLString;
    adapterStatus?: BplusItSappiChannelAdapterStatus;
    softwareComponentName?: GraphQLString;
    responsibleUserAccountName?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
}

export interface BplusItSappiCreateContactInput {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    roleId?: string;
    roleName?: GraphQLString;
    name: GraphQLString;
    surname?: GraphQLString;
    email: GraphQLString;
    mobile?: GraphQLString;
    area?: GraphQLString;
    hasConsentEmail: GraphQLBoolean;
    hasConsentMobile: GraphQLBoolean;
    isActive: GraphQLBoolean;
}

export interface BplusItSappiUpdateContactInput {
    id: string;
    tenantId?: string;
    systemId?: string;
    systemName?: GraphQLString;
    roleId?: string;
    roleName?: GraphQLString;
    name?: GraphQLString;
    surname?: GraphQLString;
    email?: GraphQLString;
    mobile?: GraphQLString;
    area?: GraphQLString;
    hasConsentEmail?: GraphQLBoolean;
    hasConsentMobile?: GraphQLBoolean;
    isActive?: GraphQLBoolean;
}

export interface BplusItSappiCreateDataLakeInput {
    id: string;
    data: JSON;
}

export interface BplusItSappiUpdateDataLakeInput {
    id: string;
    data?: JSON;
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
    bplusItSappiFindChannelDetail(query?: QueryStatementInput[]): BplusItSappiChannelDetail | Promise<BplusItSappiChannelDetail>;
    bplusItSappiFindChannelDetailById(id?: string): BplusItSappiChannelDetail | Promise<BplusItSappiChannelDetail>;
    bplusItSappiGetChannelsDetail(query?: QueryStatementInput[]): BplusItSappiChannelDetail[] | Promise<BplusItSappiChannelDetail[]>;
    bplusItSappiPaginateChannelsDetail(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindChannelOverview(query?: QueryStatementInput[]): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiFindChannelOverviewById(id?: string): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiGetChannelsOverview(query?: QueryStatementInput[]): BplusItSappiChannelOverview[] | Promise<BplusItSappiChannelOverview[]>;
    bplusItSappiPaginateChannelsOverview(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindChannel(query?: QueryStatementInput[]): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiFindChannelById(id?: string): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiGetChannels(query?: QueryStatementInput[]): BplusItSappiChannel[] | Promise<BplusItSappiChannel[]>;
    bplusItSappiPaginateChannels(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindContact(query?: QueryStatementInput[]): BplusItSappiContact | Promise<BplusItSappiContact>;
    bplusItSappiFindContactById(id?: string): BplusItSappiContact | Promise<BplusItSappiContact>;
    bplusItSappiGetContacts(query?: QueryStatementInput[]): BplusItSappiContact[] | Promise<BplusItSappiContact[]>;
    bplusItSappiPaginateContacts(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindDataLake(query?: QueryStatementInput[]): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiFindDataLakeById(id?: string): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiGetDataLakes(query?: QueryStatementInput[]): BplusItSappiDataLake[] | Promise<BplusItSappiDataLake[]>;
    bplusItSappiPaginateDataLakes(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
}

export interface IMutation {
    adminCreateBoundedContext(payload: AdminCreateBoundedContextInput): AdminBoundedContext | Promise<AdminBoundedContext>;
    adminCreateBoundedContexts(payload: AdminCreateBoundedContextInput[]): boolean | Promise<boolean>;
    adminUpdateBoundedContext(payload: AdminUpdateBoundedContextInput): AdminBoundedContext | Promise<AdminBoundedContext>;
    adminDeleteBoundedContextById(id: string): AdminBoundedContext | Promise<AdminBoundedContext>;
    adminDeleteBoundedContexts(query?: QueryStatementInput[]): AdminBoundedContext[] | Promise<AdminBoundedContext[]>;
    adminCreateLang(payload: AdminCreateLangInput): AdminLang | Promise<AdminLang>;
    adminCreateLangs(payload: AdminCreateLangInput[]): boolean | Promise<boolean>;
    adminUpdateLang(payload: AdminUpdateLangInput): AdminLang | Promise<AdminLang>;
    adminDeleteLangById(id: string): AdminLang | Promise<AdminLang>;
    adminDeleteLangs(query?: QueryStatementInput[]): AdminLang[] | Promise<AdminLang[]>;
    adminCreatePermission(payload: AdminCreatePermissionInput): AdminPermission | Promise<AdminPermission>;
    adminCreatePermissions(payload: AdminCreatePermissionInput[]): boolean | Promise<boolean>;
    adminUpdatePermission(payload: AdminUpdatePermissionInput): AdminPermission | Promise<AdminPermission>;
    adminDeletePermissionById(id: string): AdminPermission | Promise<AdminPermission>;
    adminDeletePermissions(query?: QueryStatementInput[]): AdminPermission[] | Promise<AdminPermission[]>;
    adminCreateResource(payload: AdminCreateResourceInput): AdminResource | Promise<AdminResource>;
    adminCreateResources(payload: AdminCreateResourceInput[]): boolean | Promise<boolean>;
    adminUpdateResource(payload: AdminUpdateResourceInput): AdminResource | Promise<AdminResource>;
    adminDeleteResourceById(id: string): AdminResource | Promise<AdminResource>;
    adminDeleteResources(query?: QueryStatementInput[]): AdminResource[] | Promise<AdminResource[]>;
    adminCreateTenant(payload: AdminCreateTenantInput): AdminTenant | Promise<AdminTenant>;
    adminCreateTenants(payload: AdminCreateTenantInput[]): boolean | Promise<boolean>;
    adminUpdateTenant(payload: AdminUpdateTenantInput): AdminTenant | Promise<AdminTenant>;
    adminDeleteTenantById(id: string): AdminTenant | Promise<AdminTenant>;
    adminDeleteTenants(query?: QueryStatementInput[]): AdminTenant[] | Promise<AdminTenant[]>;
    bplusItSappiCreateChannelDetail(payload: BplusItSappiCreateChannelDetailInput): BplusItSappiChannelDetail | Promise<BplusItSappiChannelDetail>;
    bplusItSappiCreateChannelsDetail(payload: BplusItSappiCreateChannelDetailInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateChannelDetail(payload: BplusItSappiUpdateChannelDetailInput): BplusItSappiChannelDetail | Promise<BplusItSappiChannelDetail>;
    bplusItSappiDeleteChannelDetailById(id: string): BplusItSappiChannelDetail | Promise<BplusItSappiChannelDetail>;
    bplusItSappiDeleteChannelsDetail(query?: QueryStatementInput[]): BplusItSappiChannelDetail[] | Promise<BplusItSappiChannelDetail[]>;
    bplusItSappiCreateChannelOverview(payload: BplusItSappiCreateChannelOverviewInput): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiCreateChannelsOverview(payload: BplusItSappiCreateChannelOverviewInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateChannelOverview(payload: BplusItSappiUpdateChannelOverviewInput): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiDeleteChannelOverviewById(id: string): BplusItSappiChannelOverview | Promise<BplusItSappiChannelOverview>;
    bplusItSappiDeleteChannelsOverview(query?: QueryStatementInput[]): BplusItSappiChannelOverview[] | Promise<BplusItSappiChannelOverview[]>;
    bplusItSappiCreateChannel(payload: BplusItSappiCreateChannelInput): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiCreateChannels(payload: BplusItSappiCreateChannelInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateChannel(payload: BplusItSappiUpdateChannelInput): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiDeleteChannelById(id: string): BplusItSappiChannel | Promise<BplusItSappiChannel>;
    bplusItSappiDeleteChannels(query?: QueryStatementInput[]): BplusItSappiChannel[] | Promise<BplusItSappiChannel[]>;
    bplusItSappiCreateContact(payload: BplusItSappiCreateContactInput): BplusItSappiContact | Promise<BplusItSappiContact>;
    bplusItSappiCreateContacts(payload: BplusItSappiCreateContactInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateContact(payload: BplusItSappiUpdateContactInput): BplusItSappiContact | Promise<BplusItSappiContact>;
    bplusItSappiDeleteContactById(id: string): BplusItSappiContact | Promise<BplusItSappiContact>;
    bplusItSappiDeleteContacts(query?: QueryStatementInput[]): BplusItSappiContact[] | Promise<BplusItSappiContact[]>;
    bplusItSappiCreateDataLake(payload: BplusItSappiCreateDataLakeInput): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiCreateDataLakes(payload: BplusItSappiCreateDataLakeInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateDataLake(payload: BplusItSappiUpdateDataLakeInput): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiDeleteDataLakeById(id: string): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiDeleteDataLakes(query?: QueryStatementInput[]): BplusItSappiDataLake[] | Promise<BplusItSappiDataLake[]>;
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

export interface BplusItSappiChannelDetail {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: BplusItSappiChannelDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    status: BplusItSappiChannelDetailStatus;
    channelId: string;
    channelParty?: GraphQLString;
    channelComponent: GraphQLString;
    channelName: GraphQLString;
    detail?: GraphQLString;
    example?: GraphQLString;
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
    direction: BplusItSappiChannelDirection;
    transportProtocol?: GraphQLString;
    messageProtocol?: GraphQLString;
    adapterEngineName?: GraphQLString;
    url?: GraphQLString;
    username?: GraphQLString;
    remoteHost?: GraphQLString;
    remotePort?: GraphQLInt;
    directory?: GraphQLString;
    fileSchema?: GraphQLString;
    proxyHost?: GraphQLString;
    proxyPort?: GraphQLInt;
    destination?: GraphQLString;
    adapterStatus: BplusItSappiChannelAdapterStatus;
    softwareComponentName?: GraphQLString;
    responsibleUserAccountName?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface BplusItSappiContact {
    id: string;
    tenantId: string;
    systemId: string;
    systemName: GraphQLString;
    roleId?: string;
    roleName?: GraphQLString;
    name: GraphQLString;
    surname?: GraphQLString;
    email: GraphQLString;
    mobile?: GraphQLString;
    area?: GraphQLString;
    hasConsentEmail: GraphQLBoolean;
    hasConsentMobile: GraphQLBoolean;
    isActive: GraphQLBoolean;
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
