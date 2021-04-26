
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum OAuthClientGrantType {
    AUTHORIZATION_CODE = "AUTHORIZATION_CODE",
    CLIENT_CREDENTIALS = "CLIENT_CREDENTIALS",
    PASSWORD = "PASSWORD"
}

export interface QueryStatement {
    where?: JSON;
    include?: GraphQLString[];
    order?: JSON;
    limit?: GraphQLInt;
    offset?: GraphQLInt;
}

export interface OAuthCreateAccessTokenInput {
    id: string;
    clientId: string;
    accountId?: string;
    token: GraphQLString;
    name?: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: GraphQLTimestamp;
    refreshToken?: OAuthCreateRefreshTokenInput;
}

export interface OAuthUpdateAccessTokenInput {
    id: string;
    clientId?: string;
    accountId?: string;
    token?: GraphQLString;
    name?: GraphQLString;
    isRevoked?: GraphQLBoolean;
    expiresAt?: GraphQLTimestamp;
    refreshToken?: OAuthUpdateRefreshTokenInput;
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

export interface Pagination {
    total: GraphQLInt;
    count: GraphQLInt;
    rows: JSON[];
}

export interface OAuthAccessToken {
    id: string;
    clientId: string;
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

export interface IQuery {
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
    accessToken: OAuthAccessToken;
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
export type GraphQLUpload = any;
