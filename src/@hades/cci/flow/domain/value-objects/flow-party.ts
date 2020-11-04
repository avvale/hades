import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowParty extends StringValueObject
{
    public readonly type: 'FlowParty';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowParty',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 160,
        }, validationRules));
    }
}