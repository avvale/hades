import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewError extends IntValueObject 
{
    public readonly type: 'ChannelOverviewError';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewError',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}