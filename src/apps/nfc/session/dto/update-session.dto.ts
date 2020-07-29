import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ip [input here api field description]',
        example     : 'ugvfrhy1ga88fvc'
    })
    ip: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd'
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'uid [input here api field description]',
        example     : 'jadxv7lx3w839e1hqw94bez3ttxhcg3ifv09w681z0gacx59o0gppw2yxiv0m95k'
    })
    uid: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 835275
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-07-28 20:08:15'
    })
    expiredAt: string;
    
    
}
