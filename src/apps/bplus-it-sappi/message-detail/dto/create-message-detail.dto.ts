import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2578dbe8-3df6-4b7e-bfbf-225390315594'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e791533-1e01-450d-bb1a-5e9a2a315752'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vmp2mx7931g0y7czz2lh8zs2yaz5tzg0gjuz0sxbn5p73ch9he'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51f2e58d-0ee3-4172-8cd4-0e91841bfabc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gclqusp20roq9mt0s4kg'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'nbyptnn0y6kavh0mc0h9kyk8febd7i53ykkjhn13estxrvzcttrlhaipe0dd'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'a25fa511-8c1e-40ed-a971-073595a75a4f'
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
        example     : '2020-07-29 06:42:05'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 17:37:56'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 03:34:48'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'w3zao8z8hkz3v9k1q5tggoyl75uvb28ksc6x7sdx'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '12umsnloq83wj3ihgqicrkxqw5dhyomejlduu5ia1q3uwqy3filr1pcsfkqd3wibbjclkmr4uhurg4ik7olv0081s1evko6ocplljkp98047e2hjoo660mn6i32qn5ttfzv7fys863vu4j6bxe3gbvd86e4iuofy'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'kpvfzk30u8nb1htp8j80a56zmuo3nbzvpjm8p9ygxx7vhg27m6ut0yqyhylzqv5iqajmy7wnel7uz74wc3d9unvvd78f9s9pe3a8mlnvkpswr03mfyq5cj971dn45pkwm5lnnjkxt89m3pynlvrfy443e48dgc2u'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '8kpbtk07i0ilty7yt7wonmvx8n5v78er7ue9d6acxzgudwnxw93mejw1v4zp8zltw717ins0et7yzwcxnwh7yurl8e9h0kygsh2gtzqyjtp35zur6qk8bo80sm8bvx1zcw9loko4tctoa28nw6r1fgu7zpyqa3ys'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ralydrg2wyjfl49cvw3wrxgjx7d4ipu6ln6m0rfh9tldwdc7r3wmc6ohrh63dtkqnk5au34nhcnjf2t4b7xhg55xtt9ljq3yn0n3ijh5xgzp3ngg0uzhmwfelv0nt2zmo0i45pw410xpllo3ktuyokcgmyopfizq'
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
        example     : 'Asperiores repudiandae omnis autem maiores sint. Ut quos et animi autem. Dolores quam iusto voluptatibus incidunt nostrum et sequi explicabo. Eligendi quas sint eaque laborum voluptatem animi.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'emkwcqgr35rsoefqv3c2n9r0o86c456r0gg75c8nkvkxr8vues9min1w913o8p9nmpev904q74p2r07ujz95xscn3f51jcx3rnvdhahuismgeg24ssnnj68nmebxq33cciamjfnsigdmqgpffg8rhlgcjm2evvto'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-28 19:06:01'
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
        example     : 'yegdim0az1wakbc1hstur4xj9hujutgos2wpuwhpkp9t9kz4afdnp5xml20s345qvmutu4z8im8m9v1rj31zp4wtszjklmojw0123v6gzrg1stifthffwuf5fmjyilbp36fryz3kd0ubmfutpv80d26cc577w077'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'yhfpwqlcvhby1o1w7i9is0x164olbpw5kjkif7zmc72r2pzj9w'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 793546
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 9259144697
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'kw5x6pk9ry3he2ldhc36'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'b1a0wdvh8vjqdpx97y4u'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '4g5bntdn7eoszsv2cxsl9mlp0ljorw0btbglxymu2vpo54jragnrkat52vs08mp7uou7hslkuypd773ztrt5oy04tn1udnwmofhywggujt23cxw6vhtm6ns8qrz8agvxvyvkmh18wlntg4vpkb1jh6o3lprk7n0g'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '0wi5zfsyij33bv47ubeaus7egzdwa73x1t8fo82ahvl6qpk8cnolz9hnip5k8tbba1o8g7zs954lzwgdpym0vv0uucyqas6duby0it1w0x6l9cw2a47t5hqq9k6k0syo2ghr1gfbuxktzmbef5s1hiao6vstcre3'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '2bgy2au4jk2dl2saejyz0f2ttsn5xp35ydxyj8p48f03uywyo4y5cum8z6q8ryyz1gc07nr6aiz3h3usbdlbo5rr5cpatr4xmuc1iwhfpsxc64mpdxvtyyuchfrw7cxmmds64rhbgzgfgykikf0v4xohjef5r6fa'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'w3d8facoh78n31cj3ew5e4x8nwc48bnl1wx71jy4xjokqgm02bpw24kga76bjrd5g3brecw6fzbdpmhurm3nwy8884c9ia6ifn7nckgg7bcamu4npim8ljogzv238rnqz2o6dqh62ri8rszxs9b2i424vfxmtesl'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 1158476825
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7578498021
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 2477064163
    })
    timesFailed: number;
    
    
}
