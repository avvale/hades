
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

export interface QueryStatement {
    where?: JSON;
    include?: GraphQLString[];
    order?: JSON;
    limit?: GraphQLInt;
    offset?: GraphQLInt;
}

export interface IamCreateAccountInput {
    id: string;
    type: IamAccountType;
    email: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    dApplicationCodes: JSON;
    dPermissions: JSON;
    data?: JSON;
    roleIds?: string[];
    tenantIds?: string[];
    user?: IamCreateUserInput;
    dTenants: JSON;
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
    dTenants?: JSON;
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

export interface Pagination {
    total: GraphQLInt;
    count: GraphQLInt;
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

export interface IQuery {
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
}

export interface IMutation {
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

export type JSON = any;
export type Any = any;
export type Upload = any;
export type GraphQLString = any;
export type GraphQLInt = any;
export type GraphQLFloat = any;
export type GraphQLBoolean = any;
export type GraphQLISODateTime = any;
export type GraphQLTimestamp = any;
export type GraphQLUpload = any;
