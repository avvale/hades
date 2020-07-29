import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c2d1f6a7-aea1-4075-9f2f-81fb389b3c4e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'qix6r1mt3ugkr3yujfgmrquswi35w0298ef14n1r'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c9f4327d-1e85-4dff-80d6-f566e5e1f272'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'iy3afub4dftu41z4n2blwjovv83alf20gq7ag64jsb8ad5f4yd'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3f141849-f618-493d-97ae-909e79b3c0e9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0m04ddyq34a8po73rw1d'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'g0apv885brr7khlakww2'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '2l80q63tk2uejgjkjfunb77bqgi3up3wmlwg5wznsgxd4nqoy2jt7hr4wguo'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '4hmogiyr2ggzm1acjj5b2f4ulm5ch0v6yo3qh748yjbumm3zmcv0pywzy3idxxtouu690evy9o5pi1wtidk8k5lpbgvcvg8qtrxba0jjfhu73s450nqwfric420g8cell00iewjd7fb4og7d1okjoikw6cjij47o'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '9ryc4txw4t965yw1hgweyzf12p583p25udwijt6mv7znag8hp0s93dgkyr31dbucf42l0uyadrsce4762a1o1tqv02y8q5mmh3hpd9t3bf0eram0macee9l1o5hrxmtv6v2v6ecexdqgyw082r2e5e2d2co0ku0g'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'vlxm3daayvovxby3atelawfptml4bi238vgoy4zid5q1h0gjw8tnls0jlgmjgyut5h4cus9jkzu5f512drjm348eu0tozo5rzp1vp7xv1itkd04vkrgrpie9wzg2u5c4w1iuh37mvqdycpleqafpepftbvchyglv'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '1zq4ir1x9syqqm89lk3drvpours8x7ibszl1x3gw7ceqd822bme0l8v9kjqvzejqft6kegtes516fgrthm4oosasy6r11uk5xlm4167kfq9w5fqhilr2yvl3dfktqckzziz1fd9csijyzlpz1o63czt3rttfgv98'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '5t7ad37fkkzyr6bddzqotbv023bukyjnk6wan5m87qosy4aqn72dx3zcmu7vxi6lo4nb05wo6sddmp3fejjwhafa6f53dd3i6nkauxc38jfkce4ap992l6enrpw6tfv7ipen3n0h9iihokldteu56c4o56gy27tm'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'deoz9uc11x4hdj858wmy'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'm40c2p5few3oqvrv6vwg'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 14:40:21'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'ggri1jmdsgntdqwwu4rhkjn73ooi4swjqxrwb70zgq5eqg9tm4av24nd1t6km6e15c0uew3615kd3msjah6dgdu5rtxhnfmmj3xadsc3pk9qfvdb3dm4th0zhr7v7dx1qygn4dc0ow0f5cr4e580u65ux193xc5o82nl69fufasawpljtqizlwczyanyla29b1582huk4p3me7c6x86sm20yiv14rycmrb3mvcnwb3zfoknwcd0ml6bmxp39a13'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '5nf8muoh2f8de30q5zfgq5coeef6zp0u9pd1liysyngtylpgd7robe3uet13g4xv46ll2l13icya2v4pliht2k2n2d5ci8eetuxk978swn93hpfj2k4ajqv4o5i6rzkmsrc23fygdgvorp6uy22l99ri46cw8fda1yeid3m9ri0mpj8s42hzrpc6aqdhild7e7vmkus7nazffndaq3x1psghwl5q8vv125yflpefri4n6io9qgdykl30b7zf7c2'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'd63y5yfq3qcrbuwo4c8ffuyq5cv37uv7rv2owpkkz5s1w4jr7stepn8vqgfk'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '61d7c7e5-118c-4aa3-8a94-562c0805e506'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 19:32:00'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 01:19:16'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 11:12:44'
    })
    deletedAt: string;
    
    
}
