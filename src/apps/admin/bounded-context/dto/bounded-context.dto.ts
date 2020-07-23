import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
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
        example     : '66dqu3wtxlhxdxbm29609ozmekoep02r8zojbguo3xminj93so2qn2mkr37sc8bi3mwr2nquq603l2jp5r3t5j7lyfu6icgrb0dpltoznkijurjkurjjgjvwe8ejgj881rs3ceievg5dfjsbvlbzsiebrlcmmku37z2eb4hr1zcc38xk8kn2ortq4ljf7iqskr0mrtqxqb6oj03bbcmmqqmitbudlxf8t3p7s5yec0awlwmdt5z7mc8edjhk8co'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'zi6w6lpbzxb1rgvfr4wf'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 148378
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-23 13:34:11'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-22 19:00:00'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 08:58:37'
    })
    deletedAt: string;
    
    
}
