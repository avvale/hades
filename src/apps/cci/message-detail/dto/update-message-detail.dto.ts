import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
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
        example     : 'gte9rwr9yg6owbcbuw8t3a2bzkezd4l8rky1ivp8r5w0j7cs0i'
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
        example     : 'bzxksflcis0iyhvgr688'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'w1exjhhrrk4oc0k7415tz3cqvjwi2yloimvfsvdfqlvvyxhbflf6ha7ywd3d'
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
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-10-22 03:02:22'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-10-22 15:21:09'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-10-22 21:07:46'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'phlxgr18zwlxbq803pwl1u26dkq7s9b4rpsj19fx'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'hhky9esrzzacyvalmajggiteeg7m1fru6jkru05f3rt5yl3uvdgkbu9u7b31wlhc8e4g79up2gdvk38ixpnyga72rm6f7f7yzgzx9kcwogbyt644yzw5v48wumui4iz0sa6f8pf1ew5w4vzg7yqam1owg2jn6y8t'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'q6reeux3mtwmuro78kkoj4t1ff7dzgkrb0x0xdk1f1g9wepsnyl1ab3xjxe9rfkhbwotmslozuz5n0op6wjabu4ln5kfwl2pxt8nq5zgwpq23yaeoqfzgav7zk8698evbrkqk0s3k7roe6psp7ulo38192zcw0qz'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'jii8g7wl9nwd5fvjvso6e6oerkrk7jqqn2s8vyg4lfkkneuiocyh5pt5h069pq1wbrd0pwhzlgayoje9qwnqt8jqqfi1qw5a7tjvl2iu5ggffu7l2wmdmiro2lnmu2y7pcdolzwiua1otburyi9yplo37swinf1r'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'tzb2q6zf1lz3099kjfu18n7bf2ag4sqbl7k68jtfbpg9ttxfvcypd988m3jgnzvsrm6hjbc4e4x8you5fvp0aden10x5yriekwh6i7jx5pdmsp1406zx27gdpa0xtf1qj07nssy8g6m6cbzrzlzetl6vmf3gx0m9'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'jsnegpyu2chjgwre44iarm8dx7uzscf6dw3y92rnqer7ixotn6x8v0as8qocohmx7t5cffvw6zj6g15gx8te9gymnl9skobfkhuel41f9jw97ap3rkyg122pja843c0wu711tqun4t0p37kvscb3v7ma4w1gh7pb'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ny2e7qe6fta34eghmd2je43gf40plnwx3t3hx0gvcgqcebbfbpht0f8393dodc717m0zl4lbhx61vkqtb94rd9a9asg68cn41a37o3fp3s9sz9l4ozqx2hik86rpvd9vdkljvxhjj3as6cviecvljr6b9iaxfglz'
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
        description : 'refMessageId [input here api field description]',
        example     : 'b5qf7pt6nz9q4dry1my65ggz8auqrpn6szf3o9c5zgb43sn8ab2yryku5pej9tu9nxejs1ngs1jq45jzjjz0hgskvh14s5027lr69bju96tru14itjxag2mo4e3ttc0s14lba0h31aaijq7q4elmg447vtl1ma7i'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Ipsum enim quam dolor ducimus soluta harum eum sit. Temporibus consequatur eum molestias est enim dignissimos. Magni occaecati fugiat ex asperiores sunt quia. Omnis non earum aut asperiores quo qui.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '96i2d1jjwpveosq7pug6kpkpr6vfcnloatvbafmy37bpthyq2nnlh206qq5scqzy2gzhxduukn1ao6mz0djekjrsvc6pq6n1jevhdxxjqw5hs9knkela96fne50kcl874b12p8vupgozdl1dxptsz6yiugzyyeqn'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-10-22 09:29:40'
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
        example     : 'ogl6nankuyb2vfprv1ouw3ykht7mfkoxt4pf2arup7hunu0h83ztin71dq993s00ot97p9vbfsbq1jlovmjm7mzaktz32jcdkbaw2qshw0o9k0mik6lnhab56rcis6bwp8wc4goonmye7vmx1drk9w9qeemppt30'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '3g30e1dk4zummridswzlh5l3f8w25a1g09nnb07rabs1kzf9ak'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 751729
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 2983544154
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'ld0a6k3cnngwrxtwtg9q'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '3kglh69cjs6bhwwfs8n8'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 't2gg7drt8wom9l6w442t8kkuadccxe6afhqic1vzymdmpl7avvxe3q8teb2gflkdsp4yop1z4rgka36s4eyv5uvhzlq3vcmb64h2546ppymw6yzsfpnlmrbm5hlwbdof5aa6b342wnaele9n0og0t5cskkbnrdrp'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '09gq8qjfzpu4itwzcxjoh2fredltud3bffks4hdpnyg1v3okm3pv9gdqdqg0wse8fv17y24648hfbwyx064mvn6xse3hx3t1raax8pxsquutbjwgen5okfe2n0dr3irhrol0g8ijyc1gy4hr19ozoy5x3nlrkoxj'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'zb4ftoptabckals65gdtzl1oao02orss0uvqn1pzng7goeqo8bs0715u09g4fz3ygoif3wqkf9kiouzao5ddegz91q1mfw3xwssf1nih0n1vk6v8q2jb6d0rplwinfvxc3at7q7janyeq475p1orjmn4bu0sr8gh'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'm2h4rf9uvs4yv4ebzfz7hhi5qu6o730qprcqvjti4acn3u6kbknatmr104dgiud0tu91fsannp9gwvrs55asa2svd4ssat2o2imzie5qpf5yb1bgw7y7vxt7p127inpparyz4awbex0zm9jdfx6e0spkq03xhq0x'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8133298715
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 5502277139
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 7953853849
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 3894324639
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 5448844813
    })
    numberDays: number;
    
    
}
