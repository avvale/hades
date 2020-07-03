import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '927455c7-af1c-4132-98d5-bc91f9286763'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4ijswxdx5ldgwu9t81md6wsw60w1jas32kasrkeq066y6bgnomhivi668uauid4pok16kvu10wrq57vsr4ahvipf46ydhlkf1adp7i3j6m9gy1pxo4bhaywug6p5mwkoyb2lmb1271wo3oyjl8zjkzfal19t06st4kxtatbbszjwcdpwy6yn8irat1uwybfxc4j3t9yzw74zh66lvzmuk1i8t8zj4jnarhfitobnitmcthbcyhpojdcdoe6o1ek'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'yun31kkgp285tast3kt4'
    })
    root: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 281309
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
}
