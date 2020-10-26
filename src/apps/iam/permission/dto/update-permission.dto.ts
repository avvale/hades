import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5dc42d11-c3c6-475d-b72d-1d8a8d733813'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'c6ts4bxu714qz75dyelkh3w3wkv7eq7l0z58cuspwjld69gl8zetigc51udhot6e6i474s120rflqwumj1x84qzqevt1t953x0tg59muu0249gkn63vdux3xcap4mih5mghf3awpiewkvft7ai4q6jwsl5k4vixne2qp2ukr85a5z1v77nrcybxafqjte2ed3vdrakkyqpsk5ttfw5n2v4d8eapyryn8f48wkkhpwl3diwxkvybzq8anrmetn2i'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'a849eac0-3664-43d8-8329-12c1973ffcc2'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roleIds: string[];
    
    
}
