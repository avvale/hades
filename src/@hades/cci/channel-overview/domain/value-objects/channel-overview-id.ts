import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelOverviewId extends UuidValueObject
{
    public readonly type: 'ChannelOverviewId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'ChannelOverviewId',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}