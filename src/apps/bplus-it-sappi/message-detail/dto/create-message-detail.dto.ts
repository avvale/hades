import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f7e41556-9598-49e1-9961-cb409cc7525e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'beb63308-f14e-4889-be91-42e05e3d7aeb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kmhd0x6xk30iypfr4bbqfsvizzub6hasjtepd9awbnvyqhjbva'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'yfe5u331auzsemjjnh4f'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '9nxpxfe3zl1uz3xcn15ovb7vzww44o4uiuq0bqhypggx5egkg288ymxn46bs'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c8949b41-3c40-4aca-a429-2cc6c174d507'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-29 15:13:38'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 23:24:41'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 10:22:19'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'd32u81qtj8543uojkd5g4l86ulyor9yzc64dgscc'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'l4hn8ft7sz21rlufphx3gmhdtn5wbo54fjylz5ef5u7r8t4y5k9sxbgbqko236r93lsg4y2rb9ul6djejwwgl9c6lfk7b0jexxk1m04seszjqtuopazeqwdg13rxtzpwk68wgc5vjt8zb0v9r4jcp4isom9dre06'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'tyzet3lt5aoh7vbmb7bpngxro8k2quqdlp1gzhbngcxty07ck75iwcvph5g85yvcvodvwqxlgtk1q8r9imu1e2znmkw8p59srpyn99x3cc4c3v8gotrylgk2qzg7b6n0liqazsaleayynq6cr3au12ssu1gxvo5k'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'h9lqzpjzc1htuf3cjsh8mg1deobj87lqsc43ikd9f2dhqapmgg5wxcy9ig113r4f8ygquqa9vck2k6viw29sy8t9xnfg450uacw5r12k2egp0v8ohqreqrtapqsbdfosf7u5is1iq0ciqb59yt49oaifuz46fhma'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'k3e2kh5f5x0wmufqa7hdk1eqaigflue3h8999p0aka7v1olykny9kvqv5zc0tfoth6vh8x7ui6g0fjjyhug9wx1xkocvnfzf47ksajkufjlix2fghqn64toevc40q876n37l02lz5diwhzybs4f8zf1d98m81ycv'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'WAITING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Nemo est dicta eius officia labore sed. Ut excepturi fuga architecto et fugit doloremque molestiae. Rerum deserunt explicabo tempore quod suscipit quam qui est. Est amet in occaecati ea libero ea laboriosam non quis. Cupiditate aut iusto excepturi. Fugiat veniam sint accusantium qui tempore corrupti soluta cupiditate.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'mvt09311cag16vszedwl45a7z9spowo6z75r5haszxa9jxx6rsv8oix3vi4gdmrmsgh6gcnon1f3rig1pr4qwjdpkokh5mf99ue34thnrzyaskx4ckr8avfjsli3qu3g8bhoe6ze8511mmk9tinokihsss4ebeb6'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 04:16:16'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'OUTBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : '22tqc9eg5orlf1zyqy2tl6ip89th2nvqegw2q0ih9fngxoe6a2s1nh06big355kpjxaswn3s1ih3vck4u3p56y19auobulz5ry0nh5ei2sfkzt2zk3dquklvvcgom4anrd2m9trm9kif2e87ffk2jcsogrenppao'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'aulisw973av029sbghrwohwcjemzyj36xhx293tedpudqmrbmf'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 326310
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 6589458866
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'ydqx9xc9pz1qomt9iqey'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'kxtftcg1bla0f5cen6j4'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'iq4wbc5id3kv2mhd0hxh58ohzxtnts3ta0cjelfpf8ev5gy1y3ap8wun7zqvvjpdms268fztmlzx5gi1awzimpgp6i3ih6ah3rovxvm96s21rwgnp3u603sckszsqrz3w50u4rn3fmlyppvh08rsbvbynl73frsi'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '5k3dlpig082ja1bm2756szsfd03txbcp2ojjgkafu33xj8cggo2xs5q40ara67550f5bsnb6p3fjh8ypakp88xh7x4i3copjug9zgtvkp0cn0kiryh8rhh5nw6gy1pwx3c9xd1hnjy6rypw0pjxwln4v2uhm4dty'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'b3kxb47bsk60o7d7uznmf8atrgzaby62no0z2w0y8r5b2hxd96n8ww4i7qi5atro1okk0upzcoi85unjpct2et8q10fn5le3m5offkr38jzhdojazyczaqmza6fyei9mtswjplx6k1i29iohgbyddozz7cgmf8ib'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'igjpl50b8uqyf6zzs3kpdhloekt6isq6ut1k1558364mz9o49hyt03s6mxt2u842zrtgl8s4q0ikdijn7h85p1ov6j3m20cceiq224s0631ggxpuatqvk13ff3qqsrc56x4sp4o30fxyl201cjdy477x2dxdccrt'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 9239738532
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1891664830
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 2961706271
    })
    timesFailed: number;
    
    
}
