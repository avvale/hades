import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleUpdatedAt extends TimestampValueObject
{
    public readonly type: 'RoleUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'RoleUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}