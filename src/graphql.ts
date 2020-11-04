
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum CciChannelDetailExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum CciChannelDetailStatus {
    ERROR = "ERROR",
    INACTIVE = "INACTIVE",
    SUCCESSFUL = "SUCCESSFUL",
    STOPPED = "STOPPED",
    UNKNOWN = "UNKNOWN",
    UNREGISTERED = "UNREGISTERED"
}

export enum CciChannelOverviewExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum CciChannelDirection {
    SENDER = "SENDER",
    RECEIVER = "RECEIVER"
}

export enum CciChannelAdapterStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export enum CciExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum CciJobDetailExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum CciJobDetailStatus {
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
    ERROR = "ERROR"
}

export enum CciJobOverviewExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum CciMessageDetailExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum CciMessageDetailStatus {
    SUCCESS = "SUCCESS",
    CANCELLED = "CANCELLED",
    DELIVERING = "DELIVERING",
    ERROR = "ERROR",
    HOLDING = "HOLDING",
    TO_BE_DELIVERED = "TO_BE_DELIVERED",
    WAITING = "WAITING"
}

export enum CciMessageDetailDirection {
    INBOUND = "INBOUND",
    OUTBOUND = "OUTBOUND"
}

export enum CciMessageOverviewExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum CciSystemTechnology {
    WSO2 = "WSO2",
    SAPPI = "SAPPI",
    B2B = "B2B",
    MULESOFT = "MULESOFT",
    SAPSCI = "SAPSCI"
}

export enum IamAccountType {
    USER = "USER",
    SERVICE = "SERVICE"
}

export enum OAuthClientGrantType {
    AUTHORIZATION_CODE = "AUTHORIZATION_CODE",
    CLIENT_CREDENTIALS = "CLIENT_CREDENTIALS",
    PASSWORD = "PASSWORD"
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

export interface CciCreateChannelDetailInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: CciChannelDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    status: CciChannelDetailStatus;
    channelHash: GraphQLString;
    channelSapId: GraphQLString;
    channelParty?: GraphQLString;
    channelComponent: GraphQLString;
    channelName: GraphQLString;
    detail?: GraphQLString;
}

export interface CciUpdateChannelDetailInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: CciChannelDetailExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    status?: CciChannelDetailStatus;
    channelHash?: GraphQLString;
    channelSapId?: GraphQLString;
    channelParty?: GraphQLString;
    channelComponent?: GraphQLString;
    channelName?: GraphQLString;
    detail?: GraphQLString;
}

export interface CciCreateChannelOverviewInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: CciChannelOverviewExecutionType;
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

export interface CciUpdateChannelOverviewInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: CciChannelOverviewExecutionType;
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

export interface CciCreateChannelInput {
    id: string;
    hash: GraphQLString;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    party?: GraphQLString;
    component: GraphQLString;
    name: GraphQLString;
    flowHash?: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent?: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName?: GraphQLString;
    flowInterfaceNamespace?: GraphQLString;
    version?: GraphQLString;
    adapterType?: GraphQLString;
    direction?: CciChannelDirection;
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
    adapterStatus?: CciChannelAdapterStatus;
    softwareComponentName?: GraphQLString;
    responsibleUserAccountName?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
    riInterfaceName?: GraphQLString;
    riInterfaceNamespace?: GraphQLString;
}

export interface CciUpdateChannelInput {
    id: string;
    hash?: GraphQLString;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    party?: GraphQLString;
    component?: GraphQLString;
    name?: GraphQLString;
    flowHash?: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent?: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName?: GraphQLString;
    flowInterfaceNamespace?: GraphQLString;
    version?: GraphQLString;
    adapterType?: GraphQLString;
    direction?: CciChannelDirection;
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
    adapterStatus?: CciChannelAdapterStatus;
    softwareComponentName?: GraphQLString;
    responsibleUserAccountName?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
    riInterfaceName?: GraphQLString;
    riInterfaceNamespace?: GraphQLString;
}

export interface CciCreateContactInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
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

export interface CciUpdateContactInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
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

export interface CciCreateDataLakeInput {
    id: string;
    tenantId: string;
    executionId: string;
    tenantCode: GraphQLString;
    payload: JSON;
}

export interface CciUpdateDataLakeInput {
    id: string;
    tenantId?: string;
    executionId?: string;
    tenantCode?: GraphQLString;
    payload?: JSON;
}

export interface CciCreateExecutionInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    version: GraphQLString;
    type: CciExecutionType;
    executedAt: GraphQLTimestamp;
    monitoringStartAt: GraphQLTimestamp;
    monitoringEndAt: GraphQLTimestamp;
}

export interface CciUpdateExecutionInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    version?: GraphQLString;
    type?: CciExecutionType;
    executedAt?: GraphQLTimestamp;
    monitoringStartAt?: GraphQLTimestamp;
    monitoringEndAt?: GraphQLTimestamp;
}

export interface CciCreateFlowInput {
    id: string;
    hash: GraphQLString;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    version: GraphQLString;
    scenario?: GraphQLString;
    party?: GraphQLString;
    receiverParty?: GraphQLString;
    component: GraphQLString;
    receiverComponent?: GraphQLString;
    interfaceName: GraphQLString;
    interfaceNamespace: GraphQLString;
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

export interface CciUpdateFlowInput {
    id: string;
    hash?: GraphQLString;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    version?: GraphQLString;
    scenario?: GraphQLString;
    party?: GraphQLString;
    receiverParty?: GraphQLString;
    component?: GraphQLString;
    receiverComponent?: GraphQLString;
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

export interface CciCreateJobDetailInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: CciJobDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    status: CciJobDetailStatus;
    name?: GraphQLString;
    returnCode?: GraphQLInt;
    node?: GraphQLString;
    user?: GraphQLString;
    startAt: GraphQLTimestamp;
    endAt: GraphQLTimestamp;
}

export interface CciUpdateJobDetailInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: CciJobDetailExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    status?: CciJobDetailStatus;
    name?: GraphQLString;
    returnCode?: GraphQLInt;
    node?: GraphQLString;
    user?: GraphQLString;
    startAt?: GraphQLTimestamp;
    endAt?: GraphQLTimestamp;
}

