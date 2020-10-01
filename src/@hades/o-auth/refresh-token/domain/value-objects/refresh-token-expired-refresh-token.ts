import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RefreshTokenExpiredRefreshToken extends IntValueObject 
{
    public readonly type: 'RefreshTokenExpiredRefreshToken';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RefreshTokenExpiredRefreshToken',
            nullable: true,
            undefinable: true,
            maxLength: 10,
            unsigned: true,
        }, validationRules));
    }
}