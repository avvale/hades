import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '78c328a7-e8b1-47c3-9029-563372c9cc14'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '2vvnaqwybkm1nfufpge0g0xc9qm3ax2f0s22rhdi'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3731cf9a-6d17-40e4-a0b4-858b44e74cf3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bahbqmjtivib3d4gotqbvxar2vmzbbd6s276x48zvfh93ylzkp'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zpzy9q5evqjxozjwcz9l'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'vlg4y2g90e3t5h7g5yw0htcmw17yw1zeau8i6qbg1sbtvvee4akxebjzej7m3ff5rg34hf6ifmx1wzpnmyrxrxleke7tfv788amg2qhpjoid7s47405df7rw7d3e6xkslsib378a2yg1lqiitmvv8geomfhthq2b'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'b62x9eicyuiwx0o39yvnzn5fjr4x9ip3r8a9pn90bn0x1dacjxdnyzdcznapjq31q2umyklqxfgnext11ih226u3se1pb577zopb787rnw0scaa0ixvnjwjmnva78tsotzk3eiffoje294o19e09en83ycao1i7s'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'nodusu7jjj9qpp8yvxup9opx75jo2k0qifqw1qcdrpgs5ssi7k6zpxecv9qc3rcdp3bpe6ncl9xgsd62dca561st7wx22xpn9yotwe203nyr2jn7xkwodchbfbc29khfutc5hn1ardqiscir1zqrhidz71dvgaaq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '65fdbdb0-076f-4ef9-96cc-03370603f631'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'okyceqngeeviob1qud8h24tmu5qulgpp7qtpeem6opeafnk5msge3lb8uhxg51o3cckjcz7yjf0proqmv1rzonrm1ksm2d20b0o1ao0kd6lsjyduq4ryvje71198cpbelec10xsmnyhj2krkip1uqxiposd9hgol'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'skus6gcu3l4vbfhceum4tum9amd2clj40u51lgin9hccr9iw3qsibt3hxyba5qdptjo5xfwb7jxkxn879ecv70fibvgpmvdnipe4ho6doi03vqg8b6gr486q8340g7q67llv1cgsgicoz1fxz1ue9whhjorx6fs0'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'cu3ptv4a1e4wemk4vzjepkqhd4f1z0axgb6x1jbt3wwygn2d5p7vsg3zaff6890lom1lpc3eti87w36vn7gtmicft5p1txokv0yuminzp3t30asxea4e8nr8ndyk4m0xemkk00gva5g62fpalixdwtfvyylcgedk'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'whbllsi3m26k4nkn3oka23mr0gznag02kipou6x0wrhoeo5idcsm4pm7zrsf7bgskyu79bynepyvrexrsrcpumiw3b0fson3swer9ft7hs47g6dleetptlucrgn3q8coxq0i7zfxw8wp2p7qjv1tpr0cehydbz11'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'xv71eh0s0c0891qshegt'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'smxmv4dctxcdz16lagbnadt8jtr5me0hxdfhsgqtk06345iiexfi7ag0bfhq'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'lexq8tph2p2vt10yxrw4lv57hrv5651glgf9q4ymrgkfok3yz520bnzq7oan'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'wk8aar82hhn68ivbs0yv2fl5x3p1ujcnym53xzvbldvce8p05xunrdmr4zfd'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'ed6m275xa2emmkho5st0qnivzmjo71qoqcitj0vp7twqj2e90gvzecl7z1o2wkt75tzfjrzlevlaqpvfupqo6p5aw6kbe001cb9mdrby83c6qqddqipqrg00e7hu9m8icqz0o4ed86jeyunekytru8kw4fy1ifh2'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'l41cjx7gm76lrx1gdufrr7m3r0qhqirex78sto0mbfty84w8mw2vxaocbbhb6maxn4nqy7554ybxqvrxhgzvq5ru0dtqxbtwxzu1dv2u62ss6fdn5lirkr0hlo9sntycgxegipqncl14nnpjeu52yhgo7dm6u40hqs4wroblesxm8md0qx5x5807lnqu86rcbrsnj0t6gv19pgxkghp00drdja1ndem81bfqrtqtm5hv4k8vx7prvh4jwurd8cqt43e904tcjf5ne7a2vfdbtlwy3n0m8e97nyue31nwdx37s9wckxwr4rik5xu2gebi'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ws3u8z69oedpjjx1zxpkpccz2jmupor2n6fgv10c7hoi0rlyybry8d87admb'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'hre4aniuoyf1trcvsj5i1g59ip9osc5te3an39adhjex9umpo9ddhu0jaxwfo8r3afluayzjqtqtzcjjqqaiaikpeeh8ud17p9xd4pypqklscoytvahmdy58704a69d2zogliom6ws6kczwxqvy3w52bb33ux2jl'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5145313104
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'uu63exapcz3oiv15y18qhdd61rglx69ebdg28end9gv5ms2p2qw1ugl4o57olabwrwwovzbocoy4f3prlagtqimfgs2g7lxjlra05yzypip5yfwull41djf2js4yy9tjlosexzziffat5exefnqex3l13pum0t50jqmcmmgrg5w5x644ge5jtwxq25u8fomkwf1m6oh81j0ty81j3dck3ea6cvj04jiiw91rdnsiu1jxt4viy6hs0t7p3f7lb72ou40zha5ui9dksrudcnov9eb0eavawt6mek7708vn3zo0ygr31rz0v8yw10d44mb5zr7uet8cdjdmj15qfj2fzt2cpmaqqwye6idzcugxae9vx16eftftblikj4n1r9lgf2sp579k8l41pbdp54dsua1f862xs5qi5urvayu5uzoparfrgju6c5evetpwmywr9qg7sn7aai4ljrefkwz6md5we5cuftwm4krgrohsti5o5w5qkac4viccyfex9eeyaj1wo562bq8p8medocvquk8w0zka2yl0mqeqg6wxqgzb81650auwiyu8k52a8w8ykuuz0wihome40qtd0crhmfgt8j7jgdsbw9uwj0i4it9sna8pu8n53hfqwfdsmveera3q6s3vybn74x99f3jpiokpbhez80f0r0l1hqwbuv8kawup80y6qfmettqhc0trjo6z1vir0mu4xo73sttat2kutt0tlpvo5496f2wz4th15i83wrf3oga79bgsmbb23624ppgtgozs0m6fpftei867d799whpfl2fp4wm4ad4iqezs9j9svs8uqsszxxujn5dqr5ciso4w8wnjc4c5s4v4u1a7phicnuo3kyg3d135260nfp2ucpr8s2ap44tvki1feyqz0ekhlytmlmgoslgrpuz4o7lzue2og8mpkvwqay7mc1vvdli2z8f7o4wo2riswgypme6t6vx8y9ve90wqlc9npesxppjnhxyp66hs45278v2525ydq2li5c7x'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '7nkh4uf3a5a7e426cswcmprq5q1khad2pnp85ktas4oxbw79rdfzi04xdlmevxjq6k10rs6dgy9gr1v8aqxg4ed71hw3jmj2vdboiv84kbqh856o7lhemdlowped9sz48fw2ile7vpvwrz3ouuay290nunq0bx0p6uwx221ud3rfbw8wq4frv3deztawzbhff0eoeus2ypgtx0r0ejmkesz7yw9dklroqk66zfn1y0an4w6lfgi0uwfubbamop53kln3yt9h4jzpe5hsz112mkznt52evhqgl99g5huri4s4a02kn7dymclvt8hi24a9kcail8p4jyomukhi7z5tiqdz3evufhfpzftrun60t6he90woes2jtuh1p6hdcwd9mfjrshulbw85v7e1in7sgzuqx5t5aqbbnr4e8f0xnsepjzsnl3lzzwfrsh3mv0fbezlou4iujer804uox1a0yl209jd2vio2kap8qejjl6t0s825te8bhue5gcjhbtngcfarr4nrbinxp1ui8zgezsc1p6g0dyv5lbimwh0hdbg17y1x7vgwmxlm0ie4pab2pw29is533dzer90ucf4qazjtz7ci6zpawd7qdnonv1o5fu3uym4kgq8chnppabv52nw98gy0hczpotdaw7zf2f4a2dk8yo6uskubgnbq2kmsiop1e6pin0ark41d6m90sxej3u7cun3nj4ltksyitbluchwqhyopwxogrwknwkpb6xkyrlxxjayrzr07edij2nfuemrrj8v7s959h3j7g8k2v2unqsgj7or3du1w7da62xwe8dkzdf4jljtglonks17hvsctmmx7hrbni690fn3zd8bzdvisof3txw07f075tfmhuxhwzpt232dah3lrs76zffv831oax3bbt61f26k90r3vh9067v5o82da0acs1l7zi3jo8m0ei9a8ipatlzeoebpp0l46se26ok2w7n1vdkniwrki63i9sser6dv28lkn00t8bghs0j96x14h'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ppkvxoq39kluswdua9i6ewqcrdkyaw11reyk066arit1sx08erc3ye7cro1j'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7641478612
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'u1m6y587fjyb4z670j5nd3f7j90vwikqzmmmmi3jdlcowm8iy71v4wm369swhe8ufj2uh39f4dpon69z7qifoayvobagzsxs1r1kqfj5l1a7dyuhnp8jzs8l2osenpqckm3f0qsrxgme28py71j0wyvuyrvbhm8p'
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
        example     : '8eqoagh7wehiwnyzcmgs9mx3p5l5imcg7owxpjjwt0jq2sqe5x9dkb3fjd18jfv2djyhdhkz9ysc500ni81t2hpj0wyg77s3kb8z7guxvr6oieusya6ao7zcgksp9mbx1wdrp8ongo9qhqqezmicn0m1vqiklcdi'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'ipo17u2lhxv4sz381v30'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'vkxla4hq85euebwf24vc'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 12:56:14'
    })
    lastChangedAt: string;
    
    
}
