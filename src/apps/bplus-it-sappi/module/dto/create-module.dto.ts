import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f9eac505-2b8e-436c-bde6-362579397dee'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'l7v7r2touzs1jt6aih80vxfml73fsq39bs0vmpzrno4dzlyszw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3fca352e-b2c9-420b-ae28-cc3b0180d0e9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'wpkcsf57d1sesic93j7s'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '89d14c19-c13f-428a-ad32-e192517b264a'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'bd9nzzw0xqxvz8z70us1m4tg3y3q9t9gm43gugnig3q9ntmfl9ml8jll22rk16nxxngqia20i8vcib9odza4h95375rlqx9owkjtg5bp2kzqd6omfiwpameiqouk432x7v6am3mrhsw2rltiaf57gzmtfbglcoc3'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'zw0pnuooxabalrayqixsdpyqgnc783rvnakptf4578orew0qgwm908b0yqijcrs0p80az0l467kvtfp50ho591bs00leztuw9w28kom04uqgsdhpm5g1breag8y04x9wjjhm6oddnlirbml69aj54oofon9v50oh'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'w0ov2yeoyyz2zzo51bgq73w0eamtxahpdg17x1tuvk7y7hd5804s7n6plsy62q0xx5x89d3v04nnekthm47jlnsq8egs6lu4dup50qw9ml8rhf5jml78cqtl7hri5zdgdym9dclzonf9rokffbu655faggszvozq'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '5723aaae-200d-4be1-9590-951f2728fbae'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'rup428als882lxaijpbsc69gea54gxmx49y07hikppnfza14izkwasbr6tobne9wyui12p6wi3k67wa11x1nn1qjgs9xmumt6ytd6rzf8rq260hyn5wzp40nlh504cxwpugutmahldvvcx1ovef9pf9efdh6gdil'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'rxn42b8o8clcck48k7ydzwuheuc1k4t7ml7oxbfb0iwbltzscjnx3u01phw8dtisj43dvgeckffrmgk410gq5obshar5y2h12v60c80n7jo14faoesdou7s6y7v6iodv8jrth5mf1j4xdsblwc96jdiou3re5g73'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '1wmvejdhmy0cmfi5buvtg1z2qfsssh214j07a8nq17jyruc891arvuu90yb1r7odrp0b5ab6xa8b3mmmkjk28eiv53lpiyl1tadmi061umrtmsie5po6xv1yq02dwvdnsqmpgcpmzggimucannkb7dkvkvs113ub'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '9ah2q7t3c5cm7v47ko7elzl9dbezwhvojguvw3ef5xa1w2wd6162393r20dazncaipqh9asbbissgxqbv7modasecvo7cse30y32pgt8h9iwqs8a44qjf3xplfqb42qzmutwl5xah97sfhykkzgr46xysb3qq0yg'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'jgahc0697ah3aenkgqcg'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '5lp0f5da8lyp9pn0p4ajk8m8x64cx7vloznzsxhz7y09fpxum7i9uxg3ulw49y14cimvxbr10zbvy8dkffwvzuceat4paoj5k7hqto3p7jk84x8iztje4ar032vs3v35jm365umw8lrqxneicgcrh2xxrucchcvopx5ukf2awupbkz3aoau1ib4xu28ys0q5k11o61nxdcc64k7i2pzcy9a3mxkhx2v6mnqfwxt53g5vvpu0wt95tll85uktq6z'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5lrdmxp1xeijoqiaz1qosbb7q985o0i56i7c8bsjmbx1ctccmp2sjhvd0bdsw52i63xv5wornw7zjdyizqjwwul5b7i1dvhc75oax7flrobapm9uvrx2updgtc1gt9bgptgs2mz4to68w2w2d6a95zptbhe03om7z2rhc8nojmuvvy2l22ww5ctg4ocmia2wdr9304z326tbvddz7s015v3evsvyfuwvqztk13jdpiq8tglfk3qelmxktmmcb8m7ilul1zsz2un75k8izi48qk6nne88ciy8ztrjrnkbmxhe4zmiof7nuc5r89zlbcgw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'uaf692869vkv58zl1e2bfvok057tp974l9vsr7cxnefawgp726fztgsmhu67ifjmzk0507xle6uk9o8ed2jtqjigs5qh644f1zyq8b8t44cxrmshoh6ndh4vrm0bieym8a6dv2c8u3lpl4zzie1bh4emzzryur1sb9plsl2nnbfpslb73j8n5gqtubn0bcvg2o8rdajkt1hyzb9oad2c1zlblro3ht6bhesd9t2r85ngnyudp54cjjrn3pt1kw956huhh2qqji9mk353ubj2ytl9cbq6r4vnowzycpi0g3t00fdrclwjqdimw76ly0vr'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '9gx6uctn16l3kfsj431g9tx2fue502bq1rc5ikno5v3t03c14p1sw5do8pyqoqca49nuvgaeqi05v8jj72q792a6709zif6tr7ynbt2wmyzhfzwq0im7y38ibi8t8q8lo80ihehy1g9wnjpys6amiupzcz2o239h0iuzh9thuxwwo87nrgix8epiv903xzdxfegs26eba9xhtnujumwuauwxdzhp6f2crd8jwl7mxvsp564lfl0h32wdxcxebuu28iateb86nlj0bcn817qfoddl51fs3qmmxexo4u87xsnkduz3kq73b41kwfi64yw5sfybvvgh18cw9uc0ftcx7epsdw29tcz1yk4bx0x4phcbivs0fge46pu4hkiimlzdqx1vq5qzhxuqjxbculf60rrk96dueha5c2gu8736we0fui9vfyghdbo61qo07sxs8bwngra007v6t4ov270ndoecrlqu0hbpataflhytlo4wppqqq73qv85997rl3ryvplpwwjjep19u6otts5h1y8718j7pr6nwj5yxzgivju35b8j3hws2zzhmgx8w3yg5m8pd0a51nolhin7pwte61wkrxgcs65yjbwsloi2msdv6gmcgjqpzget2o2vpkxkwty0ycx74kio0yl6t45lshc66abltmdv0b5c1hi0c7rg8gg2svvgezdsdieyhsfv002wum4pj9c2e0rmclsh9lkiy7jbhlukh9ept0gv7yr48vno230vvudh4ntwnd8003qmenq27cax5a9ckgmtnz0xlzj5ms0t8hlxiyycrm19vyfv2155qyovy5aqxyx9jardojvs85dwieakdyvczffqr65c5g0glfy865fde4dgywyahx8r1gudjeo5d0fvyd0wn2oj3sck6espf5ftd2jw77uf5nhyjadznu61tdy97sashn9jxh225mbm330lpc49qmcy7ujhpcvgkg3w0ok3fmuzgj4u9bages9cov7w24868fyf8c09wp5nsvvug'
    })
    parameterValue: string;
    
    
}
