import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'v9hlx5lgb2n8565qeujp7avg6mrbdx42o87ckkhtdvetf7g1c1x4q2kzb0e7e9x4jju5l4hptou67yskfwavpdl31c6n34m4trhna6xnwsu9tzfl76idg3fc1vojenxf8tlqdown16n3dojxm3pszh4zjddgzdeaxpze2oekgbru6hijfv4k5bi17jbjt89qh52xa885pp11hckohqis7ohicw0mtlcbgots02mfw9tbzirmtscrggpz27ugy1y'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'bmsi67n7hpgg3p2hnq85'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 694730
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
