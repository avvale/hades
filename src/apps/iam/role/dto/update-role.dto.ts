import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d6b143d-885f-403b-a4d5-b14966719c9e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ms8wp0nb631nizo07dw5sug43p40kmeugsy5fs41h31f3w50ssjvm9esl09wq986y6yr5dv62pjyev6g2cfaxa5y09a1i2ajmdwl4e0tbmmsrlbj4lpdwwwi0c7tfqz5hvs3wmuhgi2uug5cowso8m5j472fgwh6tuw63csdkw2pnjfxgn3wtps8h7r63z89lzv7ivcff8082mk3dc07qpzri1lqkslhmvaunea4rfhiyln8fj0thg15202vunp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'permissionIds [input here api field description]',
        example     : '',
    })
    permissionIds: string[];
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accountIds: string[];
    
    
}
