import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
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
        example     : 'k4odpogjbkgsyxm9mgfbt5kycwqea6qn4rlinrh5'
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
        example     : 'rsrjgt44hi64f5hiaalm5bc1eo647miinbcuts45o42q52kyce'
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
        example     : 'td49znonveqpkz6zc2fc'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ewyrg4kk8zljly2k3nv7zyemnhz1k8ddhz4evys5zyofiqp9mzs1bqzl8chvtpsapsea902kwicomobb093dd4nketm5jgy59fy26hz538nhmss3aq47i8lcr0707bqjc8gvip1vpsy6iay4jd44swzy0n6sv5k7'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'u0gnyxhzoz46qxtd022oqo7ae7emzeuilcsqdsu4ewyo1i1683eo1kjusuyuvmb1idjs23l1msp1ojdggiyfuy7z1n0uzk5ky70rtipb5t4d2lodckosda32nwmo5k1yk9kbkysxtqqgecnieftb5wwcnrkpyzdf'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4ja68m8se9y4iudhjuh5w3fc6wnmalkcxitly4wvjxvr4yu1fs3kxvkyfj8t8bailjk88nxisy7bs06h18wsvavaih1qezqp42j9s67r5ezrxx3symqsk28ccd2kh7d59axdhkxerkmycvq5k5myd5stajpwy1bm'
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
        example     : 'sdf46ypnxy8ax2ok74gf03yj7kyza7fhhs7ylqlnq4t0hlt9efuixwac2bv808y4afs8ys6e30r30vcxzlw56r6hx207w3mrkldo6udkevhjhib1r3a21ns82yel24d6vgi1lvqfjvz3ucj3qpklwnmwbzhanr2i'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'szc2xnstjal3ry0skmomqhptqwig3mp41lvzoe4884qv86h0sptfz31d394cv3e1g6n4gbbtd9cpvyi9w65w6j03thtu1719cs155l1reypoklfre80w1fl4fuxal1vg0c703f8oijd5q52oo8a57q5bvqj4lnw7'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'hekskbnswb8mq39un32dqcsb6hakj1qb3dxbiopt2bqiugn8eof64wq9inmaxd6be7ppi7ypl4v6s5dndcrtc9yfenvukfcl9v8k8jd1ndblu91hs2afwhbcoaf2t4jjmhk59mtr56gj2eitfx8sfixmjenzbn0r'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '5rmah9768mcxpiw7fey3jsakfcbx1bdudaqj7pwxazwoa5q09z0jgck8raot67lm78eurhgy9q9p7xpy8ububt1isimzgrn8kwmchsge02fealvz82e5o0jyc5g8mr8xpenvddtq0dj1azb6dr3yh5kyxyespy4e'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'r8q9yjtkwvuj161pwxy3'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'yjlgv1e619uaqodf79jzuqqsdr47zsokwswfqa7yyu9k3b3476qam0mkkb51'
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
        example     : 'h9nwb1x72qs0e94c2wy66f74r44vf8vyiwb0sjecf99310upob3dnjqt4qmq'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'c051x5gvhakc0r61ltkx03asm2550dosdyuft1uxq8as9995qga2nm4b1snv'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'qdn2y4g3bvz2vqjnr4zsk5ouayz90ee9wty8fc2p80tqh6lj6a21arh1n9d8s1zgt5p68awkag1wyjpklc5w4cplt4jz2t6amg8fl7k6ixuurfu8zezemg6jlgmmj7cmd8l28rs3q7uxxvl5o5fqem0dsr7mhb7o'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'odex9lzhexd05h1gfulym6az6xgauhjhus6bji9x9lsqe1ktt3v6qbprjkz0jha1g0cfojqgxqw0ejk9w2j4wck7x8yhynlzowtzccvweow3k84wcf0h8i0j8rl0lkerc41u0rq88bsfoun8rkupl4rwkkj597bxw2i290b1ue4e096t6c75np3rxc7irehfjf34m9cuco6qzqn0pb4pwvwetrn64ig4y822nl9j5879r0yj7wsznkxfkwqftu4skuqaycmor9z4r2x9tqmyjma161m6uso3ynszsndj6yfgrlb9aybyiz4kulpvf99n'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'e2sdgdjif402ele5xszmgux6gz0zxt7dklnbqb0rkbyvqgeaq9aiz03oytb9'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '0t7agdtxnllidaxrez7b6hwbixlg599gku2dalnvi2yudvoay34tz5qe3m4r9xsdsvwkff3ncxb02q2ca790h517a4b9t419njikekwqjndgjn4o2bwnosg4o1y3eb2z6ln2d67nztnlonjlu3mwrf2kw6vbvyv1'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5269111689
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '89ofdgy6wu4kbh5aelijbe9oj11nbfavkb38tzf89julekui8t9v9m4tyi8r4prhkhy592bxrhv6motl51cllwao53kxtjf8wu5nusf0vg5z3hcvcbsx12x1ds2nna24cq0rsh2x167h9a0u2ccuf6563n67wlwoq8j4ny1tc9tjl8hgs6fgywtbnoobn3ojg17lxfz6er6dfz3m37in7ub50rciktv39ilc6zde28qt2rknw3bs0g2wng0p47vqc3vpno02yhc9tukoqpsmwabl28sxo2vf9agf8keab2jgj2adjkhvhz5lwhb9pqshgh5xc8j940liwv4bx70k2etfasrlnpmpid1rzhwxw929q8p1m7x3b6ccay0lu92emkrp7vszj9rt6kicmsi0remqf3hhf3kpmhdd7ptcjergsf34dvgcbtty5ynk4rhjglvy4qpr5rcdsk6qnnannpaknl76p77yqq7h2j34ax0jsxlttteu9re9l88hx932wsltxxgejrd749j2zdqtz1dktxaqa8awu1nt3w3mqlnefa337fi1qoe1e0a7f6ea1sonnwm1plgmb79c1sz1jllrvkik50ix4z8bl5flj7y36b7fe0dek8ttasvem9pstcasilmjti8834w7eoytxutut9aabtrbkgqqw8rpbo6duvfzvdz6936kbn419zvnd8tc3ohl2p4kezd67b0dp1tmla8dk2peu94kw9rd3takzzpwdxatsz579fq5pkthj7pd3kxfebmy4gncpajqfop2rtmkxrrg3kystkkk35h68yey9fpfejbautpyut1iwsknfvwntuelb14q4e0skd4pb4yho8dx8e30xj2jglv4p8jx8d7kehax1lnaf776l8spkl3pt59rntvqianbep2hyqd0xmbuoh3xqknbyf7xad64lkw6pq8ok8vwsonhzv7ot907f3bfy6rst63ijteuacl8wcehci7ikqaeopp9fv84bm3i3lso8yg2nvzz'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '7cq96t7bf7geqpmocd9p3lrp98c7xf527eqvx28zbs3i1tiwrh623ok8cajcpcrmplauzo6akvkyy303ziupeacrxvlgfuk23eayvwtj3ey9imcjqi16bpc4sopkvqp6vqyweooi8s4vgl5y497zdq506uzmhjc2ufkx67ez9nae8x6pr1lewd2pu0odfthns5cms6kl0zn94kdltrnq0vw6e7b72adafamd5rnwugnii84qojp7ubetkqqnk07m6gfjr0qpww97vc8hub1x9ho5jqc6rwbkyx8sjg8a79uy4pde81ygid4h0d2sr9zvwgv3sbfly0t2astnpz73g56aub9n8pml69uqu1s739bvgdhehn1nk5x4xnyfrw0smsz5b99gsuo5bpbk1dclzso7g6y8xb5s5qfnzcvzf43dmnf0m6w7hdps77jkr96amxyoac2aay0sngr8vfhtt3t1eyveitzv5lkrig39lbqnqrgle5aok1x0zsh1x81cm5ygjuk1vcgj4m8zbezol9bt328r0xbq5b021lm9x0ye3x48fv6xxuujsc3qufaiw5oi475g1wztfunh0m655p3ugpqt5uyprofjuw5746bfubpgz6tcpxrp5n3rat8525rljoj63cnmwavjg8dzpk95vj715dmvajq6koyopp4urdy99hc19gvvof4uvx9jjotwy6byen8jaidmc5k5mfkv46wxwjva2vktddsi8y4xeih5ct3nst2pdvj7eec1hdjyrdxgotd3mv6moekbb3va7svgwptodrm7gy36d6hgbyu7qmj9peiek6dju7z5i2p9cgkpwzz8eav0expmqfxu1wgjgzjply3ci3dmsmo6smfkpjfr5dfyn0s1ucvhphxiu0ed207v2il37jwesqe225peglgu6ebu7jo0kbwwc9xga96ic7qi0qvjwrsmutrr8v1bk2oqc5fwsotqhz9yrk48qg35826kms6evzcblib7dsp8ip0290527nuo'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '0k32jjtft417kqluyhc45znjqsdbwq6yna8zl3o7vnrq1bm2u94ulnnyj3wl'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9535974047
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '1yx1jsbjj8pbes7arkb10yv8qbzp4pod130surh6kyzlh50wrrwqbovogciu5rt6pbwrts1fghzcn3ribohbid9pr9h5jh937zl597qm19t98v42snw3w4la48ayr9g8jlypzqkgwbam29ic7ynzxsmzgmlzk8v4'
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
        example     : '2h4ygnvu3az0cqujllvewgygv5xqnhfqo5c78796k3cax3d3cm6t75kdvufokj2vkc8hba1baurvuo7pt07y2ohan33tp1qexhxiil6jyymj705biuo9j8m52d4udyfv6wgfzo9keaps4uomgszjbnxdypgrwklh'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'md4nmiojwrdmckw6vlky'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'myz6ixwniasty31vxg01'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 04:41:38'
    })
    lastChangedAt: string;
    
    
}
