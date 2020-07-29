import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tqaet6obevg9itjh9gehhl2xu7hu32sxiauq7vhwl22mpxzu4a41wx5mtov2y7oht1dl4lmdkklspttzngmukeplar0cy2rj39fz4bmktlg8p7bikl8nw9ftizmtg2tilmr7acd85w7glgvzmrxzaby2i50t88kulid9xw3byidphm2bu8r1yvbtyggd39rdndi4eqp0vr541dj096a11ooj7lycwtoov4h37clk2eqf18f2zawzdw8yzb4gby8'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'srl9yrobshp315gbxa20'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 150870
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
        example     : '2020-07-29 02:20:07'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 12:12:00'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 22:33:12'
    })
    deletedAt: string;
    
    
}
