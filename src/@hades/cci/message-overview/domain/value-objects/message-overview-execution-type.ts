import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageOverviewExecutionType extends EnumValueObject
{
    public readonly type: 'MessageOverviewExecutionType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageOverviewExecutionType',
            nullable: false,
            undefinable: false,
            enumOptions:  ['SUMMARY','DETAIL'],
        }, validationRules));
    }
}