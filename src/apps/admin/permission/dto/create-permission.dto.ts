import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dc694634-ad9b-4f35-9087-284a376220eb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2ccdda47-9886-451e-9dc2-928db63e43cd'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'j35zdt0vczgixg4th0hmwssn5ezmnoq9oz0tllicr6hd3i9y6nxdtiv6kcz3wqund5u5euxk0xzgx2nuq4ya5ix5jeujlpxewsx2k5syfnd6bhf9xn11hcbxwrqei61o6l52pz0itw1n17qqp6m69w2i8ci1468qjrw3yidowsvp3ux1pm31d8afkfes64qb2h6kqsjw98a2cjjbiabyl1z3e44y7p343w8jn11clx3bgsukeexzu2pq3u8bu3y'
    })
    name: string;
    
    
}
