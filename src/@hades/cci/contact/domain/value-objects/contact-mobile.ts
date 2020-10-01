import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactMobile extends StringValueObject 
{
    public readonly type: 'ContactMobile';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactMobile',
            nullable: true,
            undefinable: true,
            maxLength: 60,            
        }, validationRules));
    }
}