import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cb486ed4-d34f-4b25-8484-0700d59b6920'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '073722f7-29a0-4dce-ad10-e141169c73c7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6rgwd0wg0zazrgmiwdz1o71bship5fm04vt40wjwq9u065ixq5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8a758dd6-1098-4b46-8fa2-1e4b6a646e36'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gkvzycmc723865olbd6t'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '4ujfwnmm62p9rhbv4gjray5h4b468mbmyl2gcjdf'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'rvov0upjr5562rv1qyyowwyj6pazjt1mxcqmviskfnqmn774qmfx0hot36xgez2jvbdx6dwn9otbvamnibbfaz6mof03cp94hkpv24u71qfbw2hltm39n0ox212zqtimiqyueocxjb2x8gvf3bnkl0qz1sqspgzb'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'ska6opp1eswaflldisdygl8yvg7mzipj94od2cm6im81i1fs7y4yzhoaae35h1yla9l5uyd968amw4b3kur2v6pi2rmjypxaeopvahfb5mft63o80y6l0p56p7ca2azi28b3hvok16tpzuwzr0b5z7c74skvcjrq'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'e2m9kosrack41c4j93oon91zkahdit92xewxfkj9hmmj0itdqj2ugvi8mxcahd56mt1b0ip02thk4bc81wby3sfkd928hsigww44h9v08hj1z8wi13p6lldlxaemv3dlhz8tabm2v8llee2psw9ui30gkffo68v9'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'rxp8bg59kdj0ynwieyc5ipy19ymwv0l20655tbsq'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'c478x7vea419acef7pb4x69ss9yv19nsr1cef5mlbd6gliplatqkdk3nrhuoa6o852zi26b4kmyj2tqn6xqw4li6nhntacryg4gkhldewtpcmfxnwq96a5xwgvy7x1e4oxj073k2nwsahhjgk1kd7en0zdfvks3e'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ss228mgf2e5x89ztw0dzr1hzdaro5lcp5tda9n5vvt3ndzdnug0wq3l436audwsyu4lrhgd0mrocyb6s6gof2a3a7lcfn4jleeaelhva0mcy0rev32c3ne18kffe0jj1a3hjgaphyjz1vxkdi3tr70p3zyg5encl'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'jy8uw3t94mu5lwoug7hhv0clk2faa6t84wad6uazakb6fk26q2j46b2277g8m5021ibdg7a2nb5d40jx18ep7qx6k9tn1o5ibh6w4ny1n1gvfd8ir0ny9urud4i9v9gjbrkldp4ije6pzcdx8v6by3fdklbeyw1n'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'gyu1rsnaeid0atejae9vdthvgnxln4wf1yvntvveud21dg2drqyyi1tao4n29b7ofolkwnr8uvrm3upn2vyymowbqda9vd7irhatub0b5niz1rg1vlc9d7mjr2yryr1p7s9tgl3yhcmhzjr8cnsp0d38bnu3ocl9'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '8qf2xzy15ye3refqbmq4'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '1agyqin0rj0bf0brd656foiu9vlz6e0mv8cp26wtgf2ze2jp8sonhxt50wqyz3okzpfc4k3dqjcwe6acaami1bvfxfzz7r5youeia08yh8kwan083bp46osy5nwoy4x80pjz3kjwh85b722kbmy2eo8ggf719btp64iw7s2gn2gvem1arw2qvgf2z0yodcg36iehewtzv6k2gt7zzwyp4bc91996il0snib38u9ihzqm446mchduafru767h7dt'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'wdnwsdpzk2x4juvd4qrpg0yvotoykiz2kvnifjnhksmco2j2imnhvqigvpv167c6dd7b4ztek8g84dnwy80mpavtmhvp5cc92g7xj023qs5yas3j0n0rn8xa8qyllwm3kjrza0z1w6sschall2ghxfd0m5ozju3wff88liz1u4motsiijkf9pn3el3ovy8rugpkgeocrt4lhz1z9xl0ujbrm9h7xuvltyol1y0pbhsr31e5tgsvlubbg6swpdikwvz8skd0kqvqrp1o1wlud5mxpjycqj6dpqy16756pos95mpik9vbli7ev6s3tvurw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'agi5waxdwoph9nopllvellcyquvx0gp62cae132ssg7kh5unnik4zafkkoibtomuyenoruayvzdfp6b4rmq6m3s4kfwqceq1gn8zd4l4usy58jg6w6hxta625nfpix5nz5684t7ynmt2u5bffuxlnz3iwkfqqgclr8jr0970w36nmpy5qo41vuyqgv1cix452kw5kd79tnxdzv3gizw9fgujmdbt2e8jr0xo1odhvlri4juc43pvmhnoqoe64rscj4uzwr5jmrnarfrmjibqd57dkw6ekl5l1w9kmlz7gnmep8cjq5vh3rw1b94rtrku'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '5u8pzyul732szqyjwsc4xlglizjzv9of29lll2sp0fqkzxdbmtjk61ibhobf8i6hr0djhwh6m8jfsr0kfqlau12ko2wd7aburn8yqvoid232yk6f1jz8x1q8ah4t8opkyumqpgdiste7bk5sujcbt9cq21ejwcl19fhnd677v2w5myac38x9815n6dyt0d5m22tnepgadphjgocl7n7tcc7h00jtwo784zb89qrhnrurvltjp69kggxhg99qeziok1p5db1pyzhdcbd8t9fvmeiwf3ta69238ig82c72vqy5105v9jbc5xku33snv7rpo0xmr6qppmzh30w3t5avcvhqcgupdza0m6b9ocd192ntiu87eliggm2pfx1ken9xa5495g6o3eul4sfk6bk7ybflk6cd701xa4cn5gc242mdo6gg93dmuc43lun9jw72ifkgwa6b0apsoqell8434x1sdr927jhc318picgg6fnbf8aoyhj0knxe9ls8o2rdc91hnyi5ct6idxxxpvwaifn0bkghzsb54ka9yvws53stwl13ep0voiuszkl3g4i4aw5gqsazv1oronj7vlb4h7qa4khcprn6rk3nstujqnhoca050ls6ir8xemdd60xstmg91yilia10yt3xpfmvcmdbajxa4te8xiazwd4z66zssowkrnchkrlldwwkyn31i4qscgd1dtysyxc7ye8r68ps8anjex9t6jii892ndz2z2nfeg6wwgsx3rpzw677m6cs5yt3rhz726vi1628k3miolc99to1ornzc7c6uqhsag7k1g514i8at9vj4vkggzwsxydbo1ohngl8qg098ofhow6vrixs14kmodzsgkv2xo7ugroae3f6jdr5vpnse73dsu1dr9dw6r151tcd7q6f7ddc2v1pe055u1qw2hpcluu4obcf3aelli6r76mosdjlv04m6wd5edmnou1ri3j9fjazp8f5j6vwgnirnit87yjhk9vqhxww4noz0ykia'
    })
    parameterValue: string;
    
    
}
