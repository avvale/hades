import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '39a835ee-32a8-41ef-a186-bb67e7d429df'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'SERVICE',
        enum        : ['USER','SERVICE']
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'o7uiipk3uuvtvsi3786d19kah952jrr04v5sc5bwgttl6pb72zb5wtczbq0t6lkyahfc1ckyg61sabnrtq8a7acg69jlyu0sn5l4g14lc5v1y2y55lfbkrfuw11y30p3jki2h6sksopqo2v7u2zew22ojnioj32qs6bubt23mbvyuy5sv6e11itvafep1a47x2ep42jn25f43wwiqaun2wkx6b1fbtvk0upqhictna5hf4ljlmewh3sj79mp0wr'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : 'fda397b2-2dc1-4f94-88fa-92a08076df97'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'applicationCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    applicationCodes: any;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'permissions [input here api field description]',
        example     : { "foo" : "bar" }
    })
    permissions: any;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roleIds: string[];
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'tenantIds [input here api field description]',
        example     : '',
    })
    tenantIds: string[];
    
    
}
