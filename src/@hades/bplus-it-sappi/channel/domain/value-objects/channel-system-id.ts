import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelSystemId extends UuidValueObject
{
    public readonly type: 'ChannelSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelSystemId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}