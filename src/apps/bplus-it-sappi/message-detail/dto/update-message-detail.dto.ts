import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '744cd95d-2717-4c7a-b502-d6716e3180d6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '392a71aa-3c08-405b-8595-17f6e43eff96'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jiilkx9nh4pfp7un6hxqv9uestvh80fry23ezn7v5j9qvz7nl8'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1010a45e-2eb2-432b-9245-4efa085cf125'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xbwel4335iyjm8ng4jpy'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'u6jgmci9uc6cx8c3u7tp8q8txqmz06u8zfo7mn3dt79849eab7gf50ov8a8u'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '4a889ed0-086c-48bb-a605-a24f36815e81'
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
        example     : '2020-08-03 11:58:21'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 00:19:16'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 16:15:00'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'cn7x6tm4k8nr936j6u3inok77m4ixatrvszq6g7a'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'hw3oxx5niidtup2z4anzxpydytgqo2iz0ok23ctzrgh2gycvvd0ci4dsjw9tfrcs2ixb1nwpau9zi9wbsou8e97rd4xz0z00s2ytx4icawlg99tdc8l7bndgm49myypkrx3dq3pa2k7dk8awmyi7sh9eqft8pm5w'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'tdrkrhca6j8vqokqyw6n65hhm284y4lwvuzt3o9bcgc2pgrdxraaaxvovpuv0bwti344az5r6yrq8l2m9edvfsaedpjw1nl8wgtg86pi6salh8uaatejlyz7prq70w9ei3xlpopta063a38boi4clt3evd7zr05e'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '1fqpx4ehdg1gjysz8xazaaso131c3plaak5chgzfgs94nl289x9shipkije9h4cwc4e2r2wc3fphflnw2p2k6mzmtklaygbyv4sddphbex9cyi3nqprizzq8drfr0l5z79e236djqgl2taxef7ctbi3hddyx6pba'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'z07pe5tk6n0lul2u7mcw54udx6stpg3ln1kswfn6d7ky77y0muboz5ttzvgal5ryzewxuudo3smsyce7etedh002qvj0rmbhzdbnhq7lh4lrs8fyiqcvl65myzzuih0x0rkkqr5ezj7d0iyw903z3a87npu1xbv5'
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
        example     : 'Ut itaque et nihil accusantium dolorem quo voluptas omnis. Et itaque quo quae ut explicabo voluptatem. Necessitatibus dolorum animi.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'fr8qsj428bc3oxacuvm4ujrsaw85w7ohew7pslchiz8u7n6tyd5ztv48rpv8tgfve1t6sg7cne3llw4s6argdag7vzefw2bk5mr39eda6t1k86x9037hr99il88oje1i8enqgeq7i5ra3gxgkmvcnvlcjuzp2znx'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-02 19:19:04'
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
        example     : 'ijk4ogwsc9vxw5o800njm7phljmcrcb8glbs4shbwxi1pzrm3uydtoix0jptdkig8uqxy2uwi205mnf33wofh3zv9vwprimcf3znsep97kz6wzi38kl6j196nvuzzy1bputkdfpqn9jc7obnc258fmyxoi2xac8t'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'jgcozzlxkv4pa46vykqv2eo53hkjtemobthvhj4779o2jgu3ue'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 980597
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 1294328212
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'nlbe6evq7p66w35qpk8a'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'yiij068i66xw5b9fpqdc'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '49x7cw6hk00d71bmqb0jkfopxmlvb3bjn7vvkx3kz2ozr9693xov0rxrfgx3f12sc4znyafwti1gfkozetak1fb4fwpoovmeohd84mf31rja52zocx2u2rfi2vultl3cfn0yon6fhncys0gks0unzm76z2qp0n69'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'pqtyg9u251supip3eqyjoyml9cgte7ixuno1bmp225gj0cljf3cfi1t4lvrxygta4ds6qabx57uc3m3o9hvabudak4s2tpwhp3eceakw212owjudtndmdztlecekoiejxjdgls78h5ka5jbsdve0jlezk58wwosj'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'oj10km7wv5vgphsn5t3nvs9xvrluqxup9mubqgux0ar1lxlj7x26rr7iecm30hwituzobalt5sf96dnlade8p5j11gz8cqsvnmfn7bcjs9k0zjkmpi7qnwlobyxq3f0fctl5dn7w5yrhexz8d8rtx0d71nsunnr0'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '4eh1e46up8o9mvrvlrh4uzvc9movth8qs1v0zgtzh75vj63jmcy7l7tdrw33pevz87zdbay3f1yugnfd4rscdxhiegegks2vlho2aoscq1mwcpjfq3hq59rd7vb48oib0jbsdoceh60i1kea1akikohhrhk9t2y3'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 6793554670
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8600612652
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1053686548
    })
    timesFailed: number;
    
    
}
