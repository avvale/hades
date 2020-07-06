import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelId extends UuidValueObject
{
    public readonly type: 'ChannelId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}