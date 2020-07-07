import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelFileSchema extends StringValueObject 
{
    public readonly type: 'ChannelFileSchema';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelFileSchema',
            nullable: true,
            undefinable: true,
            maxLength: 1024,            
        }, validationRules));
    }
}