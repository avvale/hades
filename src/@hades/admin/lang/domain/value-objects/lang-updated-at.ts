import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class LangUpdatedAt extends TimestampValueObject
{
    public readonly type: 'LangUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'LangUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}