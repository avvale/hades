import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '78cd6508-25a8-4a36-98ef-6fb6429f61df',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a772b249-2ff4-4223-b032-06f3fadff071',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hpute9qnddmd2pk2dtod',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '403e3583-6131-44f3-b629-f66eef36176b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '7yefkfdiaozk0j8qqln22fcpyezd6pt9kt0ospkuos99ldjnd57ni9zdlfehlzz7u3w69qarllaakxa41aj58swupptmy0mx1ggqsgb0wj82afxtjbngt0gudmjtcib810ro8ox1m8eykmubmqk1l48q7biwu70j',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'nelma2y6b4cpr1emkwzyx8xopuf7vyd3d68v3bp3m7pki35e7aspxgoj44i26qgwo9zh683mb69pedm0222fae0p2wiem9e0wd5b5m4cusar64ii043teakdbur5auhwfwn2jiu9z1chbw6h9xf18dqmsjbf6l02',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'm0owpc9lw94y2z2px8fvgxfwbxxhdgd5mgvrfeek9pgblkm2z4sa9io83e34oitjvoiqrnzjm8l0mn4cwlspc9cibdxgqx8hh68j25mqb2avfmr0z3yno6z96uux44w6o1dfpgwllcosq0ljiutsysu0pzuber0h',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'jkhh2vxoyi112zk4n90t27jwula1tiytsu3y94osg8q5oceipdlr3iicl1jdlfwh7bhc08us2pncmog0fgf4g5lll4ep4mw63cml91zd78gl9ftxsw038s6a8udi1l1h452r5bp0hrnsonckhcavh8z5btf614uk',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'h1b2enkvnxc1ejh3w0xyxez62xgn73jab4k0b4l0ioqudtob3bry1wim8hgpfvnuyf02y0rtjswl03eak8argkntcet99qxjqcl93rmgfzshjzi3bywr3sjoaiy1lx90gticrkvznyq7egtl2dr7lwmzbhi099dq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '6z6p396pbdlsunmljh2sf0rc37dz0gzpx5xrhdkzpx4oeqadaxix4xljmwnc0cmzk22ivbl8wlek5wjnjgmu25xz72l4zhixowq8wjenbwy7yvr4cw0bbf8r143j5ucaewuyl5wjk03oepxu85ogpzl1kx6hiknr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'sbl1cb82ym827kvtb327qfgy6iji5agz4zox6brpobmicdr0yah6ihf2srvys5w2xktizhzxzbhiza8chbx4scnldh3fbt3cjbblttumvsuqxm5mputm9xjsad7serje8zv29jmtmkaue9vd3h5xlesuteebun2a',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '5tz2ixkti5bq89k8n6gt8i3oto1zvj22ingkqg8iz6xo39952xb9gc7i7jscpxwknen8plgo3slkg1djx2e1ytnznbsxq3acn6i7ghdhnorrvmtqc2otwlvf1qpmvbvmcelllwmdm6qp8mxck41phf23cnjvsthqayrzgiv7cbzb11xyqzv6185a7vpn7mjgti7vute547xkekw8637rpqyvwolrtji6ypsum1uwo4x5a9uizbb0wils8k7end9',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'k8vi4wqnlwbkphu274bk04bduystsibv4a17q2d80n2l4jqd4zof1idc0i5zad8ito6lnq3rdgomvruwb3j6bfptoueca4f6cgm6edrdnvmj2j314b3b9vcrqczyeh81df5s0u6qnazskc7qhh8am9mjx1478ld146gvmkyp7txzxqpfsorppnjfpf534e13dff66eij4dfl0fcuxmrcny44f4dh8aqsk8cdq7bm0x7wh3wq69i298mon37i8213dhtmwuqumu8uy6du4vw8aszh8wnlsbw7wqv2zqbcji1rn6dawmym99x6man7jzww',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'qvogm8oqvsksawulcr3jv51wgg25twzjosqq74v0fd3i2uiwvo6v7r5xrbc0lhocl2avqzt95bo7au504et0dpkd57x3qhm836jlss7zk3npsn0g5qbzzrwj55co4px8oipqb945tazvhwec2164x447hwzc4fgsl0yco6ybzu2xqkouy9ex6ejjoe75xfm07yrjvh3pgo9q7nqxtq0pl5ssthps4t8vwo0yjh3vft4kac2dw0toq8pbua772arojk6un19llnxu5rxkxbctx4a0ry184c5vkml2dm04dvqyijd6av9ojlb62p73ovf1',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'dl3x3gf46pfgmmbtnz5spd2bvdeauuq69zu3g49p32wtqmxjndzfklibklrqgkz3rcniy4gry0be00nldece7y41clr2hubtnig75l0jtxmnm7z2na3zdhcn20yken7cfx7jxisxq09rqs8twhqahg7kzpii2xdfz92ixsz8j3nloh12yxiinv418uak2x2zbfgxn5ssu0cmcgfkurgzk3grnml9qzt0as0tpt2x8h66757aklad3z1e5gftg241fpl6cwr264jdgo5ew962joca08sqc7nd3cds2bmvv71o915zr2orwbl203a2x5430pf73ij1du4ldrxnbr90oqrt0yg2ixmln410jygvipb8xeopxrk2uy2vurgx375jwzugexwexww4aa5hd09kwki6sfivlrddi3y5o562rduhdvnfhyzmreebbh8nq2z83779blanipast8kxkpacb67znnxd0w1mxxfq5dty88rtd8592m6xda884fyb6wk76s971030db21yvln70uyac0zmnkt07s31u2ew6rxgivrydel757qre4okst9fmnobmoye7i3tunx7oufrhof5t3onbr5uaoxdnb46h6yel7bxuv3efe0fjw0n1xh5uwsiwvnkj470znuvzc9el76i0vvnfvjktlovcutb7peyd5e31sn0qss3rsx6cserfx062bucasu6t7650gqe4z791lnhjpa2mkzcg5ioggfnxj8w8za56gbeow2qp1kbu1a21cgt1t82vmg8fr0ky1z19gzu48fw5hh999dkgvm72brm9m2j8ic0ekbwx7x6xegh68l4gv45ize8qwywe3ochnechw8jg6xboff31qg3m8pptvrr9dejnqx700eckqzeo8xap9lgsjfaamwv1p8gqqknnh9vy7jg2w0w0u2xi6ufhzgayds6w6g2i32cn0pjcrb2drek6najfyie3c28w48m4ahwikxf5wt1pmeuvnmsiq0ftcezojosq7lwo75',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-15 20:32:49',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 09:28:23',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 01:50:40',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
