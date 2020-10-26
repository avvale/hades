import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '520e69b0-0a30-4be4-bef7-83ae1429b9f9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'g07tc3fonp0v4lgihqo0s77l2gw8jtonq06ggwgxbvcpv5xi0yz0mh0fz09akprqp8ucg6x6qt2spnkhtpu4eq416oyzgf3jqiry8zg741nkhmyvuuq3vwp2bzr7oiggsdy7vgrm8n329b4lyvsf0as8i9l0xrxd299n2xjgkw0tw140mw20kwhninnqz51xjgu76sdqq9k823em6b5qe81xg97q37ru9awz8uwrhxc5vb1xqwurqk55bbcexni'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'g3htf19l4mxwhjexbqdjqeyrkblgy3yyqsyixazw0z6xhwp96m'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'xetnsuh5vk009c9yqxa09zp1yoy8de5ffteyxjbckshh8z0az769do6nb80xnn7pzogw1lb0jvexudoqh4kg5x68lbxgt3bpdbn156auoj8rzfty8683m9d9sp2ziw9gnpu0ce5n2r7gng1xdz8typofyng9ww2rmadb1pgzdgnhobpbe4svljzjkrm0g49g73f8d22n1wdagzmn3dbn7egnje4iwotcqacojlp8hew02nbr20xqqcvit0e3shv'
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
        type        : [String],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accountIds: string[];
    
    
}
