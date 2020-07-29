import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
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
        example     : 'pgylzw6r0oismhofoxjkk6f5mxen09imi4mxzgxdfsg4t0jrvo'
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
        example     : 'le56abmt3zsjdu3ycmoo'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'jdceh9tknj98ube3zq8dne0m7x0421byl18v10fbf1dvp9hzb7lisfoj8wnj'
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
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-28 18:56:06'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 23:42:07'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 17:41:59'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'jnrbmg1vxpda0n3v2y21lmnp5y6exoozteobl8il'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '0s404sw1438egfmixwdkp5oy26v2ou03pnwysea64z1ektu635x5wtidhrdaf6lmsj7gpprr44po8sadimpgww6a6ifpvrzn7121gfu4gc0z2y2mbab4rn8ur85jvpl5697ikh9mas0s8yv8ttob59am5xv7bdtq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'fx23ngy52v64nnbnl4iyyklzp29jlnalg1rym6hf84yvp6e01wk95osvdgvz7i6dnoixzm1k96st93z2crgbpvsou9wk90adisslx46pvdljpjawss9bw7wx3o8ea14s9ikkv784fxx4sxcwavss4w9qtu0fftfz'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'boxyrzscbe80x2zrkfc808vysyfrgo1w0pw2qg1cgv92m4g3nqmqxaxzuihtz2u7scw7jpy087bbyziv81hxhzczmklfm2r0823uvsbog8ipuxopyv0mz8y1fgbrkycvh1u2x0a2ygtuhc2x41q5udm3zcyuk3ap'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '9sfb4jx7ky4glt6ptxrh5pwszdrhqxtkn5izm0apve7e7rxnzrnnxauoqd92xjj1tdzo9ejf1qhoggjiwbfio8sw58pdxh2yf0yu1bceelez2bcllx94m1omef145ulwr5vq74qa5xr6pz7j0npaf2w9pwq4afv1'
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
        example     : 'Quae laborum minima fugit occaecati modi aut. Accusamus qui eum ut in earum placeat quaerat. Rerum quam quia deserunt quis et excepturi ea sit. Repellat eos corrupti et ex. Dignissimos exercitationem molestiae tempore beatae.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'nu9nzkbrh8i45l5b6an8yxux0wwmk293h37ph9pww94amfh0nlmqgs64o51uk9lg7i9mg0uv3s6cfaaywh81tieebwp05cj1e1ux5ehrwl8xm4oe5layultujayh32h82mvmd3947pl1dcoanpti1rs6iz3horfz'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 02:33:03'
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
        example     : 'auq808oczyjq5nh7sr695bm8180nova5fv1p130isooa6cb7qot699pr17ku8nplq5536upggr4tac2zq4rvnvqputl7n2c60q51nefth695sgxgj7mx075lqclt5udomly3ak9bfizmfw1r2efm1zostid5ejra'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '2gefwevub13k55wivdqnwp3x5m5n35lwrcr8wah6c3dzcxa7ju'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 210728
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4505171953
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'vk8o7jxrdsr5cmzrbs7l'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'lndtc6nue0lhgk67z2qg'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '3d04m9x5un72k1jkwm7vq3mjv18dccqo8cd2vh2j1dpcqegcd86227bge1j8zwbtt3cifb24k6mc0tp7vrpfhq5qymo59ma993ki94wge8bn50ehffzy3km4a00mqcu1qkc9do2iv6a9sqjp9u2oj1rmj6hqh5df'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '8lmt1dltcu0xg7l7ke93sgj5mck15txa9guxsu8bsdeqvnkjdawq4ywtbf3t7lsbsfi2g63407g9gyewas1opl5a3bev6z97b14o13dzgzop1xw9o3sxhobwsivjh126o2q0xby9jju6bvh0xemq5a527hye5l6p'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'ku6mreimdytrs8ksk03f4q1b31vewfpl7f42yqp61q3kwsj18fhldb79kvs8x8ytzyvyyycq14at9lyhb48qzlpfn786ylb46sr83qd50c3ijsuo08i35962h36qsy1qbf2q2mrry95oy1bcbs94lqrxdxjhe8r3'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'erubjokr1qxiasqz991vn29291xrm2zcqk4w87by7gwbp502j7cx46q3qs7tojt50qcset3xp6wemqlk2jm7gie4clouqtl5jyqt1osdw4w8yfdarhedn9k2hxeykr8abwj302jvjjim3i7rxgc1ekj7sy6rcxub'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5625303146
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6283564944
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 2340493181
    })
    timesFailed: number;
    
    
}
