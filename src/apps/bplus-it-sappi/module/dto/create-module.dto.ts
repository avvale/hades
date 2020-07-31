import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '48b60d77-1552-4b86-866b-3ecf0ae50150'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5yblqh4uwyz36uvsiyvi441o14k9cu2mkytf065kqw66xhj5v6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '68f61958-4463-4c61-b7de-54cc773f8024'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pco3iaq09yh40v3qk04u'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'f40125ee-8415-45fc-b829-51f5671351ce'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'cyusupvt85xczsvyjcmxigxywybx8vqsbzx0fap3xh7jh2fy2aqdzg3wy1xl60sv857r8cbiwdwdul754u98n038n2bj6uvhz6v1nl9vwmx8gxplkc633rtqtezk560imqdsd8gic8ld8mtm8rb03uu14oeb5yac'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'ayoq3qpm7d98wg4jec7cfj7phzeg6xp0gp7ycrbmaubjf10vmsy8156w6hmq3nvkih97ik273xbznzmay7hyguu661jnn53ayhmgzm2woyiln1aufk174wx16cotif4aqumfjul6jxst2j623ii5eryctq1iblqo'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '1tc7uyu7aqsnqdogg3lzunykax00ap5x5n1hvn39vdosizjx2er5n5lfuoqotl0l5v1f4we911rnin1ohayiup9vke7gecz8ol960vrej92f76sfx0lj7d42u0id3azdnt5evvmdl0467buw0cjv4sj4ulexma2v'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'f2e6ca50-4789-430b-ab04-e9372a312d72'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'g8rvfpq1gy8g2rw9n9h5ehmivvoqd62dz0cr9mdarb5738xs6h5nhsw4ffb8c84sfssaml5qeve4e2ie6vr248g7le6vxrzj4ilqelvkvc384im3f2lyeoy46k666ooto8cmuhjitkxjh390f2om10n3qodofgtt'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'vm5u4np3aarpacg1n8fe9h1yyzb0bd3jcp8dxzj8ah7hu03am7tzklub6mk11xq5txju9l7rm3heh3tt6qjdaq24ctq2c2vw2am0vgirfbv1nrklesgnbnlu768p5oji9y6d4918mku8zta9qpvxtwz7mxbw6viw'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'h7sp89jh575ugctl0uzfur7y9xrkt5zaseydwhmr59cwj3plq8au88e6r9zmato0yw9010c8dkfej7wsnowi7xyma82jo3n8dokbw5svg167cromo2gyfmjuov1knxq9tt4araw6iwtaa0flcgny16tmssej1sj2'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ok2hqugakj2wg816qt6dpjkg55e1816owvk3p0tr06zo5bd8id2fpstnro4fs5vy7479yuz1vuwe4u4gezjxuec3yikv3orqwnk5lxyh8ogba8pngii9npeqkux3w4x5vi1q9o7hk83g1v70u3ngnjqfvk7wgp8d'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'w8dn5jdyi2tlpzfzjkxr'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '3gg4odrgwll2v0ry084w5q3soxedcnhq7u2og3dvazqtdnxjcmahe249gn7wr5t7xouse5wnfyy3926xds2chaujdn4fcja7utohjgopquis9dzkiq2sr827slt3nwzjbximtf6x4nrv8w4q1z5wpbuzvyl0nrids1611c73d54cv58m2b5ciy41v56a8qgq8ed564zp32u604vnx4rgyan010veqwia2zedvxr45kmyybuk93avdgrj5tzsn97'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'h9eqmm6w89tt5tue95uok8bjl5pmlux3u8mutakn25ludk2456ac1wqc3zhukd12pyflma4qyrm9keaw8a8jfy81xzk2qg9jmebsswt9ljzzbnpd0tfgom2t2w6qd0j80skpwzkdchso97u2s11g6ca4cvoadph0qwgb1pbpbtwruzaxys5osg1pnl95m9xjya2iu913mtdfrjpvi2fz7e2o04uy1e3yoofqjmklemhgiu486fogpfbof03qx40v0r2nj5fhhthgfrdwukwua311nkfyltd5d91uj096150dngur5rnzvcxd4xp67uux'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'cjh41229evlmkbeeejepkjhwsd2xeawpsxk48t44nzxhyh94ks7coo9y0ndaa8kgtybnpqm26hkf5ho93qm2obtf77vepqk525l87vmc113rzmmf76ok1duktzl637xj8woovb7rakoz9qe8d8q786i11kmo6y6kwd3vvlsz3o5cbug4nyidazrcx8usgvjs6evs8sqdbhmce1bts1zdaqb0zmcm1dgeuvvtefx7i8m7tew6mj8r2tvg2mqe6c9c39xbx24iudymjd4kw1sl6i5hcnmw02v9vnzxcs7f5vxl1xkg4z8dhsxw76ekqmsw'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'zp9w003dwxflwn6xjhzvhm8cpj0xhtamkv3ix8r1pwau9rqase59du2ut1bqyf3m8mf02tw6tv2e6rwm800f5jwyyelupq4qqihfza4tylz9hvzqmvyhrq03wh9s50sf9uw4wj4fgp0qxo3nuk4v9swji185qdaxe8ukcqstjfydt0u37vgf1qgztm6r5t93x0r3lm4w6dzptyfvx8a6wlvbakzkamv8zk8po37ddcs5ryjtymd07q02upmt9gajfc0u9yq9ssp7h0pcqzag8d88vdds3qp2miny1ds0qukh3ulympcc22kz57azazcwmqu14d4k1fcykawtuygyk8b0gfpbr3mtmaxoybfrb4b9lbsig60mwpsetwfqunq65g3s0vloho7hmr0kahqh98s4ia3r8v10n99hgjypfjrkru3zshtn8flxepsztken07ki7ogm5we1c154r9v9k6ehs5lcjmd7v7s39b0g5izf74ph3tmg8p0pbz50ginwe9o77b6z73ii4dd4ml8lar2rknxwpk1oacw7ieaat6qvea243vl7t0izg8pkvttemv6lftp9xgodwragmcglze41amwazubul0r8p0x9k0wq48rieuickt0hocdz0vpyg5r252v3a8xlxe735dhqewejeayc26pxluh4h2fe2m5ertwefh1auk99ls9pf03encxxa5fubn3ztd3c5jw0tbga86iyhva4uezxqmh56nypy763olbukj1ee0zfyi2422coxarqhjkxpnn33fgp956wkiik2k9g3lbhg2u0nle90i5fuha3nieu23d9wninu90bm4pp71qkijgbvmktj37ekpw7ny65qdj8ro9s1p841xqi3q05xqul2bds3ow8r4i8plmrhgbhrfa48xn8sfrafdya3lc71rlf6044k34bk10nsnuedjcaxze2n203621xhv68zib3f4cjhu90qsynbev9loxs728xv34kiax6ze29nrnxz4lkpe1e8hsw'
    })
    parameterValue: string;
    
    
}
