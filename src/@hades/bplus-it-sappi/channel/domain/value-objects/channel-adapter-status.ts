import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelAdapterStatus extends EnumValueObject 
{
    public readonly type: 'ChannelAdapterStatus';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelAdapterStatus',
            nullable: false,
            undefinable: false,
            enumOptions:  ['ACTIVE','INACTIVE'],
        }, validationRules));
    }
}