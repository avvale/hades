import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ff79b338-0f61-439b-b2bf-7384600e5d98'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89a17434-83c3-4525-9bdc-7dfd41edf243'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5kpkhw2kkgvug2jfc2d688l88gyto5w06pm1blfgrrvrx3xcbe'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3fdhdxuwhpuccs16fx377tqjj1p4culqwn1sc5j4lb6jekbth3bbt1pvkg98hfaut4eg0d5cpsz7z3rog0vkoewyhe5fozb8gusa9bn0nc3x5smv15ju4nbbzlbwl4mwg23peodfvxhbf0qatgu3intlqzfq8cavglujxm77vrlnh6f2ra0zzr6og3b2ud1vbav1w6zjbseas8v71wjm88ste12ubbz9nbg7b4fvgjoju4a7kjcnde0f3i7wu14'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 10:41:18'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-30 02:07:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 08:55:43'
    })
    deletedAt: string;
    
    
}
