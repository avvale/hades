export interface Jwt 
{
    jit: string;            // id from this token
    aci: string;            // account id
    iss: string;            // name to identify who belong this token
    iat: number;            // timestamp when this token was issued
    nbf: number;            // token accepted not before this timestamp
    exp: number|null;       // timestamp when expired this token
}

export interface MapperOptions 
{
    eagerLoading: boolean;
}

export interface ObjectLiteral 
{
    [key: string]: any;
}

export interface ValidationRules
{
    name?: string,
    nullable?: boolean;
    undefinable?: boolean;
    length?:number;
    minLength?: number;
    maxLength?: number;
    enumOptions?: string[];
    unsigned?: boolean;
    default?: any;
}

export interface DataValueObject
{
    haveToEncrypt?: boolean
}