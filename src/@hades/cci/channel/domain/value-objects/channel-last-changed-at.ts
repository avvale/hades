import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelLastChangedAt extends TimestampValueObject
{
    public readonly type: 'ChannelLastChangedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'ChannelLastChangedAt',
            nullable:  true ,
            undefinable:  true ,
        }, validationRules), data);
    }
}