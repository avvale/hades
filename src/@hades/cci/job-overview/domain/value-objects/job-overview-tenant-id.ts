import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobOverviewTenantId extends UuidValueObject
{
    public readonly type: 'JobOverviewTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}