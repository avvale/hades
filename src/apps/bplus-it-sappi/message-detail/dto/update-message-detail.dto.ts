import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f1bab725-d0cc-4461-869b-ca3886b9abf8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '679670c0-574b-4c85-978a-7c0014391c3c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'p6kutrx6elq5j4o8fum75derc80a2w99rqdw4mek79k7g8ynbo'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '17lzjbzf6zw7rw3lo93p'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'mf4mc7js9q7ydyq1rcqplmem3088q93c9dtsipn8luxnampww27wzlx680fv'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb'
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
        example     : '2020-07-28 04:53:13'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 21:32:30'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 19:54:22'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'ee8bea4b-821c-4791-8cc8-c239cc03b91c'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '4e496xa9rou18p80nk5ndbniwgp9pqtfa4cdd55cdqi4ufl16zhkbo47wdy8ra5n4krb36jbobua25f6z23zukq45jfh62nxaj3kpxlcop9kr3ra3uj44mkyttae0j6awewpf555e11u158krvn2p9wmh9ye6asp'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '65lvj2hj7m0t7x7v7044flgsbirtdmxzsb3sx3zf91p57o6f3el20ano5u8ypq1gmmnrrbut2gjmtjfuhrdajhpf1w62jugqn4gkmcyii0917599j0u6mn5xvw09omi00epjht3zu3ulu2zd2krh4ms1awq4mqbu'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'm713wjbbunqk9h434tslsfb3nbqlfv7h1ybqz27gtgz1wl0jwzety1bn66bwflx7fa1g6e8xiz1c5098d56bvha944hmw14jkrpl26jbb76ogf12gzaqmacb0f8uavncto4g8crcz72z4pt8empwir1ctij54vqo'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '17r0wlur8kmrsxxio4b2zc15hsmji616wfbb4u6zyncyfvt1ft908h8jy6hk439st3wn4jlyqccjghm9w4d04iij37eno1ox1eimrbrmlz8mr6tsstpedvebvlmbb5dqbzayw84mbfeq9qbabmdfifjg61f2b7t7'
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
        example     : 'Voluptatem quod adipisci nesciunt ullam facere. Minima modi et. Optio ut ad quia nobis et et.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '1pq3j6yru7uewcf5amkhg5jkfut27xejhloeyo3wkky1oj8st3cvtbmgt90guvi8sqsl2cj286y69u2z6zf82i3v2ljwvms1c8gvdf12mcwanolzqr18dg5jzdh1g0nueg6999s6d9dgw0iu9qywdnzrwqdn9ku8'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-27 15:58:18'
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
        example     : 'u8vii6ia8edptrdfn99st79xr72fsgseyq0cbrystwsq8o9d1yqx4875cgib0ulzhq3r7lwi4gmnk8a2x83mu9440a1thugmzxyu0hvpq2bjnv13vwhyy4xcsqdmy7a4ee4o8zbzyskbmrtsdjjzr3w88dvulwsb'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '8ebu6500a54vi9fpvot87w1zbm783ib1s645s362mcf4in4f4z'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 874847
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7339474202
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'pn7910u4yp4ht0chqa2y'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '4zjcbx43mmm0q2cn95v4'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'p4l3prrn4fovfh13m6gsak0uostqxi9m0vwu15th5oaxb52olkxnil5kply81eq913oh4zm6xw4z6ei9573np3vksbn49nntkdjky9btgvyzjq4if6uuo4sbti4r6u3ath4otqfe7qg8nwg2sk9h2ma65cvsu93s'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'wm98liblmqpgjhaoa63prc3dgxwds38dtuvxdrzvyl1ixjdgs55kza5edhiid5fqkm7z88cvusupyv197oz48gbc4795gka7mpbwcwbws38q6z7aoy4mwcurbyqmjhtqsysjqqxtn4qaajgre3vxl89b7ist1xpn'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '2dc4r3csip1mq5vusre3v1wnp7wyeadppop3alvydkde21wwux95m7wm0ux69l0yjz0kn9jrat4mivtui2cqk7544i9pjqi02zu9eef7gtzph7w86dz4uklcwdux3yjlj4ltx92uf1omqjfqwwiksbibhbjqv72o'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'ofyr4f7sdadpvdbodajpsg73vxz2gwtm7qtiya6smeeonomiaa544r86qox5guwgyijfnotsb46z4nxtfrt8132jdfpi8l84776j2nlph0ioizgvj3wev0mfc0yrqtsxa8q0ofkrotix4hjptn4gxm82sf1pqsnq'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2235486722
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 5387443304
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 9050792762
    })
    timesFailed: number;
    
    
}
