import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dc694634-ad9b-4f35-9087-284a376220eb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2ccdda47-9886-451e-9dc2-928db63e43cd'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '12r784os2bde55goehp4lzw8um856nlmav6qwzc7yfph2omoemsyl7tai2fqdyzd6615xs9cqhd2a6xmykyp0ujc3w3hbqd2w0r00gjrreb6sqrinb9akcsq6anganapw77h5ah9l88vqgyb9oos8a6i1nfxirdyrxwgore6t8q2xcqd445gtdy5gjkvrrfwja1bjmzm4wj57tfcaq2fni0b0f9xpqgqq0lqdw5g1jnm1s8m6klyibxftf5nfnq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 04:57:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 01:56:36'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 22:39:28'
    })
    deletedAt: string;
    
    
}
