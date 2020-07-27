import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bf064a56-7ef7-49de-bab0-317061aa44d6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4caf00a1-cecd-40ab-8e5c-9f917e1b325a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'se230yojiborsdc75hd6g782ayhb5j9et1itpukfhujieyknh9'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a470222b-345e-49ec-909e-c6cf4f2d3dc7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0v5lkbd8hxkfxbz82vf4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'kveuvgttftlur8yambxmtw3p6rssp4ko4hbtlthc8ox8wmeq0qguj6fk24ty'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'ad882728-8622-4458-886b-6c7a769d0410'
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
        example     : '2020-07-27 13:34:26'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 00:18:55'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 03:38:17'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'eaad4972-1832-4740-a6d0-db4ab070d351'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'y8hxnuzh6nx2ch6kusxwk4ej0toufm3vyjbugecpxk181wec990m8u2n246eoy78e618g0h03x82nhqm6lfgnukbp5k63wyp1y8dcqg7t7dptoiwbxo2xgzpaf3udamb5i178sbloyatj5ia45033asm9qpwup30'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '1li2xu14hmz72eovb82rom1yv4iqnnbob5z6f9vp7q4i06uswu5nmplhfyubym7npxs4nf9o6s8uim0l5nemz09cd3ox1jicpmotv9lvp9788q9mxvl4ojguplfrswnd4i5mu1wnxxjupo51emo7j5jmztazw4ao'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'r6vm5ewov3h2okaqxq1546wz7lo1b1yxk4e99r3h9wjff3rahucmnrzyl6pwmtg2uszepxndk3ibdz72j7ij8ie3zn9ioq7gzee2ylnvlrai4sjfyj4zlk82pl4lpcfmhl3j1kvhbnvlvhujxtpgyax1hi5j33db'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'zesnbld87wi6ieceyk5faqwdifkk73ragqmmu00ttmc71yht2kfiiz00bo2k0ypb2sn9brief90vdqnp6o65l6vay9jl6w8p51ugr18yih5clr3kwba8o8xnk2nbltlksef75k6x2mhck2oc3r2qmshx1tz0c3m5'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Culpa dolores voluptas at dolorem nihil. Consequatur nulla natus. Porro iure tempora maiores aut architecto cum est corrupti quia. Incidunt possimus velit voluptatibus. Vitae dolores officia iste voluptas eligendi tempora ex vel rerum.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'yrk9ojyigydw8pghgsn1vmiycr46vstjai9b72feoxlkv4o8607tg1kdytn0pap1soqyiwkukgpn83bdd5koz7ir1c76x0t7cnf4uyoph0wttf3442poub3ao55qm8c1b7dpx9bllcr8ms5xtwnypdklc05h61nk'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-26 22:39:48'
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
        example     : 'bkd6dfvcgrkrg09ntu7uic4fo7y4zx3afhnjx9jmj2etk81f1758p221hegajqzrpnv5c56359mqdbtx0uauikse38rgxb2dtljx9uw6s82ypp8pl65r45u6nl7jp65a8onjdznqmpm1zqx9grdz3jlouakftomh'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'vn1op09ic28weu24z5mv'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 297494
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 6679544974
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'hj81spdbf3h47wdmgi9l'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'q0v3y6gnv4t33cf7qmwz'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '76yxfwqsslir0oqa6y8kwecf3r68oo3cy9ioxnjehlbwv2721ozovz7oj9spbggg2dtlvcoqc6u9px50k6j355hz5jh0jyzaomnc3gorlrwzirsfha25vjz66lpvwxw1yquk7q3ct50tqnd3huhx1zfhtv8dohju'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'wq3ofh0ujmwxpn2r1b37vnvpw96vaf0ea6795s7y65evch1rn5b3jij4lawu6mvxfyudi724nvhu70elw1evuy8penarkl9mhqyoqvrewnbb5dsf1h2tfxum1lg2uvx2pyvsf4gbt40n15kak1tkoi9ycm8yhv6i'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'xfdrevb0wg7wruxznx4u7kodmbgcuful00sby6164g30rq3jlma48hl4ki323n8bcfeo9x0om7balh952tp1d3mxzasqu2laaa6izpobn0kmka47o8cm0ly5ems4g6xfk5n3fmnzhout1se7jqgu42rovzkjn9j7'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 't5tn0d1w67jehnp5ejavfj5rg6j5yn1o2klcdp51hzakuhtpdriorax8a33k2p94pvkvblvzd1mtxiwnjj72i9655o1v9in2fm7dwv6z5uarflvjchrp222twk66nylu4bkv36qirm041dix7hqyehbq3vvyh0py'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5419819903
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7653259566
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5959936943
    })
    timesFailed: number;
    
    
}
