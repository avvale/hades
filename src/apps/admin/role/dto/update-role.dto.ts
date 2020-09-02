import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '40d09675-d86b-4634-a169-6156e4250d5f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'cjn3cuhnvknyfw6oiqcbk2143rjs9d4iwtky0pf1ar3uy8n3p42ypagcyaqh1kd0187m1ia7gxqzxnjr9ko4x69y9yki8prvrf2k6tw9i9mug03xbzrxxs65zny4828m9cnos0w565irnjeqnz1d2k0ydg9veypazl7qdksyvde1iwdg99fppy7r8rnv2gc4y7hitf96o67tyyqj4aevwg93g13dv5f6ffqkfz3r8mghhexdkf6u50qzs95z2tw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
