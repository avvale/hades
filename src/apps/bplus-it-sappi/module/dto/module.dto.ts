import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0d2bce69-5a52-4b60-9260-2ad71dcdc504'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5yqy9qte7vykcs1elym33cm3pkkeiqyrdumidjqq6kyp9yk7sp'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4a627b52-0a81-4b72-96db-38bc0da009b6'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'dbc6vv1k9hc2swi7tg18'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'jar5ws6eyikrje5pl2uplfue2m88rdwieom5cz600nzr77gzeeqr5qcjjdkpt3ciz29ttv02ye3afbeg7zl16a1wsjzzpl5opwbrgafp99qb2pndowv0lgkyf8yx6bgokcq3ibiocu2s23b1pqyns83wbpsosjnn'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'y6b7zkdr5prpncgmh91r7mko9g9380a9d616kol4bqr4psfpyiviwxuh4bjju5kv0wzax8sqxucmun9kyd5wekdg3kcblb7ew9u4cbo35tz8uzb22uwghbfdjio8k933vsr5pu0cecfsbgubms7v20229g9cymzm'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'd5il93lomx1v9h2vldtmwmfcxmpvnhjrfu3h8865swg6tmi1ydc1g4kk51i6ympv4md7ppwghznhbykn6thyw9tayhx3weg39uov9y2vm89snyir0hvkoezzuxakf96f9prkvhsdl6vhx9q1tl2u4supfitgfywx'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '1fe276cf-521f-47ea-8574-880d952fa56a'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2xq712domv3pr4pzcuvgiv6s5zcnqjyvwk42ntnwwirgzydd9djz5yx1c28xdpujii8fem2jiu5smwtm35rmiirue28ge86i2zfp8x6neii40yc1vjm2kp6upzzk7qxx4jv8xalxjl48a225f0s7eaj1bv7t720z'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '0vns4dgu6qst5h2umokzg72fn1r60seebnyuo5on86thpqa29ht1sedc59fkaikseh7vynrl414llmolmmxxzyyzy17syozfa2ze6f1xs4kzajbryhgymd3xhf9qvizm5o1udaxityjpgwcqko2h26o7m85r2z6p'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'agk57p3ch0x9are4wvvwlxl7v28u2kza7qbwcv428koon6vpusf6dkrscuw4b18a76e186u21h9df74hmcom67vh0lv72g7rvk0pfbga1vsjow6lmih33m3y0hcadacb7ehdvwkvag87svody1o1fv9l2on6auno'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '8d6obujuxx9wf183i0zujwkv190qjzz6ozv5hn20mfkoaegj2u66vn99c9wyc2ljw27qywi1vfv3v2crga146k2p2wv4zmfplxjqqmf1by3pkacmgivz8noy2nqj0jvyskhm7b5lxxce7cmokiyfq5rrlar972yg'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'ov5pu4ap7a8reg56ab5pxiy6cz3mo4oc1gmr0mz464oincindgmk3wp3z2zbnmv7uo2ubybiahsyo964ubfftel8mpb3gylxgkjhfjuc63gdwaw5hrpq73dpghetx4xyhpua47v22dvlvq4xaq1hibad6ozejuu3cgfrflwuuwcomp4j2w33q2na6x6q7m6wh6mdbrssrvq8qnlli0bkxjehypwr89bni5vt85e5m92mt8thujtjexq6o9fcoyx'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'd4qgq1kyvuughd669u116bahyhs6b3c2g16lgvx3plnylu3fatlt1zwofn2eprt56rzd01qqm2wbe0qzanu08yopsgwsgx73tvfw5f5fznqk1ka8bd1b0jj4m27iciszmf1evani304n03cewlr0dbs34qraq5n9r2yh5kggfx74dps1lhzpe5p6wp5k8yaakhl24xpf3y9l7h22elnt2ppwj1jfd608nuzzscsc0867acdb618w7koelwbmhi0ctq8xae0056fr96if2242s9ssx1poh9jm9pd5dkl8wwldwx1lfxuttpzl9qt2xz9p'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '37hjj2j7yex7f15hlodohaze168zhi7cb6xsfsik6krcnnao1xmnu91l10ntytvfy663p808wkup3axqja8he8fyea9pg3v94vm91w6tnn5otkr40uirp228uoih7h818ghaifqc9bkwznu9ngtefhzjqdma5piop10t9jnc1ocfgassactwcud7ap13cw5oh8jsd6eq0vdi26gpevu1v586nic5ndue8dp3zck8bfvybj46xotbz0i27rawxr1pmgls4i6k6rjf3izakivqi66xi63z8houxfvrqpy0kng4weml8ktf4sm71oga6tew'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'jit1y5dhob825e37d8dudu5nf7todqv2xq8rwl3jcungf8l5d0xvuhi3l7p7icop7ff2lftxrqbju6s96naipr544qyiml7fa9x23r6xk00e82yp8ip2e86u57c217i6yqhhrxdddxjyrzv8iffbnpbjtbslh3t7xfu8mk1ehix5zrnjm017khzrxssw6imc5pdieodn60jywswks1bhv5jhi998ueqtcadzrrmcv82h0piwh7511t2oxfyr9i418urvtmjsb0iutong3q8t2xn1787j6tvg807knlhxmjeyrg413y548fvc4q5qk7col0znb262w3c71ntsshtoimfps3tiuiii6aem6wdukasfzzw6adqj8jvy4h1t71tt2krzufn3bhjbhc58c5liqub5pdgfo8mgt1osnvzairezhaepqjwxf4l86va8zmqcut3dpw7hl8c6qmmrcjksm9lenjvq57rgwita31maov67edc3s740j1rgjbak9y7441rqkl8484v2g91avpiu1opn86p6xobzq9nkj9dj6st59j6qdx0v5ikycb15l1pj1x4ujlfrvnihjq36r805tv868lioklcppb7ocjmlu4vtuze4ef7792p8o96tyyxzr594lbal681gwnzha1a2rwptrikeixckunutxs90iwd3qyf5gchb0rzlyhiw11umhlpmz9602cgnu26y806zk94tj9t4ygmk3cda70j51rhxvg5s0khejew7un6xxv2u3df7ehetk58t6hvta50eggno83dzt0fsa55os7vqzn5gikj6j22pf3hyydk0fu4ng92fs2ndtcxbls2uxe8f65cf00coyunp9q04j07rg09fe49rbtouiurxq9ozb58n472segtbnpjo0z02xtfy85gxwmpj8hs66yr20pqdvlmc3hu4mukr8fwumbowiivye97e8bobiny8t8y4kefi07fcuxgr48n6utipqmkf6t0xg6dijeig8cizxjp6usje'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 01:45:19'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-24 09:05:18'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-24 00:08:29'
    })
    deletedAt: string;
    
    
}
