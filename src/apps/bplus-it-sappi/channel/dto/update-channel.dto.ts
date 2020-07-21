import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '86104897-a469-49b0-bb4e-ef815dabf689'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'c06d84b1-8c3d-4989-908a-8f1ef53f1521'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '74c4b385-c908-49c4-8490-79460d8816ca'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : 'pl4o1qhwao1v5ncx30vdmqqe87pllyyf6l0m1d6bo1grwdmcnju5e4nhz335efr0cmke3hi1seyhtdwf6i6v1ww7j4ny03b7bqj5cn9rybs0drz4fonnq5pg502jzp6tjjvuve7cdxick78ofuq86wkjetenb72i'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : 'qfatp138wrrp4mnrpz3tdsliqr1942xrf9uaya1rkzkxqfsekfm0pojhgs2eylak0dzewn5rhe6l2uakk2se0zqro24qwd4m95pbqrc4p52vz29jemh2pb70lln0hja3fpitblq1gtjiqkn38uqbchozsvnimx2y'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '7xxz3njmeym1eno1hiiw4u5tz9xb39jdeic5353233r0prtghc4m2s7ulnpivlz8b535li1tr14slq6x1ghne2mbcnljcblhtsqisxi2jcqtddv5mnz1gjfm5n2hbizzbiievmyrmox1tsiq27wvau95jcc4hnhk'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : 'mi3xwd8seynjwjagl41bj4n5k9funtu8nn45slqy0gkfc8m7uzm50w73dybbpav7ba6ktwiou6xcaoxs8hnggzbi296omlo0hz5trjdvwpoiuux1rx4mm6cx86xyfuehe7m1a5k0m2sw509fif03zg34aja6ncbc'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'q58ek7t9lja8kxv8kiwy5ih6c3r2altwuoyu38poxpnd91tsjgcd1iu39h2d3koujiv0v54l16obzmr006gr7f8vzikloceqx7kkb59zt3l3l07nwp6seli5z7pbl30az7kn50bakv6l659l8ddtu1xwblbe1266'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'jcc6gs6p53p3c650p7zyhrnsx5dzxwuryppu2njwwqhvranc267jhzqp11vv3ig2e8j52x01pnsn3u5c99077ruf17tomx2zwq9smpz7yxnbe1n476zz1nqzhbvtzybr9kiv14lkrip01c7xhef5007rsegcj2j0'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : '7xoj8dofykk03hayi9cugvhp4ggj51t1o8rt91bqgb2pmo5ltob9xst4r546vdsmq9gh157ma5210xvrwe1ph3jzyhn1ea6r9xbgdlpom4lfokdw0wgzjgrawo8d2f0o4jfyts2krjpawrtfu6hu12ggqauray6s'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterType [input here api field description]',
            example     : '8qsumi0wzlppvlkvii4hko4o8yzzukhq2i238d6i0msvzfmd3itoa5clz5zv'
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
            example     : 'oj2m0hk39jml48v75rcfbfytrwhq4uicwrvdqmfq7upi4y04opvuoh57x1um'
        })
        transportProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'messageProtocol [input here api field description]',
            example     : 'e8fml9nwoxqkpvu8w3p46ydh9lmi4hclhjyksrf62yyyz0dbrwku64ddynos'
        })
        messageProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterEngineName [input here api field description]',
            example     : 'puwh8whlezdmx8njzow9mclfc68p1bqwhzg7odl1ee8tl81syy7s62yvvqt2enk6f3jwunsg85rzk8zo6h8xxvo8wmpqhljkyy0dwjps50hinz9iryodlpedf2ugefc93odgpp1blhda9l7mi65uo1acdl3w9k95'
        })
        adapterEngineName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'url [input here api field description]',
            example     : 'xk0bkhxl7k1lwjcpghle6gzc63puvw0x1pa9cy76a7t0818t391ri4jxpopunykrihmhu6q286h456gt00bnv5ec6ljdip43fsxmndjm4nr92aprkzxuak8edoj1vhhevh7bxv4ts1od33ay00xq45bo691sbkt1wp5qnnr505l4q7bko7brqwbrxf5jdmeht9hw9r6ehok4glu5da60bt7mrp6zcxpgcqsjfasbxhza9u33v0gqe6tt2iy33b4up5k2hr2szeyjr151wsw7q5j5whxb0sep0y22554chb9twv5i1uuola5qz9qlzy3m'
        })
        url: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'username [input here api field description]',
            example     : '6u3albkd33gx1tmb9oq9ry178r3434rxy341nvnw1i4xm5xks234t93n383u'
        })
        username: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'remoteHost [input here api field description]',
            example     : 'rzhdg03mgp289anktkdzlpj6gscofad8eaw0r4yk06wi1p0bh2794faw789qh1nu3rbamwa90fs5hyk2jbg39fu7irzy4bpvyf9nff9ccg435gz62t5yw7mya6vr6hnz52fly33ajouc0264pg9tw5vofmqknjxg'
        })
        remoteHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'remotePort [input here api field description]',
            example     : 1199955885
        })
        remotePort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'directory [input here api field description]',
            example     : '9ls56cws5o5in2u0ezzsv68rjgmgbqrkjfc4xmvmsdz9dre6rmadfmalj78wmlo781wgtktylpxy6vd939lllidirluhjxrnrso4suwvxo70uvtg4znqeht8ehu7b57165j9egpyl31o63qkjo4qeanzpa1s426kxtmmo75sih9zansqa4wvfxz7p18ktoqro9iagugtx83jso74glsxdefv4gw2a40l6kkfgcx37xbnswzees6paagrf0rzcxb2b677769ppi481bsfxdg0bkxoqz2tahuxj45ycvb7ir9t5egl6xg660q7awjdfl1qhdstjk76jkq3i5jpvjkpqbg8lth1ln0i3ygm1jiaedq60sn1pfdq9cnjl4fungnqt9w2dlmo9d716g02nymf7c83krzb8dnk7exz7n3cy2ptiuwqdjjx06ppky4qfz7o5vz5iv3qknfip0tic129wzq00bxjup1uo0878bq0wgxoq18mbcnuhkf5ay6lhwodht68201sar5fmbzv1fgz0kylobjxtpz0tacsm0w05yudqi4ofiwbl85hpqw4ggo8wfgwzb0n6016cphetzzpxee20u0n7ociv54wynv367l1tjvkmqw4klbvcfvnm0egax9rq7wvmj6e77ws517m2oa8oj00vxj0vdfget1gprzgn1k5o3ikmsi6aqmf699yp2gixtt230rw5us8sjab2lnfbo114u4wvqo4vqftuax4wctxpykapzmqglhus6v8qmbrdukbt8is2n947e3pgj4c70lotpuq5j0am9nyz5fvalbcqr73ix3kzgg2ia3auvp0di3aolqyq8pdn4uc7yl8k9vm9m9qwztbghyd19jhhydgnwmmlnxehgzefz5y63v5c8escadgg2vbhbt0ls7qz8x9qiwu5fepesf1zdzt81hxwzs7xisyywl93osiflnw5eidtc2jfamcvt6efch7d6lxx8zrv74z8o60b3bjrvkcukcdnep2rwwkknk0'
        })
        directory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'fileSchema [input here api field description]',
            example     : '7970ub40bk112v69i4gu3wnwe4ycx1rqr24szt5ztlf34bd1f7x4ssju2aginro1px2pv9903f82a2wgy0h3nlewdkw4wc9el9st929w3rlxtxqsmu82nstct2xzey0ixtv2r2thw2rmwlck5adsxjp0g79a93ph3skfm9kjbwvh8rfsbedpeqi42bcx5av8y44vfp1r8t864pro33sj7iebxsfgcesf6l453gdcjfmlmteolotc83sjctk91abio41i2x1a0ifq98huo0zg4ij7321a0vz7cyj6uomov9cbog73so96z2g8cnguycm3f4wes9bbql6b3oqqezbriptc93rypc6l55hnl5izlznsqlc3cvcqc2fcvphldrqdzzl9jbh841reyfm5yzlxi9l93cfj68wk3aar9xkn5gmchul1lxdobp6z35gmzsim3mehk51nzd1s8zmjc2n10jj388gtihw5m450oxug0l22r0rrisibnob255sx75wf9fv9rxrkwbuutak96oq5s0p4pvbbmrj36t1x0tdcz8ax1o34ubxllvteihl8mymtmpvpl904fbq1hi1q16arnm6perl17ghpzw38m5te1k67sx868jl2jm61c7kvsrp6xzawzcmz1w6w295w8bmug2winqkhe30pvrlvhrstv3debl0hm71thm7iijz677l17agx2isrxi22jkz0t2000ebz1ml9zsy19l9mnvgqwnjgx2ld8y64ag2u0na3670hv3hi7nczxz0aypglunhwmpx5ujwcnnqulb3wox81c24qq8koo69iwjzb6b93t56zgjhts8e4gnlln3xd4bzefpdf5r57m7a9eqkkfrcdwouur5fml1aqr7cdsk4t3irih6m9i0udve5vctt90s0t7873acuyr3vyx71bftzw1szfr9jp5mtpa72wrjx05tujcy6n2zmbtfsh9d0fnfqwqo0k8dve2ucrccxah482c0odiibps8eufyslhde90k8i'
        })
        fileSchema: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'proxyHost [input here api field description]',
            example     : '39l663hmv2fj1yzodxues9bw9jhbof72ab6mw4rp62e0t6dbjurvoej6jaim'
        })
        proxyHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'proxyPort [input here api field description]',
            example     : 5249004396
        })
        proxyPort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'destination [input here api field description]',
            example     : 'mepkilsrmsh18ggjiehlsir81uv1qc7lo3dy76t2m18xzt7ma53s1dzgkfx7bqomzla4vo75yfgznxcqtjejbcx9fzleq2bspwvkesr4ky5ycv97t5iyydzeyalg40431w296zkmo10vtky32jpvdittwbnj41oc'
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
            example     : 'zqchzwk9gr8hmmlyvpcygfba7w1uimvznd0q8h5bc1axux8w8b2ufckzqdjr6fpq4eamwgsw29gnmwlldugvcuqspohamxjhw26x580emy3pdn7hwg6p56caih7o2dgf7jsna99m1gvo1uap9z4r9jj2nn0q0fun'
        })
        softwareComponentName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccountName [input here api field description]',
            example     : 'msc4hxcy7l1y0uao5f5j'
        })
        responsibleUserAccountName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : 'iw3p6ud5y0ej8yrkv89w'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-21 18:21:23'
        })
        lastChangedAt: string;
    
    
}
