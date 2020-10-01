import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelComponent extends StringValueObject 
{
    public readonly type: 'ChannelComponent';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelComponent',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}