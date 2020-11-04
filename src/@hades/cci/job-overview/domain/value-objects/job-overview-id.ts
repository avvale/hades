import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobOverviewId extends UuidValueObject
{
    public readonly type: 'JobOverviewId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'JobOverviewId',
            nullable:  false ,
            undefinable:  false ,
            length: 36,
        }, validationRules), data);
    }
}
