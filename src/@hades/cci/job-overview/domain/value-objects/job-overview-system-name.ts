import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobOverviewSystemName extends StringValueObject 
{
    public readonly type: 'JobOverviewSystemName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,            
        }, validationRules));
    }
}