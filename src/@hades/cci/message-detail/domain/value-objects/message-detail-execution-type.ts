import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailExecutionType extends EnumValueObject
{
    public readonly type: 'MessageDetailExecutionType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailExecutionType',
            nullable: false,
            undefinable: false,
            enumOptions:  ['SUMMARY','DETAIL'],
        }, validationRules));
    }
}