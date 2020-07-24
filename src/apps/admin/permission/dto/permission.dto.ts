import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'c89c5b9b-9b31-4747-b556-b994fc310fab'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kk0paf6cr9o2eizfm8e6qkzelhinkoaepfofri4eifhi3eavqut3zrqxjf1ifvvpgd7h4j5songv9vbanfha7lnmyvqnwnd0yysrnaem5jnumo9o4hiok92jis4hojv765zd9l0s6u2ns9jeybxpgs1vbhhl5fo7br9be4t4utqxu00sf5k3j3az60jfm6t7hpe22xboz5gyg2e8oeyifjzz4ndrxb3mspiexth5urkrwnlecf5cf8pozk04vkf'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 04:08:36'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-24 05:03:33'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 21:04:14'
    })
    deletedAt: string;
    
    
}
