import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '82fd1860-d84e-481f-88fe-0f047985f5d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'ekcoidgri0xqtcrv8sbixe8dng54j2y1owtg1i2i'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3ccf397e-23f4-469c-846b-5ea87b4cf089'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bdij83llf6qymw1bnatb8frxiklqqybkziwupqqfyu3lyijiv2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2494b540-d8d3-4767-9202-8197a494f31b'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'grdsl22msegvakdm0w66'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '34vyo68tsmzzkgvevma4qt29uf58k12bnx2mp3stikux5qcbdyx5d6wdxa9qc8y3dk8flbsbcaetytrhou1x0c7rq45d1fpb44jlgw3q5jv0tdkoj6m6y0q2lpnhl4gv07y0uzxdyxto0nowr4nvmk5iklzrd60n'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'gjhmueboas6aelhh6itn0iyoevristqd5pcjvp8cvat6oakfsgfzm535h91lf7dx1jpgs630j0cxvovdvo5whztma285dtt2yqr9dwoa6ldlgkdixw3onous1ilc8d9de061hes1e7uaci6kbhu3b26mdis44bv7'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '08b9kpbrjlo7hnmi1dc8m0v5eclzzgfngbt82joamvjfsurtodpbkykwv1iaay33mm70u89arjsc7cgmw6bfn1y1dpmnxal6stn2d7h308soczpjpow82aork8rebimcijk5czkoq67yqa3euu9r6cca0xtnmvkv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'qlfh925ke8dplcr75gpwmdo75097hhaevq3kl124'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'jjr2s464ulwg7tettmsuvu7bs43ne9pjyhq0va4l1nus354f32aqx8p1w4j2llc3l5kutkeetxoz7h3z1vtccah6zy6vpa49ngi4zvuge922d0n0wxtp2ev8s4218r3gghru3el5ne5cdq5h78f3zr3vedkiuvff'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'un30p9sh3p0z4fh5bi7o4af6ge50n7rsi08pbn9r6jmc7bdtv7f0036pp8y3duovq2tl3pb89caje0z7gg0h101lkggpl04tq306m6aih3b3ymik8v0vl75iu475iwahm66lls7xc84p3cqp6ihl1ycespd5hff3'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 's7ev4o0p90cfibtb8alsc0jk5j3899j3vv7srt8av7ttbgw1shgczu3q0rqyiai84b8g6vesdiv3ia7vybz7zyp1ufjtih3kc5yzduvwhod3n5rt5a1fazeehbd9odmgylujvi2p6mh3sszyzy80kwx4bg3lo9je'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'qf0gitgey7m2lg9alimqq5rplps4bltz93k0la41ruf668pmzhl4lqvllouai84k3wypwd4j3n1xd40wca6rj91ksnlfqf9stnu53l8lor3ydwpfohxytjzi7zyq7uhvejndy6vqlzm2zf4ca0alvgyyxp37scw7'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'pxnx9pf5ubfcxv110lyu'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'liswm896a3j6214jgrs5np0n23ki8nzie2y84tsplqzotv7qhv4l2zajwr0w'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'o4lv7lanpc9tske4mtxksln07bn0pyiwx76sv7l47fyh7atog22pdb2o67m2'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'gtvc3onterjcuwggrd2b8ffofetjkif6t4t2tnrec8cxotiv0o8mp7le8ant'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'h7owcarxrnhflltbpydj99yd0ooxmk3mabxubvgyxczwhbcdqxed67rjxidn15pp60l3d0zo6s27qhma1zlkkgal11mb9jn4kzyy22att2z0ro8oxdn76adb1lin9gufljnpiya7uc42j0n6v4sxc88sxdn9x8t7'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '8arbem59oi48ulvdguar0sou3u8djnbdd3wm9gkxehedrusb8eq3a9xauroir7ptbnoqn1p0aypz3y1ibsblfoq5xax3qx5w1aryje4algswzb45b8ubbdixnomqkjf1wc7xbfw05h3uris0paovn4higt10y988zrwny5tu79aw65xqy93ed6dqvfxp39ugc9901eayap649oot9i247v2cjmhuwdc7tfvt2nmx1xcxntf2d5hmwof60zzwdzpio5b38cofz18hp8x4p7na8rl2qe5zqno2ok3fzy9sdgdoi6ayxap5jdjebespnlbz'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'doxfgd9rfyviddced2ykukfekutvl5x0bjdb0kf1tlcilmabhjy4c1dbkzbx'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'ki72thwsrc8bozf4d117p1qfinpdnz3rgh67bxjref362ivufc86s6yb3dtre4l8n27u9odl1mf0iqryi2c6zkb7fwj3s0upnikfhxj1g1w2pgutqmq0hlka2w66cjmdmcwqnqhtdtz2hs1dpr7m2zrdptgaii1y'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6841069982
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'ogy9u0sbbh1i0ra000c96d6oewfftxeligvt6jaquwnisqz9c57qwpnnbv5eg82dwstgejg9zc8hmx2kgpvr781lqw45itbtaildi78xm4gfcfwty05uiq2a9gde7vdm0wq2vy6x85ze9tsoayglyji3wm73meim2tqo5jhyvl9o6qa70jecefauafxnqp80qdzelzlwjr9f852tq67a0d9td8os8sm3tuho1mnz3e1uoi9ru8kqqy913h6zdv4rjtwedb8xp6kkdg1wy6pa2wr8yaiqtxe17l0x4i1irfi6xt9jt1iqk56mccfpra22cntrz2dumusm844fodrdvmdntm1tjydujwg3wb9yopgeme13wqexfh8iakuz7ahnqo39qqzwke9t4g8fxjso9lwptdb17qfig8hjrrapoovt8hm8ll1xfqfjtj75c02chqsefr592pnd2mtx6opdqq1nwobya5l45dnxju64nc1v44a2awsfsuernhk1q7cowjldpmghjdcbpnbugbuyemwm4qqizeqod5gux4ifpfcbz8801nadblap528uw0iko8gebdlok7s6gs5iwblsheyj4o9l6ow3jq5uf87rx5r801wtgfx4h4ijxly5ztlkmoe9do7vwuvidx88q4vsh611qkevt1vjyi71gdpmwwws7hym8hdndzk0a7nnj5e662r03eli6p778t38c5uhz9wdg1fau56o6a83oetxnb69u2khpc41ee11ifaktheabxe2vrfp4tido6ljz4bqe8xvmiqz08werrjy3veofx6f6zsz26llrpzwenn5xqmwrxf0xhsme1o4w12o5ow4vwolo46seernn5w9q5xs8urkdq8f2njjfse4at1f3j8c72sdsspzx5nrvjnha90q5m0glka2wevvz6z0kj7p2ear6kms9pcz0qge0ogengc1dt4le92svx272cz6aiy0gmzi9i1ji66o77lcxoaacluuk1d3zan1vd5efzzkcvjg'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '9iv5j7z7xegtpbqgahvuxsr6wx7z84za7qbxv8z0fdu34oa5lkg3cv5sb867jzakgf2ymhybgp60mla1v9pmbsq4mdyx9qyk4wjkt1uwrpkyx4zcsnhzucmkp4o5tv2kjlium6ebqyshyfjsg8yga4iurq291s228paamx6zfkga5an54eukqrdcrkzvti6dm35ck253aq64ca7cctoc7r6yty2o02u72wuxtws439o0hqrpemiwp7hfm5zqlsaos4ibtn1bt1wjy41t87b73escmqd00gcszcwoam28qd1t476uqnrln55l8zap8clupihtjdmdu0hms5s6e9zn685kk9ivtmodi0lz3dnycd4i09xlkmqs3d40msra0elf0ztaupcjgc014vkikrrdsn6qm2o4koi2h8txmilxing1dgik6cqnvgcrusaosxxozezhor6e116067mc1e2o221np7j3ah0shxbkdqkt8cg3ugp98veuzaic8i0bzq1cbpmgicpdatjt2jksj2i9jt72575ceoromoh1wxrs2b4vsozroed79gibcu524lq43strf7nh5rzxehasfezzlckd3ca4wf6vbefe2zmhj34s9kjgsuyzy5hz9pftb0r50z8fi60olp4wxkdihfm077pobkg4qyzb005y726dlpjkxtwm43pk4j860tgt68uwfbwgzjj1eyoodx8efip29fr6ixhv1cwoe5sv53g3ab1r4dxcplsahc54mjgdsdb6nmxltvgiw1m94igrtxci1p9nrcuxgwyqfgb7ocs0gtadyqcqwo4363tj53d3gq8cp0fpvhny0qg27ejnt2zh7z7cmg9l8xutu0yexwwpkkhdovypkaroc2mpdp3wgusel9hbioprboeel78xowlg1uatcoo8tlp7xuf8ck7wp4gcu1ibwhaiquqpay348qpbeb4t7uhsw42awpipl5y57w73wzcosw70bpo8u3g9ux3ktmm9ltnfrnccidb2ue9n'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'extimfqsjzx9fr3jqg8tttiyal7zoi6la1mbkw9sue2xaiwlushxjt307et8'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3940325537
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '3rstfukczejq3rvt8ul9d0rbwrxvsat2wzi8rq5javmcysa1y2telusloliqxjmryv4id7b6971pz3xuj3fznml0dzwwr6zwowym8du6kxyvmvjsw6k6oa8kcvnkka3d0tjwqp0xvkmf8noawy09hcxogvfvktsz'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '98alenu6262yz1vbjkm36zyr4pvdjp3vh8pl3wkmec2o0d5n9jvftpawb8bwxz2supliyi3bkeelpwmxpdvb0orutf1hpg4e3xpwkeapko8gahca7kivucec3w0bkcx5ftdni9we90jcyef3zs4r8iyrzzmpunh1'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'ypt9jej3xx3g9ur62iv8'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'raf1nf3m09gtr69lzc6i'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 11:07:43'
    })
    lastChangedAt: string;
    
    
}
