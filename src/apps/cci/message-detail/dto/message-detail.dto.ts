import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '53de2976-3362-48d1-8b27-5841b7a049b8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '340d849f-8258-4900-8156-0610c134bcca'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vyn5dle2vnbzx2o4jsb09tzdom5yzre8buobvklh2outpbeos3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'cb8afd66-5187-4eed-88c0-97713bc0db22'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'z2u4zjb2wj7g6k5nx4ua'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '87j5b8z1bs0cn1zb46kq3rl24tdl4bbj4lj66p9w3z1nve2omgbt2chmuazw'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '7ce4568b-403a-4b2c-8321-8aa3397dee43'
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
        example     : '2020-10-22 21:09:25'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-10-22 19:48:13'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-10-23 06:45:43'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'fcm9g2h0w78t21tajoljma6o87wdsk9nvgb8bqmf'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'f3ldmw4wn0y2dt9xibdyljl3k0en4a9b6ouaire8x2jk59xp0y8gpse9309x9ah1dz723uvmkkjdu668brw0v6g708ec8zt78t0b6s7jmz6vjne6tpy961jrum8jwzx9rvbskbh3egmcpsbexlt47fe0s66fij1h'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'dfdw9qsxi334y97avc439yz4ll46nhgs3k9jmryyu9xpftwe4sxngblbdfnnszlu5c4ldbz21yi7klob4yo9o1r16ehu5uw21eeq0egr21hi5k8sqii3ztxgfje3biqv19aq4a0dw2ynxkxfxdtgsm5znv1y5a3w'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '976nacdn8zg6uiiq14z9j5f9ni3ic799g176kq3pcyml6r9ynj3bviccdehowu1cvde76bzp6xu7fnpnnc913yxfs5bght4exmizi2qb2eyk6x7yhhqaobvo1kdplhxl9em3lx6b5ig3e16y80fjlublj8cxesk2'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '3itz1lclfqq9mxo82k9gclm9e29i0jlkr9mluu2es15o3qxe7tndje3gtguqcdk1nxaqxaa46jdit24l4wpsnkh37aic43v42y83nu59v50k0i8ksed21ct3p4ezqgc6ap8q0b99hh3lj8dmdszsoc5pifm5z8kt'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '34otrzy4qoijbug76t4ai2jirclcfuut46vhgbokxxdfmbhqwv6d0qq3z77ukmpyvikwto2tgpj1c9qeqst8zadbi14erxhn7rz8fqapnkaqx5yoisl48p2mk7i3m2tlccfnqqpy1dvwmoh5i88spio6jxn1e9ke'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '8134au4oqityscl2tmw9q7nziimbnfwstntfp2snbeb0giumzet3g8cv0soqbpsr8abb0i1wbc1l20jw9a9vioz7adv3w0imlhwtm9ocg3pphyz0yj8tgvyhjulgaobb89cxmahdxfxtaly1d39grcknumzq8m2i'
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
        description : 'refMessageId [input here api field description]',
        example     : 't2sg6hujtjgcfyeaerzfd43eydwmrlx3e48e60gvrd429enctap29t0k6svowoha8nafool6997loug7sk22q82xrwt20rvobngbtqizq93w7tkrny5w6if3qkzojy6u0i0031imttleee6x5fg93yrczdmgj8f2'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Necessitatibus sed maxime. Ipsam quibusdam voluptatem non iusto. Nesciunt doloribus nemo quia reprehenderit facilis esse dicta. Est explicabo placeat quis ducimus hic qui voluptatem eos. Cupiditate sit expedita ut.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'pd2vqgrpe9ylhifpncybcabivj6nmi5ntnpujogwh78m3vce6dmajvsdv1gf8s3ew2p0i2o4cfgdqtk08wnmkdqnhtk7gnex76b8v17fmdsmugzwqlb4vt7jg1xjurn4zv90pe4c8n73reb1q0q68mir37mnp4p8'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-10-23 08:23:37'
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
        example     : 'paugpp1akzdnl9l4kfjsj1yy6gp9tys7faiivr1243fkrqun90olpz38qjzvcg32u1gtzcusvdx6q0bzoyvuczdxkqi9er8e198xdlnde241csi960jiss9i7hyliac98p72x6y8hnv6ny5tx3um2pokq8exb2fx'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '5fendut0zw2od36nzm5adyo4rtmuxdmyuutsm0r05huyew6w4w'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 397928
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7003825099
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'endsus00gbidh2tnnbin'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '3t2w48ue28m04dumgbo5'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'ceek0q9v5fdk84fisuo5g2g7y1co673tpx3u6ld70fxf0wcyip495xume5c29urmre17fneyuioak7r7zieoipcrq258ov9ltqyhvqdpro66r9mebpu6qqwukazxw90mvraiqqn8np5ofp71mf3nv8rwcprn5on8'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'xkokf1f5836c1n5catd371rth3ilor6886gqa7sqclpunwogydngkmsl0br1s09cox9eeagnzi79x5cze6dmy3l60wyvgnuzhnsr4f1gg4626z6j6y8vjiaa69cs7fq0ein03nh2juk0qjtxyl7v91qpoytp45wi'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'lsh536f73sxnp2qjgnihb1hgxnr0xr6gm5j2jg08k9c7fi6o55rmdhatfwkipu5njjz7gbqmspvn6yjzjj2k736fzstxraaxwdyo343yuzbi6cu4wnbrlypeisu6jp6o4mkzrmofdqtzxhdu0ujvuaogpwteoh80'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'km2ftz8h656su9h8fsfb5bsw6vezcb8thk8m27xnxmr4amwavfdfszy7yflu8zg88rhskmjpygaot3uias22lky67yz92shj1ruam567gqovlayhbvvc86o4uz3ejdu21vw3irb9ondskbnds8p9914wa7gatqpv'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8780792383
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8207539505
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 6348560309
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 8411236975
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 1364544662
    })
    numberDays: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-22 22:48:11'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 12:35:09'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-22 20:43:43'
    })
    deletedAt: string;
    
    
}
