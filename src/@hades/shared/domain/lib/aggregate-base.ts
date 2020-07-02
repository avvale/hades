import { ObjectLiteral } from './object-literal';

export interface AggregateBase
{
    toDTO(): ObjectLiteral;
}