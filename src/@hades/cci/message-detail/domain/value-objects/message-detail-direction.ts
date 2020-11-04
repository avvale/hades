import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailDirection extends EnumValueObject
{
    public readonly type: 'MessageDetailDirection';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailDirection',
            nullable: false,
            undefinable: false,
            enumOptions:  ['INBOUND','OUTBOUND'],
        }, validationRules));
    }
}