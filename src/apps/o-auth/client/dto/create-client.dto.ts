import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8327d549-c4a1-4f1f-9509-108d5766f49a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'AUTHORIZATION_CODE',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dr3ympbi085dgo1wb02jnt8pzqd08one4zkmfe4tus59a8jrbpfhruk3elbib2wz07iqgs3llpcmy57xnyh7srqaljgpbe5u5n01gixy1mf32gp625k6z2b3x3mu9er7kjtbhcmk6jjtqx5icq6hvt5rrm4yyrrfuflupl3ijp0fhsyoa4cq89dj1w2wpocmvxpd7ap2jj0lbgussi9bxvs394lbt0obzhzenv09f7q39xd4hpz6i1zzmzdmdhs'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '0u5mfn1tck4h8rqvhg38uagcj20v2gdjhh6c7gfa2w1jczub5uzbkaxydewhd5zjf44u79efen2z74sdtb17c1mzvh'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'a0504b4tgoarrg3x9xiyjhp5v2le5jhxl33to3j4w7zw5a6ogszvtuteho652svzofvpz52b5n07lx65dn1gjcmokofl79phqbncc20n22wrouutx9o9v58b8iz6azgx3tq86pwup91kbjtzuh8fgjoals6t4ybxotb3iwal114p5rdgq4cyqjntxlvpl2sa524inc0agwz84n1l41ldd6pcyd71yc24ofxg6m0494akf4bpx78udei6ctoo8xv1b0xves2cqeozd5xzube4dl1p809n2tz3igi25jp7op8pfeuyagrqteie6le9ucttdo5yiejmnypnzweess6fy0egakqq52248nm0089vwt49qufqla1g2g9mobbeofu8d2n8vy2ubr06km5rmx9rv6naq7hwyyat8f59hg1hnmfac8xexztexb9fzas2yi8studor6xm9afudzo9m6aug32c7p1ovhh8wwsfw54aktkdpsx9kai0ujfd125ay9a14niggx3ebouy3i0f4audwsyrfh868b04kygem4ergf1yluct4x5dfm0asni62orq0au2xcyt6yabcuy66jhdvqcu8yw2a77dwlgn6oe6wc4ypbzc32u5q4wj5m92om3q698t2wgw0egzfobtxbfsy4h423pirk1pz82cc0zy07bvmsql64b0y67kdfqa0ybz2et9q7cz7291qqeuua8pt4atbl4eji7hoztr1elvok8m78wz357p36seh69yffivull00wfz3k9gubkv3hc87y0uurcy2th9lxcnl2cfvg4w78fnidwt9qj5z5jnrf8ldlti3koma04rygbqnowaviqywh5eitnf1p9x0ml0wg9adosmro5dastnprchezxwb8xyxo3biaja461znbq2nqfk2j6t4z0jcsex7mwyd1st29gftouicde4dx055lf34xulxwdilaxvy8bvjb1qfstq7i1y61ou796s67r45k1lvql04dxtqf07mo9b6gej8k2gwovyucgk9gucf8eiy1qv4hhtn0qj4c052h21hwlglsfhlqmx40pww4ng8s23553cz8jbsnti9zmy3qmb6hoq63y29h34genwdn7dxvt2a8qipzunie8vsnnhsng0qmyllqhh0iww1c3su81migm3xjty3jpvdvxaurgl33fnrqmut9qfznkcsr1cg6w34ypz7yelr4u4oz4824k0jd11rjq6dyl0cg7sau5g2ef6p3fubfvtywls62atawegvchkm4vicv7mckdkbbt8djb4zq4fdk04pd6uvubflddjsrrwa5yg5mz10l5y3645hww170vyb6e6u3avo44ya48542pmykk747jxpx12l3ohk9lflh5cvdujnzmnj7jzsdjlly3vy213cq8ro9rkcsxbh8beq1eh7u49517b0i0zzg42lryorgpbb5c6670axucskdw88v1m3cj4un2fhypgnovpwcntxzv1c15uktzty8eo9gdbqe9d7v5qjtmfdxgciqwbpc9np1hjgupeqfmfrh5c7weuvubgvqgg5vq8j0de8f2zyu00fdh3ir7gdtlp99nd8kgadqgupxtpoysxm4gs2tuyjq8yu3jc6rjrp899lhd6ihr4khmyi9tj4hv46xzdlnhuu7tmgyo6rup2pl5bj0qnl810f8wqmmcf7lxthrym3imhkwgh3p85580bj3ksmxphvzlhby48ppm7ewcttgre9mok084kre9vfeyui7iuipnqtzphh61hgrk94eydlfobbegj3jb59yep20yyh227v8q8zjfyr7exyu5y89su1fd7899oiasrdf2a6t47x35z0ns85gci9g82hqbuj179valpsfnmnr10y89qltn0ivduqrhprl7fe06im7ds1wc5g7aefzosv0pwg54r6af77xkqxk0hmakkq2tmiqp48tdzv3aj8ezbfiqwpcwtkiwpt4vdzzqxmesr5dprgbnquuxtzy0a5iwqtfmlje3cyr1g761a6d0h'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'i6r196myolzsj7hxbxtpewrfh3g1uoh1jw4c7gx1qkj83kb7to8n3zotzds5ikl4d8z6srxmsqi89fhkmw383nbj3zw3u7bqhv0x8jx9ryrhmqtvs5i2mt0ccbl2nmvg19q54s3pa9cq5uavp7dq0ahesb3mqomttbm9ktzwdfvw5kraca3jzi1lp15e4btg4tcqgc34thum4jx7d46ijp6gtjupl7fdizekbxsc8pr1zfkznh0gqjlsoym72qrxqf6hzx3wb8yhlqd0ksivf8yh9vmvxlkmu5bw799s6kmkrh2m78m4umucpvnucma49duo49da8ea6l89ikltt6vtul7106udw67k7mpybb88r4bgj1ymudo1k9mocsib9ssursxa6gm9ril5tlw04dbky92csz139d6xekrawin1v288n1xcft90c91fptfheucvtvkuyjs4w8ik1ckuzgz9pwnrpgfxqfri6n9949nj3z7uyg9isex1omrxh618n2y8vkxnbcgz6uce704xdd5o6fhm4t3kc8cdzqbennsyfza1ntcvir9z7itwinutdysf75dqhxra2i973ajoxxtbf3sjz26zphmhn1ptmgcznjek8398z45y6iwfgh46vaukaus7pw142dl8m2fd6lvh7iz7ivrx52vcul7p0j2obbdah3h4jtesxz1z3b51gzl3x3ff7ul1e1v81oqvmu0rkw9zlfjo0yg9ntub3ltctgwoui9gu4guoosufg4envm54i2t5kpa8hlruedt0nrn0r4hhsbjrcegwirssi5f59a564cyo8zez1q55w8pqkomu0zocdbj5xkuf4c8zwj0n0xy6defwqvlq5zftyzprb3b6huf2bbwdl74nb7jis577pisgi9t4lfpox6prceyoo2053l4p0jsf51a9q9rj0q6jes6zeb29zoovjjpufcektujgmjcj7bdt4xacfbutrnfycgzqnfk9omlgtw5dbt4cp0nns7rad8k5dtzmxtje77qvsl4q2w7eua9ve30lefdnyktminqp0hm947rlmxlm5hft1n4m1vrr17u1464jnt3d6hje8zybiojie0ip3vmymixqk0qs03hym1egz94zu4y0ubfyv1gut31a9m70y3g30ybkb68o54f6snf15wh2n1x8l5q94lfb5dqh477zdgtdxuoo83qgum12c3yuveax4xvfeccz0nws0lijlex2giqijxuqi7769ap6lgk6ea99tjue6n68775fq6y78ig609xh9vuob5w7j5aqplhkbb6qi4js8icqgut25p86n3d7sldvo2gtuqawm10vwwc30bbm590bqgubctkdxl2et7p6fth0p6do1yqglwxhnuuvvrnu2c0a6mbxphcjcbpkrhyp1t8ntu92lckiiq2zwt05ag3dtjj50p6ymllci6et3rkvd4d3xakbazrutiv94b5b71i6atj9re3otlvm0kpr6th0ixx68tli64z2u1pc6l3nrqy4g51i1yio33899w8chi2c45fltbtq3u7l0yaf8rk6wvo1thc00uvwfq2s5vketbzy9pc4x8rikk9bvce5om2zgz17ld4d365ob9zob5ow0jh6ld88mcuacl7ibox9kz2e0x352f3jzbyvlwmy1mqzrmvhrpfepzgq972nkycsz53glt0w67r8uhm8rvgayijyv8qfxuqxwwqwk5pe60dd16vwhquf4br14g5an0dcdi0fu6i732n3a81d8khydbht3md3bvtz3wvgi6z8ca30g27ojvsfi45lrteuar46ame7lunt3jxq6ippkuxhnq13li42lisp7zq865hb3p7hbt3sxgojemk1j1bnv27hkve0o8eel0get4lgt1au5fchturdj03x3wkjyhl61ndbnnto0ng11xarx3n90etxv7wzdott6xutz04s49uu22vwvlpfnanyobynsim1dyhrtogtjqu9k31ruc6wxec2gohruw11as8gmmtu669aydlnbjm8'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 5206725781
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 6016557856
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applicationIds: string[];
    
    
}
