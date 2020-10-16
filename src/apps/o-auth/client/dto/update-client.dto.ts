import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3539c36f-9b8b-4570-ab78-fa96ac8f5192'
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
        example     : 'gapn1hczknmj5ojx0p33zx5pl6752lwm6qx4re94yhre32ej3f8zf5kydui0t4q4du47t07nr09svry739151cez0hp1gt1incqcanmf5hz7l6eodl58u7846msydny93c7wjvcf9iie1lb89zajtsk1l40dlyl276w1kmz30epbg9ww3an07m25d81fldoybinw0tvu1sc94kn0421jkmrnwj0fhnezjt1vhxdxbxpdb324isbgwa4c4y6jpuy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'qyq1nkvhxnbsm7fk757q61u0c77pcw3sv7qwh4k02q6xehkq3zhl1ve4x1f3d73itdn5013hbenxp5dl0ipseu35lt'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'w51ilphz566732daknj03epc58wpmsxtnvlwtcwqi03yopt1z533hssrxq0uqbdirlataewy9ql8s8yivybdqdijlso9dmqi884sbygp2sk16ezn72mwjdaxc9z9ch7s0q3wllgxklndhzt426al0qc1bulhcu7pyzd7n6lfjvep42fjrptpi0zcl07x4ocswycgub3bsgml06k67oxo7o4wao18vjw11rc6wwsm4i8d5w607qtqy7qslojbrsj38fvsggv6kx23cymeregyii5qdb02r5kg81p4qrt4u983mvpubsitshs9vdf4v8wbml3vfn2s2fn3ovb5a7rm4eclod15wck1uw3y403kp5odatz1tzvvdx9rn1y0tj2qr2jfc3opmjli2a51uw4p59icn9qk0ymw7j0cogs67hztxnesvlbd9hmb96gbv0fys1mo8ntvn5gd8x6o6x7h1gxh32ijw04ebwv0oodsdp9hsgyq1z82b4emk1av1duaixme44fu2wl9godpwfk9ku9x5alvpg52cchqg0m3z4r833m4vddeg5qf3rlyt3q7nvxjqom3ywurlaoul77s6mpuvy34ctz5v55ufvav2wtiudypajrqbl1u8r9ep8qk4r0dudypumxrvgfjsfpw687k591dewg5dcg81j4rvoi2tiwou949d17di7liqvlmcyw513cba85g26qsza3xck866e3t17n0nkjgi21p3kpt5bqtd3tact7z0utfwl926r83wu3rr38zhyrs54ssoltcofhag970kr7ogrbvdizxbjfy81aedr175rt630xiqcjk1au8jqg95nkmx3qg66gf75qoaxm77ar5mg0ys1xw656g5jja6if72acbnkm714bckjem3xgh5minonkq4nu9ai9cfyj0nrcobsp6ed18asir3cljeh5t6mhvnx1324d6uk4f5pw9of4hbcxisuqmdne692gc7lb642y9y6f509970qeulg5wbnhouhi2o2rwnpy811vodc9bkhbb5ari5n8w8po73fypj2u78prbg0lzt65u92qfofdz2ttzl368bba0263t5hfl3ye6so42l6cifcj2mwruoj5x1zf5310c7f0pni1b842jg8843hv8j81nlvqhlxzh7u35urlxk68sq6meou02bxyyql1w97qbfs0m13ld89352flt8605gjfs08zj1x2xpx8m4pxgx9ye1xmfs4v7llb961bqz23ea11b2pjdft66tajaszjv58vydhdxur7hod26zda0pnw0f5ofsex4ix0v6m07979d9ou32byx75rmv0f3vyqy8gqnwwmsa4y4zuulpokqfgw5u293tnizywg21vacoki26fkkcog499m1efznspxbw5j9nf77g7weas5ccupy8ftkni12qjsp7gxgxv20qujm9ou2zdaspiqob9k0no4ik3pwpglutjq50uamsxcw67f3ssud0nhufh03qikdek9voy1hc9k53e8husjiksd2wyhzsrpwicbwgwxem6vbjce1hqz2v4z6k4uaxyuii76o4xhj5cwlxf8kgrb6gwlzzn0yj45pwnydkjcst9dgfjs66btndvjs9m0f5hyvp25lyopezamj3xj6wxzd6uotv9f9jmul0fovgrfxrmctyuefrgg6zybholnwd4mmpfe1cdmlz837qxfbq8uu5rh7uunemmowj2doqcp5cztgw7ys3c3wra16c61hjzocsc0uw6h73rt0wfprg6x8fdbjpf286ayb4gbpjg653sqmwi9x3uamgy9ssa0o6639bk99rvu3r9jmdmqr6x425c7ac8fetv49nnmct20yq1ch2u74a27u7x8jhup0l8y4zafywpxmgmdnabbd2n0ix1kt1jof03zkypp1q084m39dws0ojpsfw8137j6ualz44hxwkj49hthwjvn5fh1pyqv1ji0xr9hiyng4pcw0oe0j6cxgxner05v2skayc1hgby00mv1lqxi2oudzl796'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'bv3kx8phgohs1741j2m6e3w1yrzm14nwjd0hpeqhho68gn8813zo1n4kswalvhurbudu3l9y4qi5vmukk6reztit17kqdpstt9a89y3h0v86mbwc7qhw9cky6e1zukl25zkgelk75f2p99rb5dwiigmx5wpf25to73d1pim7feonp6ubdy1uopb6vnivbqbldoatupq7t9vsyi7s79d787y8cbpct33h6jeqatu17e9z36ubr1fmcm6lfbawt9g5z0wvk5hywhudv0q7jjvapnmia2fkqoujubkenduk558epqxhfd1dzo54pizqjnj1uxgi0zeprv63ha1qtxg7cvb3umn2013d78aa9ohmra3dfutrlhdomglbywn29c0whqgv4k0u10bbhepfkwwyri0hysdtjvrp4apnck0fcjk8a1d64ny56x2mo5n95959khjbrxnj6uoqsp6tjph5n6rlaizwyga094l319ba2zmrx5k3k1476gehnf5kwhms65c38r0pcz57putbs3lm1jpf87twqq5jkorrdjlwit1jq2ayyuxwyga6cqv4abw5l2unw27gqd6w0y1rl346q4dyp6kmbgu54lz5qbtm77w99y2w63uovgt7nwr743mi8pfp34ncsikwnbc5adaghn602xucvmuz94wvbimk4eptimcf64pzqkk46hskcrcbre0iyrxkgzcoebovyj1o0zs3792uuu86rkqh9bejv436pn8fo5wc14s5s9ijaja4nkv9s137tt7er53aoeivacdnfdg4u9w0u3738b48vmw22woi84yowbcsb504ojum68crgg8tpgmiyqgm0kfjaqoqsdsimktm28capwbciaerqdlweno4yeowc6z2784jkzohy7jeg2rbi1nkvpkgf3t8masmaca44gw8bdors4ex4o5bcmn2n8r2msfu3t9kbxuoxtm5ogr4tk17u5ij6ypq0gb9qnz9ttblnhiy6fwltahzpvjq8wxeyxzwhb31i7gs4rxkqa72x6lyv7akxj6dt3fydv16yue64limbj75gcf3hn59jiyen20gaxrih6lt2746tvns4ka0i51jwubshvtnypnws4pn9zjwmvgv7d69cyw9pobscev7vot2lzwqr9te9q16lwhwe33wpcqu2744jv5bnlanebby40zzgar29rlay5pwbe5sspk7ed3lrmuv0frldimxdwrjpolc3p9riqwbcl7x7dkcbjv9fd2nrjdx95d6yv046a2jxhs7sv7dudn9f0s5ic7muxc04v6t0f9kb970pakaglb5jx3amptz8fvyx2imomfq43ktzuczkuil8fndpoc5m8u7j37gd8j2w61c6qam7a9to3pg1updmos867yy676lsa5lfagta26a22ocrw7oyw77h8nnyln0nhjt34v0n07im7hr5orbjp1k25ln61649itio5mgs3726vfte4i8v2xo472p55sq6uq2wdyzsl6yjqtqwbf6at0adx98g8u5n2vk90vt87e298ulba41irstwrum08o7qmntu4ou1zkj63puf1n447w9j87pt5opd26abs1ef7ekzjriqpyo36ksfznmrgxc1b009eqexs5mzylx7346w83icgwr48rrht40ojbnexw2taog2hryb7alrn9w7pr80fd8i1xszhp6hy3md1plq9e1n1j99822wj5s3gf4azle4rht12rv90azyccv20p9an6q3j5mq5zcyhl2hxlrb7hgwa4w302d465m9bpekfec0cunpgq7fo4cdcuvwl4u8w52cv4ei88cbaxry0rzy2fu34kkwq788b045i8e50cxaflbimtjwdmhgha0qindwl53gcyjjpp7qa0h3hf6awziixe2caij7wq2kij3qf7otlmj8dv24ym9py1vc1lmfabhqr60i1po096l9013q227np0b2m7n4uasncrhlqcgixcdfdw74c2jg8be7mdsnw6tl4mj5pwctdrjqlz10uw4ev1307ns'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 1304996323
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 4174684142
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
        type        : [String],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applicationIds: string[];
    
    
}
