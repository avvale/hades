import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a51f73b7-dece-4537-87dc-808d0b57b600'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'h'
    })
    root: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 5
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
}
