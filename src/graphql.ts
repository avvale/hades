
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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

export enum NfcActionType {
    CMS = "CMS",
    ZAP = "ZAP",
    TCI = "TCI",
    MULESOFT = "MULESOFT"
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

export interface QueryStatementInput {
    command: Command;
    column?: string;
    operator?: Operator;
    value?: Any;
}

export interface NfcCreateActionInput {
    id: string;
    tagId: string;
    type: NfcActionType;
    sectionId?: string;
    data?: JSON;
}

export interface NfcUpdateActionInput {
    id: string;
    tagId?: string;
    type?: NfcActionType;
    sectionId?: string;
    data?: JSON;
}

export interface NfcCreateSessionInput {
    id: string;
    ip: GraphQLString;
    tagId: string;
    uid: GraphQLString;
    counter: GraphQLInt;
    expiredAt?: GraphQLTimestamp;
}

export interface NfcUpdateSessionInput {
    id: string;
    ip?: GraphQLString;
    tagId?: string;
    uid?: GraphQLString;
    counter?: GraphQLInt;
    expiredAt?: GraphQLTimestamp;
}

export interface NfcCreateSummaryInput {
    id: string;
    tagId: string;
    tenantId: string;
    accessAt: GraphQLTimestamp;
    counter: GraphQLInt;
}

export interface NfcUpdateSummaryInput {
    id: string;
    tagId?: string;
    tenantId?: string;
    accessAt?: GraphQLTimestamp;
    counter?: GraphQLInt;
}

export interface NfcCreateTagInput {
    id: string;
    code: GraphQLInt;
    tenantId: string;
    tenantCode: GraphQLString;
    urlBase: GraphQLString;
    params?: JSON;
    offset?: GraphQLInt;
    isSessionRequired?: GraphQLBoolean;
}

export interface NfcUpdateTagInput {
    id: string;
    code?: GraphQLInt;
    tenantId?: string;
    tenantCode?: GraphQLString;
    urlBase?: GraphQLString;
    params?: JSON;
    offset?: GraphQLInt;
    isSessionRequired?: GraphQLBoolean;
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
    nfcFindAction(query?: QueryStatementInput[]): NfcAction | Promise<NfcAction>;
    nfcFindActionById(id?: string): NfcAction | Promise<NfcAction>;
    nfcGetActions(query?: QueryStatementInput[]): NfcAction[] | Promise<NfcAction[]>;
    nfcPaginateActions(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    nfcFindSession(query?: QueryStatementInput[]): NfcSession | Promise<NfcSession>;
    nfcFindSessionById(id?: string): NfcSession | Promise<NfcSession>;
    nfcGetSessions(query?: QueryStatementInput[]): NfcSession[] | Promise<NfcSession[]>;
    nfcPaginateSessions(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    nfcFindSummary(query?: QueryStatementInput[]): NfcSummary | Promise<NfcSummary>;
    nfcFindSummaryById(id?: string): NfcSummary | Promise<NfcSummary>;
    nfcGetSummaries(query?: QueryStatementInput[]): NfcSummary[] | Promise<NfcSummary[]>;
    nfcPaginateSummaries(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    nfcFindTag(query?: QueryStatementInput[]): NfcTag | Promise<NfcTag>;
    nfcFindTagById(id?: string): NfcTag | Promise<NfcTag>;
    nfcGetTags(query?: QueryStatementInput[]): NfcTag[] | Promise<NfcTag[]>;
    nfcPaginateTags(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
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
    nfcCreateAction(payload: NfcCreateActionInput): NfcAction | Promise<NfcAction>;
    nfcInsertActions(payload: NfcCreateActionInput[]): boolean | Promise<boolean>;
    nfcUpdateAction(payload: NfcUpdateActionInput): NfcAction | Promise<NfcAction>;
    nfcDeleteActionById(id: string): NfcAction | Promise<NfcAction>;
    nfcDeleteActions(query?: QueryStatementInput[]): NfcAction[] | Promise<NfcAction[]>;
    nfcCreateSession(payload: NfcCreateSessionInput): NfcSession | Promise<NfcSession>;
    nfcInsertSessions(payload: NfcCreateSessionInput[]): boolean | Promise<boolean>;
    nfcUpdateSession(payload: NfcUpdateSessionInput): NfcSession | Promise<NfcSession>;
    nfcDeleteSessionById(id: string): NfcSession | Promise<NfcSession>;
    nfcDeleteSessions(query?: QueryStatementInput[]): NfcSession[] | Promise<NfcSession[]>;
    nfcCreateSummary(payload: NfcCreateSummaryInput): NfcSummary | Promise<NfcSummary>;
    nfcInsertSummaries(payload: NfcCreateSummaryInput[]): boolean | Promise<boolean>;
    nfcUpdateSummary(payload: NfcUpdateSummaryInput): NfcSummary | Promise<NfcSummary>;
    nfcDeleteSummaryById(id: string): NfcSummary | Promise<NfcSummary>;
    nfcDeleteSummaries(query?: QueryStatementInput[]): NfcSummary[] | Promise<NfcSummary[]>;
    nfcCreateTag(payload: NfcCreateTagInput): NfcTag | Promise<NfcTag>;
    nfcInsertTags(payload: NfcCreateTagInput[]): boolean | Promise<boolean>;
    nfcUpdateTag(payload: NfcUpdateTagInput): NfcTag | Promise<NfcTag>;
    nfcDeleteTagById(id: string): NfcTag | Promise<NfcTag>;
    nfcDeleteTags(query?: QueryStatementInput[]): NfcTag[] | Promise<NfcTag[]>;
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

export interface Pagination {
    total: number;
    count: number;
    rows: JSON[];
}

export interface NfcAction {
    id: string;
    tagId: string;
    type: NfcActionType;
    sectionId?: string;
    data?: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface NfcSession {
    id: string;
    ip: GraphQLString;
    tagId: string;
    uid: GraphQLString;
    counter: GraphQLInt;
    expiredAt?: GraphQLTimestamp;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface NfcSummary {
    id: string;
    tagId: string;
    tenantId: string;
    accessAt: GraphQLTimestamp;
    counter: GraphQLInt;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface NfcTag {
    id: string;
    code: GraphQLInt;
    tenantId: string;
    tenantCode: GraphQLString;
    urlBase: GraphQLString;
    params?: JSON;
    offset?: GraphQLInt;
    isSessionRequired?: GraphQLBoolean;
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
