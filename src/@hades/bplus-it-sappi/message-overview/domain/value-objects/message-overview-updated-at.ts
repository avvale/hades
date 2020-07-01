import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'MessageOverviewUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}