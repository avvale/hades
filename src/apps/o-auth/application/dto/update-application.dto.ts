import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b31a1e0f-8494-44b6-93fc-e144abbc9e25'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dy9m00ptspm0gw1uz8umabwkidr3o6s0gesi5v0651cqriskt6h3wy3mub4ziptpcfb0bkstfy900ihux7htpu72b96xpymyvim9bgnf60s2kct0v4v9b5hbc0gpyv2oehfaw8jczce7f6iznyg5qtgdnuwl98vq7tlgvdyjqunzi4a39m8xskkjrn4oyzetqx2hgesuhleqxvkalw2qnfssyihcnzvr2km122pzdvw6f3n1ohzbp33xz6fy9hx'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'lmfvxbk17mq2v6cwds0oro8gl4v9w9ycds89jad8n53y3cycvt'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'g9e824ffmju5u2jmznzo7lf7910y75297sjzn04bnatg12prd09icizqe4jyh15ce02ikpvsa1vvvupimjvmj9o0l0'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
