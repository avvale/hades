import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8bfcc05d-31c3-4b71-b298-9fb07b59008d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a7d47ad0-c6b3-4e34-902d-41540843b0a6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6rf9tuq1luqpu9yj4smye39p8q0w2myz7j7mms0t14shcnb25h'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7a783f3c-6d8c-4452-8ed6-f523d74c42db'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '914wxi31d60yc5wtqn5u'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'hqnthvrtzul1aum06az9ohartgvndxh5qz5r1jzn'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '5wxw791cfoa5v86vuajnbtyhtdux2t1pq5uzwvyyspipyotfaly10vhijuize4eoais4wqhm4d92r6dg1iewnjk66n9okat4gd12t7pyfpu1n4d1nnwqr75dqnkh40erzul3x7nfg5n5j6rvzcaxu2tmgvathh96'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'kfrqugtjayd8u0c9aow84libc66qdvf2x8ssl7pcc9tg3ctap16rp14zf2tbkmejxofq1jzkyzw4o9jaxlnpi7xlz27b0zzvedrgtzx3yi1l8vtautz1aza8c2ovs1uuw313gn4fg1szk1v8p67p96yzz92hj1lc'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'dklf7hcd1n1py7i4lia0m6qie51xpla3cb8o6x5nteiugtbsw0r6cpn7jueem8h6arn3n0mr9wuwze9g5vnix69s9e6fnmuun2k4m53s2j6cfthjvzww1ktgoiul64phpvxwu453qogzzoypqcs3co9w1dhsb4f0'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'd8on6wmdvtxyu6sq1u72t75ip1bn0r4kjkca93kt'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '0nmz8ofegsz9ebp4so9mvwf4vcf2uh1qu9i0u2yaxfjxbnz37dgzfgv1hl76ovpoal6whlg5e7ldvxeyman25qky9zmh2fxvhjeal9hui4cx2ciak0aj9fcqkqmhj1b902b6dj8oprr66378uq4660yaflngodr6'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '637u8dn8w20wj0fv9ugkix7avg88qbvd0jmbid7803o12svwcan2mcurqzt6bosewzzii8hwvcetfhyl80soea3mxngvw0jhgq5kh8ahf0hvb06sz9zltwx1cbkzj0gkr5em7tqs97k1b0sb27bikzn4xn9nkfkl'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'xea906xxikuc6qsz6cnqmv9351lbi5exnf819dc772itord4wd7ds4iae3jxv7945eiv7k3fhh0lif0uiorkhefr6obwbjei7alsq1xibfqgh3qt8a8wtw47kq3521kmu5cvzuyz3ain76j4yidlzabxoynnhqrv'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'oglg2q4qkmk65utk0elh1imo2xaey4hnhh3ge8j4dcng3g4uw4g3fnfj6r6gmgv8nrzdt43b80xltb5e205qkf06gdq1jio5jgkavmnbt8eym35y8ctlm99kk9c96zbpg3m2q4xr2v6158h1z9q2luetohaq8yma'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '8s1z8tqkicjkaditpxfvodb7zg7vl3rfddh8hq6ot45ce8ypuour7cs4sc3106kuf4r3djz0pdhpsep250fythvnyhmwl34hde0u7duc0848bvof4xvp9fl85qgqxh0umqqorsdthivvcfjofn0ebrcxg0it1doj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ffqwaezwth61m3lktyeearfnmphb7gqbk5awfem0ib88ey5t5gnh504k3wwusafpmfr8yunuhro6w1r8rm97kronnhl2a5q7q55ltx98el9h0s1yly7k01pm30tewntj2wm9gooov6s2sa7qu7she92tm5kroyq1'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '0u2s0on5uw6db4h5v99n'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'lpz65zfoeiftiuezx86gg753mqcr5n4d1whntaemd4x82nzmxg3nz0gvhrnd79i76epuqgn61k4na03a9ep6ct6cpkjtided45zynlajtwvlu3aah76knu9uny2nahj6ak7amp4fk8txgs6t88i10r4qa2tqe26w5ct6psv80qneqpch0s3h5zsqydte4lv7kbgf3t214utep59rwt5afrzfwqvvtzpvabq8lhrmi4f1a481u7b4pnhqoft07tq'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'oaqqfwdkro0bj8aa1pjfgwlef13tpm5ax6bsazxc8ckczzmjy0udohrth44g5x1c3n5j5zq07rbl9wj7jbkznkjh1qbbpi6p23dop4uflhir3nkg8pc7t58vekq2vz8r1s8baevxwjjneji3xyyiw14ngdtvsvi7t26wwbwdx11xjj3qmu5mdtgwvqplasomfexn17e01tocmq9uqkf1m561dngynnono1bqin58kxmfe4457pzn8oiuniebspng4nn3igeykl7tir34r3c7cg4f7mqul11hxh5uosoeqenthbvmeyvkgbxzjme6x7mw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'tn90g94ks9vl09sszsvcw2zurom12joo245gwy677rot2o8nlj6lrpbkgxkq29fub7rn8xx7ggcm3sgnpj1f5h7dtn49guvoflypmbuuk3u86q16qthz986jcgu5r67517rbc87vmnbxh65p27mv7bbfy2a6b1caw53j16tn2pctm4r9iygf8un0upm8m1k03f1iv7n46ccl4frjwxmm4n2mz7bkg6in9gdms72wjsjywl9bkobcxymbaqmlvv63qfu9vrham08ek3gtg4h10eikk7w2qmqzyq5mjmb4psmev7i2qqmcv79z5vwvpcyg'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'ox32rjjt4h3vmk6gytyufbz8x1wnshgpflu23rgofzrj4apnsn2ufamp8tw0zpb239y94x703w6bf96ds1ll9qx3e5cq5j4ch4awqdxmgdthkhahaio4rs6baq6iy2dfsxo0c8w4zegzx626eqk0cyawphl4v79gklxt2sbno1sfhcq130hwinwpc49sbnqqy23fprbik5n9xma1vckky6y3i286vcandosnbizyocfs1agi9ac3abm0ofahumoyacgk3wlrrw7xwpjy4wddgl1ftdjpdj79vl0w2gcm34binx25r2219mith9h4nbyf7s77frwsv7snsyvre87q6o6sihox8el55s1jl33b53og2bfr0jk0uhkbzgqtwmdy9hivj5vg4poclc9500ia2bzut4gnrf6fa2q8328230e7vjpdgnhv1irerv3hmvpxwkagndvkhl6z905h9wnxj45wfdo88gri1h21h44kyqdei3l4krmxm44js8xuo32mjtr9zvtv31f6t5mhn3euymw430orsy29fn05rlkzn40mv8t7aa2juerhxr03d2ahdb6v2kwxmh1sko8qajod11jhlpmav1fpsf56x2dt5x3ljqzk5urpw58ajqlavohsx461k4mikdn8il7273j9eco5clhrb41hwzhm2maqq5uj9t0itxkk2zupzovzidbo1h5u823uqadljig0ojjjz08vp6vm4p4l3txrjkxxa912anm9bmf21theh5ty7tdsqv8xes4r2hyyvxs1r9pky0ero4y425jayc4z18buy4db6wmgyjgynjemlwem5rr27mp71wvv1i6dinebek7fng4tnlusz2qc89g9d7b3ocfe08ch9sq7clamjtexl2hmr8dftoplwwa43q6i8auw1bqeh773zdcpb9t10i7p94eegeh030lblhat1gbvzoc8zwlb13wt5edtaurdo1xnff3azf24bd0odbk2jfmg90qwurw7gyq8j8bdjrj5nmpw0s439kr3i8dmr15y0qf1vzho2egf41hxg7qnuq09jaar9vb47x1j5xmiba99fkgipno6w0x08izap1nyb46sgyd5fz7omfpp8wdwlwvg39o50takwnvcir2yk0mbanot06ey9vfc2dck1lycd8pap3vtl8rufxw1pgk8jv4n56l9gsqhvn57sxzhf24qzf77bxtcod4ojb03yfpw443ym72m8idrzxdbou59yui6r129gmypmo0z801rmoijtmpktsxje6b9yk8n600chu8zbhllwsjg6329siirstp3bwo6auznofdnzq49kkv6ur5v3dj9yngkbes51rwvmo9qyk1ezl823s1i24os9qjw4kkzyjw0y982hefrn2d0cpy7zjtz7rq6v8s0ow5pxau8x9rlpmvooe3bx8hihlo7g5i3q57d1ze9zpqoa6qsi9vgxbq41ak3cflfmrk4eped6yz5qo2is7dv8twmi68oh1unal67jympvwcr9xkg4vqjx9eviayzwh8aswu559rcwins66e0z5bkkbkupx7wyly4osrd1aeodlnug7mt8egflh9xhu63cebsrvq1zhe66c6dr71qeeuuwtn9hk1eepn2l1iflwzbi5426pal2nwud04859kwac6l5c1ear6ilxrj3i0ia3voqj726ex9orekz3gx2tbzj207xtnvg8pfr4mwmek3oziogudw8227z8i7ee32vskxq9c44a5n7puza6mop4ambkevdi2v4mgysacqxfd287fp0xeoravulo3x4px47y9iz8wyjluyhtzeirai54311435e8cfu3yv01cf5t9zxigce2f97au3bv7rtnihcs56466h1p5113wgxofy8jbie2trvn4qpa1h6ev390371t1m7gxnd0v9ha81tv6zdtljveaja1yvcd39ez1ir0tg310x5bs03h4c5gvi1kgo2bxfwlsvjo2bitzk4kveoo742hvux0sd8k7rsqwdsm3yr9icohrrfq2t'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-19 21:04:25'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 07:46:18'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 15:16:27'
    })
    deletedAt: string;
    
    
}
