import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7b405718-cd71-43f1-8611-2ae0120c241a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'agibfn5t3k70ulb6jkj5t265aft5s1sk08axmsiyr74hm7w0ha45cekq5dr83zyar3v30yab5822ymfickdpdeu74w8ft8rnps7nqdcm514mejq976quasb9u3hgcp1vjxb7gh09px75s6ipd3vk2no2wnbgj9394ae9rz3sj1t41gqy71lxmaz8879kjppa9bwek5y6idd91usu7jz6wlho69tvyebwbovv6lioikzv1mucjv1mch3bsn9xpge'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'c0b489a6-e83b-4664-b5b8-845049630726'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roleIds: string[];
    
    
}
