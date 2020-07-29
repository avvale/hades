import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewSystemId extends UuidValueObject
{
    public readonly type: 'MessageOverviewSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewSystemId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}