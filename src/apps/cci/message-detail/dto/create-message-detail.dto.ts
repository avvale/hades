import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
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
        example     : '3mfj8s9j6dyhyw10xadyhk5fwgfv6ddgsb4qkcs20xxy6ztjfi'
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
        example     : 'kpu1b8asqs6agp3a56i1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '5ujuthd38gsvbbao05uwz2yudygjhux4q7cn41u7gptnfnp3jsbg6sq5e6jc'
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
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-10-22 18:58:46'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-10-22 20:23:33'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-10-22 22:43:39'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'baamklz8r8saj3towrfcz68mti0qscvolafiay95'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'mz6txjnc64nzg35j5iovxt6cr3z6dhzw82ojakhl05qo8m7m542dvfpolgsypidjfu8x6vkipjnuh55bd5gv7uz1vdvspxjnhe14z25lixcsgxtdfseyov4ygsubutkbv9ew98qbbbbnef0fg43pulgyhzdk916a'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'hmsydeaqpu360afkfp9gn3f2mpr6lo1y7rlosqohzfj2slvw22s5pgotw1o8bs43afbj71m3z1mkuyr6wdw5zozamfyb80pw8y5kgsku55mledln89k18gir5fy404ce1xiw0xne1tfmvpgxkbmdtqxe0ik9rox8'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'fg0uiihvi0wy1hy94fbq7hjg1uhbwwdnbu20a3sth2uzo6yhqv7olans69fwuovuwgw9tsj9cppeeelt4t38gsnsymbypeusho3xhyxotdlnx2i4gov5zk6y76kk7tt1ph1hvkexcdqbotsi3gmwutqgpbdgkovf'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '6pya62l6p8lp04icb0hh3bbcudj0pf2003ussjk09fqnxr2da1kq1hyagptuw74fuxb5be9d8heznipq9r5ym9nvh54vk84ge1z7sh5mub801pdbw2gfowhxcfz97paym01mizf2zf3otonzpwlw5yga37ls81jy'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '8ugoad9deh7z6856u8c7aeyvs2xnlrkzt0fphwxebvgzlm9ld38sv0belnlmn4vjnekxw8y07xdac9rniufl5iae2gsdgupse2mywkg9ej3zm41dh9u97fi0n9ci85rwl795ssl5rn5vnn0b8d22tcim6fk1xvlb'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'oa5dvkz6zo2afa31qczf7w4gd1iboype9tc19aktbqp4pn11rohssqho6dngpep63wi7gwizok7iu0cmon18drww4ldi66xuktv5mobcccy1jllqh1een2vk7yutpqvtpsuwo2nnchpsf2wzdbttytr39aap8vp0'
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
        description : 'refMessageId [input here api field description]',
        example     : '83lkleh77l0cysa7igljfudjsod1bdno29nsdlsfd5bnjvkph2yw86yn4vrtk5t83jrr9xxi69rzfrastdvi68evuj53hiw9n9hhq7bszv71f6i2rwgyge0sjxrcv49u1chd7kaxd1fw4kyoxpkaezlilpmulnhy'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Laboriosam libero nihil temporibus impedit non est fugit pariatur veritatis. Enim qui illo maiores quae. Aut laboriosam voluptatem harum sunt velit molestias.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'tpwoi1sussn4lamu6ux4f39m9o13hkt8umakrqfrjx7ij04k8be63i8uppy58d38kvq5gpalyvqvnxduth221vgfmy9bfpi2a1h1megnlwgj75zzx8vo2l43hi7es59lr761bm4bueohe8spwrndqlxcfwfcryd4'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-10-23 09:02:58'
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
        example     : '8a33t5bb0opsjzlfwu37er54zkvu5ar5syihnagaai6ld65z8yp2add985fyivo7nxp55busr605y1382azkbub7zn8vs7z2ize0c6az7kgvaxvg20e8vr64g6c105znf7v34f53kfssj0jv0a18preabaqzb3rj'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'dfin8i1ke8o6pxobvnth5vt5qafoi24i5wsdolnm3smowbyswv'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 995708
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7058450218
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'l4pc00txiirzqf03mncn'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'hclg7ov4wsh2bwksazyf'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'e2aouu3tatyorp36zbj8wzokgdo0qy3c2ms4fjpyggdkz6d2r6giiveshfte18jmfoqp63u43qd6zsb2up6nj5r0zuxlln6fo9ipp1ll98jb0n1161jqmzrp1fl0daciclh9p21l6uqo1z10rvk6fxbefsnuvmk1'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'bszxxh4mpjamq1xory4fsmuk1y50v9x8kzu010dmc189nwnhfyz34oz3fr1kkq19pgd6pthbmqpg55fbqddkh5joumw6yyuttvrmp9iajiwylfk531agwu8hbw73o9ljgayzvyc3n69m2hwfwrg468j1302wbxxu'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'n4xxazankgvkfm7tclp2nyxt9p0sam4mv6lngw82o0qz1xmcd8t6kpgkdmvi7b9i6yt00nwvfsz0yuq5mmhou7p2hpke5p7ur3i9j646ebeleyzjmbubd5bf2ixijobtjgukv1jcuvntadn4087sfz8g3ydjhj4i'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '5sm0t2m94jatzx6q53ahw3unsqx2u0r2llo2nsgx9qe0cmkwx7jm0s06n61z8epps5xwojyu729sfarr5emqbw0k9lut3c19h5esar6ftf7zffw0l66q2t8grlc5vo9hvthla0eft2cr1d3n085p5gm4bxz8buu9'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 3675511130
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 3008191185
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4837523442
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 4677332416
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 8886126766
    })
    numberDays: number;
    
    
}
