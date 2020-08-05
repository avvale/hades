import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
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
        example     : 's1qzxdjrxuybr9mcrmd1knsvq8qmrfs0c6yylbg4xjkqz8upd4'
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
        example     : '66r38t68773t0aucflox'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'jykeukqtv7lh2ae8k7u8vu5b5cpvfl118ir4fddprkqzu1tj662oqhrqgpre'
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
        example     : '2020-08-04 12:11:29'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-05 01:07:08'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 15:43:00'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '3r79ccca8h4v074gpootmdx0ubwqztu24n137tih'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'vgn0a83gkxj1bxb0fv9uy3hu5aic0vk793wo6i472o3jn1sp7cizv5ihpabuptvdkhpuh88ssgam5g2gpd0of6b8qzlq163tg0nh5j0nnyvl9p9ts4rv7pori4cj6bagyg56ie96d2c7w7ybb6fllsar189ge7io'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'mjq5d6hzhtdc4fxutoxo9cbekuc7m6kbetvt1167bloev7724k2re5qh9q7kepbgt98gnlyfnj1onrekua0rm50eyy4siui5cifdb8r3pb2mz8tkmf5bdh8gr0fhxongf8ohzh025mhxnts4qgtun4fjm7hngkjj'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'n66c62fzskc1awmr9w4i8of09k72ra4aozr0ozsz4dm9b5lal2pyrgzgkb2zdkgx33tto9p3blius6kcsc6watj2is129lr3mguaruws8w1w5c8afsb7iul1221qqzacy5r87uv6a17nant9itcb9ox4wxl38vjs'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'lqfr423mglzg43vz63wn6j249scp318rhn4vb5i8w5oqvrd74iecj1wnehgr8rnzo8yr635ce1aqqewpmebxrx9qg47ituiafm7ntm058tja87nyy6p84jbbupn3vjkek9dj2xu5qu6pl4pntqjmzz3jalvd39dt'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESS',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Eaque sequi assumenda expedita consectetur esse velit et deleniti. Qui quibusdam commodi esse veniam eum quasi aspernatur. Enim at culpa qui sint ut magni ipsa. Cupiditate earum quaerat odio eum voluptate quod voluptatem.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '7no822kq0zvk318mo3ma1zqvgnvs1adr13zgofvbk3xxcg0je98xhinuhj7s160wjy9bqrtxjx5z6hemebjxkwoo2eps7cl4a12odngxz39nohdlvxmc8sdctsg11dcllb7143fsti4q6v439jud8fz1is100wic'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-04 20:17:19'
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
        example     : '4sz0u5b1nzkk2z8wn56ugzlpoa5uywmk1gcrac1fz4jldm2y659i8drl8e7p6n3957jh72icspbztgwzwscghy28vrx1hop6fblv9obu5ohc9q0cw7rwtvbsyo3hoye2c9mkm4ptemwewxskwlaxw2epfzia92at'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'yzaxmdr4vrmfceeu4q7zi4l1axly0c55swnl9lt8i534n1t13y'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 658303
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3487631575
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'kyv1o41c0isen8peqvj0'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '5ucvrtn1ojfu82zh2ak6'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'ijk4oa8vgjtywsoma0u5575gox70ub8lzn8macsokkju5lboz19k02fwryujq8u0uelc9wkwfj35lnpwab1tty9dreak2h7v2p9a8t2bjunblpexralu5jds5zbdo5sktl6r18ok81ajrlz9p1g0oucx70edxpbi'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '229bv03kkf8gkz0dlmw4xeyj48x8agc3ee5r9kwph56skiwwg6dyxswlrspj1ivrjltisdohhm81bhfqk81b8e2vosufi29vvxd8f0jor7eugget8rl2l57g2pzqvac6vnbl275n679mu39tq09foqopjdkfmgwx'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'tlf1pwg0sz23u3o2hw0qxnns7cc4zum2sd7z2f6h7hlie54txithyvu1wevhvwvj25m04wj1lko26kgs288laoyjo7n94l67j8kbrwbedlrh6w4bwxsigopbjb53qihmaoo9mjtv1vs7eehxz35dkwpmhjwaes6y'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'rnrz3mliguhthb4h5khenpo7fi3c508mqu5rdkkgdzm8d8bbxj78y6bt6nehwkdwvhq3k83xbmvhz2bl5yk4w3a6csb2cujkiw6v41d3acktdsg84e9qar4fhb85rdfvngz7r80l0gajt17mwrh978sq1go0l8mk'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2986245380
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 5598449930
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1277509648
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-05 03:18:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 11:02:08'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 23:48:35'
    })
    deletedAt: string;
    
    
}
