import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class DataLakeTenantId extends UuidValueObject
{
    public readonly type: 'DataLakeTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'DataLakeTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}