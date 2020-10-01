import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelDetailChannelHash extends StringValueObject 
{
    public readonly type: 'ChannelDetailChannelHash';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailChannelHash',
            nullable: false,
            undefinable: false,
            length: 40,            
        }, validationRules));
    }
}