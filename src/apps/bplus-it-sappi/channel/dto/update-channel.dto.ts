import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '2028247a-900e-49c3-a24e-9796ebc79504'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '0c46e65e-ca64-4dd3-8089-74d299456790'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : 'abl5ywjct9v6577nd7sz5nz9v55n0jfvijhdyg8yaxa7gcj3uwfrd79u1qamw0e29s9r82xf38hhqa8mtcs3yztk9p1f5wxnz3fvb2yccgniw4ndyycpbotjqhykyugdn2jmnr8nqxdpt0lbqjhmhu1xqzyc3a3t'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : 'jjt7o6o7horwbvutu1nms6iydzcmdnjq90hrw9e5i6xkee4g3v9rz4h4peys36zi4viuu3qleq7hv16wr228tgal4cwvro0iuaozk312x361piwwuafagu8plzicb0q1dizo73ab0wml8wmc0d5grtvg7xd8827l'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'wt2h9eslhlbtt2oz67myq8nodhmiaqhe6wrhzzavuzoadntcw49c13dtsqcfg6hka7apgeoyf3tzgszocrjlo2w7sr4mw33dxznual4ejzh2v1yos4ar0taa6ouubd5gu9agji99w8u5exsgzuncdisje9wfryhr'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : '2p27z3kiyr7eqi2gmzatfslmg96bnvo076mpj6hffuz2oflxgi3q6lbgpgoylmrz74z3oif6l6b51vtng5jjymoxczex7d309irhjh8bttxxk6fwpspfa5mz1fb9l16nzc4w2o0ph7f1b4nzinbtqconb640xgaw'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'hwvaep0hmxmj0mu4dlzx66u121wp6dqmqe4av2ibqoouflucz829sedu0v6pug4ft7l4odl4bgrecs3rknhan053h6ybuaut02gkapbo2ox4bgrylk0iso4rua11nwuqat0puzikrtbrezb4aelnkn4zetvs623e'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'b09p7znktc88n0b0x347icp8k2l6tnx2pm8znzz1viik3af09637y6o71vlucd3sx7y9gkmwxu5dfmmuyiaxzjmfm2xudjjk6d3st4c4c5cra4l7slpks12sh8kfeqj708ord6flvi8huagq1hfyr3e0e4cl4q68'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'bh3u6uyv4i7dmukoi5eiqzm0a5fna59j55w0ja8lu1tql2s6go6ccfa4rmuvu7rm9haqws0lus6nu2qz1z7h97r8wrenrlmjzcxrzl56ic03v2v8b5iteped5qp9o8tfbbmn5otcic00ikz4nnjj20tt9phwwmsg'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterType [input here api field description]',
            example     : '8xtv305yqmzfxcdrfywdqyqnh7h11adijkqi1qrnxwsrmc71o1plh7o0e9sv'
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
            example     : 'ukovvlji7ejwvgofaj4t9kyuxw0mxdq0hjsz20npbwg1d602shfgdk8lgp3d'
        })
        transportProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'messageProtocol [input here api field description]',
            example     : 's8in65rudd5dbs4szh041o5mt8b9nn1p5kohbyb6y740hieqjxmwnflhn1gw'
        })
        messageProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterEngineName [input here api field description]',
            example     : 'qsvt1j5870tu66uw3gmhkts2wuux20jfqqr4ws8kmdxgh117y0fivkdmy647cnlhmz8k8wxcuv8ajgyp5e90lbcvor13va6ua4qhd6tpg57e13f22l0f4g96zyfgmob7n8yzaa8y0peg877gzfcu0vzd61ikrvly'
        })
        adapterEngineName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'url [input here api field description]',
            example     : 'krf7wd008yuapbnspmv0jl7ra30vfi7o1mplv8cvnvijx7uy7vznxvhi7hfh98y6csjw55ip9wrxsq9tmot68f58vzq7g78ar7196re7cx0u93749zrcqu9052qg0phtbsi74c55oedrslspebe22dhj6aegwqarhnzkbiei75urzp9eqycycfobwivtmtpodpqd2nt4f10m4997et9tk5305at66e9gpi0p4r4c0eaxfxpvtv148d0f5a42gc2zenja9s2uci3kpywtf4do2zre4xkt3p34wky15hj7wc8h5uhg2qzeit1e6wydlt4p'
        })
        url: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'username [input here api field description]',
            example     : 'jcgj9ihhre8hkqmv85vppkpt3v6qmsyps3quxeb7brvjotxhuz7jwp1e3fg9'
        })
        username: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'remoteHost [input here api field description]',
            example     : 'rt1dbhov7yra6jdacowm280r2q50hgkrdrkoescvld2b22s4peglte6uq09ktvxwz1etc772oq1gt7zbe8yv3r79yzb7bs6ervoq00s7zivf6t2dml0wfcl1ua4idly35vw2nvk8d01d234vnge81pz7q7e2wlkr'
        })
        remoteHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'remotePort [input here api field description]',
            example     : 2674086768
        })
        remotePort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'directory [input here api field description]',
            example     : 'igivo4w207yary7y57ncv4chhenhq02v0iu47fgqdqwf9xjxib0fprk35xjo5dwpp71ghqbwh09sud1ph7c01up9sfymlc8ljg6zefcq6d2m6ihvwruwlc4shxxqxrowbpfby2ayn4air15vond6h78buvaqqylpv9x0l943ic143kzrcy6pfy4z56lsxitzjazsh6d69vuq7lo4rgjdh1eo8owlgud4a18xweqdx7jqk200mvuc98vgq95h17ozqy5k9uwg40hp3or3suiwavoom8spyyy32wm63lhl0e8z8almtg3q9oi4n803fpqyc63nhv0yxnzf728mz4s5ozueyq08xnmefyvpatyfjkijcd0sgs4saku9dbfkmft2ybaifmdrgpf3r74rzr95a8nxfqnsjeprbqm3t2y9jaw1otmfzrop0b6mvh1o2s5k2injv4xgba2ugqjdsxbdacj0zpjwhoqimriv24moowdyp605jepzf2j8nwjrmlv61crmj040amsqdzrhd9et5stz6cjrv3nmrchfdr9s0pkkf6gmhzwlwgra5jlm3d2v6mc4w0k3cxh9sqzsxwgoq2a85q8zj1e41wvtckmnu290auz18m4rnci0oa9zhlyz6hrklu0q5gs2a42qnplgc388nzw1atwlkvz4dujc4h990kye0ymi3inewonwv7jlb9u5ts5tru1655fg12v0z1vr9zavqz9arlfar7rydzqz66amd6m7sdf6k7cm07cq35rd6am6319pj0i3n7k4di16wz71w3geg1pmxhv8rbv2xxnoqxfwu5az45k87nwjros2pzes88nwwssv9wmuoojcytu926ohws06l41n5n0p6f95c3e050l41svef48jknrdxqjg2ssklz8wtu5ewjqa4elkj420uzkhjfktoeu06hmyjpbcl2ab2wgbvuy9m4nytb6k9uxrl3p5zqbrfzb8ncsurhsupyaqgco8ssie47akema88cg0runzpcox'
        })
        directory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'fileSchema [input here api field description]',
            example     : 'fz8o4mifeh8gg44c5v5c0zfaujim2gus0nmvg73zmbw7h296jpwrpdg1tg6kw3e84rx1b3sskss9e7oj30zsvh01tsfkucy8anjgx6t2rof7adq06z1eyy68epm1ipdfana8h1zdx0dr6sr62ibaz4m9pwz61cuj9rys4vijyuqbpk3bzjcdh610dz1ydgubl6vw5wy88fe0qshm1apmig2tdui7l8zvf52opmwj2awu99ntr9rj5qt5fum6vju6p82dsspq5pwl32cg7wuggy78nphj7fljgow7918ei6zvmtx3d25j721wt50fzj6nzcm4q4o6nhzzrmdexsbt7m6ho9b0pqxyorj97voerjhmcx2dlptay71mkio2kku0fli8in8h9jpkeqqy8a65vl1du9ex04aqha84kgw82ty5fqb8efdnq3rj71j0sj1o5fohm24xa9r6ghtjzlt8hrqazbh5p3qctiexl5te2gvfpmn8nm5kfz2r89rstn3v6uv3yulxpymi6lze1mgmzft61mzoj9z3w2lfjjedljfxua2i2pt604frkpyuskknjw774hrfztgrh1k4swtcdir8h8lljdq3uf404g7ecv2ahyzl8m6iok00gvjmosqvhoc2u7zu7rv3891vft7bdsjtdgkbewo7p8auag4i97r11kwjvgujowept4wivzn13v3l3w5ofovvukpkk2r6h8ylt4vro6a880j819yy0ng1zhjfyn79mcs3kyqvst6b3z8hnzjy1nie11959ldo3fs7btbfsd5fm2pp1f031gq749xsyn7wlv6wptlkp222znw9se52ouy6e5tu2od766rg9x214rzj2vmf9fg4iqjl23w1khgh41rbllr1j22naykxl3tnew047o5ahaci18x5h9rzc9qytyo5hy5hvz2uqttzejopmp8bc96ne3qlbieyiai8wiz3vcf1cutj4jfdssl1vbselvnh4kc09otpvtdnqyf2keofg6ghqplh'
        })
        fileSchema: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'proxyHost [input here api field description]',
            example     : '0k1kor602f3bb3bdl78yaxfqjxydylv07ff0bdp0vhs3tbx53rwkjo6uge0v'
        })
        proxyHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'proxyPort [input here api field description]',
            example     : 3378182555
        })
        proxyPort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'destination [input here api field description]',
            example     : 's0qbwzr13x417k0cv4nexhf4vl69ftf4yqd9jbe4psiv719bun7h7cguykqcs5rdc1m4se5f0nzmrcfdao8t490eyz45zxbbcvi74dwf1k101tjspfi2l6yk8d6i28n3mr9wcr0ze9qidfkelyqowv9alpsxwjuv'
        })
        destination: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterStatus [input here api field description]',
            example     : 'ACTIVE',
            enum        : ['ACTIVE','INACTIVE']
        })
        adapterStatus: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'softwareComponentName [input here api field description]',
            example     : '89oh3u0xfq3ety55j0o50byvzyrng0r8twjrf62t17fg1mr62gbz43ewz9mjyfmb6xikae1lweiz46fujqnxb9ieax7o93ze8ydjvzxg955qxr7tw07ge7nx9cscdqb1vp8ok96xfqgun92h2iwg4mak1ibn7cyf'
        })
        softwareComponentName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccountName [input here api field description]',
            example     : 'lu59vctbuikw5nuz0scx'
        })
        responsibleUserAccountName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : 'fmgjca6ul99o3we5tsgg'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-21 06:12:41'
        })
        lastChangedAt: string;
    
    
}
