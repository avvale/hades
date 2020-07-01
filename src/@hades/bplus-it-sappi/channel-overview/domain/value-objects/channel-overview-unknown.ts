import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewUnknown extends IntValueObject 
{
    public readonly type: 'ChannelOverviewUnknown';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewUnknown',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}