import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
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
        example     : '1oqfpduvc8dxxr75a2x9vu2lw06hg6gt2qf5b4l0g3gaz045em'
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
        example     : '92yc95kh16d0sv5plw7a'
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
        example     : 'rn3aixygdodnmmd4k1eg7tjmn0nq4bsqp3ymcf7t1mk7cirv7479f7dweoqdgnmgxluie0gm63728haiunyubi3eybjnmxr8uoqalxmuynyeppqxai2z1n6gfjx9tf42svpiqge4neyenh6zagc3ywfabf504yt5'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '68l9g9sbciscxpdx6hfvsprua9p9iifyh4yzon9xerwzr52wrv2hpclqdgd60yu0iqmmnxo4yfp5aimp086xdfms3juoiazwn1wu6yarsplf9mzpif1befv8m3p5u44cdxfx0btwc9pyti9kwnzl6b1me87ip848'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '77e3izh2m1p007b528bk7fdd8iklwibrsyoh052hp8kjk6wscv5lo1d4fe5zi3up7ynca8q0lrs9kpscl3kuabr7qjvzhfzraic1xx0887chiof4hvkurufvyuxt0e7zjickfugvch6ixqz7lfrmbq0cw38ak5ay'
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
        example     : 'uq6lvn3d2f9io37xrxztyrun9jggqlxdeb71hi0whpondqanksvfwr15fl1os7ysiup50waepy251ucunu4nh59h11ehd1u1p2mf4ye04h46itywln1b2de54oti5habzvve3ltn477iol5p965phbud8uy9nvha'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'psrqbqh5mr0pnec1zmx7e72flkh7hmv0lrrilryqb3b4wyyh7msdd1axlefr6i4pmt5alnd23ailpm9y768v1t77i33639akc429pd7a4678ab8nyh4acri5uoij1888h30ou7vdgtcsiivsliupxagyvoibanr9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gltaju6gg9brsjm9t1ti2pm34srv2dwk5l908aoqzptcjy0wg4hkrybkojjb09pjd0n0izt9hw4s58bw6r1kvvrvngh07hw60xppqtgpls66go9yr87mlvxquiongy79bedgkhsaqlgnd396umpp2ws1wxxe3pe6'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'uk3ah6v8u9cy7nrupfppv4x871lih6mh0vc37yh723kl4ld4ti452zdw7b5huyt5sqz1gugn4cymwie37z7ea68uonq2ixoexzuvaf4t3dp8aobd24vz5k041abf9ic01458lyc0fki0e5cbgmq7fkqdxswofkp0'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '7f2g5ej2t2cmdgn33hb1'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '07aobor790s2efjlzf6eoslclmdc4ulizddu4bdoy3rjxugghcr2bzzskjqbt16mjts4uwlunp9ebqysdffh7poeq2fizw4o480aaxnzxa1l0mur598vhrd8jkl1fgrk2s56d6n38hx3yqi45mjja932g93psubsrq5peg4tcu5k85og9fg0ze1gu8c6a7888mvbxxgpa10lyuxp6v66c762gi4pucwgub0tf375xai6zlt0jta8rdn6gty7ipc'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'duw8ah0nj4lrpqltz0rtxl0a037sjty6eg7qebdodem2999bxdd8jfq4opa7nfu4rak5rwyx4c8qtamlvuglhkr7f5la5rkvtnfe2al0ckcjnt2ha55e4tmy8khybu1m0iyauwu89l9gextp6nodxcf70pw2nlatj2e8nh1mnbln5gw9meayx0uhpzjpqrbqmbwt52gtfps9ie62o7oj2t5u4xtilcbb17u7997fycke4774vpncsr3e2l075kp77k1177mv9p30wikjw7phk2pqzgfq3liqtd7eljvzqigov1gl8gllte7i63hjqgjw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'gz0176v299pub7w2wf7uwvlbk70xgia5yutamgf7nphenoh6f3hgy23r9ba0gokgiaj4qasd7a77ammwjn0d45khej2bv5geow9qnycmda2ym6ia9ma0n8s5cezumlwuyg287x4w72lsi8bap6dwpgurmrnhpgejw8yy013b50dqs4bmd4ew4exwm9bjahgc431rcayjob28awnms9hwzf35qj0axrq8xk3xhrrz3iywyesg8vn97lywhu3ldkns33p9av0avh3uwgr5zab8v465y17ib14wlh8t0jyvg7hkv9esg8vl5csv1zqdgdsb'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'u4fya6zdkbkpyz3mdy3047scuecirb8udnhk2wa01yw13xvc7ao12x2l7pt51xpu9mzs334efo1pigbk9zc53dk7u3vbmyxsjj27cgioinjunygaln69842dw79mb5rad9vnxntu2b6hqzr7unzna2umgxqjiz5hm0viuitbgbqzswd9se9zvcyjh3a4kftmby922fz1nn2pfdin4y8kpu0l93pcq0ar0qkiv6znbjtaitirpwzyu08oxuxm6fkh1og6aowj6oe5cy1f34srkg3775hs3o97z996v832o1hiev0apyfy0yhsjuxsrq8sded79z18xtnmj641pyxkz947jfmd0gto9popz7d739mex8t2volyqj2u6507j12soqtigoorhsj7nxpr6xvo3uaxg4fdgq50jqy3z3kloohklhl3qer4z5vld0ynf1ojvkyfj7ny921uonjvrn6btg57kf5xwp4e93ok6xcicnujgnnrcszzon0czt4ajuyr3w7trfokwmbslpv3acr3wubznd29498rduewh2b7pvrmbcj10bc5r855qle5nca1f2gsl73w37jbgxp5ijtkow6niqp8vl0gpovw4tt0na1hwjuq8g7z8c00zawhgzum78bwaxszb7vt00zhcyhkwi8fcevu7d3905zxo8bmxcxuq2lkkdy8g0wa907c7zu39az1m4vwqvjbmzuxwr4utr52ny3ae5mej34xg3uax8uyx8lb680zsko9u1sg0s4jlvexb1azjfr4582sf3k1jpjbk48f7mqxh33eq9wmytqt54nvx6ykb8llwskdxb5whmj2mkhn8khou26vd05mjy3gwnszxu1jclrgy00xdsj4dejpr1ryq5ohfiq5mlyd35xtvo9g4s9o5axsb0494s7os9pujers2z2djulkd0c2m7tax8egsxx1fng6b0f6cvw26l4945e7lz4noflgkgi3ve8pyip4vcxh7e6il7ip55bhl1inph6tn096aimk'
    })
    parameterValue: string;
    
    
}
