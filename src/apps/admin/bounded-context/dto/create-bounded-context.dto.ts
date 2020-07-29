import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2k897ofwlp8h1ccr8iz2pshnfsmamp1ujz6fkab9ewcr41dq0m88ns18kkg59zi3ykbcx55n9gp77pngxpq89ro6sy5dkydn8yi9h03xh45s1g41utazjm0udkzmhn6ddlq2p39bhv09z1zp3t9itf88fjum7jhfldlrgwn44ay0lx0vmlfze11el357luc4lzortcsznmxrxrv16ea4eg9uzxjevnao8q70nn3pm0o8oecljc6yn8d66hovtyw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'unjwzngueemrhnkk8i74'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 390988
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
