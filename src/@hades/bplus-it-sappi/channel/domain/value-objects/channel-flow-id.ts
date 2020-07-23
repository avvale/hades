import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelFlowId extends UuidValueObject
{
    public readonly type: 'ChannelFlowId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelFlowId',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}