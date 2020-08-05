import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1852c4c5-065d-4339-87ec-ac0250ed36cf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6e4bce49-333b-4441-b565-3adc6914baaf'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'b0g9nsw3ztlq9xr08iflgrf950u60hosphgjzxyfc2wlytllxr'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'i4vc38hawuh8pomlgemgy946t19uarf3ni2j6lgzlgc3sqb7m6srvp4dwkaa9kvehswgslkfjsdujqhwv249r6hqmwas0mdskx368z8zki8mtah3prrlb3jrwl5dy3iy2b82v3vhptjs1z991k2vbq3up5pkr13veyksbrmdi0c99htelz54k1cwmzvtzi5e3p76oidy4f3jjfkywhb9gjah5d3jfifd0ii916llzegpfndeo53ux95x89rdg2c'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 13:53:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 11:09:50'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-05 05:37:01'
    })
    deletedAt: string;
    
    
}
