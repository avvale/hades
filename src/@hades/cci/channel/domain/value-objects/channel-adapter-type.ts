import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelAdapterType extends StringValueObject 
{
    public readonly type: 'ChannelAdapterType';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelAdapterType',
            nullable: true,
            undefinable: true,
            maxLength: 60,            
        }, validationRules));
    }
}