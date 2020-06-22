import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';

export class TenantLogo extends StringValueObject 
{
    public readonly type: 'TenantLogo';   

    constructor(value: string) 
    {
        super(value, { 
            name: 'TenantLogo',
            nullable: true,
            length: 255,                                    
        });
    }
}