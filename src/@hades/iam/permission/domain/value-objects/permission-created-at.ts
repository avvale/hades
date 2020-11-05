import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PermissionCreatedAt extends TimestampValueObject
{
    public readonly type: 'PermissionCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'PermissionCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}