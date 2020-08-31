import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '99ac10e3-5712-4ac9-bae0-5a299ba548c7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '26606de6-1d47-4228-b9e6-7bfbe97837d2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'krxw9iqtc2kj1ys444s6hkd9cl1s2kmfx8xhls3wt90mmhn9pz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'df315455-a321-4647-aff1-ebf23d45dc6a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zss4t0edb0i9fp2kdl8m'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'ijbq61fgi4i8d1sy18kkwd8d1wnsj6abtzxcydzr'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'vlg2zx8pusqfd92jdzf138tawm7t80iufwjnd4rigspdsitb2a7ai0urub2tkzs3fpga405r73x302swjq044lvtoickm9a0di7hv7fao5u9pjbp93hvkm9qfx5qo4qcogdnkk35czgwudriq3qtghnv4gzxiwc4'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'qol2whp4vjs8v6yflwh1vt6kg3jbajivehvsvzd2mapmor4o3e7xhqhnb09ofy5rorku8fjfpqgnism8m2metgkin5ckh8iuszhd0tgpjsz36ayhp180j5a5kax7r9vhhif56sle3jcykas0wmyzdb2ei80ek5zk'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'q5p5kckvonyh08ll9v4wfib3cceklxro3ocwbfzyubdu70oglr8x73h7q85ams872bq5ppywcsjud9r9nh2prp7a11gna0vzd5gg08o5q4td9c907kk2an1oporq6pmqhm415b90t3wrp80x3wi7vkb4p7g6vlej'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'bky55y7vz47ahzgrfliaomq5rnm30zrw37md8xtt'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'k45mzpjpvam3cwstwn34s2zcxk85z3mkdkjitau42voksu6r7zmej8fi8g14xk2iopfxi1drbf7wn6cp07prd8yrrjongzo0e2his9bo3kffctqb01zpc0nhmikhj28rg0yzgvvafwxxw8vz62v7aoics7d5l2tf'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'pzgglx0oct3zqzrhfb1idvgfms2p84xpzndewc11ss7gqzspibbao4vs5rdfz9jstqa6c875hv16phho5xoxoxtk87265p2hhpip5gtyy147l83agq6zt2kalbl87l60rcz5mdr0g871fhltt5wbya9cd6dgkrl2'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ty9bte0owmptna4c6gxcyvil7zce97h5j7q4xkivdridh6busd7mv4jfn70fx8gn8xzmx7b5yybr9t1nhsud51rsz283lv49fgh3ozpyxxiykidpq5bu731q9ojqmnx4wh9dpxq05x9uj54iz3byv5k9ol9cze1k'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'jy7mxtn9u2la28aenk87uw6gxoqzpaxadrotou8m0hy96u4ivuin7ipnykadl9cwbv9bcoyled0ehj534zckht54k690xyqxzt2d01plqvy03pv4ctvbqtggum4dzk8uo6js2jd10rifp7pvqbd8q8emwb5n9xcm'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'i4dfl4rrks0di72mcvts'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'w9c8ypmhnkcpgfehbmaixhv0q7rkyqjpcv96mmuaq94a1htjyiiebwsf995m8kurwd8hr7ise1gvx4hr517bfnrgj8zdzha2338jq5dnfnmugtym3y0exepki2xxrij6i2kwwqunuel8vgpjuo5ki89jxhk15016sfs186oqb8ok3ymw5xjt09eq17etyw1smcpx9dmw3xw4ywc5rckyd71lzp9nfd0pmh5kee78fcpeoyzo1kqzwb0jrqtmzwd'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6zpwis0pzgpm8pkvrx87tj6w23u6qpp8hn0z4x01misxrltaklt2kyzbxyj58tti2372nrhitbzlhhbj0qlkazhcu024z6r82m5fs2io3x25d42t9xsnl237bc1thrdr683z24wfons7nyetz8jxfa0y1ps7fvcrkx1aqs5tqegengnytggdfzi4qwo5lv2szo61jp8uz06v1dtzx56ile3jaaen30m017suptg8n5wgthfkszp0p3klf0f1x0xmehbtenzcvzp80nereskusn5djfrgwi4j9rvdudjkiy4nlmxgz099p02ponpytsg0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'n4d9fyh6yi1o75z4t48kuxv5c4fukyt9c2350cn9prjqogcw2axbh0jxu0oa4cibm0jxo1os8aqmvicvxrjnju4qaxpd2bdhu0e4ggsu0kdzvwfphsyrr5fh33ahq2lyu8ua98ojtakn2nyvwbdrhub3zq11ee40o4kztp5k1zh82j8y7wwq9al33olyjkafdslq6nvxckgv4gjirt7iqfw50k8xly339at2cbqimr9kdp18ofnrpp3o8u7xn50v2xkkviabyh10o5llqevg3gmnl1bdx737y95qmvvm4pgkep53twldbhc0u2tfj840'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '4m9p9elx263sswnnlq5lr9e46y2oky0ehnxhzeedgh745erkhx2lkqpu01zy9wbyioeqck3dw7f9na9194wk7auhz9isp7fuhfn9ormdwu43660vnxrt81qonobjoci0cex8i932flvb7nukoixnaz6l4pselkbzmopfrzsc82beyrvm3te5psjr30ete9xs7ftdlptlxhb4k27u5zsbldkygsiwqyxrhn0v9wtkvivqnqf1oo1rwmuym5hnzt8ggktglbcpmd4asqkfw6pimb91zafe3bb93gt0znr3esjcqptzencgx1ajwodx8icx8cltdp7fqqmlednvgzamty65nawfoxvyn5o5zabmnbe24xtg3w422xvb38f75t89qbciforifzf8a8eiofvqfg7zl7jy0qa4031wllr55m0yv0f5vlmoqxf5cfxmej1w7gyt39qq92x1b4888rmvo1aysxeyoiuby7hi1jv0l91xvdionm0zaa4nppeopmogkmhckpxkfmt265dx1hg8doaxu193ybq6etpx7xvni4hmoj26xi385r3renijvnorquh9pbqx5jnst1z5sdaagxmqn5nvf3554p1aowmmb62l8t1okojbvrqci80rl62l4vrn9knguvvokqfhxufvf6nd9tlu1edv1vl2unvmdsp2mlmek3epdk1n4e6ujexohl9w7na3zu6gmrv9wq6g60i0mp5o8u4y4ckb4can6m81hnjahyr41b0myozvgppomvsqa0gn2ytflqnzle6tfi5xlgjhncp8d3nq2zly90aum3637c7wsl58l9hm8a7iiuqbg5wtd4729lyj1nwlfzx3wwm0ytgf6gkwmny5yi7uotijias9pvw0n2pvvwvbm8rwudbdvvlgxma908h2c874jv1utvl9zvqdec6u6iopi37veib54atxg2xa0u4de0zzgy0chi1etvzgwynstbjox1t17kly5uxlm4zyvr4kmpkt90tniqmhmidjulmh'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-31 01:04:49'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-31 02:33:39'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-31 10:04:22'
    })
    deletedAt: string;
    
    
}