export interface CciCreateJobOverviewInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: CciJobOverviewExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    cancelled?: GraphQLInt;
    completed?: GraphQLInt;
    error?: GraphQLInt;
}

export interface CciUpdateJobOverviewInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: CciJobOverviewExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    cancelled?: GraphQLInt;
    completed?: GraphQLInt;
    error?: GraphQLInt;
}

export interface CciCreateMessageDetailInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    scenario?: GraphQLString;
    executionId: string;
    executionType: CciMessageDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    flowHash: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName: GraphQLString;
    flowInterfaceNamespace: GraphQLString;
    status: CciMessageDetailStatus;
    refMessageId?: GraphQLString;
    detail?: GraphQLString;
    example?: GraphQLString;
    startTimeAt?: GraphQLTimestamp;
    direction: CciMessageDetailDirection;
    errorCategory?: GraphQLString;
    errorCode?: GraphQLString;
    errorLabel?: GraphQLInt;
    node?: GraphQLInt;
    protocol?: GraphQLString;
    qualityOfService?: GraphQLString;
    receiverParty?: GraphQLString;
    receiverComponent?: GraphQLString;
    receiverInterface?: GraphQLString;
    receiverInterfaceNamespace?: GraphQLString;
    retries?: GraphQLInt;
    size?: GraphQLInt;
    timesFailed?: GraphQLInt;
    numberMax?: GraphQLInt;
    numberDays?: GraphQLInt;
}

export interface CciUpdateMessageDetailInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    scenario?: GraphQLString;
    executionId?: string;
    executionType?: CciMessageDetailExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    flowHash?: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent?: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName?: GraphQLString;
    flowInterfaceNamespace?: GraphQLString;
    status?: CciMessageDetailStatus;
    refMessageId?: GraphQLString;
    detail?: GraphQLString;
    example?: GraphQLString;
    startTimeAt?: GraphQLTimestamp;
    direction?: CciMessageDetailDirection;
    errorCategory?: GraphQLString;
    errorCode?: GraphQLString;
    errorLabel?: GraphQLInt;
    node?: GraphQLInt;
    protocol?: GraphQLString;
    qualityOfService?: GraphQLString;
    receiverParty?: GraphQLString;
    receiverComponent?: GraphQLString;
    receiverInterface?: GraphQLString;
    receiverInterfaceNamespace?: GraphQLString;
    retries?: GraphQLInt;
    size?: GraphQLInt;
    timesFailed?: GraphQLInt;
    numberMax?: GraphQLInt;
    numberDays?: GraphQLInt;
}

export interface CciCreateMessageOverviewInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    executionId: string;
    executionType: CciMessageOverviewExecutionType;
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

export interface CciUpdateMessageOverviewInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    executionId?: string;
    executionType?: CciMessageOverviewExecutionType;
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

export interface CciCreateModuleInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    systemId: string;
    systemName: GraphQLString;
    channelHash: GraphQLString;
    channelParty?: GraphQLString;
    channelComponent: GraphQLString;
    channelName: GraphQLString;
    flowHash?: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent?: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName?: GraphQLString;
    flowInterfaceNamespace?: GraphQLString;
    version: GraphQLString;
    parameterGroup?: GraphQLString;
    name?: GraphQLString;
    parameterName?: GraphQLString;
    parameterValue?: GraphQLString;
}

export interface CciUpdateModuleInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    systemId?: string;
    systemName?: GraphQLString;
    channelHash?: GraphQLString;
    channelParty?: GraphQLString;
    channelComponent?: GraphQLString;
    channelName?: GraphQLString;
    flowHash?: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent?: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName?: GraphQLString;
    flowInterfaceNamespace?: GraphQLString;
    version?: GraphQLString;
    parameterGroup?: GraphQLString;
    name?: GraphQLString;
    parameterName?: GraphQLString;
    parameterValue?: GraphQLString;
}

export interface CciCreateRoleInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    name: GraphQLString;
}

export interface CciUpdateRoleInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    name?: GraphQLString;
}

export interface CciCreateSystemInput {
    id: string;
    tenantId: string;
    tenantCode: GraphQLString;
    version: GraphQLString;
    name: GraphQLString;
    environment: GraphQLString;
    technology: CciSystemTechnology;
    isActive: GraphQLBoolean;
    cancelledAt?: GraphQLTimestamp;
}

export interface CciUpdateSystemInput {
    id: string;
    tenantId?: string;
    tenantCode?: GraphQLString;
    version?: GraphQLString;
    name?: GraphQLString;
    environment?: GraphQLString;
    technology?: CciSystemTechnology;
    isActive?: GraphQLBoolean;
    cancelledAt?: GraphQLTimestamp;
}

export interface QueryStatement {
    where?: JSON;
    include?: string[];
    order?: JSON;
    limit?: number;
    offset?: number;
}

export interface IamCreateAccountInput {
    id: string;
    type: IamAccountType;
    email: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    dApplicationCodes?: JSON;
    dPermissions?: JSON;
    data?: JSON;
    roleIds?: string[];
    tenantIds?: string[];
    user?: IamCreateUserInput;
}

export interface IamUpdateAccountInput {
    id: string;
    type?: IamAccountType;
    email?: GraphQLString;
    isActive?: GraphQLBoolean;
    clientId?: string;
    dApplicationCodes?: JSON;
    dPermissions?: JSON;
    data?: JSON;
    roleIds?: string[];
    tenantIds?: string[];
    user?: IamUpdateUserInput;
}

export interface IamCreateBoundedContextInput {
    id: string;
    name: GraphQLString;
    root: GraphQLString;
    sort: GraphQLInt;
    isActive: GraphQLBoolean;
}

export interface IamUpdateBoundedContextInput {
    id: string;
    name?: GraphQLString;
    root?: GraphQLString;
    sort?: GraphQLInt;
    isActive?: GraphQLBoolean;
}

export interface IamCreatePermissionInput {
    id: string;
    name: GraphQLString;
    boundedContextId: string;
    roleIds?: string[];
}

export interface IamUpdatePermissionInput {
    id: string;
    name?: GraphQLString;
    boundedContextId?: string;
    roleIds?: string[];
}

export interface IamCreateRoleInput {
    id: string;
    name: GraphQLString;
    isMaster: GraphQLBoolean;
    permissionIds?: string[];
    accountIds?: string[];
}

