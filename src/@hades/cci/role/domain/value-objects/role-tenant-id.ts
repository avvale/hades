import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleTenantId extends UuidValueObject
{
    public readonly type: 'RoleTenantId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'RoleTenantId',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}