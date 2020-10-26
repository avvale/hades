import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto
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
        example     : '89knzrx54qobrujq6hj1iz2hhr6fodxjzvwdx84lu9wdpkafg335qz1qyex74h14c26w2w4e9o4t7l2mf76d6yfvoh0ucn4ngvh0cqzikc191cbbcdxbux9vr8eg2bhxg77hscy62y6dtmgdvh8u6mne1ehjcixh5rrknb5bmd9zhnt7prp3kx5ht0tm166beucmr1focix15wxjt4lnnftqhhejr1v1slhrwjwgudo5y6jf3b3988x5srmh5h5'
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
