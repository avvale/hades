import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9b46b3ef-10cd-4e63-81a0-dd0e41f916a5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9060068f-f191-43d7-a82f-9f4383d45192'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'eb1p8cpab15m1jj6dq1zhda5hmgdrs90cglwxfzc1cyjjcol9y'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '45dc5cb2-00a3-4690-ab1e-56a4a7fb5628'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '3tuezj33jthueuioqt4g'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '2ebd8c85-6286-451d-9c45-cce811930df1'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'hj22ghqck2g3iqto1xk0st852rkb3b516p3rz289pgw90xsfmd2ercrenjnhyh2jb0dur8ltgn9af482ks24ldt2a0df5258mwusz9e4s5mqy8vv3ymf9apd3bffn0leg2sw5m3m89cb1609o43z0up5rkm6vnss'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'ffwx4nwygf5rq1xz0c2qsxy52b6wvzz918zf447rby5neu00ix7v8b583z9p4k0aemyi9zm8g21ku5uhpssqtk6el7th5asofcupioi7vlh4n2yodxjfpvp2agps9e04mkd7m02d2t1vpbo5ya3ehd7htm1p2n0h'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'r9oduc6p7hm6m95atjbtfa6q3ud7w9oo450a6jbewdcui54iihauv1mh9p3cttntgn9zamlhov5reptodpfw27bdfg53fmmpqju3gni6u8858o1bfegv0zyz6k2p1wt25tr99i462lilmg45arbtv5p78qcyjnlr'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '75ed4c35-bd6b-4793-a9a2-8c77de318c6f'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'th1vobn9428r1v38b40z3h76wl571xjdranxpnoc1erwshl433903bd8ui17sggotz9fk53fizlh7zm8nxe8sguw7q9a3nfhsxxzdyl3oy4zqpp9aby4trw9aph09kqp2q940h4nilu8fo2ygq97958t5ueqfm4r'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'qgfm3mhpbpx9ioor8p8bht0md9opaa6c8ic025pyapb7trj21n4hq0nbh85re56og2cs44fn8cg4t33rnk3mh0wlnaymsi6itk1x5969avjsffwtf9l7rh3bhq27q5s96rxbhsjnsary1u9z5oiplc179ac8wkl9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '7d4og96jsu34j0mwlpwj15o03ui8obasdn0g33rg2l0fsfrjbxsywssukpi86wotvjjr3xdjrahpbhzq0q8037vjti58102iideupovfeuw0ye73l88sun6tuip5giyqlq3frz9y903qzt0zwi2muit6cdddac9f'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'iva89jh6mfhm6buso6w23i9tgi4e8ttgvwkof1oy0oh12yygjxip2yo8692yqex9fetxskrg4sn7w6c2qn629iq459z1ix94p1xwp0mypkj40rygmzn0oy5vsjqimjc903rnhf54i52rvy6vy0jh6ktuu86w3bdi'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'essteoeey45noztm87fp'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'cqn8q1om3c7ngz9atj3u30flcomxakrkaasjiy7koilu9c4wcbcuips4lquomgzr4hjz30htbb9d7e1wob5r3m0beswxicn87r1b58bosi67hfz9fyxyt2wu82q59a4pb28cv5yjc0jrhvp2ysyy09r5mva5edsooyzad8u4htd2dipulbsa7d0y2wi0yfee40xxckgscc94ftygy2jcv7za5hp7y1dok335hh6jdatsaywlvdlb8dr09dhve9q'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '0nrqlstv1mqfivaabxclnr6keu4qcjv80ijvccjqoldadmtr0uapvh3b9sk9kn981eoo92wn7qdp4co9ej7wv644geyrfhborbvs7hoifzgx4oqd7tmnbbknvldvvl4ghrbzz2rh8gc5fmcl8d0q2c73fe857kykc6gghgcbp8kaq52mxbfqucce0nkuyowdl19i3c3lw5074n3roljmjlq62glfnsehtdedzor7v658usj8090tduv6quqqedbjkmbvo267mkkgzjg6s808tmlasyz5o00ce6vwuvl0m77x4hrtib99l9p21ytmhiyx'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'z9uxzxtrghxvqxty89dmyxkgt7r0r5ypztcxt2sne5wr8khpno8md8lkyqposqot8k0y2y3qbc6clt4ly7mfoe43tudjhjav91shojq939g1e9lg9nhdpgbh7zldxerfsn091g7x4318mk1qwg19qtzg5yqswjaxxj4vd9to1p1faz2gmiikm880y2we0duqm4c1tkx28vybbm8qgg3wy992xwtrrg8l0hoadptmo7hgvpe14qinorpetg4354ttw9n7i08lbb9mxdjpqbfr60xbrhpb31r0en9qj7l1u7tpsfegdr0xncieg09a5b9p'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'v3obwidy4ltcpr46liaehztx16dzwbexc8stcpwfa2088hd7k5afprgpkk5u2y5u6etmlqvlmcq7h9yjthexn1l1vs7t80g8dwyohotxgcgq4j6nz9ggs26p8oruu6fh8zy858gez9xt2ykb06j5olw43qzp8l0v0dkzvqub90ij3jbve7rvw8l4tk78y00fv82tp9ksgrqdm899x91mcmfct9vlq98urf1ffc03wgflqw1me2e97lxwxsvy4xz0h35o8z5bkx4a87zp2yv0lsr141b8hoe61l8y6er2icflus87dv8plot08lnly6ilzcwj35xvtu8oev5vrlr0qbevmu129wdrbz4uihwpkqz5mhy9xkrdf8sjx8dpvdh6jox6vsv0ljsp69ke4npe2gw8ndr7olfwbhr06e633dlyo183bfnm18y0hmz4f4s4n23l2qz874fx37lqb4yyyragcsyubdgo1vm8hv19uj6d66ed9e69mxv4jarj5dtsad65sp99uy6p3k8j20r07csbopvcyk21z6ivo3ark7hiacrxe2dgm53fx98uxyyagcc5tbfrb2dvarucpcnkw6bjwjdqasf7h9km2q4bruw1i5k95bydpqxis4mrwgcjjydiv9o5g1diuudj08nixsdb19hg1239tn6etrck9n1tmz30fizdj3xaei4620k996wdeb5i3qyczh4162qb3s4u6xnwb0bibhl2apji66t8ekb28f15rsihscbmvs8rzs83z0nke271s7ow5qvmlgzaebon3lcp8al3cheuulxvcqsm0qzpfpafinasvya2z168q42k0vaa1fjl8karee6d2dvlai2b51jkqm1lv8wgvrovmx3ojl4qc6i8l6nphxota1hloge02ywed1pjs7me4pgmpm7v6jpcnw9v4o31pmqkdr5qzivsclfkxsn0b69cr16l6tkwicdrvp65sks2wxqrjmkjmhdteb3x50stj91yxq8aoz8dx7t3n4qb'
    })
    parameterValue: string;
    
    
}
