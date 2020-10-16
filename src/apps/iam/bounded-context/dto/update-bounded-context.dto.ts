import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c2ac7dce-ec63-466d-80ce-3d53995522ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'g3du3qecaipok7yld32vajnh483rtjogrfp7w5gr4il4llnv3v5jql39wlfx3x0e7aqr20i8776x8i91893imhqpuq29hdw1z63wfbihsg5gqg6q3dth1dq22hplhyuhxglk0h467x1nylv5c4hljhzxpx16jpm5kbpf1m0i6kyqobeyhvdz55tsmy4o192x6m1tzaej6ovpz8tl3imckjulfckote042f57xeq8qotv8x2ymsgvvy9vybxfwe5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'q7esfblqcummjxuypzd2mi82dv0ps6'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 237751
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
