import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactTenantId extends UuidValueObject
{
    public readonly type: 'ContactTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}