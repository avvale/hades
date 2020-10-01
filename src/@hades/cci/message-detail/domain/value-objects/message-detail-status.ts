import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailStatus extends EnumValueObject 
{
    public readonly type: 'MessageDetailStatus';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailStatus',
            nullable: false,
            undefinable: false,
            enumOptions:  ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING'],
        }, validationRules));
    }
}