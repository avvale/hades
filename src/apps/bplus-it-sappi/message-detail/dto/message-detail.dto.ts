import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b526d247-1650-4b81-b503-12d4fc3b323c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kmhp3lwcd6ohcr1d9oirjg4otnzssulqxysa9hoykiiis2ppq5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5383beef-9793-4b37-8b36-a0d1e4f1bedb'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'i44aexi7e1m1ihhdxq73'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'mwhq9gsyjf94it3dxhurjz6xro55eaqc1k3tj50dapp5zmw5n83xvx86eg66'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8b3851f0-069b-490d-abe9-e46bc46c3dc1'
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
        example     : '2020-07-29 18:05:07'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 12:27:47'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 12:29:46'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'r0z5z55ejvgl3krnnkprwevpghvfvdv7t02n1jjv'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'o1rsbx61fb4uw62k4ek9u9on50qo6d7fcxmus88tb7wgkrbd9yj5prw2k8s42wlc06fgg6lvkgcoll64l6m8oprv0cw3x179wmyt5golderki9pjyzb0085g35hx5h5ujmtdg0kisna9oeqqxnhdpc6x5jimycgx'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'g7cskzbrfggiloectw00th3fuu9xi5wl4dw3uoblk0f1npbdlcy7awd5a7lrtd8jr570ti3k6ab2n2jngjn0m5l7h66z3vckd4v46gmyegpyt5csokmjodlk0stc084w7ult6z2grm90b2jqbqcizgpokt3b47y3'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'zdvr6rpabr6p0r76z3ia09tsgdtqqwcjle99pal5s8e1y61cuh2cu59c89ni86jzpwqhcj6mn6me8xrny3lrtws3h0gsj9dgq7n2zjgg9y5m400pa3cmi9mw6pa8tplwhy6j2x01kdhk9zrrnl6bhs916vjlyio6'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'w1cxkpj908s60dy76k46satsydsvktgniq7qxs05xa61o60qgtfen0v2i9gr91ny1n7tg3k5aqaiinb428fw6ny3vjy8n0fv0rr3agur9th2wd84e9p55z0q3arz2k9buorcsezzktri7erbhn9fh0gy50dtl04y'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'DELIVERING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Doloremque ipsa cupiditate expedita. Cumque dolores ut tempora. Consequatur sit et modi voluptas rerum reprehenderit eaque voluptate sint. Corporis assumenda sapiente dolorem qui soluta quam nam ea molestiae. Autem asperiores magnam.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'no7ld9dtmj4ebb0u7j8epocx9n4hm7tue2m6c14jkymj7g7vv31qb5flb6jivnf3rfilru8fcqvp02yfk6m5np2yb5ie87e4mtoprdb40ilqb4lzf7e6gmkrcduiqjx05sac0z5xt8xk4t0ued08pdvpjaltm2eh'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-30 01:31:52'
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
        example     : 'xeb9x3me87ebm0638zoja5zmwvgmvhgvcln2lf9m3vib3x8b13cm64ajqa1wohu6g5485ebbspdx9e0dywenspotjg89rmvwsfup0hlf672qpma7hgj4ffpm2gwer46umd0xm95fzt7atsm3phwacbafi441qqy7'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'j6vetqa2hdlmw3hhsqhy3uiwa9wqakunlbcgrpzg3ftimlmjsa'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 436191
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 5460493224
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'bfua08cjjvqh2xvbszwz'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'f0o7818wwr1iqagq4zz6'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'y35sps9ijotvftj7e20tb5om4iqwg1pt9he5mbdwz2tl1kn3m6hq57injw8hxhsaji8mgvcx6r3zw6id5n8w2tchfx8ksg058ehdp7ki3i459nx6pjjzb15ow7x7zftt4wfk6pxb53vxtn5e9fgrdgklhfq1v50o'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '0ws352gorpa94ihwi5xzrplov0pb5b6lx16zo6aw0c4vzlg7srw0iytjz8f7xuknyh7whtn9og8w754s1aiu0q6obg6t6ug7jzopssa3as74r5b8y6rv62z1cun9affkdya91658ihtmzglbqb05cazh8rc2xzcm'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '2qojgngdt1pl5fzccvvcbc6ronu5ok254tn0ocd5qu0161aa57arovmtpcs4jtogiwxpci0rd3xzfuhl98674o3yfzsyds1hm0uovu12ms53lesedn10zbojyistwjp3ohkffd3dgyfevi7x79awkd0d6r8tokk6'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'u4rqci56r0xfuyyireme2xhry3mcct1v089c8i0wbef43okrybok5rcylvfez0yrw347q5z0bhq35p52ab5i77j51vk4fe5ny5z3h0kpx6mrgf9x7duf32uf2y63y59p2gv0jcd1pgofyyub8x2s3k8i2xyvgyva'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 9195469027
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4171072511
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4368268648
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 09:39:39'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 22:45:35'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 11:22:57'
    })
    deletedAt: string;
    
    
}
