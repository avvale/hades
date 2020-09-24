import { ApiProperty } from '@nestjs/swagger';
import { ApplicationDto } from './../../../o-auth/application/dto/application.dto';    

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '414f3627-b916-4f8f-8286-bdacb61e6d11'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'CLIENT_CREDENTIALS',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7f0pln30lhy3az3eifvq3kndufn6b9xr639n6qoltvx1y1eupyf1jfgn2gazvpsa3kyeh78603m2qhdpaqvcuoad66lg2bwbqc13mlucet17ccqu22tnk7khmild242qs5dt08yysrj2h3gfy8pcueeychotmz5cw4wdrdk3x0iiwhp6rxlo1rs41q956f2a2dv761xqmrpkqnx8y8dfmpu78yerehoqfsfo6snfxvgybpdxrap43czng2iveto'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'fc332ruochjttpzy48u2hus1vrn7zc10rckn6djrumi6syofl02gaqgft2j1qu3erkxcfvgn3l3o2j4aonnkmb3mlf'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'r1fv9jv90y7mmkrc4gfpye0i7rfud617i1u1m2an36nkcs9oop3nymu85obeviiwp8mwjptim52ogdl6ia32tn9y9ilz0op6jxk7wdbhisrxu2tmw6fa31kirlafbmg6b109plw4ku0ye0nnwiuqvgz6v7n856uzl9cg1lj65a60mvmx6d3lb2ecsqo9p40pk4hbdhr0hqppzd481c1lpvoac1hjli1yuqno0gpwc3b5tmbosqniwdy0w4elt2vg89z4ysuo3w1d20plolrxe7nqqk6ar0dih90fw5qktdk2ltu3qom7laqt1p65wgxq8f7hhgc8xkvaanejfktulumx11830s1rzlpr3ggpyjdlkmh55gozgfnwts2vvgo4nr2545sqb5r2j7j9jzu9x1rvn3pa6f76ju9womaxtj3yctyvz3ct8erxg8iptq5637txfa5rpvi6ur9lbtem0zu45ls2gy5fs3naanmq48s3b98im2c43t7lxfaxhwqbfp1vk45k6htda9r6dk38ngyb6j5eskmmihw4pi8wegfoul0zev6hi59f7awmlqwroexb634z1csvjs0p0nfxsfnbltu16jmigkbhz95eo97t0rw0f9gifz299aw9v0bqhbfxetokrj9hs31e5ihblsxh589typlmw8tfxkl4aw4z9guwbl67d16fnyz2hj6b5smjvhor9aeuwdy2isse7beabl3p0b9fhud4qij2b9k36lhekclch518l0brd47s3rikw291k1rihcyjwusvmfwhhzh7hzgs2v626bhm9wpmir5m2rjsmcqced9drvpg7v9eezoqhr9bjbz77ng1vhtj50giyrylm35l70m28d0hu3tpugdhn5ggro3rex9gotzy4cb7h1qet8g0j6i910zh9asfo4n0s0yxp6ke0by87zq7evenncyvq4c1n2vrtyepu7h1nx2trzzjvjkd0z783kjzvgpaj6mjk4k81rjvqqz6pdom90qv6lcmgzkh9aydjzgn7l3kje6lxvl1148zqhwbj4sulplorl3s3rwkde8wxdiavzb5cfob8fxe09rubtz9ddx4eqst2kxsl8an6upwt3l3z7nq2676qzadrppz66rzwpfkbmgarcvfzp94bdcmfkoud8n7doqjragb6ifuz76fucwqxj29g0g6n9f2g7b5434nzzxyymsxkpqh4gifbqdm80pmoaory7k4i9yy4jo2plexzdqt3xxxfruiga8q2c2pk88l5slya3qk9o7gac7odkvd4yxw34a4b8nrfn3fpdwwovbwle1bicob8ci6xaof5o2gyitio9x6j7gatpm3y1lpw5c877mk7vhpu8i7xkx0txsj6c69xzul9p61ruq5q7cjbc3nppz2iq2gjlt1fl8t9jchu4fwogxulowvzrvus8668lipcvxcnn3bjk2viv7hsslfm6cs39d4cxfm3pcyehkxbx52iofyf6bc3hkggztdnzgr9n2foif18lgrt9jazxrve2kl55nalrqdnfmmgxt6rcy9elips7v8ihhf8y076f8dl8xti0ybov7090ztue657gm34x2ljjp18m12ccd7haueuyw8j7lafn6h8oncmkaqf0p440sk3rw8uq85ogldzflls51akp2nn0j0pphewyk2d0b8t9lbbhkntqrl4eg2j1z8xz719cmgpx8iycq6v94oq1kgqaowucrqax613pkqnlh16brk9iv5l4kee4zoriry6sro2i4ay02gs1dwma5fkmra3m1iae8ji7j484gxtiuh5blk138z22et3zfo8yxk6l56vq7dbvfa5z4d94ivwlp10qwljiyi7jwamlgt9ash9dzpco4x2w19p780x3ng1a729zoe3d94emsnuu255duc2uh7a48k9jmlmnfar75zu3msxotgr5c34i67edhhf8h89sr1g2m9y3752z2w0stwa1jrtc1mq8g6mpa1amx1k3r6emtvinlqdnrswc8mj8z5fpujf86a3ycv'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'p0yi82cmcvxi50s5z3to3xfj9yt43jlizuouwsqasgv6760si8bimrfmzielmo40nrmnhcdvbp246lnab5bzw7hbq08e5v18bw7882ozlst0ek4qqm4xk589ngyctesl24t5ad5oikyzcby6spvxhqagp7lf6nzcro5erl98l304c6zx836dmgnsuaoetq2hw6ui385kze1praulb3az9uca50fvi3jc2kqf7g0tnmmgijbp0ndxvlleyt8r10ufc600losvc3piayfzat4hczavyuqmeg3kie7lkfuvinos710ipsqfj8oecj554h7wvc2whuab4e7v9enz2u1eycdk07c0fwerlowpofqkfgoani51qyo4mj3x2hlgrjk6dk9l6jhoid9jdjyhorogzoix3k4wex80qdd6tifeah2zltn2q7xnmsdjcl836dmtoe20lpummfkf41m9u2ik5ns4uw3q8e9gjk2wp7qelzzjt9w9fol48k1zgebw6629r0b662isvuc1x4g8p8sv9vy0v4pxymx7jls102b30dk4mgppwkn9iy5qop9h8erpvlip72sahj7f97epv8w0x5akzxzb7jcuyli19hozwey5seyvq1ult909d7pdrqnnljvd0jetl5bq96sh62dab1cgz51p0git1ggelxrp229sixa2mnm5cf3xm9pyvhzuzj8b4zicj3hqm80mglrikcn9y7y9dsm69hg8cjz48woyrzcmfoqx5vzi4v5sx47ekryvlklacrh8vmkmjlytqkj6i4bn3umhfpm642y2z8m1fdjnc1ejy24z7lib1ngap3ouzn82frygszqxgqo0z6d4w7zlydwjg45v2b66ak4pbjolywl2kqwbs6f9rqr2k0w2unog3ks6gljosdw74yxryqs9f1ao21fxibp50bz72nbd7sd51o5vxtnro996g66h5xdtncw1alshv5twkouoduwjt2n9eyakzlgqrqnd3zgy2szxhlayb9yvfhkzpirwlq2fzad43b458cna8qu1x8ovrnfjuaqfxki8mo2grusoczbi2xub6y8y73bsetwbp9g77qof398dqkhdqxrzz7kp8vniuwhj5ze9pa3vkfcre5jyizmpikv8kb5lul1ay0dbaw7ylcue5nvixcaxvozgsgg4fdh2od0elqne1pbiqz23f284ojkurwpdfgj8b95r969p5ehks72x4hlzuqdnhf4re6dln4frmkm3zg8xrkt4bwybkpvs0x779eq532dmvynfm5of0rsjhme5ykwrym018u1e3imy7mlwqbz23aq9xcesiycol1iink7u6u410fszrzt5bbe4zuqvtqycq7q5m756ky8jt7uudzzcu8gwio82jrofolz4sx8y4817awbmzij2h7r836rwov8yo4uglmqzjrwf25zpds2szm9vn83c52h88st4wdlk809zmd145ezs3rlab00o1pspiblvganwiuvfsrvdcchs75n6ufzryw58dcleavchz5ee7lawkfrer2sk5buasez5mfcun22gvqjj8qg8efba8cbzh57t79qfa30p178g2x207d6z8zi1c97myc5kd83op4rmfrwg9b67qfgtm0idw5xv2s9a1hl0phlxfen8hmg8nix1jr3yo0t53z9xfnzvn4yj4py395h8q2ame82izijy44ex4z77cfu5w4zykv5y7ba6077qvwxrggqu0nggq8msipsmx08nczhj0vt1soxo6mahdp7jijd2yw4mvmioq3o6oahujbcbgcpdyzr621v4cb9lhbfj3n8ocpf8ybtwu6ap2jzei77o1o1g8ryx323yq5djhlojvgcc83ofhmbsp5rh0w6mhfz9pjmf91m0w48nv4snfw49biq3wtv9nzvo7imdf6tlkmnx4n4rfn1yl76mltag3h8ym1cz0u2cn0s0fdrg3t3xk2sqyc4g3deckc8iuzkzolquxr6h89rhbt7nzpdnju187ym3yr5ufp55xj0knv45'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 4949208721
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 7384847236
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
    
    
    
    @ApiProperty({
        type        : [ApplicationDto],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applications: ApplicationDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-24 04:24:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-23 16:10:39'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-24 01:49:43'
    })
    deletedAt: string;
    
    
}
