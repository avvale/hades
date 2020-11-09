import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleDeletedAt extends TimestampValueObject
{
    public readonly type: 'RoleDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'RoleDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}