import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class LangImage extends StringValueObject 
{
    public readonly type: 'LangImage';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangImage',
            nullable: true,
            undefinable: true,
                        
        }, validationRules));
    }
}