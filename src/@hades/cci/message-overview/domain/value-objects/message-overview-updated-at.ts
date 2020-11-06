import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageOverviewUpdatedAt extends TimestampValueObject
{
    public readonly type: 'MessageOverviewUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'MessageOverviewUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}