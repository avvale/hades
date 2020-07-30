import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '998183e1-57ac-44f6-9d00-f33e013e79a2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'q1ri9xawcq8lwkxmdzpz75pt610cj3aqhzwsid9m'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0b5f0f9c-66f5-46df-bfc7-10eacde76655'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'trgyouf9qtj2f43a92arnu6x9pr3bnc8nj2sjolppqu636r8av'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7c344791-dd35-4d43-8dac-5d18b8441767'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'okbse2xuoz8e10phyh52'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'id6na5v1m1jeeyobqjx9mukrf2d6fjwe3rh1tiyrpzw8kvvhw6jv72wjbyhjrlvdifoim56iiu58ahp0muxtme3wvs3ec21l7fql0r894qoiiv3i2sbpr58bi7lcl12d3a81us2w6y7wtmfyr041y550zva59kuo'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '47jgg00cac8q8rkupbd2t7lr8eljzyybmu5nxc4cdkntpevftcznnr22c889ergf2y09likddrl2kswxeq03qyoq93a0xrnpoxeoknwock6n4ern2estzdnwx1fr1y5uv18gvfohbfbthkj2ahh7feu9zuzbu8en'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mm5d2hfwgj6tec2t5siui26fd3r5b2frvg8bth6qmvrpz8s2e6rv4as6g0pqj4oivu8v72mz24fopddwtf2jhdyitmct4owehcakrgqe8ammx7hhqsk8jx0g8uts17x9rwts0djq9s998nyshd36eexlale7klkx'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'te9c0zm5m9pi0wmvfla6xojksi2v3z1i0s19vn3jiap7r5atx7nxdgy553eye7b8dnjqcoivm5uo6m7q3tbvhmk87bu42jot2vte65q349o2pwmcfbbmxgmppibsdhgmq7pj1ck42wn7w91dq58f03kbgg13payx'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'h860une9wau99a4usjfa3two4bn3mskggnvh4198gm96o6dzt9rc9ug8jsvjehmfxskqzid4cyszv4tz1qdeimn8p0u40aduhpzv1cvrmemsog7m231akxasmw69ub13v25iumfsmuuj1s4dmf5ftkkrnfwxhvlv'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'coclagjpvvljidv4jyibddoja7otsirp2f42w7xmpesi29586mfgajk7xhsu1v4jetu66fhefjm9m18vagfoaywqfahfvptc5a99qzoudreue3n92unwh356t2vn7gwu3f6bh3s8azoxg6xnegcvfjdvp6g6fgxd'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 's96nyikjwmg9mx98o18adph88h03diqvrzqfwp8a1meqoxyy2zzthy0y172n3tgju6pc3y729z8juaj14gebha1i80ecpzfwe1wa7rvp58espvxetj9qbrgz7dbnnaspxbm9aki2vo4q2sd9cmayespgiz60pcxx'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '1s1p4f4b95uj3kvpbj3w'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'sw68182l9i1691rjjkoe9s3v6idvdrhz97a6vqd8t6lre8q1ehz3nlunl6j4'
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
        example     : 'p0ejqmr5xwan1t1o12wen10yxrbrlglkjjpbiobvnq8bln811s4pquy0bs2v'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '981am3v11uiqwfarso54l2pq8e4rbl6o932rbr49z9ayypq35wwpinui975m'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'b542it6t9f6ptqlu3t3fnz6k5184t7icaa1xlw7zn0ipxd31gokn7b1u9u6g8tu47jai7tmtxnec2m019t49g2l02keozqo8esxwn47d8ipg2ygvnsh7v6nkyf7qbv5za1r7v9354m7wksn3csjmk4npz60whvqi'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '95man6rlkxrskxq2fofw4t6azrtyp9i3pqt2aimfaewts3s0277b2dwaef4am8wx4q51xn93qvnyfcopwwcms0h9k3svbo8lwh6e7j1ifhjfpfu9nsh0ftfi8w2427pyo9y34iba8o3bttf2ja4gvuaen0q3z5bqwrunubz2gcoxprwcmczr5u8umlmme3kn7exb5bvu1tge62mrpu6d54kygutncgab9wjicwqq57fz045j6dwqpjsc2zttyurruo22s3226mcfrcj6oo7zonjjlz8sb3agu3wlf7bzz2gop592cq06n5hzl9f4xeb5'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'fh9p4u5tmxla4kmvt1h1qxpw5h3xgy1gifhr8ndb0jan3hfq5is9oxkktm6i'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'fbtx1sdk180cfwxeyzcy42wp9yjffyxlxptk6qgte7bo5r7v7fuk4utt86l4rstnv70vc4h7mv7831dbcdxs3fj94y1a9puccsh4gevht6hfbignk34jtp3bxrduv60066hnnocqyb1xxwq7ky4ku26vbhy1al4s'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 3988051381
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '8dkpp7hepuppx7cy7wuuycugq1qu8t2pdmhhcurzu0od1n1e2mdiyar1m4u3e2f3munklve7gzed5z56wt268joxdlfdm4vhc1flsznclis96vfz3x5pixiu2i1hig1v7ei1vxs7gio9qd8p5ag8zwb6a4ri1sv30lb7m2gmyo168j7sffk6bul0mvy1j6kc5o0yr3gx17vyt2j8s946eqd5foh1mlf3b7oivo7hmusdigeiipaondksve03jt1zhay0g1u74acbyhs71h42cynk49h7nygeg3q6ptlig4ps2htgh048u02pvx3g1e5ya53x3f2ghx3sh9m1vwfpydp7k7iq7ch3fn821e5fan90fdzh6uk2ykbi4h9f1hnx7fs9wgn5b1qgp4uj2l4goxsay7urnlcaxl1q6x8glnexwh324pxghpnzg3d82a577whv21cc10pgyblbar5wekpby3p7au7wdd2ofyn23ed5k4jhusevb5redu77o9ztfmpl3agjf02qysysgsopt87o4t2z7d4lpv9myded2jmtwchz19ee7e1l3nlsvaf22a34ry90d4dxuujga6rte8z7o745trtt77gx0qxq1u9xz14su3iydjdi5szq2td8fymjeotz7n1ppca6o25gc5nfgf05cbbk98urbzbzuaxw3o4xs53qrg5lj7xinh2qa9bfkbfp9adozvwtfx99clu2ulfuydcaneczq3znmga07ynny73yi04rq62o1w9zh3giypyeaprkzl5kvg33gyvnm9npax22ejuqpt2k0ezies2h6knr85qbj4e4di0e1o4xrwpn2g8fiqtsv9xlkjvf84cbwc5sup1hrtrl3cvd803fsxxnteei3o8fbj09yos7phk6sk6aatebvn28m8cw74nojdj5qwn2y6c1gx0gjfdh8jxzxjsq0c5fgq5kgumrv208cwe38459tflj16wrbjazq40c3qb3hp39vwncrbwvyxnk4y5jmr0dchpb'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '2nhvllb4gn1179gc5ntev01tzvj7vhv6r5a9ua2ykb1lgrz4obqeyzwi66pt37uei99phzydlwivcp5ahuht2g3c2i181xbusrnwdionz9g4slankoou7asxotzdhdxlvhjhj3m0n6h6obyq89eryaxbl0rybb0p757t6n0i3n8yfca9a9wytptx6iumle0iexi8pfxicyowd7smedfgcshr83i5yh1myavaz64l3q6ou4u9hcs4mkjlkxhaq7wxsvbg1w70fpiozrsb6rywfuuempjfukx2okx9fw2cx5q13rqm0v0kjj8rztd7kts312q828tfsuq8xz9efmn2pei6ie4mgh1ihisdt1pb08tj7cv1mew5yll8tobsjsn8mv9xcokbmvakvn5512j749uwij8h4hc5y8g9quv16gn41zgxtllfj70wy795i415crr5zkxs34y1agmtwcmeirvwocrm2r1fqy01bpo4vsl7kcnvfdbldz2sav1px4gktkcx9ldflcpzzwaxuayhwcwleoumip1853psjyjdv6k41f6up191s1baddocwel49l5iy7mnvdy7u62niieu1pwwehdygavwwglp8j5xbedhz2vhmbwbxgs2n2bfyud3ijxd3cscpvj9ikcxet4ot7ld527ogs9u6m6uvpbnmpsvteo6erwuaez5pg4c2r4e3dsvpg3x3ft8e64yfsy67iadenlw79gk9gsyaosijsvpwk554y4p7iv90rzz0bakfkb8p1erpt6p2rl80ji01fz39eaozrjezlp219qc281kgkpvoy2oyukevzo7msiwhmsx8pf9w94ofwz74xtc1559jrl2f8qh5kzydexwzqeaywvt5tcc3a23s8il51mpxuzjaluzrigumurkn5cfpxu2h7ycp9p0d9q2j4c1jwxke3ijz2rh4pcs5lqw2qte9ksn308jbwylu7653eltxdq1970l5fqcrct0qins88de3zrnarsea7wjhc3eiqnc'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'bzdpvrjlw4yrrrhemlfb6dozy5jk019fdkjsrginrdk61195ey6ix1dxs7uo'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9728002127
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '6y2qo5i98xtys8ujdl3pu2pj973b4sss0zjkds707i2poo4h6znl1uc2y83acwbelzlzmbs1artx84ti3l2zic5td28qjzgf5c2ghofe0lngpcnzfv8n6u17l2kdfd1roai176cadwsk8pcc1ctime89j5qpuhx3'
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
        example     : 'e2kwi0b0ec8ivam0b48rtvf474f5ee35awl9hy0oipm9azirsz5o41aqybf1l3goeqz0r8183i82wjhkikh0to56qhqlsmwd41gug5yjt0dht8wabs5f8x2rq2zzaakwxikc9nuh2mmk3gfwiyghnjawwbm03qsd'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'jgvy66m1ztqubw0qfpat'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'hi75ewr6l7afp7xsltak'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 14:03:00'
    })
    lastChangedAt: string;
    
    
}
