import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bb8bbf47-a7ea-4ed5-a777-bd320be4695c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a203ddf0-7444-4946-be41-956f42c795fe'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '3l7q2jaucgmc73ypl6m9b9faf66zbqvrct8vrvsksv0f386mg7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f3bf36a6-3084-4e88-b932-dca3bcf3ad97'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '53j7v836mmehrmxdp1ot'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'd544dd36-987e-4558-9696-fadb54dabb33'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '7v0xkd3etfe3g8vk6rboywv25aqddz7j3mbckjxwaprmo3zyl3rwiv1w5cudr18b3e77zhda0fi9eu4bx7hqvtszejpjwp1k43jotjavt0hokwbniqwvepd79y16y15460kuhvifziqt1xhabtbo6kf3e23mk69g'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'k73g57swwd811p79run73fg0i7uysg07f9wtvmpgwyt9hh1ke8wdhkveq6ojmxi9utasqa3cu9vjysxnivtfcxiw0g56pefpohmxf6zhv68dxlxsim8uw7ks9bxw90cu58md2la3xacqjjqe66wtj0jedczw9l7m'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'vtbf58w22knzjabqgih45mopr2elmcd5ccqbt1ryliu5d86vq9ufdesshzwt49vwljdxxahpoewg53ors54xzlmevouutybxpd5tfz776yjfwnql3xw4ykowxejtz1t5j1ujd4yj1auz5j8nklrqi5rdl13bb615'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'f2b49f33-e8c0-4475-ac7b-ac53454b523b'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'dbrw1akp9uxinwltaba9369kus1pdwi2nktiwfmr2bprowhm0yr4qma0vpnzuqayzh3i8amgjp6p83n15rk8ifvkz4r8l4i07cto1cf9e4ey016jru8cgtmygswyeg0f8knl71vymketzt3bj3bxi33uh5ytkvm9'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7jajkh9oztku3jw80dddfel82ogh8aggkx24hh1hltoddcpifpfkpcqlq94bxw74lcrhssdchoaht2ptcxpa09d1nsg5mz08yegi99d6iv7wd15pqd854jsoi1t6iiebbyzxafta0wi3ycdgxi6bapbkyc31kuv0'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'jka1zds1baxdtlh16l1hu9630ap1oiivnhjmgvben2lzx49e3wo3wbisx3zqn0icuokajg69so6x53i75pieb349uvom5q2gnkho0hlewybf7ixvs7467ecdeu1xh1v3s0xnqtf2ixzg2capw3egc8e9t9krqfz5'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'h6nafwu20lnsgcga986ewi25uhcrh11s30gyx0zga3fxntr9xvqfi4949yy1omqp3f6q5y4muiuvwrszn97zhiwfbpkegl6tomibddgkzzp1e6x425m75hvum58m0whnt6z79pppiz2v7o7h6cq3kw5956w52y7y'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'cu7ptwhtvmxnidi14ujb'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '5guy3lkn7ggwkhnblxri0x4t8zj9k1soke7978h6sc7ynhfkvaytdrtzla2vkwijtqbq3gkudasob3de0tdmymf90rrup4qqngn32zlrxcecxp3hiixnx08uzbtv4aa27qa511xdqfkfztqf90mw6gigdmndk4t5sfo4490ajj3uv3gcjihsjzbg78pfcvuapxdfl6l7kfwc1wjhoun5ybhyx3d01yanrepz2g0l07aafrwnax126gvu342ihof'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'i89awf90qwnftlo65qag7ktjkt0d5d7ua5ox0h66e2k44vke93x4ksplyd4uviy2yhmjgbp20hs38yhdk5xuqcnjrg7e60w6r78aibt6ue1az4svdryvdkdzmi5cod754orbp38vlppe73ajfgzlanhlhx4dvkjmu02jsxsi8q2y7k6gtx40o45xwpdv8mzoaldf480yi8dpys2xt6kpzxaz904nh1l49k5fqo7cpahami45h5qsvh8l7xzu3scaq805jg5fa23isruytt1y0feavl0mwa49bevtd5ttppi1e6zcj9suwdi1uwslo44d'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 't48svz37g6iiy4bc5v4bhcuwxaytbyb6mrcfoeyavwa1e88rcoxc9fvossmsyixgmj7a3fwkm554n5ijcbnku334y99obk3zpch8nt16w3xualham074fpkli6v5qt76u8skxsj4mzj0zm3hgz1op76z0znzuviqgyqauf0t25saspmpdxbgayrh2ti50v3mit2sx805dlxqcoze5jpvqfsattvqhvivmcgtwohgc0j7ckezb9dhtegy19xkq7eci9t5wsozea8a4nfb2hha7lq6ch9kg79ll9wbzp3p6iphl13ziyooxcbg8tkrw9tw'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'j41xmlz4wz3mzf4afpf5jcxe97jlf7892ca8lr062uvm4axqjwtuowz7qyy6vjgv9k3rq2ldizmf1lkwjwdlk9to3shp4o0xsksi40us1lpj67pzncn8c2wp2h0voldej1rboqeq5chxzl0v6yk322t4fs4or8oucccsgznp2r5mr9s8jrpqrfva08llxzbr0hax0y8ldpblnx5wo39ukuztpxjinqmuqy38eve7j4eg38ps7w150ren1zfygog8vb55377648bxka1lntuwgupq5p7fgt8o2274qnvj6yy2efdy6cqoubksrnsxqpmyw6obs0nobgqn504y8cf94c4yl5nkiqhlpngt0yovj0lw9d9xhu439vqcx463y1enmtoyrtbrqyzmrjhwtwde69hfmgdxivbxkrm2nx85rgev24j092mqwi584a3ine3o68id3ufidgzocup2bwycv50o4ylnjnccyjegz7n9qkgl504cu5kth06z2qz7y3f17g6rypelvrgsw1atmafvmc6zbxm830xbage3eekw512tcz60o1ubzudrbqjnz4d52kv0ijjmuysdvmqt34jxecapdjzk4ru9ywt6bm1clxc8th628zgxce3ts18pl7aw3gapc0hcbp8h707j8ukx28c4f6oc46rsxld5a46l5aq4nl2rpj0vph02q1y7t9i82ikmf5fqz6klt5a1t4po1g0anjato6bs9rf6t2kjrgs3xrn9qoddcm0evxu6g0iidqyrdqly01mjkf8vcg011eoadvnhz7dnxmmj50f8n4z4ilf53sixzt3la9u8efm41tltyrhm15namj1hhcgc0vvmp9dromozxjpcmrsmfye9t163hr493sykauxx27uy55uq4p9asr9tc8jo59elitzo13xcmagbizkjk6df9rpult0aur2qdull9n18uishfxr14t6insn5u6tjzbf1w9t8ibhsvq3bamxl8okoi8d860wl6af29w6fd07bw8ft'
    })
    parameterValue: string;
    
    
}
