
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum AdminAttachmentFamilyFit {
    CROP = "CROP",
    WIDTH = "WIDTH",
    HEIGHT = "HEIGHT",
    FREE_WIDTH = "FREE_WIDTH",
    FREE_HEIGHT = "FREE_HEIGHT"
}

export enum AdminAttachmentFamilyFormat {
    JPG = "JPG",
    PNG = "PNG",
    GIF = "GIF",
    TIF = "TIF",
    BMP = "BMP",
    DATA_URL = "DATA_URL"
}

export enum AdminLangDir {
    LTR = "LTR",
    RTL = "RTL"
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

export interface AdminCreateAdministrativeAreaLevel1Input {
    id: string;
    countryId: string;
    code: GraphQLString;
    customCode?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
}

export interface AdminUpdateAdministrativeAreaLevel1Input {
    id: string;
    countryId?: string;
    code?: GraphQLString;
    customCode?: GraphQLString;
    name?: GraphQLString;
    slug?: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
}

export interface AdminCreateAdministrativeAreaLevel2Input {
    id: string;
    countryId: string;
    administrativeAreaLevel1Id: string;
    code: GraphQLString;
    customCode?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
}

export interface AdminUpdateAdministrativeAreaLevel2Input {
    id: string;
    countryId?: string;
    administrativeAreaLevel1Id?: string;
    code?: GraphQLString;
    customCode?: GraphQLString;
    name?: GraphQLString;
    slug?: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
}

export interface AdminCreateAdministrativeAreaLevel3Input {
    id: string;
    countryId: string;
    administrativeAreaLevel1Id: string;
    administrativeAreaLevel2Id: string;
    code: GraphQLString;
    customCode?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
}

export interface AdminUpdateAdministrativeAreaLevel3Input {
    id: string;
    countryId?: string;
    administrativeAreaLevel1Id?: string;
    administrativeAreaLevel2Id?: string;
    code?: GraphQLString;
    customCode?: GraphQLString;
    name?: GraphQLString;
    slug?: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
}

export interface AdminCreateAttachmentFamilyInput {
    id: string;
    name: GraphQLString;
    resourceIds?: string[];
    width?: GraphQLInt;
    height?: GraphQLInt;
    fit?: AdminAttachmentFamilyFit;
    sizes?: JSON;
    quality?: GraphQLInt;
    format?: AdminAttachmentFamilyFormat;
}

export interface AdminUpdateAttachmentFamilyInput {
    id: string;
    name?: GraphQLString;
    resourceIds?: string[];
    width?: GraphQLInt;
    height?: GraphQLInt;
    fit?: AdminAttachmentFamilyFit;
    sizes?: JSON;
    quality?: GraphQLInt;
    format?: AdminAttachmentFamilyFormat;
}

export interface AdminCreateAttachmentLibraryInput {
    id: string;
    name?: GraphQLString;
    pathname: GraphQLString;
    filename: GraphQLString;
    url: GraphQLString;
    mime: GraphQLString;
    extension?: GraphQLString;
    size: GraphQLInt;
    width?: GraphQLInt;
    height?: GraphQLInt;
    data?: JSON;
}

export interface AdminUpdateAttachmentLibraryInput {
    id: string;
    name?: GraphQLString;
    pathname?: GraphQLString;
    filename?: GraphQLString;
    url?: GraphQLString;
    mime?: GraphQLString;
    extension?: GraphQLString;
    size?: GraphQLInt;
    width?: GraphQLInt;
    height?: GraphQLInt;
    data?: JSON;
}

export interface AdminCreateAttachmentInput {
    id: string;
    commonId: string;
    langId: string;
    attachableModel: GraphQLString;
    attachableId: string;
    familyId?: string;
    sort?: GraphQLInt;
    alt?: GraphQLString;
    title?: GraphQLString;
    description?: GraphQLString;
    excerpt?: GraphQLString;
    name: GraphQLString;
    pathname: GraphQLString;
    filename: GraphQLString;
    url: GraphQLString;
    mime: GraphQLString;
    extension?: GraphQLString;
    size: GraphQLInt;
    width?: GraphQLInt;
    height?: GraphQLInt;
    libraryId?: string;
    libraryFilename?: GraphQLString;
    data?: JSON;
}

export interface AdminUpdateAttachmentInput {
    id: string;
    commonId?: string;
    langId?: string;
    attachableModel?: GraphQLString;
    attachableId?: string;
    familyId?: string;
    sort?: GraphQLInt;
    alt?: GraphQLString;
    title?: GraphQLString;
    description?: GraphQLString;
    excerpt?: GraphQLString;
    name?: GraphQLString;
    pathname?: GraphQLString;
    filename?: GraphQLString;
    url?: GraphQLString;
    mime?: GraphQLString;
    extension?: GraphQLString;
    size?: GraphQLInt;
    width?: GraphQLInt;
    height?: GraphQLInt;
    libraryId?: string;
    libraryFilename?: GraphQLString;
    data?: JSON;
}

export interface AdminCropInput {
    x: GraphQLInt;
    y: GraphQLInt;
    width: GraphQLInt;
    height: GraphQLInt;
    rotate: GraphQLInt;
    scaleX: GraphQLInt;
    scaleY: GraphQLInt;
}

export interface AdminCropAttachmentInput {
    id: string;
    commonId: string;
    langId: string;
    attachableModel: GraphQLString;
    attachableId: string;
    familyId?: string;
    sort?: GraphQLInt;
    alt?: GraphQLString;
    title?: GraphQLString;
    description?: GraphQLString;
    excerpt?: GraphQLString;
    name: GraphQLString;
    pathname: GraphQLString;
    filename: GraphQLString;
    url: GraphQLString;
    mime: GraphQLString;
    extension?: GraphQLString;
    size: GraphQLInt;
    width?: GraphQLInt;
    height?: GraphQLInt;
    libraryId?: string;
    library?: AdminCreateAttachmentLibraryInput;
    libraryFilename?: GraphQLString;
    data?: JSON;
    isUploaded: GraphQLBoolean;
    isChanged: GraphQLBoolean;
}

export interface AdminCreateCountryInput {
    id: string;
    langId: string;
    iso3166Alpha2: GraphQLString;
    iso3166Alpha3: GraphQLString;
    iso3166Numeric: GraphQLString;
    customCode?: GraphQLString;
    prefix?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
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

export interface AdminUpdateCountryInput {
    id: string;
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
    customCode?: GraphQLString;
    dir: AdminLangDir;
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
    customCode?: GraphQLString;
    dir?: AdminLangDir;
    sort?: GraphQLInt;
    isActive?: GraphQLBoolean;
}

export interface AdminCreateResourceInput {
    id: string;
    boundedContextId: string;
    attachmentFamilyIds?: string[];
    name: GraphQLString;
    hasCustomFields: GraphQLBoolean;
    hasAttachments: GraphQLBoolean;
}

export interface AdminUpdateResourceInput {
    id: string;
    boundedContextId?: string;
    attachmentFamilyIds?: string[];
    name?: GraphQLString;
    hasCustomFields?: GraphQLBoolean;
    hasAttachments?: GraphQLBoolean;
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

export interface AdminAdministrativeAreaLevel1 {
    id: string;
    countryId: string;
    country: AdminCountry;
    code: GraphQLString;
    customCode?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface IQuery {
    adminFindAdministrativeAreaLevel1(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel1 | Promise<AdminAdministrativeAreaLevel1>;
    adminFindAdministrativeAreaLevel1ById(id?: string, constraint?: QueryStatement): AdminAdministrativeAreaLevel1 | Promise<AdminAdministrativeAreaLevel1>;
    adminGetAdministrativeAreasLevel1(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel1[] | Promise<AdminAdministrativeAreaLevel1[]>;
    adminPaginateAdministrativeAreasLevel1(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindAdministrativeAreaLevel2(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel2 | Promise<AdminAdministrativeAreaLevel2>;
    adminFindAdministrativeAreaLevel2ById(id?: string, constraint?: QueryStatement): AdminAdministrativeAreaLevel2 | Promise<AdminAdministrativeAreaLevel2>;
    adminGetAdministrativeAreasLevel2(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel2[] | Promise<AdminAdministrativeAreaLevel2[]>;
    adminPaginateAdministrativeAreasLevel2(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindAdministrativeAreaLevel3(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel3 | Promise<AdminAdministrativeAreaLevel3>;
    adminFindAdministrativeAreaLevel3ById(id?: string, constraint?: QueryStatement): AdminAdministrativeAreaLevel3 | Promise<AdminAdministrativeAreaLevel3>;
    adminGetAdministrativeAreasLevel3(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel3[] | Promise<AdminAdministrativeAreaLevel3[]>;
    adminPaginateAdministrativeAreasLevel3(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindAttachmentFamily(query?: QueryStatement, constraint?: QueryStatement): AdminAttachmentFamily | Promise<AdminAttachmentFamily>;
    adminFindAttachmentFamilyById(id?: string, constraint?: QueryStatement): AdminAttachmentFamily | Promise<AdminAttachmentFamily>;
    adminGetAttachmentFamilies(query?: QueryStatement, constraint?: QueryStatement): AdminAttachmentFamily[] | Promise<AdminAttachmentFamily[]>;
    adminPaginateAttachmentFamilies(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindAttachmentLibrary(query?: QueryStatement, constraint?: QueryStatement): AdminAttachmentLibrary | Promise<AdminAttachmentLibrary>;
    adminFindAttachmentLibraryById(id?: string, constraint?: QueryStatement): AdminAttachmentLibrary | Promise<AdminAttachmentLibrary>;
    adminGetAttachmentLibraries(query?: QueryStatement, constraint?: QueryStatement): AdminAttachmentLibrary[] | Promise<AdminAttachmentLibrary[]>;
    adminPaginateAttachmentLibraries(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindAttachment(query?: QueryStatement, constraint?: QueryStatement): AdminAttachment | Promise<AdminAttachment>;
    adminFindAttachmentById(id?: string, constraint?: QueryStatement): AdminAttachment | Promise<AdminAttachment>;
    adminGetAttachments(query?: QueryStatement, constraint?: QueryStatement): AdminAttachment[] | Promise<AdminAttachment[]>;
    adminPaginateAttachments(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindCountry(query?: QueryStatement, constraint?: QueryStatement): AdminCountry | Promise<AdminCountry>;
    adminFindCountryById(id?: string, constraint?: QueryStatement): AdminCountry | Promise<AdminCountry>;
    adminGetCountries(query?: QueryStatement, constraint?: QueryStatement): AdminCountry[] | Promise<AdminCountry[]>;
    adminPaginateCountries(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindLang(query?: QueryStatement, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminFindLangById(id?: string, constraint?: QueryStatement): AdminLang | Promise<AdminLang>;
    adminGetLangs(query?: QueryStatement, constraint?: QueryStatement): AdminLang[] | Promise<AdminLang[]>;
    adminPaginateLangs(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
    adminFindResource(query?: QueryStatement, constraint?: QueryStatement): AdminResource | Promise<AdminResource>;
    adminFindResourceById(id?: string, constraint?: QueryStatement): AdminResource | Promise<AdminResource>;
    adminGetResources(query?: QueryStatement, constraint?: QueryStatement): AdminResource[] | Promise<AdminResource[]>;
    adminPaginateResources(query?: QueryStatement, constraint?: QueryStatement): Pagination | Promise<Pagination>;
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
    adminCreateAdministrativeAreaLevel1(payload: AdminCreateAdministrativeAreaLevel1Input): AdminAdministrativeAreaLevel1 | Promise<AdminAdministrativeAreaLevel1>;
    adminCreateAdministrativeAreasLevel1(payload: AdminCreateAdministrativeAreaLevel1Input[]): boolean | Promise<boolean>;
    adminUpdateAdministrativeAreaLevel1(payload: AdminUpdateAdministrativeAreaLevel1Input, constraint?: QueryStatement): AdminAdministrativeAreaLevel1 | Promise<AdminAdministrativeAreaLevel1>;
    adminDeleteAdministrativeAreaLevel1ById(id: string, constraint?: QueryStatement): AdminAdministrativeAreaLevel1 | Promise<AdminAdministrativeAreaLevel1>;
    adminDeleteAdministrativeAreasLevel1(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel1[] | Promise<AdminAdministrativeAreaLevel1[]>;
    adminCreateAdministrativeAreaLevel2(payload: AdminCreateAdministrativeAreaLevel2Input): AdminAdministrativeAreaLevel2 | Promise<AdminAdministrativeAreaLevel2>;
    adminCreateAdministrativeAreasLevel2(payload: AdminCreateAdministrativeAreaLevel2Input[]): boolean | Promise<boolean>;
    adminUpdateAdministrativeAreaLevel2(payload: AdminUpdateAdministrativeAreaLevel2Input, constraint?: QueryStatement): AdminAdministrativeAreaLevel2 | Promise<AdminAdministrativeAreaLevel2>;
    adminDeleteAdministrativeAreaLevel2ById(id: string, constraint?: QueryStatement): AdminAdministrativeAreaLevel2 | Promise<AdminAdministrativeAreaLevel2>;
    adminDeleteAdministrativeAreasLevel2(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel2[] | Promise<AdminAdministrativeAreaLevel2[]>;
    adminCreateAdministrativeAreaLevel3(payload: AdminCreateAdministrativeAreaLevel3Input): AdminAdministrativeAreaLevel3 | Promise<AdminAdministrativeAreaLevel3>;
    adminCreateAdministrativeAreasLevel3(payload: AdminCreateAdministrativeAreaLevel3Input[]): boolean | Promise<boolean>;
    adminUpdateAdministrativeAreaLevel3(payload: AdminUpdateAdministrativeAreaLevel3Input, constraint?: QueryStatement): AdminAdministrativeAreaLevel3 | Promise<AdminAdministrativeAreaLevel3>;
    adminDeleteAdministrativeAreaLevel3ById(id: string, constraint?: QueryStatement): AdminAdministrativeAreaLevel3 | Promise<AdminAdministrativeAreaLevel3>;
    adminDeleteAdministrativeAreasLevel3(query?: QueryStatement, constraint?: QueryStatement): AdminAdministrativeAreaLevel3[] | Promise<AdminAdministrativeAreaLevel3[]>;
    adminCreateAttachmentFamily(payload: AdminCreateAttachmentFamilyInput): AdminAttachmentFamily | Promise<AdminAttachmentFamily>;
    adminCreateAttachmentFamilies(payload: AdminCreateAttachmentFamilyInput[]): boolean | Promise<boolean>;
    adminUpdateAttachmentFamily(payload: AdminUpdateAttachmentFamilyInput, constraint?: QueryStatement): AdminAttachmentFamily | Promise<AdminAttachmentFamily>;
    adminDeleteAttachmentFamilyById(id: string, constraint?: QueryStatement): AdminAttachmentFamily | Promise<AdminAttachmentFamily>;
    adminDeleteAttachmentFamilies(query?: QueryStatement, constraint?: QueryStatement): AdminAttachmentFamily[] | Promise<AdminAttachmentFamily[]>;
    adminCreateAttachmentLibrary(payload: AdminCreateAttachmentLibraryInput): AdminAttachmentLibrary | Promise<AdminAttachmentLibrary>;
    adminCreateAttachmentLibraries(payload: AdminCreateAttachmentLibraryInput[]): boolean | Promise<boolean>;
    adminUpdateAttachmentLibrary(payload: AdminUpdateAttachmentLibraryInput, constraint?: QueryStatement): AdminAttachmentLibrary | Promise<AdminAttachmentLibrary>;
    adminDeleteAttachmentLibraryById(id: string, constraint?: QueryStatement): AdminAttachmentLibrary | Promise<AdminAttachmentLibrary>;
    adminDeleteAttachmentLibraries(query?: QueryStatement, constraint?: QueryStatement): AdminAttachmentLibrary[] | Promise<AdminAttachmentLibrary[]>;
    adminCreateAttachment(payload: AdminCreateAttachmentInput): AdminAttachment | Promise<AdminAttachment>;
    adminCreateAttachments(payload: AdminCreateAttachmentInput[]): boolean | Promise<boolean>;
    adminUpdateAttachment(payload: AdminUpdateAttachmentInput, constraint?: QueryStatement): AdminAttachment | Promise<AdminAttachment>;
    adminDeleteAttachmentById(id: string, constraint?: QueryStatement): AdminAttachment | Promise<AdminAttachment>;
    adminDeleteAttachments(query?: QueryStatement, constraint?: QueryStatement): AdminAttachment[] | Promise<AdminAttachment[]>;
    adminCropAttachment(crop: AdminCropInput, attachmentFamily: AdminCreateAttachmentFamilyInput, attachment: AdminCropAttachmentInput): JSON | Promise<JSON>;
    adminDeleteAttachment(attachment: AdminUpdateAttachmentInput): JSON | Promise<JSON>;
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
    adminCreateResource(payload: AdminCreateResourceInput): AdminResource | Promise<AdminResource>;
    adminCreateResources(payload: AdminCreateResourceInput[]): boolean | Promise<boolean>;
    adminUpdateResource(payload: AdminUpdateResourceInput, constraint?: QueryStatement): AdminResource | Promise<AdminResource>;
    adminDeleteResourceById(id: string, constraint?: QueryStatement): AdminResource | Promise<AdminResource>;
    adminDeleteResources(query?: QueryStatement, constraint?: QueryStatement): AdminResource[] | Promise<AdminResource[]>;
    adminUploadFiles(attachableModel: GraphQLString, attachableId: string, path: GraphQLString, langId: string, files: Upload[]): UploadFile[] | Promise<UploadFile[]>;
    adminUploadFile(attachableModel: GraphQLString, attachableId: string, path: GraphQLString, langId: string, file: Upload): UploadFile | Promise<UploadFile>;
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

export interface AdminAdministrativeAreaLevel2 {
    id: string;
    countryId: string;
    country: AdminCountry;
    administrativeAreaLevel1Id: string;
    administrativeAreaLevel1: AdminAdministrativeAreaLevel1;
    code: GraphQLString;
    customCode?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminAdministrativeAreaLevel3 {
    id: string;
    countryId: string;
    country: AdminCountry;
    administrativeAreaLevel1Id: string;
    administrativeAreaLevel1: AdminAdministrativeAreaLevel1;
    administrativeAreaLevel2Id: string;
    administrativeAreaLevel2: AdminAdministrativeAreaLevel2;
    code: GraphQLString;
    customCode?: GraphQLString;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: GraphQLFloat;
    longitude?: GraphQLFloat;
    zoom?: GraphQLInt;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminAttachmentFamily {
    id: string;
    name: GraphQLString;
    resources?: AdminResource[];
    width?: GraphQLInt;
    height?: GraphQLInt;
    fit?: AdminAttachmentFamilyFit;
    sizes?: JSON;
    quality?: GraphQLInt;
    format?: AdminAttachmentFamilyFormat;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminAttachmentLibrary {
    id: string;
    name?: GraphQLString;
    pathname: GraphQLString;
    filename: GraphQLString;
    url: GraphQLString;
    mime: GraphQLString;
    extension?: GraphQLString;
    size: GraphQLInt;
    width?: GraphQLInt;
    height?: GraphQLInt;
    data?: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminAttachment {
    id: string;
    commonId: string;
    langId: string;
    attachableModel: GraphQLString;
    attachableId: string;
    familyId?: string;
    family?: AdminAttachmentFamily;
    sort?: GraphQLInt;
    alt?: GraphQLString;
    title?: GraphQLString;
    description?: GraphQLString;
    excerpt?: GraphQLString;
    name: GraphQLString;
    pathname: GraphQLString;
    filename: GraphQLString;
    url: GraphQLString;
    mime: GraphQLString;
    extension?: GraphQLString;
    size: GraphQLInt;
    width?: GraphQLInt;
    height?: GraphQLInt;
    libraryId?: string;
    library?: AdminAttachmentLibrary;
    libraryFilename?: GraphQLString;
    data?: JSON;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminCountry {
    id: string;
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
    sort?: GraphQLInt;
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

export interface AdminLang {
    id: string;
    name: GraphQLString;
    image?: GraphQLString;
    iso6392: GraphQLString;
    iso6393: GraphQLString;
    ietf: GraphQLString;
    customCode?: GraphQLString;
    dir: AdminLangDir;
    sort?: GraphQLInt;
    isActive: GraphQLBoolean;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface AdminResource {
    id: string;
    boundedContextId: string;
    boundedContext: IamBoundedContext;
    attachmentFamilies?: AdminAttachmentFamily[];
    name: GraphQLString;
    hasCustomFields: GraphQLBoolean;
    hasAttachments: GraphQLBoolean;
    createdAt?: GraphQLTimestamp;
    updatedAt?: GraphQLTimestamp;
    deletedAt?: GraphQLTimestamp;
}

export interface UploadFile {
    attachmentLibrary?: AdminAttachmentLibrary;
    attachment?: AdminAttachment;
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
