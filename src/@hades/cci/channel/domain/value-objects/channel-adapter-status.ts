import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelAdapterStatus extends EnumValueObject 
{
    public readonly type: 'ChannelAdapterStatus';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelAdapterStatus',
            nullable: true,
            undefinable: true,
            enumOptions:  ['ACTIVE','INACTIVE'],
        }, validationRules));
    }
}