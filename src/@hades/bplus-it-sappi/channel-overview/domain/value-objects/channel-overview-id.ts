import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewId extends UuidValueObject
{
    public readonly type: 'ChannelOverviewId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}