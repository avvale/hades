import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2d9a6100-8699-42ea-82b3-6b87f096d0bf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6hurcrdziockt6ug0s28fv96m9x5usdi4nfn5ytvdpz0dm6mn04caivcvtoxqg41x3zdg4pztgqrknz22omo6mtksvp3svgu95yabv7j06uycuu5i3elu1o4rwqdj2ppbyfjxjal7erbslgvdk771d5i0pek4wk9ok90lce1msb9meo5sdf5ket8l3yu869lye3yvoiliasl1jq90ft3iu8sq2b831d1hrot3un9l163pvge76irvy40cxadu4e'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'nt15xuzkhn8z38cn86u8'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 155307
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
