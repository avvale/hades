import { ObjectLiteral } from './object-literal';

export interface BaseEntity 
{
    toDTO(): ObjectLiteral;
}