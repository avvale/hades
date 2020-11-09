import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserMobile extends StringValueObject
{
    public readonly type: 'UserMobile';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'UserMobile',
            nullable: true,
            undefinable: true,
            maxLength: 60,
        }, validationRules));
    }
}