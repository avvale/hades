import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
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
        example     : 'zj4horadz19sky9ewias5nwjuz16yr740nr2fyvles2lo5r5j7ht7jizhcoxecws2vhut6630teisrbbbrzp7xmc91pye2ry48d0hgg5w46vxhltu9jcefy91r3j0g8188p0lu67i1ps7bx03xx4l2iodez26boek0ybe0rjzijd0ovcyg09h8ros7xld09r1lq4fs3s42ak0m2xwl1282hvjf6xnkm5pcyuyl01amknbq1u6kg2l2ukmxl8ikc'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'zt6hgy42l2moyuxvcxc2'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 624655
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
