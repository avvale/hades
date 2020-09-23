import { ApiProperty } from '@nestjs/swagger';
import { ApplicationDto } from './../../../o-auth/application/dto/application.dto';    

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '393943d2-20fe-48ea-a94d-4b942e14b2c0'
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
        example     : 'kphvc7rsmhbjmh22dmru19brpdjr99tftuwjnw9vzcinfnbnb49xwl6iwepmx7g963ibv4l8u1ov4z9nqojj5ojsr3r4mhjzc8c8skfvwjqunh5ps64i2uu1q2ctndq0t06xaegla1jgzq8bfrdk767onqwhs57w19a2acoefwd738d2bidp3kr9i2vxi1kfl6g5k81j29knakokld4ie3z6416za63rqggljaiix7lz6q2doc123i35yenpn6z'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'byhely8e3gj0xi5yllhc1if7ff11z3px8u1evg6a3zxhc0lruzs32hmn9qncb15xr6qz6mc3ah4mcv7onlm9s5m7bj'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '1b2quy5711ridw3mvvzghkr4bt4tjgo5jf20dpvl6njq1m51npp23l8qirv0o1q01iplp4hvtxmv8fo5dg7ruhs2ladavs1l36zov8xt9fqkugyvqvzbcdg5k0b0o422kpw8tsg5dj22jf4p5irkcnmycb0108yeiplu74g8t5ad9bij1nqkuqqdpwtet58he3g42shaufvvgles7vvybz2w4qn4fc1qmtxatqatol02mpny7ta3dox6tuxcst1842jm6ut4b1uhc3cak5yskt3ckr181nf3923s4kfzsz8v63ol248x32hdcf2sw8jza297a39408r8dzonm7x37jbwx9qozrs6f3oc9ihueojpwo4a26hvkr0zwvxrmq019wvsspwpdlhzvr3pr3ulxmg27slrmivuzlvldcymoc98zdxa1wzupz18gpz7kyd8zz3vcx0x92dpcr09rkpknlzkwc4y8b4j2t5jbagpf0jevkppgxkedl9t1tjtibg3ba809jjcg0w642q34b97n6rp0iid0fs503maw2b0qqv8li3ygpdox4eoyeiwg2wrn7krextumdkh2czytdkepemka4kfqrt3pmyqgy38mv6b2pd5h8bcbi5gdmobe23jhpqoyd30bmpmp7dm8nachf0k6kjbyy1jf8o4nhlucf3q16nv1nvgphct3yw8exnjuof88m2sfq8ba4tor5fjma70qblefewu4jz6f8lhx52yfirxmiq35o0q0y4zlpuiv8tvatcbgjpe105ra71bgnsf4gd5evatj14opq29fwgxp3tn5x4d6f78y40p5o8jif4l1whgi10uovxwladgzu9qcaqams5bm3clpt7ou1gh85f4aocfbj8unxnpjz4ipqrwjevm4ctb9ao89bz8t6gzvt4kgv9ii5ttuxjga4jhutmmsyt58yvyb2uqq7edsh6g3xyztszupg39m2csf70qt74di8myo6fwcux7ex8k2up3k53859avtgun7t8bbhk9qayb2k6df0thvx89lm1iwulpgmnhpakoexszr46kl98l632qhwfpj11viihn7up1r9canoz9ph0adqoz6ghwass39olqd7aam5a6nvzlshn4nfngie7j7q0ngxup6touhrnkpkjd97np2lnb38up9zowde9zux5aurcna1xpntm86ck0n0ek82913ht03ee8syerddhvozcp0runebhym7n0zx2a2oqze1ii4xyqmemhjraodjhoohqhe0gqopzdfwjafzl4aeuhy3zwmk0dw1uhkvnnyp3cn0yptybjfimh805pcw593m0b9kmvne6j8hbw6f8t7c8g0ky5pdwdebsgbu3djdqjb6t7aalica8ikovydismc6js6qhl6w1d3c51nznpvjktcct6ivcirezsplz0erqd6wxi3neccffworwuysegkwgmn96re5b9dunfi6v78osp92jkbxte46rdmagm9p3mkdkbwp9twrr9guybshx3g3omh8lxa6j1hgemn5uxq1b6ds8egpahd8u6gozoo6nag0ia4v7v1gnxavczv4o9gl958e721h4mjv5jed0qpofo3lv9vo334jicl5rpxz8sxdi6dlad2yoqo7gtsbpq8zb70us8ljl2hdneg7p5d4x62ia8w7rtx7t5e2rvaggnocndaoez4tek1258209hri3xdu1g34rpk55l89f1yhnv3rwaeap7h95qyk0wbmlisz2f4q6hc6lcvh8hbpdeg003a0uhbzpfhq47zjynzn4g17bnbtj0g5xkodzpj4jgfv0tnjcrnno50xlqp413kiuf63ezuh7hve3rxcvbyubjwkfd2c74qskn1oyez3pneehu75vifzaag4mimni8gtp1o451dp0w2r4l01nm3d2w3a79r5uwn4r4xxcwmyirh0d1ujf7d8acv3zkd614gpdwx88lv8ov78ro2rq6wopuy2f5whxzgrbk0xiaq39cttfnocv7d8midr8vpwp1zp9rv3pb'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'krx8blz7gzdfkihj4p1esr7kdxhxw2sb02gp1ay87ffyiuelnu1u9pfneew4usnnoye6gw1fwvwnts7yqguzon82y4bwuj2x46t0s9sc55wsfqv6ma86ulnydfovydxi3wwfyivn213qld1315jccfny75ipo32kw6ct2g04yb353lnt6dvvuzvx3y8kkgxbh9ejri2y8gxggpyrtkd81uggrhgiya5tdu9l668bzownv0vvk2h5d500h6b5gd4impk0mnaik0ost1ixxzuynpqajlesh1lcxgd1p9dcvdyh58h41vn1161xopd01aosayqe964b3qb8967hzpqazlvy1zvum50x7tuob5pa2plxj2urlph69sqea8erchj594t5gy545dthigc7cgcbpognbnpeagp45zsweo9gxeo9b5ts23yektzyhc5wsvqfet8dlj71n91cj9wplgtkprh2tdrc5wrz9d2oj5kuwjdkby1hh9k333vvle5fw8eokz5gpl5wwul9mx8ubgj14wv3c941l6l3dqffv1851caotagxtf00zdj7u6xqmznxar7992mbmhx0v4ifo0redmaoe1xb126kx0filmdjv9c2e41fvqvdk61hylmdjc65u353rdvs53ysuaq3t6mz6abgjg5ikoipqf61t35avc4w11fsulushaqchpwlr9izse95l34ypwp7dlqh9zqao93xglvokk09ew249enwael8ocy4k2cnxsholax0p111lpxh4yfde4tug5slvi1xqm891q617v0gveib8vs13z6w93y3rbca2qx63oi3jy4e8e35hjrtfwcxdscchzf2z9f21ehbo4wvajgg3242glgsdzg8c088vr9xkd9g0v32g7jcsq475n2qq8duj8338ktbrqrc0swgv6io6x77zocd2ph69kg2gssff7usu4378qva8pf8t8904magar1ukknvuunn63rumuobgakylghq2qc8mcdd2oiu0fso3j3hx4qwjbina3ukwzedrgt4p62rnner6irxm9juzuv8iwq8zoe1xhxnafy8cqfxuyzf1kiqxxen5b8pnq7j9y7awk8mutumj101q0746x8ghxfb2nqabgdyusxa1cbxbhx8to37wp9orzg0ra2j6whi2xm3khixrpfym8r6ojsjza1hq8s3ow4h65urxwefgwnvoni0pnlkdh6ez3pgwhcd7pzqfp6nm0eae5ua5wwcpif15u7iefahu49ck372bcvj96ea0zydmcmxhk02pu65b5rkvapvab0nx9vxm3br2mc3043pvnvfri1i36o6gbsn3l4tdorxfyuyyq4udicgfovrqzds57giljbxm0tvbhvxcbp4uiqm0ddibg7dm44qiebgwpydbslcexeo4hjxl1qpzlsklyggr3y4qyl9004ls7vc5hvr5jtdhzuxhxtkpk9e9sbq3opvpv7afj9owua3du2srw37c6e1sv81rpnk8ritkyam10j39pa1n0or3e4pbrs130o5a269w3h7yw8sn14ok5mcppymqd9xez1woegayv3wx3yb7wosqhx8gix92q9wtircrg9oohbfvp0igq70x7277g3rvgfk6xxo1qadxsyba0jl5ymt1sl2k8j8kw91wm0yc4o5qq62b3ldhv9w7u1s3k41j0pnmpcin24v2y8i8lo0xormxl2l82o7bhhkgdel4kjzzzkzs25bzb7945wgdu9bptj2l24bsq6lzhjve2jxwtw0vnmz88ie29ve5sq8hmh95s6hq19v8tw670rxhc1h9iuzy8oq3xy3qqlto3fpbzn6bfsaovt9d0y2qvh62oiwjzdkr68rc4f2g1gdi6tycsbae381isgdbi7p5asizaybo0bu2ek7eeui3okcydr5r0if3bymwa37r52jgzkqatuiqphi5rv8c5b9djzny4e8uf3s7yqci25w38g2n31zsiljzzul7xqmt6mvywj3iojyxzzl19omkabzbijybzcrfek6'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 5017644493
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 2573825798
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [ApplicationDto],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applications: ApplicationDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-22 21:33:01'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-22 17:02:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-22 05:24:37'
    })
    deletedAt: string;
    
    
}
