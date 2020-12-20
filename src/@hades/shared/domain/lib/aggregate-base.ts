import { ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';

export interface AggregateBase
{
    id: UuidValueObject;
    createdAt?: TimestampValueObject;
    updatedAt?: TimestampValueObject;
    deletedAt?: TimestampValueObject;

    toDTO(): ObjectLiteral;
}