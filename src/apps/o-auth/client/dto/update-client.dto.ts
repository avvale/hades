import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'AUTHORIZATION_CODE',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 't4nrfmfpui9e462ovj9478lpuql3p8jyqntg91l8tvx32ciswqo7eolx33nuvl6qp27krmzv8nkybvrb0du4cst0a6p1y5rsh2oi5z9a0q55asy2hhactlsi8b2b6u0w5sh7n0ayrkacfyn89zgqkbu4jzd2t3bhee24r8fj9rev8qxn8dtn2itwhzynvo57d7zty81ud66xtwohf7rlfb1gbl93djwhep34p5xnise43ygsm1gk7zd0hnhp2vk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'ghsi86q3mk5091hmecewjhh984kyu3dwutgenadwak47z7o0oeeghuwocpomqlq4zceh2za5n0mq2ar72d23hkpzbz'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '70gwolwhtjf3cjl88xv0hw0ds417i5ze7ijzgekec3hp5sww5yqqulv3g09nn5uh6yvzeluvscu19u3xcjzr7n1qv90k6xqjjcngs3tqtc4ti5khrm98sy257zhrdvsdyjcf1qsqz0xq1gxxslbdxbdsqumcv5f7tcez8klb6kvmrx7r8l270do2mzbmjxq48bt1nu1dgqut02g0lvgvi22yrizgsly2sztftp0pw0u221pb5rw6klj8mzkj7txrdxq4alzobuwy2dvuwpp3t4gq5ehynb83oo83kvv7jzrdc85ofbbqf0kkhx3mtpmc8bvnmbf6oxt6ryf8z4fr0cpeuh825g5rlsy4diuy3i3wsupviualgho06yieh14ih3phcn62oq90szyvy47zd2iwdm2czznqmkselrbw7kc9h4bpafqupebytqovzubohd9aof7hjmrk3su64gwx9bgv8gkikjtk4ytzsjt3cs7exi8crkrupn6c0a3ofvt8dwo3jox26tkey3l9mdnsf2czuh6ot362h74m3motf8b0hxeibx31gzyub8e1rhx2turqqktyur8fw0qmbjx3inaag1w4yihsy683xthpd24pl093ng1xtrw39neqklru99dctauneqih4qptc7y45rmpvqhcgc8fgfeotaq6qsc25xxdqofj9atlltfqa6yot6udaqgf5guh5ucbfa17avqs746c5y4vj0f9yd2ynplrde4mpo6woc4nj6copu5emb3t3jii8itv59pmnb8n31l262rfyyqjde7ojpxdss2zfji9yyr3vsjca8xzgocirqz87jjznukeomghtivl0ca64q5yhkt2eix7754pvy9xuc3dtiwm3po74jxqm2o31pginw9k3ooypo8g7zm0m0qlnmekj3dtu4ovpo0l9k39bps9k7u91m5n85ydhy7untf9br8iyhmjut7mdr88lymteueyga19hxe1tqiusbvdoh1hxgrsy2odxyiailf0t11z69z5do8yxv0547pylj5bjesdmep64uoumhqap6clqg1enz71l6xfntqbm69q11bht6sdeusvgxk9ehuovbife5lfagvj5uzudl6imwr9386f4731seiqkijdzwsqytdoxtsgmqclo7kv77nfpcyfboizfrze8d5efgu9j73c1thhx437kx1boas2dgpwz3cfuoxlv8il7cbjvm6uaubiffe84zqgs9urme2sj0gcx5otew0gb8vl8vejbqbwlx5as4xrum1l3pgqvnlhstymb600onw4v3ol0lwa4klj71vdgzhfdprdtoee6alnoaectikxhq4sk8idy60xo8rz81z5jcmohijbatfcxo90n3g7mfkidtcn1e8qg4ptwzzo4htjznw0ej9chsi4a869dh11ehxcm068ybeyids6vp18gp05nxdywfwodjo148ajl6g9rdqfm6t835zq2pee640556uerzgt17mruekd5pa90do6zugz8q233wzek10s5613hmgwszucncktc2me7mjsyvjoao0m0t8hy3srvmi8zobomodxebd3ou8yfzy3or4t639wsd4b38h7nkr2asrrmlm8xsbiyhr5pqyi6f7gxfo0sfqpvyjpkvcy3dcpme3gtzq6dp3widn5w25r19qw8e31a75dus2rka19g8lrpfvnwrc9k1fy8hlb2hgtb263ph73qo4kyna4qhgtj3tdpkazkajiswntpgk4rna3w2vpxc08p3vm32hbtine31hy3haon8uvp93da28avis06ql5if71co4aptcyopf7j9ygmdytf964sulyxgsak8nbggwkruztdafujl02qzwn38ac4jcp0p0q3vpcnxvfd2zlgrzgivqsgxofxkyj7utzrnxwzgpvbmmfgeku6jz6mr20bx3arxkf56173vkfjl8q6s9w0rn7pur1qyn8fn2dnllga4kiedyzlk81lsotlxuip64az9721ezdnjetzyikepbej4kidr2u'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'wjwnccbaukepwfq3jkf1p0b1k5mvbq98ys0f5y0naf1wyk8m0m2t1092cxf4c582w0lyy69pckw2cpap5922sl0x86w6j7ltp7jquwzmq3ajwl5tdvg4630ct4bq4ivj4haq8ggpbr0j6baargo2upqm4irpt8hdhuisx7dh58y1yl6ogurn7v3a9enlek5aqiuu5g4asifnudd4o1l737fbpxs4gsqlbcq34jer99e9yzxji2pkq2tgnrlf9hte832rab7aw3w6gggylln0zu1zlcu6621ia50ttmqa6w8t9872r36g1ikw3k3472fqzr5wyhxeoxwlvhco99gz4y6buayquyb93mgogl504nor8i369puocz9nhjvwl5z2jbur63nmrrc0azxz2ysri21zsbu3aslho1mluo7a3zo2v3dg3z5ghp2uochm5ifo72owsw0u68drezejp5ge74zukdjf65rd9eebh1jpp3cad9vyc1o97lk1k4m7uo9qi6gtu4jr1zvsk6wn8r2h3sj2xyzqe27jagxtasaxy7l83pw7wlijvzs64ccsh0ybtu5t48cy6pa7e88l4twwoxbvbzlvgx70eyow3da3v3vegp2jfq2dm3wzahr3136rrhbjppulvnorx1yhhla2er4jyt3dw2s8oj8o4h1da2w3s4c6cmbxe4hotr31eljhwd3gy2av6v1l1h7idmxge9qxrx2l0fawwuddz30vfc5vhuc35e36gr664i6bpq848nl31r0rxedkha8133e4xjuml9cukgbivrlyuvc8ajigy8t2b55h3kmhsaj38u3156e6302k8hyojxr739lsga2lio20y8l0td4syurtb3a9yquooiwybsvjycsu8by7n67w636ikz2z9qi6v3dgd76c3c6w86czens9kuz5qwririaihnjzvq1133z5brcnxosqefghc96afc6owdt4htru40ekiwxepyuorvo45enjoh9ezg9azhe6yy6isoqcxxxbvz5fn65nblr58qdgfjg18u083glbnc3vbhxlr4bso0l6jqk1bwwb9dv1502cr22uhweahsvnd3iu6apehsfpikbj45w7dgyyglu9bebhktunn8vpbtq3u2tttsi0l7ksnprako4uyad616e29bksat4fbsfogp220hq8tp7mu46rp0ll97s4hn00yttyjsawflqjwi8w94zex8bculqw7p88ahqv0rg59mvfw243hiqiyyj2m65k6x97lbflbrtzbmyoec8f5bmqy9k8ga6vt9zp9dyvwxznbfv40d8qsvq4puw6p2f8vxyy41x474ib5b522ik56grg26p1ur7p5s6d6onrs7fi6783um6yjr7g5943zdql6zh0eqmq8g12vekont02p3cmwv5gr95pd4fp26al6lggcgr7heqfnovtywv08xclqzlgidm13wyauqlf8cs0381torfymtzgh4bii1xsbvkfnoea0gr24lk2hqjig6p8l5rsyhstgyc18wquk2nm08dt1f573ulawwxj1zh2q9aovgwl08rvrqcajkv2u749b2o29r9awtaxmkccswqea968nrvqh36jsmq0e78wf5i6k0gom59ev2nav7u6wu1pq08rgw277fapq28gthonopy6zrwmx28bz81p8181cthils80g5qokeeh0ygyf557esw95zooeab2b8vz56t5qob05dfkwlw27cuvqyh4nn337nz4851caqbn2uje5o1577ncpdle6fy6ces50a21icf8gjjooxdlgpoddajz1wi495uukxbcieum3ob1sgmnrl109q12k7yldxqybpalkklk13asu4febdtkvggbtkachpm14reryb54vhzj8h0x4sl5hcvsjatkvkzier1kqqq7sc3rou220kbv7hjj42p66y07zvlfqg9l0o5l8g7gannbmkksa3b4ovw16whyn44941dg6d7d4tlnmkhcdusoco7xj3b16gibsio9oq5ytqf2hh5g'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'resourceCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    resourceCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 6061141669
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 8805367804
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
