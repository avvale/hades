import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
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
        example     : 'qqadqzdcn4xa7yp47j01rxxdczq7gkndj7g5h7wrsqkh6ihrem'
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
        example     : 'z0qvdos66k77c4wfbz7h'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'wia0phz80jsqk7vt22zh7lgn1ksfpaioqy5qe2e59vr5pji4snfhjgljlxtw'
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
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-28 23:57:51'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 16:34:14'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 07:49:43'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'z0c0tmhifsi8f8jqolzulpc5fg5veqa7518niwfu'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'djxrxcluhx9tv6805vpe3ztxvicer7153brtfmjb8iubbu69fo2nd2xab3u8dsqsrc7m1vmbgn9oi6254fu9uwp7ux2fy3q8bkm9ctddf3ju8rzvhj474q9914gdxn620q8m0ub25573on3v9pqza78tbolz3jwt'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '8umjq8k0w7sg2itsu9eisdscag86k4d7fnj1kdzksmjfp77u04a9xax2yh85guygs3cfhlrtiq5yu2h7oljyj1uk89l1m12ztjh3av03c13bsnt54235b0n42w7dshrxr1bw53xmi4zbh6nco4hirivzys35y0uk'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gvmqfstl98ga86hshmwk1h38u52cgn49byw4sbpo4udiqdby0t4tfofg5mmlk1mgw0ujhrw2yrbuq1r0cx522n8rlis08qsagd2omoz296446y97425o8c6chgdzcrtik60wvgy9th5npmrjibiauz2gf8zjngiu'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'j1cxrg92g2dgy9t9vj4qsxixeysraggpl5sl2fs05c28f2k9r1er7xjyuq1zi60cjsdpi6lhuv2umlmjnpqswsvs1bdt4mw776l3wi7mp0vmco43u5zy47f3hl7vn2heppmu2msoi49pu195tlw2754u21u4sdbt'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Exercitationem consequatur sint. Accusantium id qui nobis et sit. Aut ea aperiam natus quis odio reiciendis ut cum incidunt.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'poae0fl4ecyd6hsfrznc8to19i5kqico4uuulv0r6nvpotpskf3upqt7nekkeoexk8m0twyd60e097w57gu1jj9a2gdkpxfkzg7izkym666p9g2qhj1cz21u5czbpyrjt33jisn22uun8yhs5pkd6yzn407f8j5f'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 08:34:15'
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
        example     : 'md9za17td7d2u7jkxrs62bymvqxair8db0dz7pyokqh357jq2kmuw5xn278n222lq9lz6dfo02kz9afskgubc9y5d0iugz9bm9myuh4hbr7d7fb503nnqlvmcoy3ktrhozu7vnm6brlqes1lcqketezj2z8vu086'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '72el1gycqapgl7t86nykqqdc63dlix8hzlzdbucztjjxilhz1f'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 539682
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3180781736
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'vps8h3nkbwr99xfmrfqj'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '8ima00cws6qoxg17emvj'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '87oxj9jv92onq4dy9vmr31qmgrlmlde06w9x430tfijznczu34uuk1dyzfm4qsumofawdlst21lahvw1l6lk9yfikwwl4xd37v86m1mr21vtydd59rzli5hu7baxnt8is7kgyd9piaojbt09aet8japprgh98dcd'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'i7qjcc7elf7lu5hhl7cg9zexg69sf3f6w5oi7n6jkib61ckkxvcixpcmbrbckhsxlurhd54fotv7mlvfsqmes3n8llvyr21m8gaula73cuaz40b9r9c5icd6w2jxw9p86cgbf4alsl74cw1anzavevdpg57mp12s'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'xobxcne4fscf6511c5erg689dvxmyiqfwrp5xncmqjgcwrg32f7les0bbgubpe74fhmgwl2jxq4az23f8bnkv9quqzinzrft9w1pjn8ujff6qypae8mw9tacl3inhiwwg8l2rg5rkbssaprir2edblcl69xyge6b'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'jmqsjktztpld1jdccxsktx9jfsrzcnwzumowbgi8ac9mco45t2zon587y84gxakrd3ypfqa3cq25d7rny1fdgiki80xzfk8vrvyv91p75r4wzcrax6vwnjvhr4wjxjqdll2n43hy2cxdebh274g8kx53q2caukz0'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5926180276
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 9428260718
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1561608887
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 08:13:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 06:03:45'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 04:55:01'
    })
    deletedAt: string;
    
    
}
