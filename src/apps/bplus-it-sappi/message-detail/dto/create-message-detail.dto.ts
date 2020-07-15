import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '827d03de-7afe-45e8-b1c8-2b8b51d6e800'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b8d70ddd-0ccd-4639-adb7-7c7319a6a8c4'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '826afca0-24b2-4e1c-b27f-42c86cfb6336'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0qguejo2k61yag3ejhha'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'i51awr0t8s0fhb7j66t8ht8ws37j3fg5a84dsz8v8nwv3wkz43mh52qgcpnu'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bb46c976-e4a1-4565-9ee7-2e719b0a0830'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-15 08:23:12'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 23:35:30'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 03:59:42'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '54d9f494-d5b6-40c1-ad6f-04524a63f9be'
    })
    flowId: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '8cghcs3frek11mob31c1z2dowxelba5nqwb4qhpigw575hk1q09q3ksdejmvbs0cahwaunkct2ogdqc1vibn98cjgldf87wznakft2khl0f0b7jfm77dx4hr2feko40k6edql67wga8vsqpsedn3xlf5bc0q9176'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'lm1jxm2r48uvig3qpdilw3727fty1ijadvuv7coecxe8n6f0lqzexwtlzmrddaqbm13d4wiokec47ibe4tbaapzk3lqb5jj3a0zpdvyh972gil6o0ja7mm4zbjpj4h0ekzr5ls9tdbf2cd3hzg2mm7cuj54lgxi4'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'xul3u2gxuq5ym5o43zw4pa20tvoy1vyd2ma0kkgxjx4rwdwtoszz4btp80cxxr6uexo6hqhhoyol0vs0x7a7elfuf87glrl69apy1dy9upmo3ccw81o4v3oagxs7x0anas1x5p3sbsvsys4jmbcz4o4zj4csg6ni'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'h5uo7cpa53bk3n3lfm4c7br73ni9665djs0fn0mfcb89u7zgubf45pwdeety48s1jca9sqv0wz6pufikeq00pynai4bppufk8s0tlt3gynymtn7u3jgppr3udlc7obquv1a6hx0cxz36vbnoujcu999yrzuvw1v8'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Dolorem dolor modi qui adipisci. Aut veritatis incidunt minus. Consectetur debitis soluta dolorem qui ad veritatis eos commodi est. Est reiciendis aut vel ut. Sed doloribus eos cumque laborum harum sint aperiam.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 't8mq7bx3tyx2ochbh77akbzi4bazlsj943xpxlirjyva84joj6odcf47wrl24naog19jpsrfra0glcgj7ztdp50oelihv4u3d9y08al45puq9x1xxk849lnoqxx6j6597f1y3ac94wufupfczrzsn7m1rj1ned7c'
    })
    example: string;
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-15 05:49:09'
    })
    startTimeAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'slq2n8lejedxx3r0hucx'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'u22qk39y0f53hyyw5dpycwit06x4l0zvmwmk744vdjwcq3xjq3krs1az9spftshwzokvzhdb58uidzx1ya7h5p4rtyta9g1him77ty6pd3j4p5zu75z1fsgbyl11qhvmmrrnps725gyrkdchj5z7nug6ergd5r1b'
    })
    errorCategory: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '3m9tnefz8tp7i7w36r3h'
    })
    errorCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : 'inxsdacvb0gtasf35rg11hizywazo9bn2quhysnq6vi9hemxh2w7euib7nz9e9lnoibgewts4s7sp3j11xpsbn6x2ozyao61j7b5aj2kzjjobiaqb3x4u5b71ya72qqal6peu9cj7by8udd16vxiavwo1iuypxkn'
    })
    errorLabel: string;
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 2662074355
    })
    node: number;
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'ckbj2cxvs7qyyd9oc0gi'
    })
    protocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'sr9a7dl4lc30pl1g14xs'
    })
    qualityOfService: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'hgohn9irb1hmc8hjjr0tvcshmivazbszhoj7f79eilae037qkzvq7td1u2zfa30mrlgkf5les5ajx3rdma7myr4qwmyx6uy40m2rkm5bsa0h5l1r7utcaw7wnf67ibrbkq5lduuwelscao41x4311lnics6tq2bu'
    })
    receiverParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'hmbsdszid1yiio89fvow9goh0bmr94a7fbzxnlcg471id23m57ldsauzuj2dvq8cjd35pedqu7hxl3t2v7nzip0m22pg70nhujq7jj4jsjxzcaveh1wu7mlmc33gkgm85p22yxcz1w0nb991jct4y2vec8ckrhe8'
    })
    receiverComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '873mj02s1tnz9eagzmgb1bdnil55px9jgg8x328lw2zg7tx8w5899onyx62umekoii34mlznrqa2jwo38dzmskod1hyj6fjk0lf70hf4bhitko4ip76u2zf6aq04xd75598sxouzyza1cm2d8k6w7phxqtxbwwuj'
    })
    receiverInterface: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '169vm08slw73ouutvxd8x68ok2oiunzoulyy5tu7yy3h6bidpdgilhm0z5pkhuik488zi98bcnvh6iifb218d4ojbr024u7qbxqnw7qemkd12s67sm12hqswc1spnput68hjyu18qx7je7iiwao1asl70q4en79r'
    })
    receiverInterfaceNamespace: string;
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 9079864557
    })
    retries: number;
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7362962060
    })
    size: number;
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 3981335426
    })
    timesFailed: number;
    
}
