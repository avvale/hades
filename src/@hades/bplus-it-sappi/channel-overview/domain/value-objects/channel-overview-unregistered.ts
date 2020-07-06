import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewUnregistered extends IntValueObject 
{
    public readonly type: 'ChannelOverviewUnregistered';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewUnregistered',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}