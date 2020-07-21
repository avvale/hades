import { ApiProperty } from '@nestjs/swagger';

export class SessionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ab63d4ac-a941-4caa-ad47-78a315327f13'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ip [input here api field description]',
        example     : '0qafn3ut6g01274'
    })
    ip: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : '8ae89090-39be-4439-8f58-e523b2ff12f4'
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'uid [input here api field description]',
        example     : 's63gxztokbq8nka2lc42k6uugza59vtbbm49sk5zhofcuxtn47v32ze3f12qw7lv'
    })
    uid: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 184032
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-07-21 11:51:36'
    })
    expiredAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 11:51:26'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 19:26:08'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 07:46:44'
    })
    deletedAt: string;
    
    
}
