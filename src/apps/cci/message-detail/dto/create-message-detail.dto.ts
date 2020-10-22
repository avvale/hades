import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'np80iqn6qyq5qtn6jt494xniopop0n6a19g7lzaow9edydgiw5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7wo0z8hsvewq8zmj9m80'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '82vumt3cjchb6g290csmwc0tl4fkno70vy07sm8abzh4yw194cfrxdcgzrue'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '54c2dbaf-1197-47a0-9223-8e927dc547d9'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-10-22 14:05:02'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-10-22 19:17:48'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-10-22 02:43:44'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '36n01pyq8z0n9hnvrsxdxc47flh0sxp5phjam4dw'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'b5jw0940jfv2irslx43b20o8eigv2xmi3hnbgtpg77hfu7dgoi4g2dbdk22t163lrmuaj2nxxlmxqk97cu96m4x5xlloi4opmt4lwnzv4rgmhtm60y22kki1g5vasc9f9rfpqu0ir9wxm43bmo4w1vfqe9m3aplz'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'lubbqgafg2jx5y9i09n6xo0jg03b2u8tnp2im3tb9xffz4smy7dv7csc1obaoh9p8k4q4d70h1vn18npm8cqrxvysziby2h5hk57x60xw5x9k6kd3yvzwjg9yzsz7n4gmt7bdid66nu5hoqo4ba34ien1sr29m87'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ojjvpiaenaquisjpktul9z86avkom8f2cdv7uh7kfv5s4hw186jq6eh09bfo0xnrx9tn41040nzbuo6mhkesksj2rjb7etir1zji23554zynsu0oxnq1qf4vezybs8uytp6lj8mqqh17wnuvpe6hhh8ox93b8pt4'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'dunz0pdfh9nhqp8mwm3efrc0kohsswdehg529cdk2oa2q4r81bjkicp764mkhh69tapbt60v2goyoy6onf015xq891qk78pato7ohzrxm0qdacmxjfccmv9lhon7qcye7x23eh06zqzx0oqbphsdsj4ghbdswfch'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'j9tcjqw17urt2prgc7zby1k038fvw2svs2bpevi58bkvnp3clpn49zbsgh6h83mj6wwu42mz7uwho5tyiu69ka9oi6vnr4z9se5h6fwi1hkhnavoaeufd7o97h46yki19zgyi4v1jhv8ufb82di9obwd1p0uh95p'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '1bal5wycennfhxegnv5an1wbfwzmm7c9rdi3zmlle9cpqxb7dz0nh7mwm92yxxlkg3b5je2uaztk37ans25fytd9obo41gmamyfjb3lke7wj201u0bgjhqiur6irlho2w9cui4vd1xfptar5jxszchjp7uesjyqx'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'refMessageId [input here api field description]',
        example     : '7kl884n5waw3i8i8ywa5dpucpkez71cccdvikhcq8s5h7htcpmwlb6u9hxogekk0c598kuc642w4iux5zy3g558ei1peyz9pg0n7afg8rbozwnsrskiozkm0oykl9n1hylloelxkmlprr3yameskgw38y0vylivt'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Aliquid et autem quo perspiciatis et ipsa odit non animi. Rerum consequatur minima dolores. Voluptatem autem aut aut nulla eligendi corporis a est sapiente.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'uufn7xbklp0ry3l0hoiy20la5qo7u2o5uldbnuwo21u9q7gyj0yobou4nv8w6tpw4qw2tvrn10nkhil8vwzdsz3kpsbclck8556imhy9r18hxstq9h4bnoe939sv50zsf4jm38qwip3xzqel29be281ehxgo6ap1'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-10-22 01:35:10'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'INBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : '0ha15l2g1yd14j3buqoyuv1nuj6npy9azszbnlkqsjfiedf8c43nlnlkm1zscjphjt44itlkyk7dor09yi28n9bec8d35e04hd8dpz2ryd3pkqw2p50mqkqlhc88qho1iaijovld8wqp6lokb6dsfrwsk8onv3pj'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'd8bcj1jqe149lxds5bgah3ntebb51io1pfa6h3nuqke4r44faq'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 103577
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 5104209095
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'dyk8p4x9w0of18xpfauh'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'csoi5yl5u6vb2pejn9vz'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'so2zu8ljq65dl8w1dwvg38z4vso5u26ldz9l8v5a2wbjl4rmvvlb5hyl9cfjihpnic2tbp2w53omcjvpvodywe2hacklxu3sldwiqp65qhh70j6ualvtsqgerj7fqkz844pfz56o9dl4lpg8izt21wqccx6nc4zv'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 't42p1a0nsajxa16e78pkuuh9aflqbxygzqh8ue3wzf8yzpbwcfgvkjym2iq6omrac4i97iskf385ur5ccos79lbhg2lp915qounkezxqy86a74zdssyzvp3mag3qsm0jbwa1yog9xm71qjrrnraw9kotl1r62esc'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'ox0lz5zqumplrpsdgwd1zqzu3qhuxmxc7ant9867wcys7fool3e6lei357vy7b3806fv8rk1exr0vle97uswp9pg7ppcidmt4ojkbujovntbpsxy1x2ili72bi6ztr7nogaqome984dfchtqwcp7upja25f9wxa8'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '13ml7pjpz2kqdr43ijeab1exo5dk3h75pflri642l5bgyqvijhxhlwhw6cjrkyvvwavg1ql1cxxhivsuo01b71yttsvnhb3k57ums5hn1tiukyrgycrlj8kpdndasynbmkk7g6cv66ghrtpj03i1fp0o96x7civn'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5440430333
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4194523074
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5118729695
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 6133801422
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 1123131518
    })
    numberDays: number;
    
    
}
