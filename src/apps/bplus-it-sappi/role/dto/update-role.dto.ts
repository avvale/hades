import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5accecd0-2bc3-4c36-810f-22977ac0d21a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5diczwt6b2884t3b7dpxoae3u2wkyuuexf1umxix7wolbdsw20'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'i82mycvhirrcxp1md2n33m4cjouoefn771tobpeocret7gl5ac26tx4yklssmpw21x41d53hnen7ohzqzmhkc6venunvizn8wffk4mtz2i7bskh7je5xcyrro18wm10rlphegnohp8ty9b8vobhvz3znw0iy4no1pei235x7y0jxzl07tpqzsk13e5giizldfj4nbjerht0hfqr6277xcefa9qe6nalkboo6byapzckm5n57oc72s02o78zz921'
    })
    name: string;
    
    
}
