import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelDestination extends StringValueObject 
{
    public readonly type: 'ChannelDestination';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDestination',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}