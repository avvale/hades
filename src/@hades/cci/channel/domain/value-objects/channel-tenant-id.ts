import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelTenantId extends UuidValueObject
{
    public readonly type: 'ChannelTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}