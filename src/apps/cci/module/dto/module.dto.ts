import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b4913af8-c04a-4c42-89b8-97f452264102'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '44942e49-7ed7-4dff-9234-3923a5ea0fd4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9ahbozd3pvtb6vdd8t56cj953m6221hiyzywv9byzftgcmkqn5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c6d4e0b5-9b2a-4483-85f7-ede5d6743428'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ainfz1sw7gjve13l4or0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '6adeg7ome6vpcrdyjovi5bx0jdd42m9u43g25y0k'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '8428rkfh6l1n6ws64ea1aa7afwj4qyl39spzxetmteskuz9t439ninusnuvtkfvm708uhw0lhe1k79fcq4r2hctukixsd1o9e2byy6oqpv8lyxt8n8i13qw99ncr59mf2d6f1vbaekv72sko7xujye8q0dsqol3z'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'vglcf4xt3vieu8n4iv7ihla56ug3bqug4n04f1hqbxwracrjtdscm28ilpbtz1hayoymdjyswlp791ivjoxbqjrokw2ymrw27apmhg5m19mqic9jr9frvkv1eyj8kj35h92t90hws9kc70o3o90xzjo2d77h5518'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'z7sl7gte9fiegoutu2p7qn9wdyn3l4nohj6ver6evup0dqssl5k6oe7f351oeaus11sd8wi7x45mefp19achrpe9fydvdb8koxufkmd2ilh2upt97mvfragbtbl01q5v85h9idiv45jj4ssu55s0he1ncg7qz8tr'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'j1x8vdnitse2i336z0isdlmlkyvs571e3qf14hwg'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'eozbw5q40f1sumda02fbor6hg38m3j3knuwjdoupkhy6zoopu8qoh16ds0dosnvkl69vpoflmp1z9pwkjuv3galfbgcjso00o7vchzn9etg0nz74ctrzbocd6d2ozzdvi0qawwwpwew71pyi3jpejd1qpesdh9el'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '3t0b6qnpqe5obdg74neebbjm9ianap9lv20wawduc81tgmgis9yr1ax4qgn0zn9t368qyxq5bwm73f1r4kxc8u0xpfprcso2um05ku5ocutxnstjjo61w4wcmomrs0bb4zaw63g2aqdba24jf1sueilx2ghn7dhv'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'xx3hiwe2ca34v0zva0vttn28irjhjlmpbekww7j6nyd6zpwn32mm4ch4zqvuk1bbd91apwyuuwe65d8vijhsu26m8g0x9lkzj8y8214oz2y70pnud6ufepae650t2lg2sjiq680xekuklz4tx92tqkc8rulxkq79'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '2wsz1p7ornpe1p7jf4ni3d20r996zrwjgc6mlqlac1qkunfjbnluuah3fc1oi7wxvciczfg38i90xa5s3a7xr73518k5109j1lc3uh7gkpttfr0gtp5zaeg9oleorbv7kjhfcretef5cvpgxti871gy4i289vs84'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'oxxwde38n9pftnbw37x9n8ikqersmkvskazbk72mkllw72ey6q3wuusf6iuiehj8j578427uhr4z567ri30xpmktsk2ifddqd2ntmsiyi87g2xob91zx2s573132fxuttdf1djrywh0141kfrmfhdi4t5tdymt9c'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ailya6p0vu614rabjit77h7nh0qvkfqhi78a4ivkouj7ckjef8khk16tg8si83apx3331t1b8zohguvkcxyfsdo4ozkd2lxtp091tqges7m2qsoy2bri6ofqwyzyw6n5azc6ezrsf72ph6lg0n974yz9ks8ypkb3'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '9zymrr1nkbemolgj2xt7'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '31twwd7jkcf9q62hkyhit5aulrn72t3yhir3udtzlupd5u6e98wbioj3jey6f02mg5gwdq0y9dx6wylbq00ujfzgpnev6hx4toyhjk9lcjtmnryxy5z318nrapywzbz0ww72c448lbghgba0z6ao8drhobdmisz6ne2alnmf4dpoa05mb9c0nmt189nyq5nblavqoq6ynawy1hko00vkxqis4vsdatoqawaf2t03qxltptnphcjmdcirzk7grw5'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8hbk66r4ktdr8yclcul2yxp67m2mhe8n9yrdqyezuad3sroly1w46zp5gip6o6647xvdahof7hd0i43h6gzmvnkj4or95x53398rvuptpo1fiz3p251jcx7deczqbf8x0if0qsp2i15ukzxgzew46ap1wcgaotwbz9mwhcp10o5hpzkxqwm6th3dnmkatae72qqnvwna92kvpck0bsso63g1qrnrblll5z8gun8w3dxg36nz2e3ctk51434ldqneexf67wx1muojfjrncibadg0zq79leqqhl78c39jh2zvo2xyqf4e2q7xtdrj42keu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'v903vmlrxu0im58l74uybucyq1v4v7z0u6lmgpxk8rf51zs5drvzh8lhazfs2q9uxstst0h6q96qm1pziln6euwkh3ykcu49w3i5rb34om22oymejqitdf6hk3qcnahyss0cwbt529t6hy85sr3jfqpjy2rpfp3ac0clofzl5puatf82nl95q34knkxfrfjrydifqeo3nwwyqamts7ovxmp8bo8d0aahvx1bhw4by45nq75iw506m558q4ds7xq0n50oaw2do8wmbr1m46irabpi858urpgoes3hq5p8dle9j3gjpq2yp11yw7ozqiid'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '3yafoxx5xmsay2jumia0p9ovq9244c20tjy9isxx1ou90xbirwkibvwba1ojv15zfn3mvgziqt2g4h2yspxbbawge1xgqlv1m3nkopo1575hg3w4evi4bi8ek19r9oo3li20kfyvs75nhk312wmvxrz0ja8s9n10v8mja4m1xiikhs6gtlkugfq8jiqmw1mdwj0fihz379s66ogru4uhpm6th7jv08o00kvzxqcxrnp7zfztzxo1ropkipbrkd38wwisd2p8opfeal9p5zhn34ajtxfmtfhh6795m6v3r31nonv2dh6t1nirfetlu57f2ntqgx3n03z9lytdykzlpg8lz9hud90kq5crfp1hsfl6hwpejooc3b02nnwqyn91ka3xhq8i5tfgm202t05wnqgdz771dqgaqokohcz5d0bufnb0st6yhcaz1fp4z7bny24uz74jp9d0yvxbayg5h2a26gq3g3w2j8l2f18gho71nu5quo46sttmd0pg4o2xso8qh36ony7p2eky1hu38w22s6wu78nd5ps7kj7cy1x4jo8n914kcqrevk9rwas32pbfkrwxyl2filtmg446xz6kd58l14nlw96vrm6liilwqne4kwbg3g0nf5wzs4l23uxq1ji240w5y2iynlsfxr9bubi4i4hfbfuqcdkatt334rm7ymemj73z56cn0gz9du30ihfshqjesiop17ws0t8728q44i6irlsuksjn02bfa6qtjicno1tn6fzihc55yysgyv1xjodl0mycaytp4ovdctuds7lfqlf3iepoqxsammpqy8guu0yscdplxun9hympwcmbxlg6btt0apqixif2i7xxkjykjiytqnfq47lodnnc5jm25dwba9gm5t1ard4co62axmfzrvxj2q9e7w4yf7vfxgiysdsktj9kncmtlpibe0sr4q5cl8wgivbsnw0xk1mqx5zo0u4f22ynire5etbs6ocurttq68ds45x7d9ejs5udz94hmo7qsna7d5simfd3nnbp2gqxrbwcl97bcbix892bauq83yymv9k7gtgx7xjzqq7lx37iu1dam217zh8sdlxe8g9vs1o30bs6jwjzvpbskl8cl1jilbro1i6ms7h9p43v21v12og7xr9ollavix75e7nobjt1fsw3m62jma7gmo6xw0rpz6mgyjjfrwerdvpvoxpijr1rec92t8f39h8cu6mx7k2seutd5sb7nxvgfmc66rozx0eugnswmz59mrm8kr0hmaqaperedbu5hqoi3s8wibzf54mn8isltye4wlus7aywlagnaqsh7tauttsu4nxu6p0kltzsok0xwvmeezly681znsqj527gaoy2plzn2zm253ipff6hn1l7w8wnx8uhkhukyd4z9gcgin0b7925hlp44qbnx0deuk0vr4iyysogglb4oxawnixa17mxytgcxclzxpjrtlzs74ppj1vnxn2ucj6t3zwtdeeawqxmsibqm61cpnvgkcihibwnnyhyx5ryogsaw57dsv71v0ja199tef2np6p2tucgh3xb63c9ykfly507k2nqkehu0g73alzrsvo3cb2w2kk0bhm45junght45sahkh2plf1k6rcrki08i0fd5ghr9qveabop25asu0mm32ohe1zi7f26433trhcbc45ah8rzglc6tmi4oo9mnlmyvnk4x5fpqvtpz2vz1lw7xmbm6auel2ez1hasqhjm3dad9riup8w91eykx7d4yd1nn7knrce9bl253ltl1kry460mz3vw2tn9he2qgrq0i30x5v8qn6llxddogfzwevi64j7n9r3bsd5h3jq7t8uuaci14hr8bntrcnnlhfnn1pgg1wtlq6oujfuyhl3z3arr96tksmve1qcc50on3h7wcp6oik43y3k9lnym27odaetqzr1shkhte7peqhrydsc15v1wnkuh9tzscz7q4558140wnpuz68272mcz4vckqykxc8na8805gbak7dpznr852o9ei2546t5fwojl'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-22 00:18:32'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 02:28:26'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-21 16:03:58'
    })
    deletedAt: string;
    
    
}
