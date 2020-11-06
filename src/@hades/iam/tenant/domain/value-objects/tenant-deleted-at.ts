import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class TenantDeletedAt extends TimestampValueObject
{
    public readonly type: 'TenantDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'TenantDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}