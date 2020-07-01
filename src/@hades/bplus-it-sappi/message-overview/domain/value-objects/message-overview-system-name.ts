import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewSystemName extends StringValueObject 
{
    public readonly type: 'MessageOverviewSystemName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,            
        }, validationRules));
    }
}