export interface IamUpdateRoleInput {
    id: string;
    name?: GraphQLString;
    isMaster?: GraphQLBoolean;
    permissionIds?: string[];
    accountIds?: string[];
}

export interface IamCreateTenantInput {
    id: string;
    name: GraphQLString;
    code: GraphQLString;
    logo?: GraphQLString;
    isActive: GraphQLBoolean;
    data?: JSON;
    accountIds?: string[];
}

export interface IamUpdateTenantInput {
    id: string;
    name?: GraphQLString;
    code?: GraphQLString;
    logo?: GraphQLString;
    isActive?: GraphQLBoolean;
    data?: JSON;
    accountIds?: string[];
}

export interface IamCreateUserInput {
    id: string;
    accountId: string;
    name: GraphQLString;
    surname?: GraphQLString;
    avatar?: GraphQLString;
    mobile?: GraphQLString;
    langId?: string;
    username: GraphQLString;
    password: GraphQLString;
    rememberToken?: GraphQLString;
    data?: JSON;
}

export interface IamUpdateUserInput {
    id: string;
    accountId?: string;
    name?: GraphQLString;
    surname?: GraphQLString;
    avatar?: GraphQLString;
    mobile?: GraphQLString;
    langId?: string;
    username?: GraphQLString;
    password?: GraphQLString;
    rememberToken?: GraphQLString;
    data?: JSON;
}

export interface OAuthCreateAccessTokenInput {
    id: string;
    clientId: string;
    accountId?: string;
    token: GraphQLString;
    name?: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLTimestamp;
}

export interface OAuthUpdateAccessTokenInput {
    id: string;
    clientId?: string;
    accountId?: string;
    token?: GraphQLString;
    name?: GraphQLString;
    isRevoked?: GraphQLBoolean;
    expiresAt?: GraphQLTimestamp;
}

export interface OAuthCreateApplicationInput {
    id: string;
    name: GraphQLString;
    code: GraphQLString;
    secret: GraphQLString;
    isMaster: GraphQLBoolean;
    clientIds?: string[];
}

export interface OAuthUpdateApplicationInput {
    id: string;
    name?: GraphQLString;
    code?: GraphQLString;
    secret?: GraphQLString;
    isMaster?: GraphQLBoolean;
    clientIds?: string[];
}

export interface OAuthCreateClientInput {
    id: string;
    grantType: OAuthClientGrantType;
    name: GraphQLString;
    secret: GraphQLString;
    authUrl?: GraphQLString;
    redirect?: GraphQLString;
    expiredAccessToken?: GraphQLInt;
    expiredRefreshToken?: GraphQLInt;
    isActive: GraphQLBoolean;
    isMaster: GraphQLBoolean;
    applicationIds?: string[];
}

export interface OAuthUpdateClientInput {
    id: string;
    grantType?: OAuthClientGrantType;
    name?: GraphQLString;
    secret?: GraphQLString;
    authUrl?: GraphQLString;
    redirect?: GraphQLString;
    expiredAccessToken?: GraphQLInt;
    expiredRefreshToken?: GraphQLInt;
    isActive?: GraphQLBoolean;
    isMaster?: GraphQLBoolean;
    applicationIds?: string[];
}

export interface OAuthCreateCredentialInput {
    grantType: OAuthClientGrantType;
    username?: GraphQLString;
    password?: GraphQLString;
    email?: GraphQLString;
    clientSecret?: GraphQLString;
    accessTokenId?: string;
    refreshToken?: GraphQLString;
    redirect?: GraphQLString;
}

export interface OAuthCreateRefreshTokenInput {
    id: string;
    accessTokenId: string;
    token: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLTimestamp;
}

