import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ce9rd6x9saav3i6m5hpf2qu3af6nm9cxx5m3r3u2qzv0mqlul9h48f12bmc0zafcn7lp6o6v18h44rvcqzzxkustbr3bz3kh8isnsd24ccptoc5pdbypdw0rrd45zvxrrs4pil52ln7avyyswpzj1jsaavc2f4wtdzpvb95whs1x4qdbaa1h1pzc3458ik44ms6p37z1u7vf21m4avfz868z4jnxz4am4t385gq9mp2lubacmzzbx0yao6u2bvw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'nwsadgerkksrx53pxd0n'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 576932
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
