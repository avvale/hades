import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bd02d95-4282-4d95-ade0-c1d066a09c20'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fd0274e6-6175-4522-9c3e-e055cab9f5f0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'isuwo0o4isralnu3pliggcnbc4am3ymye3ca4yj9btli5ki9sn'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3fv9rq6dncvihytwfweg7wag2jvivuq3ucwo0vxgepblrcc5t4acddjstz9rklj79vf1af0wfvlf0lkeeo43wltevp243yf3jtw0od6hudufliscg543ondxkzvxhtpowxoe1mmunaccnbyykcammkhk03138h19wk9nppzbue3w967l54ndkxbnr8yx5rd6fifsdqg0pha9mx6rssyaoxloclq4m7zj0yzs1x4maqmfazkxbg6gd16wmqtmm4i'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 00:47:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 03:14:07'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 03:19:07'
    })
    deletedAt: string;
    
    
}
