import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleChannelParty extends StringValueObject 
{
    public readonly type: 'ModuleChannelParty';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleChannelParty',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}