export interface OAuthUpdateRefreshTokenInput {
    id: string;
    accessTokenId?: string;
    token?: GraphQLString;
    isRevoked?: GraphQLBoolean;
    expiresAt?: GraphQLTimestamp;
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

export interface IQuery {
    adminFindLang(query?: QueryStatement, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminFindLangById(id?: string, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminGetLangs(query?: QueryStatement, constraint?: QueryStatement): AdminLang[] | Promise<AdminLang[]>;
    adminPaginateLangs(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindChannelDetail(query?: QueryStatement, constraint?: QueryStatement): CciChannelDetail | Promise<CciChannelDetail>;
    cciFindChannelDetailById(id?: string, constraint?: QueryStatement): CciChannelDetail | Promise<CciChannelDetail>;
    cciGetChannelsDetail(query?: QueryStatement, constraint?: QueryStatement): CciChannelDetail[] | Promise<CciChannelDetail[]>;
    cciPaginateChannelsDetail(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindChannelOverview(query?: QueryStatement, constraint?: QueryStatement): CciChannelOverview | Promise<CciChannelOverview>;
    cciFindChannelOverviewById(id?: string, constraint?: QueryStatement): CciChannelOverview | Promise<CciChannelOverview>;
    cciGetChannelsOverview(query?: QueryStatement, constraint?: QueryStatement): CciChannelOverview[] | Promise<CciChannelOverview[]>;
    cciPaginateChannelsOverview(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindChannel(query?: QueryStatement, constraint?: QueryStatement): CciChannel | Promise<CciChannel>;
    cciFindChannelById(id?: string, constraint?: QueryStatement): CciChannel | Promise<CciChannel>;
    cciGetChannels(query?: QueryStatement, constraint?: QueryStatement): CciChannel[] | Promise<CciChannel[]>;
    cciPaginateChannels(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindContact(query?: QueryStatement, constraint?: QueryStatement): CciContact | Promise<CciContact>;
    cciFindContactById(id?: string, constraint?: QueryStatement): CciContact | Promise<CciContact>;
    cciGetContacts(query?: QueryStatement, constraint?: QueryStatement): CciContact[] | Promise<CciContact[]>;
    cciPaginateContacts(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindDashboard(): CciDashboard | Promise<CciDashboard>;
    cciFindDataLake(query?: QueryStatement, constraint?: QueryStatement): CciDataLake | Promise<CciDataLake>;
    cciFindDataLakeById(id?: string, constraint?: QueryStatement): CciDataLake | Promise<CciDataLake>;
    cciGetDataLakes(query?: QueryStatement, constraint?: QueryStatement): CciDataLake[] | Promise<CciDataLake[]>;
    cciPaginateDataLakes(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindExecution(query?: QueryStatement, constraint?: QueryStatement): CciExecution | Promise<CciExecution>;
    cciFindExecutionById(id?: string, constraint?: QueryStatement): CciExecution | Promise<CciExecution>;
    cciGetExecutions(query?: QueryStatement, constraint?: QueryStatement): CciExecution[] | Promise<CciExecution[]>;
    cciPaginateExecutions(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindFlow(query?: QueryStatement, constraint?: QueryStatement): CciFlow | Promise<CciFlow>;
    cciFindFlowById(id?: string, constraint?: QueryStatement): CciFlow | Promise<CciFlow>;
    cciGetFlows(query?: QueryStatement, constraint?: QueryStatement): CciFlow[] | Promise<CciFlow[]>;
    cciPaginateFlows(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindJobDetail(query?: QueryStatement, constraint?: QueryStatement): CciJobDetail | Promise<CciJobDetail>;
    cciFindJobDetailById(id?: string, constraint?: QueryStatement): CciJobDetail | Promise<CciJobDetail>;
    cciGetJobsDetail(query?: QueryStatement, constraint?: QueryStatement): CciJobDetail[] | Promise<CciJobDetail[]>;
    cciPaginateJobsDetail(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindJobOverview(query?: QueryStatement, constraint?: QueryStatement): CciJobOverview | Promise<CciJobOverview>;
    cciFindJobOverviewById(id?: string, constraint?: QueryStatement): CciJobOverview | Promise<CciJobOverview>;
    cciGetJobsOverview(query?: QueryStatement, constraint?: QueryStatement): CciJobOverview[] | Promise<CciJobOverview[]>;
    cciPaginateJobsOverview(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindMessageDetail(query?: QueryStatement, constraint?: QueryStatement): CciMessageDetail | Promise<CciMessageDetail>;
    cciFindMessageDetailById(id?: string, constraint?: QueryStatement): CciMessageDetail | Promise<CciMessageDetail>;
    cciGetMessagesDetail(query?: QueryStatement, constraint?: QueryStatement): CciMessageDetail[] | Promise<CciMessageDetail[]>;
    cciPaginateMessagesDetail(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindMessageOverview(query?: QueryStatement, constraint?: QueryStatement): CciMessageOverview | Promise<CciMessageOverview>;
    cciFindMessageOverviewById(id?: string, constraint?: QueryStatement): CciMessageOverview | Promise<CciMessageOverview>;
    cciGetMessagesOverview(query?: QueryStatement, constraint?: QueryStatement): CciMessageOverview[] | Promise<CciMessageOverview[]>;
    cciPaginateMessagesOverview(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindModule(query?: QueryStatement, constraint?: QueryStatement): CciModule | Promise<CciModule>;
    cciFindModuleById(id?: string, constraint?: QueryStatement): CciModule | Promise<CciModule>;
    cciGetModules(query?: QueryStatement, constraint?: QueryStatement): CciModule[] | Promise<CciModule[]>;
    cciPaginateModules(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindRole(query?: QueryStatement, constraint?: QueryStatement): CciRole | Promise<CciRole>;
    cciFindRoleById(id?: string, constraint?: QueryStatement): CciRole | Promise<CciRole>;
    cciGetRoles(query?: QueryStatement, constraint?: QueryStatement): CciRole[] | Promise<CciRole[]>;
    cciPaginateRoles(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    cciFindSystemSummary(systemId: string): CciSummary | Promise<CciSummary>;
    cciFindSystem(query?: QueryStatement, constraint?: QueryStatement): CciSystem | Promise<CciSystem>;
    cciFindSystemById(id?: string, constraint?: QueryStatement): CciSystem | Promise<CciSystem>;
    cciGetSystems(query?: QueryStatement, constraint?: QueryStatement): CciSystem[] | Promise<CciSystem[]>;
    cciPaginateSystems(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindMeAccount(): IamAccount | Promise<IamAccount>;
    iamFindAccount(query?: QueryStatement, constraint?: QueryStatement): IamAccount | Promise<IamAccount>;
    iamFindAccountById(id?: string, constraint?: QueryStatement): IamAccount | Promise<IamAccount>;
    iamGetAccounts(query?: QueryStatement, constraint?: QueryStatement): IamAccount[] | Promise<IamAccount[]>;
    iamPaginateAccounts(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindBoundedContext(query?: QueryStatement, constraint?: QueryStatement): IamBoundedContext | Promise<IamBoundedContext>;
    iamFindBoundedContextById(id?: string, constraint?: QueryStatement): IamBoundedContext | Promise<IamBoundedContext>;
    iamGetBoundedContexts(query?: QueryStatement, constraint?: QueryStatement): IamBoundedContext[] | Promise<IamBoundedContext[]>;
    iamPaginateBoundedContexts(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindPermission(query?: QueryStatement, constraint?: QueryStatement): IamPermission | Promise<IamPermission>;
    iamFindPermissionById(id?: string, constraint?: QueryStatement): IamPermission | Promise<IamPermission>;
    iamGetPermissions(query?: QueryStatement, constraint?: QueryStatement): IamPermission[] | Promise<IamPermission[]>;
    iamPaginatePermissions(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindRole(query?: QueryStatement, constraint?: QueryStatement): IamRole | Promise<IamRole>;
    iamFindRoleById(id?: string, constraint?: QueryStatement): IamRole | Promise<IamRole>;
    iamGetRoles(query?: QueryStatement, constraint?: QueryStatement): IamRole[] | Promise<IamRole[]>;
    iamPaginateRoles(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindTenant(query?: QueryStatement, constraint?: QueryStatement): IamTenant | Promise<IamTenant>;
    iamFindTenantById(id?: string, constraint?: QueryStatement): IamTenant | Promise<IamTenant>;
    iamGetTenants(query?: QueryStatement, constraint?: QueryStatement): IamTenant[] | Promise<IamTenant[]>;
    iamPaginateTenants(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindUser(query?: QueryStatement, constraint?: QueryStatement): IamUser | Promise<IamUser>;
    iamFindUserById(id?: string, constraint?: QueryStatement): IamUser | Promise<IamUser>;
    iamGetUsers(query?: QueryStatement, constraint?: QueryStatement): IamUser[] | Promise<IamUser[]>;
    iamPaginateUsers(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    oAuthFindAccessToken(query?: QueryStatement, constraint?: QueryStatement): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthFindAccessTokenById(id?: string, constraint?: QueryStatement): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthGetAccessTokens(query?: QueryStatement, constraint?: QueryStatement): OAuthAccessToken[] | Promise<OAuthAccessToken[]>;
    oAuthPaginateAccessTokens(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    oAuthFindApplication(query?: QueryStatement, constraint?: QueryStatement): OAuthApplication | Promise<OAuthApplication>;
    oAuthFindApplicationById(id?: string, constraint?: QueryStatement): OAuthApplication | Promise<OAuthApplication>;
    oAuthGetApplications(query?: QueryStatement, constraint?: QueryStatement): OAuthApplication[] | Promise<OAuthApplication[]>;
    oAuthPaginateApplications(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    oAuthFindClient(query?: QueryStatement, constraint?: QueryStatement): OAuthClient | Promise<OAuthClient>;
    oAuthFindClientById(id?: string, constraint?: QueryStatement): OAuthClient | Promise<OAuthClient>;
    oAuthGetClients(query?: QueryStatement, constraint?: QueryStatement): OAuthClient[] | Promise<OAuthClient[]>;
    oAuthPaginateClients(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    oAuthFindRefreshToken(query?: QueryStatement, constraint?: QueryStatement): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthFindRefreshTokenById(id?: string, constraint?: QueryStatement): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthGetRefreshTokens(query?: QueryStatement, constraint?: QueryStatement): OAuthRefreshToken[] | Promise<OAuthRefreshToken[]>;
    oAuthPaginateRefreshTokens(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
}

export interface IMutation {
    adminCreateLang(payload: AdminCreateLangInput): AdminLang | Promise<AdminLang>;
    adminCreateLangs(payload: AdminCreateLangInput[]): boolean | Promise<boolean>;
    adminUpdateLang(payload: AdminUpdateLangInput, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminDeleteLangById(id: string, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminDeleteLangs(query?: QueryStatement, constraint?: QueryStatement): AdminLang[] | Promise<AdminLang[]>;
    cciCreateChannelDetail(payload: CciCreateChannelDetailInput): CciChannelDetail | Promise<CciChannelDetail>;
    cciCreateChannelsDetail(payload: CciCreateChannelDetailInput[]): boolean | Promise<boolean>;
    cciUpdateChannelDetail(payload: CciUpdateChannelDetailInput, constraint?: QueryStatement): CciChannelDetail | Promise<CciChannelDetail>;
    cciDeleteChannelDetailById(id: string, constraint?: QueryStatement): CciChannelDetail | Promise<CciChannelDetail>;
    cciDeleteChannelsDetail(query?: QueryStatement, constraint?: QueryStatement): CciChannelDetail[] | Promise<CciChannelDetail[]>;
    cciCreateChannelOverview(payload: CciCreateChannelOverviewInput): CciChannelOverview | Promise<CciChannelOverview>;
    cciCreateChannelsOverview(payload: CciCreateChannelOverviewInput[]): boolean | Promise<boolean>;
    cciUpdateChannelOverview(payload: CciUpdateChannelOverviewInput, constraint?: QueryStatement): CciChannelOverview | Promise<CciChannelOverview>;
    cciDeleteChannelOverviewById(id: string, constraint?: QueryStatement): CciChannelOverview | Promise<CciChannelOverview>;
    cciDeleteChannelsOverview(query?: QueryStatement, constraint?: QueryStatement): CciChannelOverview[] | Promise<CciChannelOverview[]>;
    cciCreateChannel(payload: CciCreateChannelInput): CciChannel | Promise<CciChannel>;
    cciCreateChannels(payload: CciCreateChannelInput[]): boolean | Promise<boolean>;
    cciUpdateChannel(payload: CciUpdateChannelInput, constraint?: QueryStatement): CciChannel | Promise<CciChannel>;
    cciDeleteChannelById(id: string, constraint?: QueryStatement): CciChannel | Promise<CciChannel>;
    cciDeleteChannels(query?: QueryStatement, constraint?: QueryStatement): CciChannel[] | Promise<CciChannel[]>;
    cciCreateContact(payload: CciCreateContactInput): CciContact | Promise<CciContact>;
    cciCreateContacts(payload: CciCreateContactInput[]): boolean | Promise<boolean>;
    cciUpdateContact(payload: CciUpdateContactInput, constraint?: QueryStatement): CciContact | Promise<CciContact>;
    cciDeleteContactById(id: string, constraint?: QueryStatement): CciContact | Promise<CciContact>;
    cciDeleteContacts(query?: QueryStatement, constraint?: QueryStatement): CciContact[] | Promise<CciContact[]>;
    cciCreateDataLake(payload: CciCreateDataLakeInput): CciDataLake | Promise<CciDataLake>;
    cciCreateDataLakes(payload: CciCreateDataLakeInput[]): boolean | Promise<boolean>;
    cciUpdateDataLake(payload: CciUpdateDataLakeInput, constraint?: QueryStatement): CciDataLake | Promise<CciDataLake>;
    cciDeleteDataLakeById(id: string, constraint?: QueryStatement): CciDataLake | Promise<CciDataLake>;
    cciDeleteDataLakes(query?: QueryStatement, constraint?: QueryStatement): CciDataLake[] | Promise<CciDataLake[]>;
    cciCreateExecution(payload: CciCreateExecutionInput): CciExecution | Promise<CciExecution>;
    cciCreateExecutions(payload: CciCreateExecutionInput[]): boolean | Promise<boolean>;
    cciUpdateExecution(payload: CciUpdateExecutionInput, constraint?: QueryStatement): CciExecution | Promise<CciExecution>;
    cciDeleteExecutionById(id: string, constraint?: QueryStatement): CciExecution | Promise<CciExecution>;
    cciDeleteExecutions(query?: QueryStatement, constraint?: QueryStatement): CciExecution[] | Promise<CciExecution[]>;
    cciCreateFlow(payload: CciCreateFlowInput): CciFlow | Promise<CciFlow>;
    cciCreateFlows(payload: CciCreateFlowInput[]): boolean | Promise<boolean>;
    cciUpdateFlow(payload: CciUpdateFlowInput, constraint?: QueryStatement): CciFlow | Promise<CciFlow>;
    cciDeleteFlowById(id: string, constraint?: QueryStatement): CciFlow | Promise<CciFlow>;
    cciDeleteFlows(query?: QueryStatement, constraint?: QueryStatement): CciFlow[] | Promise<CciFlow[]>;
    cciCreateJobDetail(payload: CciCreateJobDetailInput): CciJobDetail | Promise<CciJobDetail>;
    cciCreateJobsDetail(payload: CciCreateJobDetailInput[]): boolean | Promise<boolean>;
    cciUpdateJobDetail(payload: CciUpdateJobDetailInput, constraint?: QueryStatement): CciJobDetail | Promise<CciJobDetail>;
    cciDeleteJobDetailById(id: string, constraint?: QueryStatement): CciJobDetail | Promise<CciJobDetail>;
    cciDeleteJobsDetail(query?: QueryStatement, constraint?: QueryStatement): CciJobDetail[] | Promise<CciJobDetail[]>;
    cciCreateJobOverview(payload: CciCreateJobOverviewInput): CciJobOverview | Promise<CciJobOverview>;
    cciCreateJobsOverview(payload: CciCreateJobOverviewInput[]): boolean | Promise<boolean>;
    cciUpdateJobOverview(payload: CciUpdateJobOverviewInput, constraint?: QueryStatement): CciJobOverview | Promise<CciJobOverview>;
    cciDeleteJobOverviewById(id: string, constraint?: QueryStatement): CciJobOverview | Promise<CciJobOverview>;
    cciDeleteJobsOverview(query?: QueryStatement, constraint?: QueryStatement): CciJobOverview[] | Promise<CciJobOverview[]>;
    cciCreateMessageDetail(payload: CciCreateMessageDetailInput): CciMessageDetail | Promise<CciMessageDetail>;
    cciCreateMessagesDetail(payload: CciCreateMessageDetailInput[]): boolean | Promise<boolean>;
    cciUpdateMessageDetail(payload: CciUpdateMessageDetailInput, constraint?: QueryStatement): CciMessageDetail | Promise<CciMessageDetail>;
    cciDeleteMessageDetailById(id: string, constraint?: QueryStatement): CciMessageDetail | Promise<CciMessageDetail>;
    cciDeleteMessagesDetail(query?: QueryStatement, constraint?: QueryStatement): CciMessageDetail[] | Promise<CciMessageDetail[]>;
    cciCreateMessageOverview(payload: CciCreateMessageOverviewInput): CciMessageOverview | Promise<CciMessageOverview>;
    cciCreateMessagesOverview(payload: CciCreateMessageOverviewInput[]): boolean | Promise<boolean>;
    cciUpdateMessageOverview(payload: CciUpdateMessageOverviewInput, constraint?: QueryStatement): CciMessageOverview | Promise<CciMessageOverview>;
    cciDeleteMessageOverviewById(id: string, constraint?: QueryStatement): CciMessageOverview | Promise<CciMessageOverview>;
    cciDeleteMessagesOverview(query?: QueryStatement, constraint?: QueryStatement): CciMessageOverview[] | Promise<CciMessageOverview[]>;
    cciCreateModule(payload: CciCreateModuleInput): CciModule | Promise<CciModule>;
    cciCreateModules(payload: CciCreateModuleInput[]): boolean | Promise<boolean>;
    cciUpdateModule(payload: CciUpdateModuleInput, constraint?: QueryStatement): CciModule | Promise<CciModule>;
    cciDeleteModuleById(id: string, constraint?: QueryStatement): CciModule | Promise<CciModule>;
    cciDeleteModules(query?: QueryStatement, constraint?: QueryStatement): CciModule[] | Promise<CciModule[]>;
    cciCreateRole(payload: CciCreateRoleInput): CciRole | Promise<CciRole>;
    cciCreateRoles(payload: CciCreateRoleInput[]): boolean | Promise<boolean>;
    cciUpdateRole(payload: CciUpdateRoleInput, constraint?: QueryStatement): CciRole | Promise<CciRole>;
    cciDeleteRoleById(id: string, constraint?: QueryStatement): CciRole | Promise<CciRole>;
    cciDeleteRoles(query?: QueryStatement, constraint?: QueryStatement): CciRole[] | Promise<CciRole[]>;
    cciCreateSystem(payload: CciCreateSystemInput): CciSystem | Promise<CciSystem>;
    cciCreateSystems(payload: CciCreateSystemInput[]): boolean | Promise<boolean>;
    cciUpdateSystem(payload: CciUpdateSystemInput, constraint?: QueryStatement): CciSystem | Promise<CciSystem>;
    cciDeleteSystemById(id: string, constraint?: QueryStatement): CciSystem | Promise<CciSystem>;
    cciDeleteSystems(query?: QueryStatement, constraint?: QueryStatement): CciSystem[] | Promise<CciSystem[]>;
    iamCreateAccount(payload: IamCreateAccountInput): IamAccount | Promise<IamAccount>;
    iamCreateAccounts(payload: IamCreateAccountInput[]): boolean | Promise<boolean>;
    iamUpdateAccount(payload: IamUpdateAccountInput, constraint?: QueryStatement): IamAccount | Promise<IamAccount>;
    iamDeleteAccountById(id: string, constraint?: QueryStatement): IamAccount | Promise<IamAccount>;
    iamDeleteAccounts(query?: QueryStatement, constraint?: QueryStatement): IamAccount[] | Promise<IamAccount[]>;
    iamCreateBoundedContext(payload: IamCreateBoundedContextInput): IamBoundedContext | Promise<IamBoundedContext>;
    iamCreateBoundedContexts(payload: IamCreateBoundedContextInput[]): boolean | Promise<boolean>;
    iamUpdateBoundedContext(payload: IamUpdateBoundedContextInput, constraint?: QueryStatement): IamBoundedContext | Promise<IamBoundedContext>;
    iamDeleteBoundedContextById(id: string, constraint?: QueryStatement): IamBoundedContext | Promise<IamBoundedContext>;
    iamDeleteBoundedContexts(query?: QueryStatement, constraint?: QueryStatement): IamBoundedContext[] | Promise<IamBoundedContext[]>;
    iamCreatePermission(payload: IamCreatePermissionInput): IamPermission | Promise<IamPermission>;
    iamCreatePermissions(payload: IamCreatePermissionInput[]): boolean | Promise<boolean>;
    iamUpdatePermission(payload: IamUpdatePermissionInput, constraint?: QueryStatement): IamPermission | Promise<IamPermission>;
    iamDeletePermissionById(id: string, constraint?: QueryStatement): IamPermission | Promise<IamPermission>;
    iamDeletePermissions(query?: QueryStatement, constraint?: QueryStatement): IamPermission[] | Promise<IamPermission[]>;
    iamCreateRole(payload: IamCreateRoleInput): IamRole | Promise<IamRole>;
    iamCreateRoles(payload: IamCreateRoleInput[]): boolean | Promise<boolean>;
    iamUpdateRole(payload: IamUpdateRoleInput, constraint?: QueryStatement): IamRole | Promise<IamRole>;
    iamDeleteRoleById(id: string, constraint?: QueryStatement): IamRole | Promise<IamRole>;
    iamDeleteRoles(query?: QueryStatement, constraint?: QueryStatement): IamRole[] | Promise<IamRole[]>;
    iamCreateTenant(payload: IamCreateTenantInput): IamTenant | Promise<IamTenant>;
    iamCreateTenants(payload: IamCreateTenantInput[]): boolean | Promise<boolean>;
    iamUpdateTenant(payload: IamUpdateTenantInput, constraint?: QueryStatement): IamTenant | Promise<IamTenant>;
    iamDeleteTenantById(id: string, constraint?: QueryStatement): IamTenant | Promise<IamTenant>;
    iamDeleteTenants(query?: QueryStatement, constraint?: QueryStatement): IamTenant[] | Promise<IamTenant[]>;
    iamCreateUser(payload: IamCreateUserInput): IamUser | Promise<IamUser>;
    iamCreateUsers(payload: IamCreateUserInput[]): boolean | Promise<boolean>;
    iamUpdateUser(payload: IamUpdateUserInput, constraint?: QueryStatement): IamUser | Promise<IamUser>;
    iamDeleteUserById(id: string, constraint?: QueryStatement): IamUser | Promise<IamUser>;
    iamDeleteUsers(query?: QueryStatement, constraint?: QueryStatement): IamUser[] | Promise<IamUser[]>;
    oAuthCreateAccessToken(payload: OAuthCreateAccessTokenInput): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthCreateAccessTokens(payload: OAuthCreateAccessTokenInput[]): boolean | Promise<boolean>;
    oAuthUpdateAccessToken(payload: OAuthUpdateAccessTokenInput, constraint?: QueryStatement): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthDeleteAccessTokenById(id: string, constraint?: QueryStatement): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthDeleteAccessTokens(query?: QueryStatement, constraint?: QueryStatement): OAuthAccessToken[] | Promise<OAuthAccessToken[]>;
    oAuthCreateApplication(payload: OAuthCreateApplicationInput): OAuthApplication | Promise<OAuthApplication>;
    oAuthCreateApplications(payload: OAuthCreateApplicationInput[]): boolean | Promise<boolean>;
    oAuthUpdateApplication(payload: OAuthUpdateApplicationInput, constraint?: QueryStatement): OAuthApplication | Promise<OAuthApplication>;
    oAuthDeleteApplicationById(id: string, constraint?: QueryStatement): OAuthApplication | Promise<OAuthApplication>;
    oAuthDeleteApplications(query?: QueryStatement, constraint?: QueryStatement): OAuthApplication[] | Promise<OAuthApplication[]>;
    oAuthCreateClient(payload: OAuthCreateClientInput): OAuthClient | Promise<OAuthClient>;
    oAuthCreateClients(payload: OAuthCreateClientInput[]): boolean | Promise<boolean>;
    oAuthUpdateClient(payload: OAuthUpdateClientInput, constraint?: QueryStatement): OAuthClient | Promise<OAuthClient>;
    oAuthDeleteClientById(id: string, constraint?: QueryStatement): OAuthClient | Promise<OAuthClient>;
    oAuthDeleteClients(query?: QueryStatement, constraint?: QueryStatement): OAuthClient[] | Promise<OAuthClient[]>;
    oAuthCreateCredential(payload: OAuthCreateCredentialInput): OAuthCredential | Promise<OAuthCredential>;
    oAuthCreateRefreshToken(payload: OAuthCreateRefreshTokenInput): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthCreateRefreshTokens(payload: OAuthCreateRefreshTokenInput[]): boolean | Promise<boolean>;
    oAuthUpdateRefreshToken(payload: OAuthUpdateRefreshTokenInput, constraint?: QueryStatement): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthDeleteRefreshTokenById(id: string, constraint?: QueryStatement): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthDeleteRefreshTokens(query?: QueryStatement, constraint?: QueryStatement): OAuthRefreshToken[] | Promise<OAuthRefreshToken[]>;
}

export interface CciChannelDetail {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    executionId: string;
    execution: CciExecution;
    executionType: CciChannelDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    status: CciChannelDetailStatus;
    channelHash: GraphQLString;
    channelSapId: GraphQLString;
    channelParty?: GraphQLString;
    channelComponent: GraphQLString;
    channelName: GraphQLString;
    detail?: GraphQLString;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciChannelOverview {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    executionId: string;
    execution: CciExecution;
    executionType: CciChannelOverviewExecutionType;
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

export interface CciChannel {
    id: string;
    hash: GraphQLString;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    party?: GraphQLString;
    component: GraphQLString;
    name: GraphQLString;
    flowHash?: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent?: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName?: GraphQLString;
    flowInterfaceNamespace?: GraphQLString;
    version?: GraphQLString;
    adapterType?: GraphQLString;
    direction?: CciChannelDirection;
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
    adapterStatus?: CciChannelAdapterStatus;
    softwareComponentName?: GraphQLString;
    responsibleUserAccountName?: GraphQLString;
    lastChangeUserAccount?: GraphQLString;
    lastChangedAt?: GraphQLTimestamp;
    riInterfaceName?: GraphQLString;
    riInterfaceNamespace?: GraphQLString;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciContact {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    roleId?: string;
    role?: CciRole;
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

export interface CciDashboard {
    tenants: IamTenant[];
    systems: CciSystem[];
    jobsOverview: CciJobOverview[];
    channelsOverview: CciChannelOverview[];
    messagesOverview: CciMessageOverview[];
}

export interface CciDataLake {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    executionId: string;
    execution: CciExecution;
    tenantCode: GraphQLString;
    payload: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciExecution {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    version: GraphQLString;
    type: CciExecutionType;
    executedAt: GraphQLTimestamp;
    monitoringStartAt: GraphQLTimestamp;
    monitoringEndAt: GraphQLTimestamp;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciFlow {
    id: string;
    hash: GraphQLString;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    version: GraphQLString;
    scenario?: GraphQLString;
    party?: GraphQLString;
    receiverParty?: GraphQLString;
    component: GraphQLString;
    receiverComponent?: GraphQLString;
    interfaceName: GraphQLString;
    interfaceNamespace: GraphQLString;
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
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciJobDetail {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    executionId: string;
    execution: CciExecution;
    executionType: CciJobDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    status: CciJobDetailStatus;
    name?: GraphQLString;
    returnCode?: GraphQLInt;
    node?: GraphQLString;
    user?: GraphQLString;
    startAt: GraphQLTimestamp;
    endAt: GraphQLTimestamp;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciJobOverview {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    executionId: string;
    execution: CciExecution;
    executionType: CciJobOverviewExecutionType;
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

export interface CciMessageDetail {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    scenario?: GraphQLString;
    executionId: string;
    execution: CciExecution;
    executionType: CciMessageDetailExecutionType;
    executionExecutedAt: GraphQLTimestamp;
    executionMonitoringStartAt: GraphQLTimestamp;
    executionMonitoringEndAt: GraphQLTimestamp;
    flowHash: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName: GraphQLString;
    flowInterfaceNamespace: GraphQLString;
    status: CciMessageDetailStatus;
    refMessageId?: GraphQLString;
    detail?: GraphQLString;
    example?: GraphQLString;
    startTimeAt?: GraphQLTimestamp;
    direction: CciMessageDetailDirection;
    errorCategory?: GraphQLString;
    errorCode?: GraphQLString;
    errorLabel?: GraphQLInt;
    node?: GraphQLInt;
    protocol?: GraphQLString;
    qualityOfService?: GraphQLString;
    receiverParty?: GraphQLString;
    receiverComponent?: GraphQLString;
    receiverInterface?: GraphQLString;
    receiverInterfaceNamespace?: GraphQLString;
    retries?: GraphQLInt;
    size?: GraphQLInt;
    timesFailed?: GraphQLInt;
    numberMax?: GraphQLInt;
    numberDays?: GraphQLInt;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciMessageOverview {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    executionId: string;
    execution: CciExecution;
    executionType: CciMessageOverviewExecutionType;
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

export interface CciModule {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    systemId: string;
    system: CciSystem;
    systemName: GraphQLString;
    channelHash: GraphQLString;
    channelParty?: GraphQLString;
    channelComponent: GraphQLString;
    channelName: GraphQLString;
    flowHash?: GraphQLString;
    flowParty?: GraphQLString;
    flowReceiverParty?: GraphQLString;
    flowComponent?: GraphQLString;
    flowReceiverComponent?: GraphQLString;
    flowInterfaceName?: GraphQLString;
    flowInterfaceNamespace?: GraphQLString;
    version: GraphQLString;
    parameterGroup?: GraphQLString;
    name?: GraphQLString;
    parameterName?: GraphQLString;
    parameterValue?: GraphQLString;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciRole {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    name: GraphQLString;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface CciSummary {
    system: CciSystem;
    execution: CciExecution;
    jobsDetail: CciJobDetail[];
    channelsDetail: CciChannelDetail[];
    messagesDetail: CciMessageDetail[];
}

export interface CciSystem {
    id: string;
    tenantId: string;
    tenant: IamTenant;
    tenantCode: GraphQLString;
    version: GraphQLString;
    name: GraphQLString;
    environment: GraphQLString;
    technology: CciSystemTechnology;
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

export interface IamAccount {
    id: string;
    type: IamAccountType;
    email: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    dApplicationCodes: JSON;
    dPermissions: JSON;
    dTenants: JSON;
    data?: JSON;
    roles?: IamRole[];
    tenants?: IamTenant[];
    user?: IamUser;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IamBoundedContext {
    id: string;
    name: GraphQLString;
    root: GraphQLString;
    sort: GraphQLInt;
    isActive: GraphQLBoolean;
    permissions?: IamPermission[];
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IamPermission {
    id: string;
    name: GraphQLString;
    boundedContextId: string;
    boundedContext: IamBoundedContext;
    roles?: IamRole[];
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IamRole {
    id: string;
    name: GraphQLString;
    isMaster: GraphQLBoolean;
    permissions?: IamPermission[];
    accounts?: IamAccount[];
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IamTenant {
    id: string;
    name: GraphQLString;
    code: GraphQLString;
    logo?: GraphQLString;
    isActive: GraphQLBoolean;
    data?: JSON;
    accounts?: IamAccount[];
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IamUser {
    id: string;
    accountId: string;
    account: IamAccount;
    name: GraphQLString;
    surname?: GraphQLString;
    avatar?: GraphQLString;
    mobile?: GraphQLString;
    langId?: string;
    username: GraphQLString;
    password: GraphQLString;
    rememberToken?: GraphQLString;
    data?: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface OAuthAccessToken {
    id: string;
    client: OAuthClient;
    accountId?: string;
    token: GraphQLString;
    name?: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLTimestamp;
    refreshToken?: OAuthRefreshToken;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface OAuthApplication {
    id: string;
    name: GraphQLString;
    code: GraphQLString;
    secret: GraphQLString;
    isMaster: GraphQLBoolean;
    clients?: OAuthClient[];
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface OAuthClient {
    id: string;
    grantType: OAuthClientGrantType;
    name: GraphQLString;
    secret: GraphQLString;
    authUrl?: GraphQLString;
    redirect?: GraphQLString;
    expiredAccessToken?: GraphQLInt;
    expiredRefreshToken?: GraphQLInt;
    isActive: GraphQLBoolean;
    isMaster: GraphQLBoolean;
    applications?: OAuthApplication[];
    accessTokens?: OAuthAccessToken[];
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface OAuthCredential {
    accessToken: GraphQLString;
    refreshToken: GraphQLString;
}

export interface OAuthRefreshToken {
    id: string;
    accessTokenId: string;
    token: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLTimestamp;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
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
