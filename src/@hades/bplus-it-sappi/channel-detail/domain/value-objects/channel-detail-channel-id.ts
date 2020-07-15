import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailChannelId extends UuidValueObject
{
    public readonly type: 'ChannelDetailChannelId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailChannelId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}