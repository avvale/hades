import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleChannelId extends UuidValueObject
{
    public readonly type: 'ModuleChannelId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleChannelId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}