
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum BplusItSappiExecutionType {
    SUMMARY = "SUMMARY",
    DETAIL = "DETAIL"
}

export enum BplusItSappiJobOverviewExecutionType {
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

export interface AdminCreateModuleInput {
    id: string;
    name: GraphQLString;
    root: GraphQLString;
    sort: GraphQLInt;
    isActive: GraphQLBoolean;
}

export interface AdminUpdateModuleInput {
    id: string;
    name?: GraphQLString;
    root?: GraphQLString;
    sort?: GraphQLInt;
    isActive?: GraphQLBoolean;
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

export interface BplusItSappiCreateJobOverviewInput {
    id: string;
    tenantId: string;
    systemId: string;
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
    executionType?: BplusItSappiJobOverviewExecutionType;
    executionExecutedAt?: GraphQLTimestamp;
    executionMonitoringStartAt?: GraphQLTimestamp;
    executionMonitoringEndAt?: GraphQLTimestamp;
    cancelled?: GraphQLInt;
    completed?: GraphQLInt;
    error?: GraphQLInt;
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
    adminFindLang(query?: QueryStatementInput[]): AdminLang | Promise<AdminLang>;
    adminFindLangById(id?: string): AdminLang | Promise<AdminLang>;
    adminGetLangs(query?: QueryStatementInput[]): AdminLang[] | Promise<AdminLang[]>;
    adminPaginateLangs(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    adminFindModule(query?: QueryStatementInput[]): AdminModule | Promise<AdminModule>;
    adminFindModuleById(id?: string): AdminModule | Promise<AdminModule>;
    adminGetModules(query?: QueryStatementInput[]): AdminModule[] | Promise<AdminModule[]>;
    adminPaginateModules(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    adminFindTenant(query?: QueryStatementInput[]): AdminTenant | Promise<AdminTenant>;
    adminFindTenantById(id?: string): AdminTenant | Promise<AdminTenant>;
    adminGetTenants(query?: QueryStatementInput[]): AdminTenant[] | Promise<AdminTenant[]>;
    adminPaginateTenants(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindDataLake(query?: QueryStatementInput[]): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiFindDataLakeById(id?: string): BplusItSappiDataLake | Promise<BplusItSappiDataLake>;
    bplusItSappiGetDataLakes(query?: QueryStatementInput[]): BplusItSappiDataLake[] | Promise<BplusItSappiDataLake[]>;
    bplusItSappiPaginateDataLakes(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindExecution(query?: QueryStatementInput[]): BplusItSappiExecution | Promise<BplusItSappiExecution>;
    bplusItSappiFindExecutionById(id?: string): BplusItSappiExecution | Promise<BplusItSappiExecution>;
    bplusItSappiGetExecutions(query?: QueryStatementInput[]): BplusItSappiExecution[] | Promise<BplusItSappiExecution[]>;
    bplusItSappiPaginateExecutions(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindJobOverview(query?: QueryStatementInput[]): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiFindJobOverviewById(id?: string): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiGetJobsOverview(query?: QueryStatementInput[]): BplusItSappiJobOverview[] | Promise<BplusItSappiJobOverview[]>;
    bplusItSappiPaginateJobsOverview(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
    bplusItSappiFindSystem(query?: QueryStatementInput[]): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiFindSystemById(id?: string): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiGetSystems(query?: QueryStatementInput[]): BplusItSappiSystem[] | Promise<BplusItSappiSystem[]>;
    bplusItSappiPaginateSystems(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
}

export interface IMutation {
    adminCreateLang(payload: AdminCreateLangInput): AdminLang | Promise<AdminLang>;
    adminInsertLangs(payload: AdminCreateLangInput[]): boolean | Promise<boolean>;
    adminUpdateLang(payload: AdminUpdateLangInput): AdminLang | Promise<AdminLang>;
    adminDeleteLangById(id: string): AdminLang | Promise<AdminLang>;
    adminDeleteLangs(query?: QueryStatementInput[]): AdminLang[] | Promise<AdminLang[]>;
    adminCreateModule(payload: AdminCreateModuleInput): AdminModule | Promise<AdminModule>;
    adminInsertModules(payload: AdminCreateModuleInput[]): boolean | Promise<boolean>;
    adminUpdateModule(payload: AdminUpdateModuleInput): AdminModule | Promise<AdminModule>;
    adminDeleteModuleById(id: string): AdminModule | Promise<AdminModule>;
    adminDeleteModules(query?: QueryStatementInput[]): AdminModule[] | Promise<AdminModule[]>;
    adminCreateTenant(payload: AdminCreateTenantInput): AdminTenant | Promise<AdminTenant>;
    adminInsertTenants(payload: AdminCreateTenantInput[]): boolean | Promise<boolean>;
    adminUpdateTenant(payload: AdminUpdateTenantInput): AdminTenant | Promise<AdminTenant>;
    adminDeleteTenantById(id: string): AdminTenant | Promise<AdminTenant>;
    adminDeleteTenants(query?: QueryStatementInput[]): AdminTenant[] | Promise<AdminTenant[]>;
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
    bplusItSappiCreateJobOverview(payload: BplusItSappiCreateJobOverviewInput): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiInsertJobsOverview(payload: BplusItSappiCreateJobOverviewInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateJobOverview(payload: BplusItSappiUpdateJobOverviewInput): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiDeleteJobOverviewById(id: string): BplusItSappiJobOverview | Promise<BplusItSappiJobOverview>;
    bplusItSappiDeleteJobsOverview(query?: QueryStatementInput[]): BplusItSappiJobOverview[] | Promise<BplusItSappiJobOverview[]>;
    bplusItSappiCreateSystem(payload: BplusItSappiCreateSystemInput): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiInsertSystems(payload: BplusItSappiCreateSystemInput[]): boolean | Promise<boolean>;
    bplusItSappiUpdateSystem(payload: BplusItSappiUpdateSystemInput): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiDeleteSystemById(id: string): BplusItSappiSystem | Promise<BplusItSappiSystem>;
    bplusItSappiDeleteSystems(query?: QueryStatementInput[]): BplusItSappiSystem[] | Promise<BplusItSappiSystem[]>;
}

export interface AdminModule {
    id: string;
    name: GraphQLString;
    root: GraphQLString;
    sort: GraphQLInt;
    isActive: GraphQLBoolean;
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

export interface BplusItSappiJobOverview {
    id: string;
    tenantId: string;
    systemId: string;
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
