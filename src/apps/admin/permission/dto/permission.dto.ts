import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bzfpanq7zddpuj9v9apj0cfv44fy2caq69rnehi788th4dhl67vhmuzz13i9xzhdx34unhl4gxlmg6uyo09pjschmcduntzw5zzdhihptkxwrbg0hw4q2qr0s47wf124ezd27vge6mll1ihpgjs4er0d80dj5foibi0l5mmc33bv7ca41l3tz2jxqw6lrqnqar23i18m3r8ij81jejl1jtcbu2cnnsrevjpu66f4qw540bnhviyu7sjqbu25xrp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 16:46:11'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 02:19:30'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-17 01:31:05'
    })
    deletedAt: string;
    
    
}
