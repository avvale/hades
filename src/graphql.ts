
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum IamAccountType {
    USER = "USER",
    SERVICE = "SERVICE"
}

export enum OAuthClientGrantType {
    AUTHORIZATION_CODE = "AUTHORIZATION_CODE",
    CLIENT_CREDENTIALS = "CLIENT_CREDENTIALS",
    PASSWORD = "PASSWORD"
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
    name: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    applicationCodes: JSON;
    permissions: JSON;
    data?: JSON;
    roleIds?: string[];
    tenantIds?: string[];
}

export interface IamUpdateAccountInput {
    id: string;
    type?: IamAccountType;
    name?: GraphQLString;
    isActive?: GraphQLBoolean;
    clientId?: string;
    applicationCodes?: JSON;
    permissions?: JSON;
    data?: JSON;
    roleIds?: string[];
    tenantIds?: string[];
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
    surname?: GraphQLString;
    avatar?: GraphQLString;
    email: GraphQLString;
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
    surname?: GraphQLString;
    avatar?: GraphQLString;
    email?: GraphQLString;
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
    token: GraphQLString;
    name?: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLInt;
}

export interface OAuthUpdateAccessTokenInput {
    id: string;
    clientId?: string;
    token?: GraphQLString;
    name?: GraphQLString;
    isRevoked?: GraphQLBoolean;
    expiresAt?: GraphQLInt;
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
    isRevoked: GraphQLBoolean;
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
    isRevoked?: GraphQLBoolean;
    isMaster?: GraphQLBoolean;
    applicationIds?: string[];
}

export interface OAuthCreateCredentialInput {
    grantType: OAuthClientGrantType;
    username?: GraphQLString;
    password?: GraphQLString;
    accessTokenId?: string;
    refreshToken?: GraphQLString;
    clientSecret?: GraphQLString;
    redirect?: GraphQLString;
}

export interface OAuthCreateRefreshTokenInput {
    id: string;
    accessTokenId: string;
    token: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLInt;
}

export interface OAuthUpdateRefreshTokenInput {
    id: string;
    accessTokenId?: string;
    token?: GraphQLString;
    isRevoked?: GraphQLBoolean;
    expiresAt?: GraphQLInt;
}

export interface Pagination {
    total: number;
    count: number;
    rows: JSON[];
}

