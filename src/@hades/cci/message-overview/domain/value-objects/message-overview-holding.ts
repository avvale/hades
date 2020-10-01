import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageOverviewHolding extends IntValueObject 
{
    public readonly type: 'MessageOverviewHolding';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewHolding',
            nullable: true,
            undefinable: true,
            maxLength: 10,
            unsigned: true,
        }, validationRules));
    }
}