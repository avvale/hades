import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '8fd69091-78d9-4942-be62-d502744fda3b'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'd0706715-b701-4bb1-9baf-372f4a71accd'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'tbbephu3i71rypd45477xcc54c4gpmnre3t3bdkfl76r175k6h18oq782rj6imophzk7i8e7owrjg8hmm06ra542tq2ftj0crywf0rlpyy92qpsyspsg3l11gth5340m6lj3eyx5l3fi8dz40n55hk0qd2ypv027hgirefetyxiw9zrsqgkf6es2wh9fn7m9cfiu1cnwyormvql8t18qs5x1xu3d8cavnewr6rfv8ixagx2ft07s1hsv8vedv2m'
        })
        name: string;
    
    
}
