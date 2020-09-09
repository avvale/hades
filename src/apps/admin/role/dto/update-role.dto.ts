import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cebc18b9-d3c4-42bb-8df2-3004d5072344'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'e1hbglzdvxsbfr20u2uu9g59gll1egzctyq0gozh7nbip7c7vnnt61p1k07grew7lf7ei29s30r0qwhlxxxo776bf8iyk7npdi08chaxz1p4m2dptlx4f3vnbqe9p9pu60zdu7uy442sffqvahxdlucggl4dlsdn5g4ompoxhzt0b6vv6uj57k2tpoq0wi5w505wgbe46qjcl0k274wmy7q278br13xhv2vgtzhpalrgxca560g6aoy94c2yi3s'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
}
