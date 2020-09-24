import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from './../../../iam/account/dto/account.dto';    

export class TenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '235f8cdb-d652-4a2f-a996-8a729d774e90'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'drxl11rsje28608t8wou40htqpfdfnpvefznwtictzoof3lae1ffh33ye25k6vdin2gpzfdtzh8i2zz7wxmfz8eapm5nv3e7y2px5jqn59tc1dddlwhp9xk88ooe9bc55dxftk4y8a0wf6haxfx09c59wvespl0tqgwz8sdv0sgv4x75g79k3tg1dswqc0r2of8dyhq6zrr0phck7ut7vfqt34r7t6myeodfxr1ek8xack42p1i9dnljex3kumr'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'ua98t10lt4jvr8mmt97vk10iqjwsifnrtje3f7an3j4beda68h'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'e0xk9cy0qbiedvddxs20dzl7hsxatfr4rym670qur2l9itggkjl74ghvzk3fqrg8x0nzz3db9kqb9gz8tsb4lx3fhl2e9zkky6l3qdiv6gark2xyyz7njmtwy18k4ckyibebz596msovxoujlejxv45sejzsz60caxw632cdqctt4odnv3e9zh52u0jhozj46feflclz9d4dnce63pl463kddlwd5tliimulz5gs9fv6z02yawaud8yipiealt3'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
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
        example     : '2020-09-24 15:00:40'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-23 19:16:02'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-24 04:22:43'
    })
    deletedAt: string;
    
    
}
