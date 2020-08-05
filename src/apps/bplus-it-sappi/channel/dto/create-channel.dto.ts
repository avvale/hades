import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3dc33520-4cb2-4278-bfd6-076ed42bf026'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'q356oow5ol2dgxu81j5u18fbkr6jxkuy14eic5gi'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd8ba3058-98ae-4ce9-9f95-19b662777756'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'e0r35lu4c3p6l75l4y8sueizi71nydb6qnwt0rdxiu5k7lztoa'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '119453a3-9825-45f4-a660-1d5467011cb5'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0k831d5fjwprm4qcu8mg'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'inuv19p0lvwdkcvhugmuc8yk7nksjiaakftartyg81xz3nr534it9b7lu3dadsjiwwzhju5vqgf3m6rrupwx3s0wgqf7l7qggn39zaet3pp8et4jbx9yvm8xzv8m5h05yl5bsvw3yrd3v13mkd1jegye7klzd8eo'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '3p1fuuuiu1eaac7hrzr4l4awi411c9tws5skgn5jhrf37onbm77gp0rasutltlfms3n0tsjxwjvs2t6egz3cj0ugwaeehkrcizrkz4phlpqw7gel7o5qg91kw6u8fho44se3toeqmchuwam86vh2dotz18rw2xih'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'he9feq2i8eq7l8hpop6qsqaarwefr9vtkx05m4tabwql5ko5bguxb5he8hwe2pdoi0ajb13a7mjhfxtm6lwz4fifg8241bqlyjn9vnaxfszj4ibc65md36fp3ruh1hs5ve7qfag1s1a6naqluadu9fuxpb20i6c0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '82tx1edk50m48a6tpldc2s7auf5378z17vnkqzoe'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'cs5o56u0p418ye4j9up54jlfrk5qkmt1bebt2jcblb38ldncb1680b4ja8kgmve254gzoj2a9qou48yfglmq5inid8d4mqn1iga9875h39rg5p5xvsemjlijz6v2zpjuogiyhpcaah2uskfipz1q749i924upqui'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ol2g0tge5o4ig1c363i4eagurhmclgr7uxvopdnq2dfuach8fvjlip1tpgjuqh68eaf3mive1i16tej6cvn0fludn14rdjfxdyq4xt2kac0g611g7p33avnfgm9angankqynziue5fki122b7uaadlwrf3ttqrzr'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '09izhpfuc530tk1rs4vue1cs384zj5hoel02aqvs9gvr8cr40ge1bt3hgpbnj5zi889z35m0gj8q9eodwi86aikkouuey49au75qwhu83htc8eqlz8qcmksd38c028izxtzcplspt6nnpqsw3crf5thkzvsghazo'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'myqk1ld13g323m3ja2yp2gmduzmnanit3no49qtz2ek0aa23h3etxfi8lby7cdto28b67anex7g77hcunq3f0w8p626h6ui4bndmh7ckezngsfwpoygpyltmpgvwdge5wqluqtpkjqjdus1la3t0rx2dl1wqmymf'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'wixo8274mviveo59r629'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'eris49v2sr3kdix0io03u61itbi66dt2ifqg4eaej6klwfb7p5xwxqvo4aww'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'hrr0d64zy2m09txikcytgarawrot76ouxo8oboyjhz8tile6d71bd8trvece'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'egcqiync7qge66btsf12q01ns02vc2s7yjxkntew6bfdkv6e3j3j8y63ncdv'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'hrrz6psb3dnyjk6ehbnkgw77qtdx2cflxvkbafif80ci5zzcopi0jbj33k4kvzlylcalt0ncjtjdt3haas6wm7sg4w7lxz3hmadihiongd81tvd641qijzimufxpokb8k0qqrp5nuvhrpyudqvvs55937fkp82pr'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '3uq3dlqkz8i7ztg0vtntcdryr8m1hcfme4bwrysx3gvbwhwo3ilrvf5lditpq1dw7yttfsroppwa6o3sto7pi0y24ohe9keyrwu8zi0fb39udt2cfos4l356jbilpfonym3asue2dwy45yeq2jbbh0i50bd2i5ipza4ap12ck5shht7vygqjdof7gb0f1n4dm12l6kk4r15grzg88t96xwioben3431d8jamdrmcyqadleni8inrkjp6zfw68sd7ktcfgx6yq0j8epn8dygoscrhvol9ei4ztz6xcsbls1gaby2o87cmdnpzo2vxix09'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'en9qhsouy15ll1uh89u9mzxwgj7ns8av6pli5vqyyulguehkie20i1mg4ftd'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'dxq588uv2dbv204ct8yudg0sfzxniphqbca9zlbjyldnc9u3ioznwprcd7awan0f0svx4pxvmmvyzqupcyrmus68vgrekpeswmihv8jta2td18wrrhbp6tys6e423ugbt366r5og8ndd2v1t7gzpfor979zi6wsn'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 3025138489
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'a23btjsknzzt96wz05mufi6x4bg2a9eyi0ezaiv8ke813hgl97y5kygiwgb4fbzylzg4anbdn6gfl37aj8lv1yqqomk8uggdm2i77r0nmfkkwhvk0ioa0favlk3gf2nnj2njrje0txp7fiuy4zykmok4bd3vvtxtppurpogckvq18mauphz279ui4c11b7mkp7n7m5bve53kypn6h0d76lmkv6pr746w6eytesgqljxinisp84jw4bt6ui86fi47326km0wztyg3mubwv4j5tvq2bkrgw9hltcsp27oe1samie9tv0nsi5eeuguof8nxykxuknbqwtyhk9e3hi6qo7cmvtlhjfzw8jy0lf1mlebp47zqz79nl56bn0ca7498g2sjbyv5y95qejbhxkif9snhnfd5ju4g207ha73mwgnnayq9cqse4j2lkl3y6lnt7pa7c44ieyexcgvvqlc36tfk5adlwstxvoa7htc57p27o9aipie6pj9pnd511l25of887r09fctgpernt8jai0w4ad7wrm9526y0r6n98kcwz89m26p0nz4dx9d2fvwu80wzoon6y0lsvmkz23tz14mlnbsaxcylqym9ncxr3dk8c3h8v6wswp0y1bbb0v2qcobj4j6bmebi1c43u56gnx7u98trkcw99nxzg0dg5o71oofc95o9gdptezawatmiv7od77per4tev5s116azsc2o2b61f1e78qu5w04shm86iumzagjsi7ue1if2xogrodn82bttmre8v7x4dnnj3fikdxr47obe1orl8gsrg1t1tbeoch0q2f4s1bx3m65omw0nmqdr1n7ph022x5fm86trq7n7afro6w5212r5018yu00xh4t3079a62cws6w0f3f79pki0f4a8j949vsgvuvugi0zq2pa5dv18vdpr9nyjolmfn8loariiy4m2apjsqzn6yyfqig72gsmf2qeoj7vsqogajivngl6lpw756r7oxa6lh0fy0613qqtcwa7'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'pwoq7i3gy0a8gwb8xjonw6101foyowovd4jzj60tz48lg5cog8oqp42fb4mqkkzboz1ehlbh2s84u4e00m3l5heicilhhznc3ptnpz7e7wfr8v0zpmnfe1d60erqk2pe77nbme1jofcdjqns8useedmo3fydc1fsw6mp04czjsy7emrxx30dt1tm8hcj5diolg32utrukcwtc4l2nt280cegze55gbz2n3f2jcizr5dfvjdo93o8qappmno3c7agqhxwm9f30ec9z5p2xuswa4sb612gnychcq5bqbv9cyvq4egwsfsowtfqg0hxh02l3oo1pdkqweydbafdu1fld4eb5ygw7me72jvk2f5cseck89kd0mor0yfq55mbylj5rg0stgmmune3enm2pj2lmd5m9eictkr0sc441y9wiwbf3oxgp2o6cheld58axlnj5vbdqpoq2qa33jjjtvn7x5yb41rcur9cfxj1esebg58azcn0fdn8099z9uir56cbwzuhli6d4mz0thwyxswwx7n5m54mofpru5505smiwjet4fh4xoxlf4fzkqjynihc9z1msiq5q5gol89ldsaefi9y43z93qsom912xuljao1tpxd4uj1xf8ovh0zwdslrgg8jsdde203tr8sea3klmzh86x19tcorb48e6djsxnae4wei8tgo43lom9mbzxegr8bn9123599zk6irm12sa2qe7z3zwb60okhfw6ho6dlj3mos3emkzy8abbs59bimftgkn1lh0yc6klj1o3smr9rp6cjm5nk6pd6suygmyu3mfuwxux7xbpjaxatvsb278tdp4sqgzoimib5tmw0twi7iewlk4qej0miebw3suqv49c6qrdoqmvlz8wy51aj31tp86028nyn4jryu33mckku3nwyh9atzvoce5rlmy5p6vhupi350xzmw5zsn8ur0qh30fdqrryx5hawg1h35uc9rxm9tspqk2fyuczytbldnw3y6962mlgmk4xollx9p'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '7x1ab8km79e2ep8jwwin2m0z4xb5hl2jf7wsrudkp2wd44fus1tp45heu1uq'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4035685470
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'q6gkphf2hn5qqixokisvqn67qk38p86fp5fa2z60cj35xscg636wzzuyii2sxjlmgdavglmq6puzrx7r45dzgkf36dtqe9mm96b64intgcccd60udmbfw1io5rw4t0y1k7y768bm7gg3ug9oecau1xs1c8k181b6'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '57oag03vktf96um134kbdaefju1j18uyjhirv5mtll6iu6weveh3cn7swq2typsre025z1h6ru540xc2wk6sc2p1u48qd2fjorox79r4eewyu28ud6tcp6ia2lz6i6mn861t6isznltg0w8mnlj7vnl3l1s5ez56'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'wwu38kuir9aiavt7wj4r'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '4iuyb0z5chvgj4og9ux1'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-05 07:50:20'
    })
    lastChangedAt: string;
    
    
}