export interface IamAccount {
    id: string;
    type: IamAccountType;
    name: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    applicationCodes: JSON;
    permissions: JSON;
    data?: JSON;
    roles?: IamRole[];
    tenants?: IamTenant[];
    user?: IamUser;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IQuery {
    iamFindAccount(query?: QueryStatement): IamAccount | Promise<IamAccount>;
    iamFindAccountById(id?: string): IamAccount | Promise<IamAccount>;
    iamGetAccounts(query?: QueryStatement): IamAccount[] | Promise<IamAccount[]>;
    iamPaginateAccounts(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindBoundedContext(query?: QueryStatement): IamBoundedContext | Promise<IamBoundedContext>;
    iamFindBoundedContextById(id?: string): IamBoundedContext | Promise<IamBoundedContext>;
    iamGetBoundedContexts(query?: QueryStatement): IamBoundedContext[] | Promise<IamBoundedContext[]>;
    iamPaginateBoundedContexts(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindPermission(query?: QueryStatement): IamPermission | Promise<IamPermission>;
    iamFindPermissionById(id?: string): IamPermission | Promise<IamPermission>;
    iamGetPermissions(query?: QueryStatement): IamPermission[] | Promise<IamPermission[]>;
    iamPaginatePermissions(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindRole(query?: QueryStatement): IamRole | Promise<IamRole>;
    iamFindRoleById(id?: string): IamRole | Promise<IamRole>;
    iamGetRoles(query?: QueryStatement): IamRole[] | Promise<IamRole[]>;
    iamPaginateRoles(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindTenant(query?: QueryStatement): IamTenant | Promise<IamTenant>;
    iamFindTenantById(id?: string): IamTenant | Promise<IamTenant>;
    iamGetTenants(query?: QueryStatement): IamTenant[] | Promise<IamTenant[]>;
    iamPaginateTenants(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    iamFindUser(query?: QueryStatement): IamUser | Promise<IamUser>;
    iamFindUserById(id?: string): IamUser | Promise<IamUser>;
    iamGetUsers(query?: QueryStatement): IamUser[] | Promise<IamUser[]>;
    iamPaginateUsers(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    oAuthFindAccessToken(query?: QueryStatement): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthFindAccessTokenById(id?: string): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthGetAccessTokens(query?: QueryStatement): OAuthAccessToken[] | Promise<OAuthAccessToken[]>;
    oAuthPaginateAccessTokens(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    oAuthFindApplication(query?: QueryStatement): OAuthApplication | Promise<OAuthApplication>;
    oAuthFindApplicationById(id?: string): OAuthApplication | Promise<OAuthApplication>;
    oAuthGetApplications(query?: QueryStatement): OAuthApplication[] | Promise<OAuthApplication[]>;
    oAuthPaginateApplications(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    oAuthFindClient(query?: QueryStatement): OAuthClient | Promise<OAuthClient>;
    oAuthFindClientById(id?: string): OAuthClient | Promise<OAuthClient>;
    oAuthGetClients(query?: QueryStatement): OAuthClient[] | Promise<OAuthClient[]>;
    oAuthPaginateClients(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    oAuthFindRefreshToken(query?: QueryStatement): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthFindRefreshTokenById(id?: string): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthGetRefreshTokens(query?: QueryStatement): OAuthRefreshToken[] | Promise<OAuthRefreshToken[]>;
    oAuthPaginateRefreshTokens(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
}

export interface IMutation {
    iamCreateAccount(payload: IamCreateAccountInput): IamAccount | Promise<IamAccount>;
    iamCreateAccounts(payload: IamCreateAccountInput[]): boolean | Promise<boolean>;
    iamUpdateAccount(payload: IamUpdateAccountInput): IamAccount | Promise<IamAccount>;
    iamDeleteAccountById(id: string): IamAccount | Promise<IamAccount>;
    iamDeleteAccounts(query?: QueryStatement): IamAccount[] | Promise<IamAccount[]>;
    iamCreateBoundedContext(payload: IamCreateBoundedContextInput): IamBoundedContext | Promise<IamBoundedContext>;
    iamCreateBoundedContexts(payload: IamCreateBoundedContextInput[]): boolean | Promise<boolean>;
    iamUpdateBoundedContext(payload: IamUpdateBoundedContextInput): IamBoundedContext | Promise<IamBoundedContext>;
    iamDeleteBoundedContextById(id: string): IamBoundedContext | Promise<IamBoundedContext>;
    iamDeleteBoundedContexts(query?: QueryStatement): IamBoundedContext[] | Promise<IamBoundedContext[]>;
    iamCreatePermission(payload: IamCreatePermissionInput): IamPermission | Promise<IamPermission>;
    iamCreatePermissions(payload: IamCreatePermissionInput[]): boolean | Promise<boolean>;
    iamUpdatePermission(payload: IamUpdatePermissionInput): IamPermission | Promise<IamPermission>;
    iamDeletePermissionById(id: string): IamPermission | Promise<IamPermission>;
    iamDeletePermissions(query?: QueryStatement): IamPermission[] | Promise<IamPermission[]>;
    iamCreateRole(payload: IamCreateRoleInput): IamRole | Promise<IamRole>;
    iamCreateRoles(payload: IamCreateRoleInput[]): boolean | Promise<boolean>;
    iamUpdateRole(payload: IamUpdateRoleInput): IamRole | Promise<IamRole>;
    iamDeleteRoleById(id: string): IamRole | Promise<IamRole>;
    iamDeleteRoles(query?: QueryStatement): IamRole[] | Promise<IamRole[]>;
    iamCreateTenant(payload: IamCreateTenantInput): IamTenant | Promise<IamTenant>;
    iamCreateTenants(payload: IamCreateTenantInput[]): boolean | Promise<boolean>;
    iamUpdateTenant(payload: IamUpdateTenantInput): IamTenant | Promise<IamTenant>;
    iamDeleteTenantById(id: string): IamTenant | Promise<IamTenant>;
    iamDeleteTenants(query?: QueryStatement): IamTenant[] | Promise<IamTenant[]>;
    iamCreateUser(payload: IamCreateUserInput): IamUser | Promise<IamUser>;
    iamCreateUsers(payload: IamCreateUserInput[]): boolean | Promise<boolean>;
    iamUpdateUser(payload: IamUpdateUserInput): IamUser | Promise<IamUser>;
    iamDeleteUserById(id: string): IamUser | Promise<IamUser>;
    iamDeleteUsers(query?: QueryStatement): IamUser[] | Promise<IamUser[]>;
    oAuthCreateAccessToken(payload: OAuthCreateAccessTokenInput): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthCreateAccessTokens(payload: OAuthCreateAccessTokenInput[]): boolean | Promise<boolean>;
    oAuthUpdateAccessToken(payload: OAuthUpdateAccessTokenInput): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthDeleteAccessTokenById(id: string): OAuthAccessToken | Promise<OAuthAccessToken>;
    oAuthDeleteAccessTokens(query?: QueryStatement): OAuthAccessToken[] | Promise<OAuthAccessToken[]>;
    oAuthCreateApplication(payload: OAuthCreateApplicationInput): OAuthApplication | Promise<OAuthApplication>;
    oAuthCreateApplications(payload: OAuthCreateApplicationInput[]): boolean | Promise<boolean>;
    oAuthUpdateApplication(payload: OAuthUpdateApplicationInput): OAuthApplication | Promise<OAuthApplication>;
    oAuthDeleteApplicationById(id: string): OAuthApplication | Promise<OAuthApplication>;
    oAuthDeleteApplications(query?: QueryStatement): OAuthApplication[] | Promise<OAuthApplication[]>;
    oAuthCreateClient(payload: OAuthCreateClientInput): OAuthClient | Promise<OAuthClient>;
    oAuthCreateClients(payload: OAuthCreateClientInput[]): boolean | Promise<boolean>;
    oAuthUpdateClient(payload: OAuthUpdateClientInput): OAuthClient | Promise<OAuthClient>;
    oAuthDeleteClientById(id: string): OAuthClient | Promise<OAuthClient>;
    oAuthDeleteClients(query?: QueryStatement): OAuthClient[] | Promise<OAuthClient[]>;
    oAuthCreateCredential(payload: OAuthCreateCredentialInput): OAuthCredential | Promise<OAuthCredential>;
    oAuthCreateRefreshToken(payload: OAuthCreateRefreshTokenInput): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthCreateRefreshTokens(payload: OAuthCreateRefreshTokenInput[]): boolean | Promise<boolean>;
    oAuthUpdateRefreshToken(payload: OAuthUpdateRefreshTokenInput): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthDeleteRefreshTokenById(id: string): OAuthRefreshToken | Promise<OAuthRefreshToken>;
    oAuthDeleteRefreshTokens(query?: QueryStatement): OAuthRefreshToken[] | Promise<OAuthRefreshToken[]>;
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
    surname?: GraphQLString;
    avatar?: GraphQLString;
    email: GraphQLString;
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
    token: GraphQLString;
    name?: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLInt;
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
    isRevoked: GraphQLBoolean;
    isMaster: GraphQLBoolean;
    applications?: OAuthApplication[];
    accessTokens?: OAuthAccessToken[];
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface OAuthCredential {
    tokenType: string;
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
}

export interface OAuthRefreshToken {
    id: string;
    accessTokenId: string;
    token: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLInt;
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
