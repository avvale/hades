import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
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
        example     : 'n'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'g'
    })
    root: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 2
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
}
