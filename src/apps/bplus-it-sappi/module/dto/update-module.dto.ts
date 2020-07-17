import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0f674ca1-3cdb-4a61-807b-919d863d4c0f'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '436770c4-6933-4d1b-ac26-537708dcc61e'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f9988556-2131-4373-84cd-e987a0b26999'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '66hbf7dd4zyit4f9lg8n'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '02e94267-39d2-4a9c-a6ab-de074832770a'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'vxxeawhoalf06xvtodcv7hfv8znna5rrybrmlfd9rjo0sfkquy9uy8l6r7ex75ju6rtp7vi8s6sxx3o9p817lznrjfzmo39ie45kjwaecj0pw89381oy4iopgztzaoif6loitza4vtvxe1u450s3jfsisqychyvj'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '86v734qnlmcx5kkx1raiolaj9l53f5f4l4iov9xpdkpemuhy6mdcma5x2sfyk2bsjjsorzdyq966bv5f3kgq0eholnujzxuz4yigte9optykcuqwic3vookqyfdjo4xtfr2uzm4dgk4qdlmce5owblkfy6muof2t'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'dur4a58mr5vrw9l5vt320ddaxgbf1agxqqmdarus35qxlehimrhgh0yp244zmawno0rvy79btgopoxw09kfg3gbephwef5poy16e7hfh2nsj7hwtry6h7nv19bslzd0lixswxx3ghhjmw5sb8v9g51r0lyjshrbf'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '10gqmqco0u31edu1u8zb8u0uam7qq7gzr8im73z3wnx4w9zelggug7fyyz2j48j5nmq666wgnxja5yqsxfj054mdjc4imskgijh769xqy7drnlveu41b1ir7fflowsadmsv6i3flhcmzsk4kk4f5t9zuoadbu7jp'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'cd9e44julqomk2m341oel43kowf2mz7qb0qcx6t8sinvc151h4kx6lqebffaa5dixo6gbbyiz5216q7vqo0hbnt5yed0odnsvm51w6v46abfwz35pf5e21ngh72zbg7wqgvh6oo6lev1upl8yj5nhvgzdm7prpdq'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3yfnw5aaqopr2bwtnyim4x596dpkucnr0d3u4lxzk184t02eo6ymim9o1n96hloys6dhv4urian3lqrz9sbv2rclpdz0mrtdo9757une1y13ebvo3wlf9q74nnfapbhm74aash9qbwqh3kqt7q4rro4exkgq6zbb'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'h94tyjr4gva81iwdfpg2vbwbrj33dhjhr7favahi9t5ogwrtizmc0ajiatn0ti1xiayrri88925d99wf8ay9r5dq19dok5vdymdegu54wmepzf8l5nygincnn37e8ok4fa3h1pbh7urnjcgzprb7wz1m4se22bqw'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'fxn3p97c1l6nnytk2uuc4953834nho4iu8xxo6qcucye5m8s6xj7ajare2xzjerj32rkava5gersg6hnyc0ezc7m1ytgt26piy5bjjimtnsxa3tyzpfvbr05naxwk0hgpos2bo917betnx1nhgn32xd1saglw3i6j4kdpchuoy4jyw4ci4n1bvpuyqfamdva1ulo3hr61efy3x29abxm05nwejx2qmpxeduhw5s7tcu97q0p0ncghrg593r3hz4'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5nnk42wvvu5xsex9czdu7u64db7lllnqzwz70curerx5pctnlp3nvyiqg36a2d15o4kft5b2dzqqckjumjaez9b4k1yoydfcotqi92lfhqmxty2fv3ujactqm15nt4cndqq7qeaj55hwihgxtmww6zfopaiftd915c8tuge5sa0mxe34mc551ac1asr4nxm1zidez665q1lar6qa11zq9npq511fynxnjqt8tdv57zvcf790ma2ycdmxr4i2h62pbvm9xnok1zkawajk8zhuhynye72q00w2peve8va7b32w8uaobzrb70j2digmp55m'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'u170z1v2ycl5s7zfgt13h2k13rku85c5xk0iat9syolps7l2mqegx0ql7baw58b9sgp7f8nsg0c2etvt4wxpiuxd7f6br9ao6vlvxs9bz5c0dlx9j4gsgb8shi11lqyoz4aduglddet94eq98fkkd4kdj919b9i1k3w9p0lzdrir7vtokfnf2gtxfr1w3h4wft7mnv3urx04bm50wqzllowq5vyyufsas8z4pmj1ry015zggo9cyx1jf38dehhtpco1td0u0610uhlq1xlyt17qovhe6vvle44wa53ip1co1gieguzw18znlulmjq5rg'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'cwl9nhlkvcr2n4q1eefc1mj68hmrezyhqcxshrqwm16hwvuujrjb1anpmvi0bu759xmwd2p9flfwz6pomx2rdq9776dc3hu1yo8yd6064pkgfvfogp3lmaqnr5dz0aym7unzg0eoreu8bzpnskhw8e3fynbvu7obsl9reowly8mss5zjlzmcsg28eya4y40ijinuu45v34p3f726klbcb24uh8j76pd2firn5qidpmie4bt56v8mg0zdul9dc7yilzu5zgoamwd7t4y3k8hcon241zdlkhoexh4bsuvisbvrsu921ibgkdr0qaexo0yt2t25mhxmmj6zfxj6dqxi5c1o7agedr8psx8kg8am3ojtnkx3cnzwbmiorc4cvbxxwpqyzhagpggi5rlp65ta61hgp0ljcn4tydrs01vozo0f85hu26c906j3d8ndo331me2nfykldl4og9pygq243gxooy4ju9xne9mqpgr6jvy16gg63am4a8t0702gz0jcdmrxyd9oownwibeivrmzyr8u7opovykaohm8eau77ar15gp5s3o83bskim0teiomx3urfck0lrcxd5euajpppbb124h9fwbmcr5rsad04i8shbej6db8ik02eyomnvp63xnt8asrgtnyst39vodr3jj0unsh8199sko2pgne1wzmye4k9knuu00dp0oou07p695dvq388yyq1lvimslt3niqvftbppac5y5tk55g8bfwtggprrpd2fquqw3h3zxmgmyg6rbsqllw01qj5pmd3ddmiskocqz87mjptjni7li0aj2wnc793545gkj58npo3uyky5ioibhc5nuqclv521czeq48bdb3g56k6nsulol28o2x7scgqggam3be6ti6pgs3oyzcg3l4678xguq8d4ywh5a9zsq135y4xj3d679hjt0zwxuy65rf65b9ejgm02msceslrep2c5rjqi1c0h8q195k0sptcofq5n8v3c6xg4p3px1xpmknc0coq63p'
    })
    parameterValue: string;
    
}
