import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailTenantId extends UuidValueObject
{
    public readonly type: 'MessageDetailTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}