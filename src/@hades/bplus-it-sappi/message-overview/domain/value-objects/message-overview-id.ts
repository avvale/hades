import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewId extends UuidValueObject
{
    public readonly type: 'MessageOverviewId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}