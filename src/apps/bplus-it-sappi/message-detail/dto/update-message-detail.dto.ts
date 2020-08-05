import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e57c96ab-d835-46a5-8e04-ec1206e434bd'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '281b89e2-ab8b-46a5-ba0f-164f318e3cf1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'eo6kxka20071zxwiji531bq31iezrj681qgzefu1wcv17lxbuh'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '38d0528b-0ed5-4887-bd06-6e6463bbbf61'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'yj2iniykt0nkkr9dq0nx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'oijj3humuigu0qx64gcxjzk7zo5b0z20x3a1fd0e75cbik2htpr6wn97bjqh'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'cefcaa5d-dd61-4a06-b105-ba3efec7a674'
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
        example     : '2020-08-04 17:48:12'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-05 06:38:51'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-05 06:08:27'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '6bxcpwkub6e16xzvsn9vzdo7k2vl18va1h2e8wrr'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'lyz48chzcjlayp89rlgw5bvwk9p7b75c93ic8qx8iroehu4qa7g6hs6h24ebm43njmih0i4f3gxjidni18mbvy95fs4fmn7oqm8hxh3yctjb9mlpdqop8dms0xyx3vq2ogpwzy20dkfviiwsye9zugqqg1cq2ru9'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'a99gt1fhesejnq9el6k5wx8daon9ma0579zr6mgtupvjcwnnthkzdy3e95svor1bn622t58m9k0bkjln7i28qlx2r777xsa8igqrgt1cdiobigakyvfe06wogmdd72ui35d6kzhtcpre67zxwax67gszvtvmkfv8'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '2oqq1uzez47jiu130rkantnsyfczc3jzveiu9860v1hu2b7uo2q0d0hs6ukgzzx6020e1808q4t701l8ye68rmlvhpviam02dfaqen3bnj5l81mud8nf5nu6gimnnvsll818v8kt74c0eza2dxhb27c79rsxpigj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '2qmwioa3swv1303j9mdp1qbemnnfp3va88h44q7mbjcweoof9ny8p3vkg2mnabwdyxfohz37qhjb19e78ddrl9sdiva6jjtffbhcaxoa6dwyykchz1yf1y9lquoeuhy0lr3mnq4zs37xd9zrgy9vih9wxxqaqzp3'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'TO_BE_DELIVERED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Ducimus ad aliquam corporis omnis ut distinctio in quia. Nam id ut. Expedita perspiciatis corporis temporibus saepe tempora est numquam. Ut beatae dolores atque quasi reiciendis quia enim. Est vero occaecati aspernatur et doloremque. Aliquid distinctio dolorem.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'b0zlg13p3gidnlmbcm1ig8xawyy09i5g859qwo83tp9f62c90jyoas00y3s5nm74pr8jyyc69wxpuqm9ogxjgkojbyjd0kr5zr8qk3xyttrywi91e083x32p32p0g1olb7sdptl7x5riuz8obiqzp7ffp3gcsycy'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-04 18:17:26'
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
        example     : 'gr8si663olw0s0xdaa01jumq94lfssl9mzhlr8t4o3ka5gi189gye085anwhl1kjtjqstdfpgp2z7g0b6s0lj7itrjtq7jkldmxjjh9qtcty9lyeb6pz9k3kzengc2lq1grrg3h0xzh2ixpj6ov8occuivtu80r5'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'qtk0psp3u2pq3utz8lrgccf4fhnwgtpr38qva2a50cy1r7p0kd'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 710666
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 1897484154
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '233us14p1qwquuiba3cn'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'c9krqpqeg8qfbzsce0qb'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'arf1aw8z5mqdpc1fog730n5lvtqzdxaf9g2zuvozjwcjehbe9povtctbrknqs929ltjnm5zzommuv16w810b4h0lb6e3pq6o3m2qyt9w6b06v78gv3cxok30lgo6t3oyybaqbfx6dk0dguelawyy8pzqm4fphmeb'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'fs30voan5dioiqufwdixjx90fk5jl63sc67yc2jf5fqbn76b5xqg242dr1hrocs1m6v6kwig2btnybkpti3a7fg3bxng3rfjeai0awdpp5hns1cmtn8wf9o9pb0l4foquce1m8nhe9h9ca41v52s5v00xmy73b4z'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '3qzzcdk7j8xysirtvtyrwgqvlziuuqjoca7ckt24786si6d7xq2va9hgb2rseqk54gb4l73d1uk77dgm78cfn0w1wzyx4vhhppv3ft58lkndebm7f8726eqxyfzl06o4veaxseyhmhvopxuejnhua246y03r5ke0'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '4i1c45c41397ced89jtko160fdwn5mgznj0feq8hefx853864wqb4g4kp2f67rdgrtqc2ovno7zx0083s11wqqrp40m86i1wuf89tg22dp2f76wieicuc9e40aa5892x6l7abml9zbls71eyon5b15qj8pntrmzo'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 6259700439
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 5431062878
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1699851600
    })
    timesFailed: number;
    
    
}
