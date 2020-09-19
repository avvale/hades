import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3qmhy4hlupse3fvnb60zhugs0psu2a591hkwi8xa1jwrzvqdrnnuz9wtsuuzy9cj1gr56k05nb2ui0rybmb86sf29j5ux10gxy1jgodg9sp1x3hv4h3fsq01pieelxloouvdb4bcf5fflpwbh2w1svyvg01fnqqtbu320trhkuc0qkz26jwk3t8povvl6gsrua3vdnv4di2p4ltvtieqk7yc3saknpoygpwsusbp14z3r7cnlgcrqelwc6ckhou'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : '4b34ig43260nsj4jggch0os80udy6ep83ne33rf9vep9avpmn2'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'ja2rwdfhomfxhwrvt4vbrdkm04oxioyl6mf904vqbcf4g0n4hdsbcgz83jlw2035wyx75qwf8k5t5n2wnz6gjaipns'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-19 10:46:17'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-19 08:33:11'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-19 03:24:03'
    })
    deletedAt: string;
    
    
}
