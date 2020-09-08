
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

export enum GrantType {
    authorization_code = "authorization_code",
    client_credentials = "client_credentials",
    implicit = "implicit",
    password = "password",
    refresh_token = "refresh_token"
}

export interface QueryStatementInput {
    command: Command;
    column?: string;
    operator?: Operator;
    value?: Any;
}

export interface OAuthCreateCredentialInput {
    username: GraphQLString;
    password: GraphQLString;
    grantType: GrantType;
}

export interface Pagination {
    total: number;
    count: number;
    rows: JSON[];
}

export interface OAuthCredential {
    tokenType: string;
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    scope?: string;
}

export interface IQuery {
    _empty(): string | Promise<string>;
}

export interface IMutation {
    oAuthCreateCredential(payload: OAuthCreateCredentialInput): OAuthCredential | Promise<OAuthCredential>;
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
