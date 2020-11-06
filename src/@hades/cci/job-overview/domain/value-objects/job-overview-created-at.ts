import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobOverviewCreatedAt extends TimestampValueObject
{
    public readonly type: 'JobOverviewCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'JobOverviewCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}