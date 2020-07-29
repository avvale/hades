import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'z4p0bnc3yvpdppzeih6rti7rcu93od9xjxfqk7uv599eechxua'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a05fc733-12cc-47f8-a5d4-734e5a6bca62'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7tqztwm2mqnqq6cxqyqh'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'bx7ykshkel4tz17xjc5ffbt4jfrs8h2i9lf3uu1qx1gxjh5llkje4s1jrpky'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '0e297b28-3cac-4657-b8f3-cdf8bd827157'
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
        example     : '2020-07-28 20:04:47'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 16:01:41'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 14:50:10'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '75w2zdm0t0vy6hf3zowoeuee225n1oc8b25dq0qi'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'jo8zwcnpu5z6sr6sszgdjl4e16eecp3454kay4s5dfav9p6150e7jcksv7fq3pl3xqayr9a5zaiacb4tiv7y6fc5hmvf2clu5xea8bdk0b4on3dyxuouq4m8kxgj3lo5xe9dyuz3egap9r9di0tjue5x2q23pos5'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'jt14ul6vrqcwpg0wehe567js14kz9acsutj6o1s9ubt616yn866698sid6idoe4la9zugi1xeao9c2md09sn3igxwiipnyhpgbnhv1t3x9uwyt3dithpxh9krrwwp7rhta28tiqu80zakqa7tqheesevj3oq1xus'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '9r8qt1v18m1oghzd7mdyqnh4ix29wdyrj1my6q1s0bdu5wvjhq0dc5k1kkhekzzrtxua2fjjndtirpvtgwfg71j0jdg4qel2mw5ndcqf9wgwjyudfof9ls9v6hyfb7kmjlonzy6q2leg7n8r23sn5ffwel0jkzr4'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '3okoecut13jf2fwu7o334qzdx9pi7fvjt40i10mi0wkpjvuql1e23dr5q54woh9if2w1gnxe7t341fpzpo4c9ovj2n62i2mcjsgb8nyhvnr66gtnzx45ipu02122jnn3h2qaea8zfl8ksu3idicitiyd7uwgnsdz'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Praesentium enim dolore. Quos ut dolores voluptate. Sed inventore ut et. Cum accusamus pariatur illo dolores nam animi rerum optio quibusdam. Dignissimos voluptatem ipsam et. Minima itaque veniam.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '23zbn0tgw9sionirxmbex7iftj0r630dugipl06j6ygmj9ww13kujtl1vs43radtqwaehqdiv54dpg0ev3t3d8n08qn6mrgpyrx5l7ltt3arycb5xq0zz1wuzptrzucg1njcr1o9ji6yt77o8l6e607l5xalf5pl'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 11:55:32'
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
        example     : 'qhxi18i8tc7125h3dq6uwfcmgp4qmouxgu69328w8z4i8c30og4hjyx4li59btjylco6r6fmkxfqtl4bb3kcleme98oskzrccllgqlt84isbidv81x9t33rfw2f8soyq9flm676qdva8ylbxj2o8m0tj0hsatw4l'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'xq1auccaujwn4bb0m1adfhwogem0gwhac0babdn6wip0auyrs7'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 165362
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7590910226
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'eop3gr014y31bs9z8rpu'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'gwdmooxr69e5bjlkxvxx'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'hplt27szwnrgszxxxcy23t4rt9ac9b6c7lz1qaeue4bdkccqhpommng1t2rhd3qswk2c0pffmqa76x1f8961odxgder011yzaqvc1o3yjvhjfcmcuacc1i9idfyppbhepqjf5aztph3ism3lstxqp44tau9t3xud'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'j61e0yndsq5mcy849gmy1l4krqczouc4or5krji5f0uh4q5tb7nc78mw41mcdsa0zxf6by5q6e59g1khn351349c3g9p99cksumyh6nqw0s5wxshz2fvp7nz8cf9rxyfqx0arvy7qxjfoxckp6zug5twntjlu8az'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'pwzigf4d0ivn4my0ez5fa7nesb71a2neihdy6b0qz1kdim64f67t5ag0fkfo4cz396n0omu2ines6oxaqrqq2i3q9e4lcpf6lxltvk9bnfr72tmtvfr5sqxvw04y4c9bx5wmfm42k41sel3h9jgijpqafo2247im'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'rjgww7hxt3sg0c6cwt25xqlc83vdhkunnsx8dql5bgmjcbylv3ah26012jcuumprvfn7f5yr0ynbxioia06jb3nnuujf7pxiwtzbeqvq8ae7bv9zmobi5yx5ydi8ls4f099vofsb9nvbxacnqc65n6sfqsflfcu6'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 7328177620
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 2811800084
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 7016363450
    })
    timesFailed: number;
    
    
}
