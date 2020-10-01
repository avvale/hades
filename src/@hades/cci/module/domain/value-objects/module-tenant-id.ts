import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleTenantId extends UuidValueObject
{
    public readonly type: 'ModuleTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}