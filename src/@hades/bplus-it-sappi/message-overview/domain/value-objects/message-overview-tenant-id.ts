import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewTenantId extends UuidValueObject
{
    public readonly type: 'MessageOverviewTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}