import { ObjectLiteral } from '@hades/shared/domain/lib/hades.types';

export interface AggregateBase
{
    toDTO(): ObjectLiteral;
}