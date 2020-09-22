import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b07ad268-215b-434a-9873-dbec1c5bf907'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vejtrqb9wjl4ghf4egyhkf5u0dhgnjnc7vsvm6i3eeeixgqgh46qvuqu7q586tjazvb1hlfsozu5mdtian3314b7q53hj5qhc8eev379dbz0xto17j546rr9efywyjdhgc1gzk5nehtu54hmfvb490msaa81zmverxnghb5zy7ui0hw4efoqm8ijhj8h2qajonpkesr08iv87hjlsg4f7ypxrtmj62h9i317ntqbvvekkpalvqp9pzd15d94ykp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'ppxo6qgs3fv4f82vlj7e18yeqeto4tpai4jfj3ide3oujel4wodsv33pwmq9rurxbuz1a72fa8jnmqptsul3ibn3kg'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '7l0d20wxceg9xzyxk362zasf0zaf6sws2kp4ax5c0t56l08pt706v6uhine18nmd33n845imyghb1hl1ma68za05xl39bm15u2jtfhn5jc5zu51y2nvl9ju4gunrhlpwq3z7mnwng9op9u9ffqtwqez6dphcg35ezwvovs6sa6vvpwqn4k0elrhqs05tbxmrfd5q6dvo8rceskqco6ln35b3u3ioz0ai2pfz3sx3h4bl27ylmno9uelkhlvptpr7p1uryi4wozbyhnensuxyidqcvxfo5mha0day0612ssspv2z9k42ein7cbo3tgi0c462egv34ch8nwwv47dp14kv1qs07djytjdumkec7w8wpr0vioz59rquqao6fyzhyg525rdh1h40eze9eat5ob5fnqd0meml63k889o3dfnqevve07wqr5pmerypt4lts3ans4n4t387q8d34bbldxrpsg4fjym4sobw1x26cxpoen7zozzswc7n5hzouvsm6dtbllp9m89zdg4og3yjds48wg0xmsfh67br5vl31z47ic00ex8gwjwyzl5gyz6df1mbavj86ynbmd20asysbtly506mjqqol6xmgruqhzbzk1e20efcmphn7j1kr5ncy8fugv6wsy1xvg2ovmbjls0i47yppfnock3nusjmoyjndq2xhtp76s6x6sp7vtn088hb41ye0m0eahu7r5sokqugqyaugqne96au59m702aq8clwgoc7qij03q2bobxxywft4eh459f0dan0b9oh61zxu884jani8v5aa5chizm0mclrt8hypc3j9h7t3dprvoj7shfoux68b78txwvr5uc4hsveaziuge4qluenlcfsaaku3pu41grsqky4d4fx7babpvals75h3y9obg0uo3mqb7s2lraxs4kiolknabwdqpjlelorchqfpjq7ubr118emhry8g2yq6jpft4ubkb0c562xdevdibm13q6400rnsidzw1ltrjtwm7fmwc9bhtokhv8g2ja6ufctl7buzb6g4851r6xi52p85uskhf7w3oiwtr8f5qx6rjnyri4v8acwe72i0aftaiqzypirv7gp1c6zmwo77fi6d8wgazbve1qawvs300pf9il5tqa6ccvqtr0n592jlfoexgc2psilnv1nmlai6d1jvii1nner78uf6jr6mtffa8rjxxw0pwf52wmmh37rf5m4kf0p7lhnmgvlz5mj35cd9delhnw0uqpdhey66ao8rjp515gxocow9eoec9y1nqusj6n0i0evivfyhga41hetp0twfrjfipqyt2c17rbmju06zbj9dc6vw5cjf8fz4racqaklvvw7p2npqa7zedpkdxg4bs2hgexdw2ryeow9cz6cakqt8ymc610kh175wnmv2bhhq5limd1v533u4fl85qu3yrhujhdmr8p21c9pmj9zu1liqhblhv1a15jzuhpnoxd97kfbrsnte2qr97i1o0pim509caahjx696v7u0ocqw6yic9rtgnbqyk2ddziml9wrj01d1cr4frve1z55gyq0z5vu6100oier4szpih74f8fgb2cervsjcob1b9sa690g94aj7debowy579xpbf8v2oie4vlsls5khqvm8bdmlsa1vz0nozwevbzciwas8b0ij6n2b9a6qblw0jz9ak800uc3j84ms9n4446uim5zncvqnqjxgmbegmm3tym0lmbng7be3tbry13a1tn8njapbk3m4wr13mdrbttgahyshu0c7txfv92wfyitg7qimn8jpego7brg0n1r6jzr1f4kg6bt5jcqkp8dari56hln3n6irruyav50aipqdc0ie51rdbcn8tom5uz4nhiob5jvlesb531arfcp2g8if1pvipuufjdh448uvw1elhwu10wq6vreo00mt6d1in11tpxhyx6zb495xrcuwk1xvcdbpss1uu1crcx75o5icjft8ix9mh9s3puqbjpz8hh668wkiymlt2dprkwrv2lma3fucesr1'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'xkc7whk660llyfl0ofgbeurauhr0gnxvpekg5ktlq2tlr0n64lhyz2xt31q4gnyc6kjdspg1xai7y0palidwnoiagluu5x9enpp2eg3n9v6snfqq9lj60exgf03kz4jdgmakkx8bq1oo9p3rr87ka5hshmkgxzhr6h4r8kuxq5xestil5yyazl0k53z6chw4hxif4hkrwd68hpvbslpt59sapjdrw26s1wri21o5j6ik1d851pzrkovsfextzoo6icubbe33u6wwupk5vf08n3ckx5re2gq5t1e2mwb2blh9tc2mod75gb16xmsz9r2j2j1lqa6xnae72vmnkqhfsuw2gxfbf8lcrp012lmzyqdje0uxui2zzfosa3jfez6iax9c9xtdv8sejmyowbgmlk76myuw1qcaiw9c5776c7vphixcn4th2hdcfcrahrf13m7v9d1fuzcby98znuaeuo7xwu6nxmjwqx9c3v3hdqf4n7lr2akgx1hgzjej4tuwoyso35ppq0rdrtqbdfj0gltul6elvgf4eprv0nbolj2krmrqnt6tm9nwxi1x573fj3540c3byn3oz4vlxn82ahnpyh18gni5rel434kqkxp7s6cb2qj99f3170cly7w9x12cplhrctfguyp3y78vwszzqkdbkpvncp4imbuyjth4i8atlp3vb3n2hk3je74ryo2wuq4hbp2l9eutg0lqax95e6tpgs3plmk7gvudh83dy4tattzv5cemg90jrl7qn5pyzlnc4v3und3mpdhoazww5v7nw9jm8kcym2tczs13xegw43gd8j5tyyxnxkepqjucnpy207hke6lk6yr3dpdja1nmuiqla1rn862hzt13zj4pi738z6gfumyob01ej6cskviqdm5snq9ayji1uypu0he5rd8k9wvnm1w2eown96cvzm00ivugk616upbt4oorfbeeo5bt7brlvn7sxk07z6kvmvtbp7qkixa8yi9wvaa9rlh2f5ryxr290xim7mohyn2clock38h9xmskrs4soc3mnkhy2tr5k8olobfv2r1qq9awr9qwotyx33u5lrbrv45j6itv8a5fd9lyl36lrrvmiatm4do5i9fej31lzjt8vnsgc70fie9xj6ksy2lr52maaa2t953cfedw7z1cx26ryij4te5b2g0hy1ywdgre6zpjxr526xbouj3rjssr0ocx3v8rvcbtjy85hx3fmal6blx8mzwdkugv9k62clumc4ehshmmwv47vuv9t0gsz9af5qw6yi6txbc0bwkmcb1lgrc5mwfle0nz59m5ev1dj6c6i31ue1ak4q0vf0rgbish68eo5ihedrjujz19hn2soadf1vnugxkju7xe1le9d46ixzoi18thdqmrmml7yycmmu8htlrvzegzdqs3xwyv3dkg2izh8a84xzgrzpni003al8r9u2dzwz5b4ozyf0tn53cb2bcz08lsl8u6po1ybaacm9g07exud0cw8h3e1nkmrummx407bxf1yxu8poaa9ksi2493lzv7pydcu4fqfqff4kyhqn90qo8wsyqcip1prpi6sppr4rrh1ya75pmtkhynab5nv3e7iagpukq00hdb2nh5op8ngevyo2jlfsysqlvmrkza0d02qlkukoedcnwj7cspxf4o7rmomi2s4ckmyqy3yn9ne900v1bz5ozxgdo7xfg5ffoa7fa8x1ctk03akzjvsy3tp984vpqkautv31vjuvnfe2xr5aq5nz6wa9888mhmum2kftc9rnjwk1xbjtm391yiux1h696egjce2yjwzeicw3agaml8v1aa28ffr5t4tq1fyd9ytlaoxnn5o2xlsfbe94io1dewwieegqwy3zcfq11uixix8gvn0ak36cltuvtbx4o3qyxqx75w4dmg7c0ajm6nt8u53o181f4wz10ruipp0udfdfgry1dyd4zhtf8x0pn82nc1azckmxlbntw6295x5ci2hbn5p3stmj5c1o2ldx0alg0wgz5xrq1tn3rk'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'applicationCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    applicationCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 3587143203
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 6691527208
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
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applicationIds: string[];
    
    
}
