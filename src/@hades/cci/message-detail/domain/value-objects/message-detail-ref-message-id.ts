import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailRefMessageId extends StringValueObject
{
    public readonly type: 'MessageDetailRefMessageId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailRefMessageId',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 160,
        }, validationRules));
    }
}