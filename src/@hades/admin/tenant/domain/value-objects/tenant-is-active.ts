import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';

export class TenantIsActive extends BooleanValueObject 
{
    public readonly type: 'TenantIsActive';
}