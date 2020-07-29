import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6f22b4b1-1899-4f82-8717-fafe9a72032b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xpgi3qpyr97ulloi1zf3dj7yh3ai4qolgnbspulljuvlgnhayi'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5bqts93czsetqqlg9cpitbq94cwf7ipa8dgs4sc3iy8yqm47resviykkzgmrlah3ldpm0o1vszvk225844k1tlsbc2mz2o5l0ra5jysg1s28d9sf8tcwtuxaas95zmtrc204fk6qfqdahihl54yo7cg1mgx9wi6gc2ftchmmbgkbmhj0z8f5sd84285mhpwg4xgo1ud4k5nmhw6zdqkaak7r7941hkf34webl60t8fmgl5jt5q895bp1kmbzr72'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 21:39:12'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 12:33:27'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 19:58:38'
    })
    deletedAt: string;
    
    
}
