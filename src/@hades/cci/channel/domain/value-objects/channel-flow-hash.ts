import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelFlowHash extends StringValueObject 
{
    public readonly type: 'ChannelFlowHash';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelFlowHash',
            nullable: true,
            undefinable: true,
            length: 40,            
        }, validationRules));
    }
}