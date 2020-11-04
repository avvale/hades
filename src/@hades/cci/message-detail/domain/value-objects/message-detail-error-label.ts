import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailErrorLabel extends SmallintValueObject
{
    public readonly type: 'MessageDetailErrorLabel';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailErrorLabel',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 6,
            unsigned: true,
        }, validationRules));
    }
}