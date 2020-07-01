import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewTenantId extends UuidValueObject
{
    public readonly type: 'ChannelOverviewTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}