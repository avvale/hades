import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '54c076d7-bfae-4a64-820c-2e916b9061c4'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5xpktmer2k77ver06ae5q6tldzg53sgemd0iouuphn5wbybrdt0afvrhfkv84g8bsj5553b657fwkqi6iusmnrfogkxr6vuxcdsr0ltqa16p4ac4dqmxeyvkcoec6fvz5plgyno9ywx9ju7bqqnsv1zuxewonyid5gh8iniutbksjiyjqfvdo977oyoeari0lzf9s9xy8p6au1h57p5gatpqbrhif0hgpjyyy8iee630mxvu5pp4oqsofv6696n'
    })
    name: string;
    
    
}
