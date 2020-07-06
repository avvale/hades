import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowCreatedAt extends TimestampValueObject 
{
    public readonly type: 'FlowCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}