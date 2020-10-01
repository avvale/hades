import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8bfcc05d-31c3-4b71-b298-9fb07b59008d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a7d47ad0-c6b3-4e34-902d-41540843b0a6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'pkbfnq9b6trj7z4kawekpyteids7s717cnxp2jm0yjessafx6d'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7a783f3c-6d8c-4452-8ed6-f523d74c42db'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'wl3vdav1nhgt0yy95q8h'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'vjikmnphkfq6bgtxcpwrijjc7c80sazq214deg41'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'mrqiu6ppp228rm5etn4sjwb19xgk6e82dsyurg2p36ew489yc9jcfut3hhzmtmztfk4pm64s7mnlsiojpr7urvcwsdjqgdvfftslkrqr32tphalxmj8nh515d4dihg3sxkodo58euvt9eltntfd528p72bh5d4o0'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'dwa3nu6edqq0coz3trtqcrtg07qmz4wlagwhibmy10vjympcn1r6z5pvlze29jnys1terhr4t7x5n0ogs48lm8e78jmad6v5rs1gberd45e7xievjxvzt81zppzqyk2kldc6o4fb47rr90xueod703egb28lqvvh'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'f0vwokm7xm76we97lg1ue1zmes1zeaqgib3janhii597b2tgkb8n0t4587ce2un9dhxmqur1lilfnpzgtpzqj5koz871ipccll03hkcg7qrn8kp720otrjz2wy98k027mwf3io3dnquutscq64f80acrbkt64wlp'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '0wih0diaqt9hi7tgfv4oqqqacuy7bogftx2iapi3'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'xk0fhl9filavvmd3ojxrooslrio1ahybjet1qjsmgwkgr204hmfr3rrnrh05b7kygo2ttuxmzqf8gxpaac0v9cdofq9nyf4lkm8u8rvmfkkgsiceopy9pingao9zyhd8rfcsm1mjzzdkiqyiora21gx26j8tdxmk'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'wokw3zamwj8bpuem3yra978673nzsj91fjggkyl1b91idfa1xskbbbyrl01j7oyw4hefxpmgf680qurgjwzvxf18my8i5dn1irxy5kuq7tbfmds315ht1z9x9aaq6z8twzyribvlvr4nh59p08ibx97w5xgzhfy0'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'atrhapp21uo5akjn75ej1wgvuuwi08bpb1obtbk2kpadihpzr2suf3mzd6wg15tyc7s4kqa75gbe7m10ut78xjhjrmljhopzvjt57zs2rzrhhsv3eqmsz1dbfq7swexo9vu6ol5jnurhygdob4rundpo88sfw9s7'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'vz1jf1dcm6lxac9sn9lk8eqbreniokkx41bnx725gcaencf1rx54viunld4si47zjmfneugpj5fdrn3cot2wow1n96uyclbj4weppfqcch4ps15wwpkq86q9j8g5unjhvx0us8f1bwor6m616vq3dyrh2yyxugmi'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'xzo9jbpx6x2pzdwoltftlqk3xvuq3ftzdyxserptchcr9bz7qktopy3jmkcf2wfidu4kw5f77qw3yh6uu4bk2emqzg8zs3brfgruapbdsuz5gtyyntt2n3fmhwyc4rqiciys3vda0dh33b4rwp29dcwybfpdr5ae'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'g5bt3k4jino8992wjxcaw5qf7vu9bbzl7eis91lpcg8951pacea31exz890xx98lvqc5l8rjphkt9aoxik5wfkov5erkbe0qkk7pqsu2zo1z5ivjrxa218513tnutli8hogn6n6tz44543c54869iwcvwty6p4x9'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'g5sdyk67hm5jerygvpny'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '56rjhco8lrfxk83nsvhxeep1vjx6m8q8qhw7tbxw2jeqgitn4j34dmp9elciwaqcp9570mik7m8lftv0dcojg17bfiezu5y675vlufxy60lj4zag5g0w0qv8kps8hkjvcm89gbst1ps2owvgnl0igdhykm65c2rsg8zuj36wrsnydkpf5jddt8kr54bq74wujtwdxl6naixvycjbp39mi713nltqawzu36u24osmhs1f45isk9fxt6kbuye7a1m'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ytoouatg73p0tb6qlmxs2pyr0kfzvb74ivag9frvedpu9f0spu07zexvh9u7vax6gxc4hfq6tx61h468ahdg84t7hu93kxmselvn4forzc44gsqranr13gi02jyotx1gro7jidbaspnsbukn8e47gun1fuh1q2obkblm5h9oi87g2ponezkzfob1beidtgx0cti22vqv9l7a68kg81luuyoangdg1b55uzuhqz0c9ksd2c9oqkb5m5itwluyu8nmviqq4t9ljh4ru540dj70djcmexhg1oic8gfh26o70r9on2qb6ypi1pt6a0hgzpx4'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'efb3vvief7vtjrkcrfrjcfw1ab95nmoszpfcthvaeoa15deozzjbtnjdob91w2w77m9fmxe8mfatthymsag6qgcgj1a13x45muinw7fzj5hbq6x78hks7j7slvvnlfu8w3snrv5pj6f15pzo3k6h52jbruuq3wpsgzmum8kjuoq88sjpjlnejh3xxo1gdbcx8lr6aebwm0h3hnk4o9ch9sx4jvm6hu3cufb5dg0z0k9nlufh22j5ifxcjazdg6d2m7a2s9fuxqtfy8u8pjxtyymxe11tx2n1l7yoe2uw6duicoez8wuj5bsytv6qha0d'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'xgwwrv6b5hs6g8betomgwjqo11nir2n9uqk1b5lju72uhdkiv5ctu107x3qz6vfftj9htzue7lj0a3ipzon7lu78i50s98hqjt5bnfjp2jrp63kfq9nzobd4e00g4ke7d0vv1d4i5g27v57b51wk7xcwtk0xdm7rt1wgndpgskr705pywsneayu1slvd9m4yecyye2r4am23smaibbiuhypm2u54p5t1m80up7qi2kjesg8vskxtjnzpfy0cz445jd9k8mhw0kyrpnhzg93o1sfxjyr78xn8dxymk8qvh9agcjwe650avubkzdzvzwy99cnfo18r2es0agqkzmw6uedxdqcgu0zfqz34gf17u1p5d1l871zyybugw0n3jpsb4m62nxojc54dt5yl14xdv2qvrn3piusx72epd1wxfcrk8io5bje29bohrngkdtopeo2le98fqa5ne2rlmma24vfqegq3nxolwxqwjkko2ovf77cyd15u1yj1vzoew3hofadte79e43o9ktab366pgjn8bmecd8cjp7779e7ukecympvb7f55usrf8c86jafb8lkvkjfr67x051uraupimk43cpuua61l7jh8ctpjxqxyahb65eip5cprlq9oov71t4plrx1m5p30fbkln1jg14bd1dq87b9vz6pucojq2lmgd07dko217udfkcczzonyh051a6bvdbpdz6p2y4aar6sca38k84uaq6vjhtpaqkiqrj3r44kfopbftg1zd75v9lsc61bmj37giv50yim5785vhqh3t0sqqaz9sxi5agf4pvwcgzi740axp7rb9val24iytmfxitxj3j0d4mxscfdfekydmkjsc3716vmlopqvu89nocjry3jezvvzez26l9e4le4f7a0e58ejbls2e645utamg6no1bhxx02b11jameecyu699bh2hv1g4ho5yo7i85gyilemnd9v5pk5u6mgpa3vltkt0uda7r842vzmkc5e17m2incg7achp11drk681atj341ay3gu6hmitwfosu8ujjy06j6mwtzcl59y5pl7quygs0m5nkpzb4ldowsdb1vkswvu8teak09537vh00lfuucrm95kobb7jozyisu6udzl28phirp5x42mcmsjnlm9vs5qzpez5y202a6z7us591c5ira1nrhz5oz0fp2imayjsxin01jwpw8sz9pwj0mn15q4rf5ipfhon4rw5y91rlfhjpzrinnj1ihfji6mwf77iq0d4xyg9kzu1jbirmdqoqbe6l1rt41arorgn43ybahepg4abb8o1y9fgswbxggktzwfoh6ti2bk33t1gfqq64wgyzm9444e3cnsbu0dvd406lrwv1vnc6cqm2u4h2fpq7w5o4gf6tz029h1o572n5hpuhusnroqall8qy0siqnw7mcgl8kaikwemp42n5i7utw9twpk2h1wvtdir5947ogt0utnt4iu9m9fe2s125y6oo1xr9u163rpdhcov9i0gptov80ko0tzmn8xbh48d50t1wtclvgbdvaa0gcihte7vk42rmj7j5vd6du3foljirmffi83dowcv7b2q7bff9czabpinraay7zqiiacuj5air29akuori7s0gmk4zybdee40p2ihrp7likjj8dtpnvwaeug4ryif79gq14wgnt3lu777qgyw48jgjutrwbypistlvfbq92jot1tfyu3m39ahj4jw3x9pb9leqkhh88armlz1ur4lkn76m3tql43h3c6iieu6vivr72z4hrvvl2nv9736cfveolxigpd1uialtsemtxthu430vqjh4gdfdr2i8jq64cx48fuhd4odt81xpus5inm06hqwdf0w4vzriltiin41g58odcmwdz22fmhif84drou2rip13l9qghm9sxbzqxvvrrmxlr8evk5lsfyd01z33y8cofd2agllgmya5rmh43h91kjd35bnb4vaguqpmvfwjur6fsf38jvmon3qatrzoddbi27dsin2se2wl4ucugi'
    })
    parameterValue: string;
    
    
}
