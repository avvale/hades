import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelAdapterStatus extends StringValueObject 
{
    public readonly type: 'ChannelAdapterStatus';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelAdapterStatus',
            nullable: true,
            undefinable: true,
            maxLength: 20,            
        }, validationRules));
    }
}