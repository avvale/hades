import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from './../../../iam/account/dto/account.dto';    

export class TenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bf7b0cb5-9279-4dfe-a957-989935830dc8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'c40aq3lw14ykrgc7rq04gfoc2crjreso54nb2045wfjt015pwxo27uvuhrcfxywe1tlohef8qjrkotlu200igoold36ljbcanzwlv1jx88iagr1hmuzmtcak9wfxqp8glxcvkzl9hptgt7ii7bp5qyhkmcppbsa5mt7wxltmditpahgh21xs58294ibtzdmvaseq8eg25twnqui5ngxm6ooqccai7d9l2y6a4r3nhp104px6ky7kaxor3euquek'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'cqr5broeqvcbnkz3btbw2769fuj715e24f873cnvfam0sthwdv'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'zc0itz1aexotl94nw6selur7ftpv8ul89vp8aw1go96l3du5hqkvxvhq6wtqcrciro5kngipip25xjk6w7pgde4lljgzgcjxfkh67bdw8ycyp65uuylwcadaw2mx7ljp8bwapbahzt7gkzkjsowv4vblcl8dtrb6bt8ochy1pdxnzz4ddxp6kuhgyx8cpp73j2b294znlr2ipfaimivpdbgnezq7zeeg65xrfpj9kx31qx9g4fi74lvqjemi6i7'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [AccountDto],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accounts: AccountDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-16 00:40:23'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-15 21:28:01'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 12:55:33'
    })
    deletedAt: string;
    
    
}
