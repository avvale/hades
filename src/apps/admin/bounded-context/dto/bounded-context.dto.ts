import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e50c37f3-be72-4502-89a4-a5771b08744e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kj8u6aga6rfq6qxjawj1y2l3dc4bxhj1ezf1uingbst7burpi9t4z4eljvrnu1e8rjl78psmxdyaqtisyzxmph72ffu0p9neehkmjbz9vrgr5qae2y8r4x4azv2joaki1h65usrrb93t7vjsi79vm611vqytzrk8exyna636fnj2m5575hpl8v3oih11sncnikyifd8odhtr2npdw24u0gwpuvrd4dw4qfnrapsyqrvd9uahvld0ci6o8o3sb72'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '87vr5ggel34ar50bdow9'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 210654
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 06:58:39'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 23:01:48'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 02:28:17'
    })
    deletedAt: string;
    
    
}
