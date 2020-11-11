
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface AdminCreateCountryInput {
    id: string;
    commonId: string;
    langId: string;
    iso3166Alpha2: GraphQLString;
    iso3166Alpha3: GraphQLString;
    iso3166Numeric: GraphQLString;
    customCode?: GraphQLString;
    prefix?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
    image?: GraphQLString;
    sort: GraphQLInt;
    administrativeAreaLevel1?: GraphQLString;
    administrativeAreaLevel2?: GraphQLString;
    administrativeAreaLevel3?: GraphQLString;
    administrativeAreas?: JSON;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
    dataLang?: JSON;
}

export interface AdminUpdateCountryInput {
    id: string;
    commonId?: string;
    langId?: string;
    iso3166Alpha2?: GraphQLString;
    iso3166Alpha3?: GraphQLString;
    iso3166Numeric?: GraphQLString;
    customCode?: GraphQLString;
    prefix?: GraphQLString;
    name?: GraphQLString;
    slug?: GraphQLString;
    image?: GraphQLString;
    sort?: GraphQLInt;
    administrativeAreaLevel1?: GraphQLString;
    administrativeAreaLevel2?: GraphQLString;
    administrativeAreaLevel3?: GraphQLString;
    administrativeAreas?: JSON;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
    dataLang?: JSON;
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

export interface QueryStatement {
    where?: JSON;
    include?: string[];
    order?: JSON;
    limit?: number;
    offset?: number;
}

export interface AdminCountry {
    id: string;
    commonId: string;
    langId: string;
    lang: AdminLang;
    iso3166Alpha2: GraphQLString;
    iso3166Alpha3: GraphQLString;
    iso3166Numeric: GraphQLString;
    customCode?: GraphQLString;
    prefix?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
    image?: GraphQLString;
    sort: GraphQLInt;
    administrativeAreaLevel1?: GraphQLString;
    administrativeAreaLevel2?: GraphQLString;
    administrativeAreaLevel3?: GraphQLString;
    administrativeAreas?: JSON;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
    dataLang?: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IQuery {
    adminFindCountry(query?: QueryStatement, constraint?: QueryStatement): AdminCountry | Promise<AdminCountry>;
    adminFindCountryById(id?: string, constraint?: QueryStatement): AdminCountry | Promise<AdminCountry>;
    adminGetCountries(query?: QueryStatement, constraint?: QueryStatement): AdminCountry[] | Promise<AdminCountry[]>;
    adminPaginateCountries(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindLang(query?: QueryStatement, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminFindLangById(id?: string, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminGetLangs(query?: QueryStatement, constraint?: QueryStatement): AdminLang[] | Promise<AdminLang[]>;
    adminPaginateLangs(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
}

export interface IMutation {
    adminCreateCountry(payload: AdminCreateCountryInput): AdminCountry | Promise<AdminCountry>;
    adminCreateCountries(payload: AdminCreateCountryInput[]): boolean | Promise<boolean>;
    adminUpdateCountry(payload: AdminUpdateCountryInput, constraint?: QueryStatement): AdminCountry | Promise<AdminCountry>;
    adminDeleteCountryById(id: string, constraint?: QueryStatement): AdminCountry | Promise<AdminCountry>;
    adminDeleteCountries(query?: QueryStatement, constraint?: QueryStatement): AdminCountry[] | Promise<AdminCountry[]>;
    adminCreateLang(payload: AdminCreateLangInput): AdminLang | Promise<AdminLang>;
    adminCreateLangs(payload: AdminCreateLangInput[]): boolean | Promise<boolean>;
    adminUpdateLang(payload: AdminUpdateLangInput, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminDeleteLangById(id: string, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminDeleteLangs(query?: QueryStatement, constraint?: QueryStatement): AdminLang[] | Promise<AdminLang[]>;
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
