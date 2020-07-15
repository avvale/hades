import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailId extends UuidValueObject
{
    public readonly type: 'ChannelDetailId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}