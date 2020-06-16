
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

export interface AdminCreateLangInput {
    id: string;
    name: string;
    image: string;
    iso6392: string;
    iso6393: string;
    ietf: string;
    sort?: GraphQLInt;
    isActive: boolean;
}

export interface AdminUpdateLangInput {
    id: string;
    name?: string;
    image?: string;
    iso6392?: string;
    iso6393?: string;
    ietf?: string;
    sort?: GraphQLInt;
    isActive?: boolean;
}

export interface QueryStatementInput {
    command: Command;
    column?: string;
    operator?: Operator;
    value?: Any;
}

export interface AdminLang {
    id: string;
    name: string;
    image?: string;
    iso6392: string;
    iso6393: string;
    ietf: string;
    sort?: GraphQLInt;
    isActive: boolean;
    createdAt: GraphQLTimestamp;
    updatedAt: GraphQLTimestamp;
}

export interface IQuery {
    adminFindLang(query?: QueryStatementInput[]): AdminLang | Promise<AdminLang>;
    adminFindLangById(id?: string): AdminLang | Promise<AdminLang>;
    adminGetLangs(query?: QueryStatementInput[]): AdminLang[] | Promise<AdminLang[]>;
    adminPaginateLangs(query?: QueryStatementInput[], constraint?: QueryStatementInput[]): Pagination | Promise<Pagination>;
}

export interface IMutation {
    adminCreateLang(payload: AdminCreateLangInput): AdminLang | Promise<AdminLang>;
    adminInsertLangs(payload: AdminCreateLangInput[]): boolean | Promise<boolean>;
    adminUpdateLang(payload: AdminUpdateLangInput): AdminLang | Promise<AdminLang>;
    adminDeleteLangs(query?: QueryStatementInput[]): AdminLang[] | Promise<AdminLang[]>;
    adminDeleteLangById(id: string): AdminLang | Promise<AdminLang>;
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
