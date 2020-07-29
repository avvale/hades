import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '17a20da0-c6cb-4e2a-a625-c2790c8502bc'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ea2c877-2cd6-4fda-b26b-d7e12d4be435'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vpopcvof7gvwo3yp2gumk6w05t9dp6dnfv8vvpvej52155gymo'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'my828vxwiohsn792p1qxumml7755mg4whhroifih2z8vt12bhf4ae4e9vkbpwhz5wg91nmpoea4t9elx94xn6nvzpfb60qz5kejximnzjjsc20uts1hmpduykjxjwtebpvfpl9x2rv7x1fv3ctqblvvc7x5oculxem3p4jfe5dillspbhe5so7atp2zr8lcfoh6a2je7dtdrjnrgbbtvo9vwnn4b5ooesr4skwh1xmbpnklriupf3skj9q39dhu'
    })
    name: string;
    
    
}
