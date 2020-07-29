import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6538794a-87ec-4570-8e7c-7d32b64d10f2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fc089b46-6e30-4672-9499-ace50a73cce4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bonaj63dijewm7rdtb2qz5y74df5my3ead8lg2e5eh7uw1dn3d'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1fb13b0c-f722-4791-8b22-6096eb52a5b4'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'werhjxa25uctjkn7kgr4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'j9lvgdnlekwx2ttqvmzz4d1u3jze6pjbc3azn4zufg8rl40zx9byul3om7oi'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4'
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
        example     : '2020-07-29 09:07:18'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 18:06:02'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 21:35:43'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'ghbgmk0itzyczb700gtn94eyto5gx4qgyisauoaj'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'vjumfmzlisw04i2b5ag6abggkf7hp6loyf47nmv9i9dguip1zsjz4ic937v63i60tvfqmos1osna1hja8k2192r8zdgis5sevv6pw2xobnx0g7sae1i3c6vrepns58x2uvvh97t7454bm3z7wdkao5633abns7uq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'jxratz6dyt4ffv6pnxmi0d5c7ndonm4y61po0zbilnyjupd6i01b2abhwl1i70o2i44ff603e2t0c1uf85oezpmamhnva3azbc2z4nook6xs5uvk19wvodarrw7x58gfqm1gc55b3gp22ezj9qiu7lqqbyx8sv1f'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'u4frk7u27j4zgw0mhqgmp63so0ojl5hhxfns06717u06g33oe5e4hayk3d9igj3psuyuxx4c96dw4kbfqdb44pnp2cdlhqk3m4l57oi1peh8t4ziovg69cmc2owozsfzxhpf8y3y8cxghwjgahzkup5dbewcrpgi'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ahx5u7ajvv6q4g9xyzefjul84l1nv998dcr04uazrlo1lr43pnf7h1046mgt8aki9fvcp39mryqjnmqedkj3bwu5u7tddb6mdsjvbqeh8ry6r6nv2vsmmfegj0mp78dr1osdigs8itgx14ewuamwxwvsekbwvhcp'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Sint commodi perspiciatis optio quia. Odio quisquam quia eum. Unde molestiae quae quia neque. Sunt voluptatibus enim eos id blanditiis repellat repellendus. Voluptas repellendus placeat eveniet natus quos hic laborum sunt.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'uuol43cx07e8qd7v0ljosv34onc9ea459s7vo7fmmt9l2nvsxwnol38f7q7o7kbis3k9s5t6g8dhhtbywe5rkm6za1fjnh2o6mxpb0b3259n98udhx609r8cve9sd4t0itx924bjbpjzuurbycamdqzzyl6q8r6r'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-28 16:05:54'
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
        example     : 'fwh3jibsa52s81j6sg3b7k5h05sif8k54dt4aaxlz5ni141dn2ber132c39bdyovbexd6exo2iinhpymfdv1clbd0e6l8leeb5cabuyk9csgkfn7klqpak0akkm35o87peelzq6ns5981uj7x5kralmzyzw72i92'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'strl1wyrmoh9eycv3gcm887btr6cwlusiyjahofak51vxh2v6t'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 629175
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4879076546
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'ajnh08jeby19e8dux16v'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'wv9z7ki74neq0bd8t4hk'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'ersvy5odc3z4gu8f10lupvjmb9lxen0b7zs6jgglvia3dmsubuxg0m8xfmilhzbilnvigykfsk1vtmxoam4ng8oysyjfsdadwghywrasg07vy94eo1dnaihwhqylxzciqj8skio6nikarkj6qz3eac6nwvffo6kz'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'ythkctlbh6dnvmpkvmilczbccu9d78y6mctyxveo8pe09r4as7d7xjkocl9rb3yv9ezvj5yyg1onf0rb2vbhb1q7srfcdgu8jim55cer56umn70c3jcpjtw42ybu0sawwvc0r7c89dva29dwof6fprc38mzmp19k'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'li9vdmrtfs6sbc618bin63ntibc87e8k0ruprzzy3ma1wr4n52y1qbr9tiqicxh6l2recj1jb3d1wgr7a1b38kzd5g1pu1bzfo3ecx9043yxg5wuhxkb87cubwqm9dhz8p42074gndkyqbr59yvfhz72f7mbhbqh'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 's9zufpibginqb555w7qsg3kkok3umzvk77s2uxurj10ki4sx8yrnl5qnop2glf3uccpes1x082odbo96j18iod2rrvrk20eygz2ajwjxy1g3yxdvt8e6yd5i5ls9d4apt76myld2u9bn9ej2a6tbq1b0qsmx50we'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2550117073
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1771171937
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4706404427
    })
    timesFailed: number;
    
    
}
