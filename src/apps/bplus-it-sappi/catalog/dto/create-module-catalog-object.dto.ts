import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleCatalogObjectDto 
{   
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ff65h15m4qs0cwet1w1hq10rqjo2vuuxy6rk2e8jhbd2s6g9b0ql4ti2hdy02o1v3aneribcv2gdwovikz6c3h4ighl4tha0ayz0sogqxna2jp20428p10165uih2vg3u1dskfog9ridu07b36v2nqiu9j7x5tgw'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'd59botoxen0lgdpx4rbm3wdgpjxjm9ljo8vddy4odb1j3mdqkrnp0lu6ftc7sxh818v59v4tzmdl8l1w4m5n0pdvr6e3hyoygysjs4v0t78bx8vg0va868yckbueyqdl2nmarffef8p8y6mgda1n3iz35jlaf7zv'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ceichw379fbfk3r1q517vsosdm0dhy5o9pp598rk1uxjv6qa60lb8oxfqc07t4rrnjil2fj9j16anohgz4gw9iyd13k9krv4cz6yevdyg9v29y5io30tr9gd9pntmxgu8n20sbk8td0ptm0u6j1s4dw94xkcau8l'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '6iiugydwjojnu1j4sge2ljs3csbswjpd0urf7562hbxi84nobe7mk49zaq7ck6jd6g5eji58nh6qiivocknzgxznewrmwu4790uwqdrkq694foxrat7janv0bdgel72gzxqs1q1gjmgwkgcvg1cfx0wutnu475cg'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'cfdpcfqtcdi5rd3jf4yzdpxt65oumn0zt49yjxsbvrwwdxfmurrenwfsagnmtmh4vzov8sy8dn6ns19tcz9grdkpg7iotn6g21ltsfwvu1o58z82typbzjqqqhblzxi8e5wwjwv4fsefon0p7teqt7cxgei3ylhv'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'mq52fzmmluv58fnexygfgb4p3mfh18jv5rfs6jeyokywudge1d02roddwuejsye5y41lwkvb65gu39narsmzm3k6zfg9x048ywcv0bljo2d7xlu7i4jqoo9slvda4f7gmhuxtziyyfbf09tipw5lyuendjff7abl'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '6igl45o17s9s59g1ubhzb5sc6wlht4bl4rxtwjla3meqrtilzf0rvrekxthb1igsuit1xtsqvevgpunwrofte5aolkdsmonajuo0p3qbqx2d7lx5xifuz3645suxo31z3ks87lxwpv93svjfnz6e9tfh2919od5e'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '8k4joqyaqu5m1qsg80iu'
    })
    version: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'd4siqykg1q8f56npld5ao21o8pd3eqr1j7x063g6tvfxseehx10ewmrreqg92cyyjyagzf2emkuf8ma6ytcevtddohglmjv1zr7t1i7sakprulastant981nd5s5h0s1e0jseprn7ld15e0cfmeaqb13r2ewk3ypzujkkz9ptj6jf0fqdf55rw7748kbwv282762vbx0d5sxazblxylszt246yknv0qglguk0sm4zkhowhy6pvij8iak3txj6ap'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'h6ew2gal9egnsgs9cryt100uld54paw1vshkztzyv289lj6pp8b02qv0bv3zhauwwavkb9ysqq37t5pxox6k4jvwc50e2k8zj2ckl6osd5lx1fboq6y1f4xad4omzdyp06mvccbg7dz2zp17xdvav7jj08mi0pdg3ez63gcyyndeshzplsvom93tn2rktu5uci5xvn113719rsc2368pjz3torh3o9p2vugabw3w897ehaa1va04seagcq9z1sgyicz2ohso1ldmqw18rmbjbbsbx27ln116yr3591miu7kvxgbazkhl63zbv44v8fzz'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'jnsmipvs1et3y6mdlpp11tnpdhe63ou4indif0cs5xazvpbntjzrxc16hyctvawhcop6aozw0w32atxg7pi36squ4ikmfqqanzooj26ipjkdhcgwi592ukgo8q0r3uehv3k544xh0u982sm6ivwtnju2b54zsdkhfpz5qof5mbesosg5j6v3xhkxz1jm6ct38psxcpy8g5cskiakz1vl019206chvkupxuf1kgovydftbzs1ux8ptjdi5cwssjg685g4b6iz6ssvt7itp3oqjwky5sv38fzs0rvlpqkwk3o1i5jxq3vkvz072iktlsxx'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'tozmo64vpcg010yaulek4q04sldbijdkqp9ra3k1bh7nm2wd171yv2izcrq3wc4r6o1skoc6a93bn66bfq5u18a10ebl2fd4bh4cvilhli9ntnbojys0mr7gwirv06oqaixp059bj65hl9n6fg1fxhum5zxo7axfurn3igq13gcyrsash3oxqn7dbfdeok7qboan7oagayayqitdwm4r9xr71nwnc8ynylenya1daev5ek0h79iadwrb97uzfxqkvmkpggbulyjq4w1kdjyjo24xtojs7xvg27skof3cwofa1y4q8bli46492sy7tllp57kgmqfn78z6ysb9o03iofjp8a626hneruujplfe66ao3cj6s59rktoecn6woiyndr4zkc2m4sf4xjnr75tlko2bunror50hlpgeq2soq26nx6j1kwi8zonqr9qstx4i8egkf9dcfr3d27v5go0ym22vycdkvf1zyo967n2a54mbwolaq1f8wdmtg2o4vzlejebviqpgvswuwol1g3hadepn5eg2pzqe8j6vp1u0jlnyzf5s0o6fc8gnlwlb8gfxy6197k2oxnq24h3hjj2d2dr3a1ezls0m88tjjex0b0vw32mua1kfrmbe5wak7d1ooairmhodqtk2bsrl6h2fs2zlet80815bjlmjn7one6cnmmnm1e6h2bp42zy32qy5so0h4tovhzyrqpfmvh71c1hrjnv2i7kpbo9mqt11v7oe4x59mrfnf846bpct0fd6fsvauctz8ybygb9waelmb3gdzqj9962qqn1qt8yuxbjt5byaidoeclorq4hsuurusvkglxy7pz3jwxbh9w049fy8icnp554xu5g6qg5s0ov0sk50cez4jli2cg411boqe2cyulzgz81n3vxmbquo0mkizzowaj583rqg248av5rcegszxubx41vtlqhp1mti8yl8klepvxicw270yt0rse6wxdymcz1amul8u94m8jh7kp1dcdfc6z28gsgw78nc'
    })
    parameterValue: string;
}
