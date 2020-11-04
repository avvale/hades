import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageOverviewCancelled extends IntValueObject
{
    public readonly type: 'MessageOverviewCancelled';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageOverviewCancelled',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 10,
            unsigned: true,
        }, validationRules));
    }
}