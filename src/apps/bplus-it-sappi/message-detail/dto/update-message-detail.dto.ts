import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
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
        example     : 'rzjbkiy5wqy5402q0w6iwjmysw410zlkbogbahbh5t2rngjnlo'
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
        example     : 'iag9jpklgtoqvk5de0f3'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'u66mf1l9rym8whaf3nj1ll3fgvgpbee4yf5lgquqjp7en95r5ug6mnepxcqz'
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
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-26 20:28:21'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 02:30:39'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 13:46:10'
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
        example     : '3362oipeiyl4vctw79qpxag552ocx0k5fdnc6rnoo4laise5cm677poupvanq784ynkujyteg0hq3rp8nytuqjat8vcdp9asgg6zshdijx5ip3wn6gnt8jaug12htl9tyt9j6x26vo2qh55bmfcswy4xrnw0h3ka'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '75hazfegmchjjghu1oj91c943mmuuh83qit3waesfmxmd8aiwdvyuy8r7672mf8ej25k4tpgqhpisiufkzm0bm12cfbw0nzdqdkigg0yvdu3d76gmnffdzbnceyt62np4dtroqhh9p328tf3v8hfbgis5bdm8bfo'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'y865v5huw00s7utzuoboo8j4s43s7svchjleu45c238nrp9gdo6vgqo8c1g9c2jord34k98cvoqax6tyx468qm5s7en0e0x4upfdpzpkepmemnxbqgp7l8fqn4ykgg9qt2xxg4mb1dxw5v6bax1j8i4uvowpz24c'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'o5megfm9ip5n7zwk9i8vtl9b42bc7kk9hodcpbgnpcqh8wo6smp9k0gsjfgjluvk2g739r2m3mn68acq54itpgj8gzqism0q57vsz104gmi6nj56pwjsyb8hpsfedlm2f8avcnjt3jolw8cjgffusxkgf5bw8k6e'
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
        example     : 'Voluptate debitis molestiae iure. Id delectus necessitatibus occaecati vel et qui. Qui blanditiis et et autem sit possimus optio illo.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '1ciap4nhakzykyg051juu3x7e3ages7gs2rp9sdwo5exufyyatybwmje33o93f2r0ktuatxnsc1mg401xcpzlvap429or4ojhx7xsiruz6ho7tvigupdrlii8s52igkcwuzwi0jvtlirwcjp462qtr3rmszvvh4u'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-27 10:29:24'
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
        example     : '34g0iyiuetym5i6ynhhvybr8yfxww4nfvmc2aph3xn5xq26knjmaxrl8227l4w7osrmrjjyelhp0gqa43fwcgq2ccpsc823buvmop13h9im0kfldtqusqctiw03a7nylsayan2z4v0ejg4wu72heavm49at0fwvm'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'tymw3m6apus621hhlqgm'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 142885
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7831620546
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '835n9d8ydyh3hh4dm0nj'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '3yrz1np1ikbyeqnhj0i4'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '11m5qsz30pzy954o0oilmhkv38o8sbnpfl3dvo6rphzzytjnskbos4w8uprb88ntm23nnzh3ci09axvehm1ddmjd5r7yz4e6bo9j9xeb1xnkfe0yh75k5yosdx8eby7fy9gfoitdoyxx8lbhmxmfvc8grzqfad9q'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'i3jmtfrnxroe17uldw4bk9tq21lt6wnd3ji5t4uk1lntt5pntd7hie252y531m57q0pmrgwhv7a9ml7aws2s4otzg52vwu2dhak2aoe15us9qii43q2ngxhvvph6ienngl06kxon2z3vjqmqsswprhmnxr8ggzva'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'nd4wjw01zxh0ntjhwiobawmitx21u2u55iv0hvxywxzmla5up8qjx3ugizdkp44jp053ux92tb58rxua96h9cqjgx3n54gbhakd29v4wgjbvkbn3ty1ony9vnkxr43h7pvt4khtjlxuqnjh6h4snfty92fkrofvg'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '4vbervwpd9uoun4ilsnisio5oevz8co2g8cz48gi1kp16077ztmr6nqaxbghu9vyxwbke9n6u4nexl5txvuk2xkxvk8vdjkdgutbf099i36qypmp47tka10uw9rawj7gpoj5pyui12yl2yuibjkntkm5ttvg4otp'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2800419915
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1025760949
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1534632102
    })
    timesFailed: number;
    
    
}
