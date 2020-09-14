import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD_GRANT',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'evh7jgwtso1brvoglil61tm6mhf6c2unzepkdfby7x0350zvm1w1jjhpvhm9v9fcqp30wxh3uhi1bld2uct8frcszw18yun09kt38y99jk9dzv6hig3q2nqdr8bykrjfqk2kcmuqhbcjlhiadrop11p3snc77e9nj99sf3ohjsmiwhzxiiwbka4yik8vqci48pa76zxql7xwiik44taxg4j75hj302skekpc1d7wy9vm3ij31psxdxl1ldcq9js'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '87qu1nlc8ip077d8bowc5zrplhcyj4rzu3cq14qnfy8uasjhj89ukd76em4t3pymwi40qex9017yjii7rnssk1w1uj'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'h3rsw0p8o71brxpepi4zdxtbeaimjmru3nfxkdt7j4r8mk98eiv2ed99z9q1fucjqnb0la4y1svht4sbfqa77ou8q2yk46zbjnp8b7cb5y3wakixxq7of5gvrmhkxjdq6whv6ml9xbw430avzucbqb9ktard3ztxzsggnb4q9vfsxn1ifzry649xxxfkt4ye80s4rbvwzsx6u17frbemd8pgq2ie1opb7mixkdx8dsc4uett1an4dzbai91wctb7pcdl9okl133omhjnkwn8liec7anpnn5lsts98xydw8tno1icccyncs5gw8zjpki40sh20xy2zt04e2b6xly7pm8lqzw2fkpvghw7c739dy8p8pvjdpxcgvb0cm4j5fuxi1nnvblmgss5ep0e0fiv9a7y5vbesohp693qd48u219p65afdo21ftwld90vwc9ij8z52jtkzf8s1t3jekwaejqcan6z48fajvaz0a8qnbi8zp32k64jtezeyyf7zow0uogsnqrdimnaylpb6etw957h4iarhvzlhh7mj5dj23nkrd7lde6g01t2ve0crn8qwnonin2bb70b1sg1vixrjqkgwagy8kf99re4erw9bjnnnvo8g6337a72w04njlwoz50afxmxw63yplcx8gomsyfgwlh7zjl6qk9ya91nddk2ig4g574bgv35uwi8cz201ov08m226tqq8okiz48s5xwkg2u3iqabn24r0hnidykb5urdc0abkjvfhsuxjzo2sjekx815bec16kq3o3n9afrnnc3pxqse0qotvpag7uit4xqgfjra44ntf5txwt1gmf6wjkypra2hm9c7op6e7slhh2ogbaiv18jkz56svbsqtgd1vld2z3fvtmt2t7z8qnbla6u5uwrnisss0ri3wbfnjccx48zreue96wruvj2p4lanp54b9xosdv5gvp9cx3vsqidwjytfsut6ejl3nt01d9yphg16ly39dkp8wx49ym6wsm1db1biwuoqpuca79x657j5iyfvo3w5sdlmtncot1fm840zer5oeqa9ucszxgm42ox75ud6kct5g7e2pdocc2054cu5qrzrutebeg1tkz1tw21ewv9atdrt3s7qthe663zv6umk1o3hb2du5lebws5dpe42e9zryggaicp1qugd8akmdwzu9zkzthqqnyoz3eywar3agm6cch6nztee14zs8a4kmwx9f6wcy1evfxe5vmun8i2syqkca2id2mq4lz14yy19ujmm3xaeyrdy5hgmq9zq04o8za5yt3z8tw1d00lb1p6gw6ia4tn5w5hhng3btlndt8sgn6xq4p9b8dt0wvg7c42ezayv2d21wgnb8951o6zmybk67ntq035gifw14eskj4h1ld8s4gbtoa55xnae6xhxyhql0gxr5j1e5tibswj0fuvvjafetv3pli45xpa75klt2xbd7an20kmila7hw7aobglrd4gtgz50vi5b7fz9idab9gmuxdvfx5ynsoh18m56ykox0c00pmktwjnwsc1zxecpgpx5ohpdnic26p32eed80hkreoan58bxd8or2qych71zcainicak77atxafyv5ww6r7wmmmlwgds1ylwf2xlxasjmzo1cu648x3xbwftony1uznfshjyprjet5dqzkon2e9axae6tnwhakbrluud9dnubcuph8aw5os66hq9hu2jgzrl0g2iqsm4zpzn5em73jl1wv5ihkuqxvyxxyqps72hv783b3lhsn40kd3stfoui02jkixly0b6mu3aao8rhaebix8bpbpi76m1c0hbojd7z9f7t4ev0qz4ieuzfk625ujyvge3dv9dz0uy59e7339po15tznflaeiwkadfzb4k01sgcd6ywo7jcqoobzz693w2pbplz6tmb61w9jpq8zjpu63p3bs41f0pruuvueysl3yoo1k9u0u8kom2vcy54qy2v23x74jslqy0b39qb768zhoh85yn1e733rbdj0g7lp6jcddmyl1bfrljstn1'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'vho2ycof2tyyxhw3g5nmgua24y3nedr7rpjuk0um8eozr24ewrjx5ts3bm7y5cisbpujafeyrqor1ifmc7891mgqihaxg46x8q2v5ukb1xrxacr1k9r5mvyrycybg6a5pygiybyziay7uy6iafve0vl7cnyzpexhzh4kkfqdmuquetlf25vygc05zkfh5d195yrdmkjx9zdvelywp5z6j4s7e0gp9gowqy1qn26ut77nms2r8wpzihho94gx1o31fa4s11g42q83dviijg4ktdiewgfjgsnz6fse11r9nitcnm56lvxno6c20czq1j9qzgydabmi39782giiieh1g5t6mudisi6vglfy8yrnltvrsyca8l27zx4m5r8yw5se2hcgloe8doo5lpsxusz1zcu3hxzmmjk1v1q8fq579cp8nko7p6637djodenntpltbheqskzkw8bf5z198z0bdf3hwwzsuvgx3mcvt1hxsby36eoyrdnvftree9cf55uwpyrypd1l7o1rk3apsxnbmjqpq67sm3c4hs763hj70bhh0wkqdbcfyz4n5k1zznxfir8lhlzv9pbce18jjvk5twbmrjkxdci2lr6k4v54p9tvk3ny6re6bvhiuxldjswqgjps0hio28wkrnuac23b2lcvpjxz23br4mqvevhti6cuj8iqbmajxa5utftek54adcvrz0605zyzdzoj4j2kdifzy5stujmgt1oozwkix98c2u9wvekag4s4242uaex9dvxk7a52aeje021289yvdje0tef8e8b0zfdrnfgkxfnwrz5mvodbm3ehqjzzdd70oun39ddqitg68fodh77z0k43m1c65chptkf0tt7uhb3msxecu6yhz54l94swkj92f35jldl2npwbrk1s0ckya0zn3ni0ydahm0nd2i8z1enyfgk8xi6v2yq9y21dxkiezr896hvfflo4z4a5oe50ka6ol0wg5dsyobcjdy132kox8xkn71rv4qyz12irc1ojrout6ruo04l42fubkj7mld99p6k7mtzgwfpptwvngiv0zq9rem08q6vllb9dljvr1m7z867vmqkspq16ja7u5bdox9u0ki8tcyhhnni4719064p5rfiv09261i3je035n3cvq00qgrjt7mt1xhc5eh08msyn6s3yb4zcxh1pp0bb9ap604oe6tp9j1kgtxuufashoyhrz5lnr5rlnn9m5inyz7tl8eao40btizkeeqlwmdnnpvonr2e7mwu6npfo14ihmp33fru5wgidgahwqjz7syzidcz6g3n25k8hp1quot5oka483xxpfy3k80qa0mbr1ix2uzc6almxyx4hh5ocy42o8iqhl7kqgd5nfxp5th5nxayf7p225ispdll24gy6yynchrod5sg8rt5kzmrcfac930ibmrh2qe9t1lr0lqlyrz4ytea2avsxhynkm5879igftol5h4ykitahrk9hbui6ezx9x92qw0jxoy82rhksc8heb9cnezt18fs05q1yizcildfsjpg5x7h0rge7xtxhdjrmobnfqjagba3y113pcxcnwpzp5mprrecvrqc36lztl8352fa23idr2pkr99pvosgosviflcx95jqm5wc9fqo1v9cccpnxnxoysq7mwdysia9xoyhe16wkgyxv9b2vigtkh6nzu1yblkk5cbhzntgdmpu0ute2rjes5qoojksek3qy51d5mwh2fechhlg28azeqftiecwqd0y4fgh0nle6jxw893y7ufeobil176skjipzj5tusng7x2udtgdayenqklg0vjonnkw259xn404qgdtyzkmbajlq8z6ht15lowdwdycu0377zjvnufsp8vch9q545pemwkbxixncscwfu73k9jd0f0y4vg05ngxmu1gyjlnvzemd0eo3y980zsyopd0vd0795j9h6mrt7sq69qmy4pihh9sqaa3q38m2010dmdorbf5ch08kwv654f715d1pwyj02ujvo1yn1chfc4hdgzf5ij5g'
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
        example     : 1890246904
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 6722932110
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
        example     : false
    })
    isMaster: boolean;
    
    
}
