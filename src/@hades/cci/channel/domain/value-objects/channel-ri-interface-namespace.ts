import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelRiInterfaceNamespace extends StringValueObject 
{
    public readonly type: 'ChannelRiInterfaceNamespace';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelRiInterfaceNamespace',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}