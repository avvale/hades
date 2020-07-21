import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5492a0d1-93ac-481c-a5ea-33c942cdac16'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b24766bd-c188-42ec-b6f5-747b702185f3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bf59205d-9028-4ccd-a453-f436c46f860a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '76jg9kd6g4xli18hgurg'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '07ucs1z3lnlssjzzz28an7ygdia53pbr4k8vbzhckz6gfu8zazbunrhysmi2'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '389d64a8-c605-4c09-b81b-8262809c4117'
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
        example     : '2020-07-21 11:48:27'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-21 09:33:17'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-21 21:04:30'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'b98f55d6-c843-423d-bffa-f329aad7550c'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '9ks1lvie7yxsjk9i6wjel7c12u48rhp4d34jvdevvkyf8k606k3qk3uzg5t03732rk0v7dhpcayd5h2pctj8dc1peorz2h82usszz3bx7mlmhjwtjqgqwob3r9e1j9rqnnmyk39e0oe75tmqvx0lky5hfkaz90tm'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'tanlv1jbmtdca2o0vch2q2asa7gxo2qehym4e4962w9c7rrbjzwyic88okx731buyhged641f40lwhldpdir350fn8zu6ocx54vvpyrxezbj3fqn6r0jc2nsxke0gbgz1mpfn96wwjg6myvj1k3q5lx61ndxa7gf'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ufn2lyyit1fhjacfyajl8wzc3z10venqphcbmzj6sobce0lfdqgo5tlrdb5mugjvb787zubnvedgpov70248ok32yjzs5evrojc8ptzuc9dudooyr7zxf0urkbuy91bj6729s5708diuy8c87hq2g31278ruaetp'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '8umlxnb2innx2llu1d0r4jw4ue4xj2prkaklhovcbs0ee8w4of0phsxxomvlvqqm8g93l8fzjsl2070cede7m9ujb7yr7t1dmwyxgdnxwkpjtassvdfp8ixc3ierw92wboril0ymjzh6p7esz4qz6ny4tfip6fn2'
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
        example     : 'Est et repellat velit voluptatibus. Ducimus libero veritatis ut nesciunt illum consequatur et sint. Accusantium vitae sequi quaerat. Sunt exercitationem qui. Dolore assumenda iste. Quia enim ratione magnam dignissimos consequatur aut labore error incidunt.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'wjibe9mrcy7v5j828qvevm0w8cwmx2zoifwh0k1amonifbx3i8g6ksgmd3o6phbqmggrc2mynsdtfku33f8ji6cy8naoki1k1spa0ljgms0bg9u5gewuks1o2t1kc2db3j4k1hl6q3dk61ig4ui7fcj7c1pvldu6'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-21 22:44:05'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : '1g1sedrfu09ypqbli23a'
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'ly325ctqsou6nmqgjze8emxudfyzs5d2znv314x4qsrgbtp3ytc95slmfd7yht10u5zzz80ca1mvhgeocrbnnb7g1d0sb01j1t7izqx9mwus5hjgtlkysf9h5rvidw7xor8nbqqz5r13eatiymkatltzvlfnex99'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'vk4o5bshrdci6fx3nf0k'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : '4dad8xilnpm60roc6bkbrdhk1tby1odnbuwjdyr5pxypoqz57o75198uxoyti4k0al3ixe6ux0p38lzn3o5lk25sm6l49requlx8qlj6b344p8xpp3u7vqnq39dpvim7181t3fjhr257erpuukztlqilnwnfreqe'
    })
    errorLabel: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 2827722661
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'vii5p6znfc8o7pwjmxf6'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '1jmcd9jw4l0hsxd09te0'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'hz7mid73imwehuxp2u8o9o709rau2oywq73ge41qiuw82gp76yh4c7rowk0vjpuaiyzczlkidqqv5sl8rxrvx9he1z6284u8gn6ek1ixtoyy5o5pg6pys9630zblwasnraqzgg2topdn0620sdwu4k5tz74casfb'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'eantff1859a8ogzu6k4pik6xd0mff54pjmqa1ao1uvmhuzl82x0stv3emec61a2irfgfsrc4yx4molevx5lu871xtmxhmcdbi9rb3jq3rm6yggdcgj21mtjqsug3m21ecemmv4xjokeifbzj5rxcqz21ylw5utag'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '0bg5znvw07e6hcu74twux0qh51ge41byj3zkn62bfkldq8joan8zvcmq5dcur6009agomh4dkrt8qqxtw9xvhw6d3ul441x18si544jkayhh8qaphutjqfarw9mitpaqzz4z9czf7z3qdxq8cbm531omy5bni3ki'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '1n2e2qewt5f4tumijfamt2uiusd3pqctszeii0fk62nkdojc2ao3amgsl2d5ifbo45qyiwpb0t0dx1sbns2zl51lpp1xi6izygnsjy4o9ilyz9q0pd4aey1i3yu7mhrwwjgqjk2nl19ipt4p25flyp7oar0q53r2'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5303875928
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 2036040065
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 9940637749
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 21:51:30'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 09:40:49'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 11:46:51'
    })
    deletedAt: string;
    
    
}
