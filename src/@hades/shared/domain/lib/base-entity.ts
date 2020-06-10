import { ObjectLiteral } from './object-literal';

export interface BaseEntity 
{
    toObject(): ObjectLiteral;
}