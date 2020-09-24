
/** ------------------------------------------------------
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
    include?: string[];
    order?: JSON;
    limit?: number;
    offset?: number;
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

export interface IQuery {
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
