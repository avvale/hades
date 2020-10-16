import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7dc7a3cd-d918-45f4-a418-f2c48606d352'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6hpp9q1wor2bygciftaikqkp39d7101zrcfmgukczjs3zoguqy33xsljgp73c5owfkuxucgyhvq7xz0k4mekjiyj6bpilapaen1pnz3h3jnne8o34un8dcxj2fmnmya1pzw4rmoxu5xqqpgwhtfjo8wlub14hxcxhvmgr7imzqujbllcmcf8sa321fk05l94gwmtninqrmhs1p5kvxuz0y91l3dl075j1cq4lupzyz5nqwhr9x0yrlxtll0kbb9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'k4113zehetr7e3ognwhjuo06jdow23'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 205615
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
