import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
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
        example     : 'zmr8hp8g39mtke9h8b9mrraz51jooeodq46i3mlmgxhk0sl5dt4vxevf9h3s236a10c5lfc8kz87fppb9m53wlav89btdte4i90qoo7ynzbshjkfottpkcqqdfj7i3y30pm7qt13z16sw6w20gloo8h4kpsczoe77ogt01ihv0ui1ixyavik7xhbarjbj8dgk3nmp4ol76xb3hl9u4a17mwgrt7mxsuejyvrkusikqz3l65fd29x03tyvzvikwo'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '2yjctzkjqzf69so9v52w'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 339712
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
