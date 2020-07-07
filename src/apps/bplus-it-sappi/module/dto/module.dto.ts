import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '34301028-4942-45fa-ac1a-80ee2764a9dc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'cc916bb1-7995-47be-8a93-30554c14395f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'mgryb7ofaemy35t96caf',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ttguxmywml0gbffv1d8vn4uthkl58ci92euo8kzk3ai839klyeyqmxv6j2h1pv4zbvfghj6wammnvfx8wess5dv5iafn5b5wy1twcked7fv67r60yib61p2wwoes9q1fxpymjvitevd7xscitbqhkax8uirwwnyf',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'a1tp6ku724pjq4z4a6ahy55lrjm84b88m6jtm1rhh2quxt6eoyradbl0j3z63lhzqvw0u55e84kyj1h4ib9wnt04p3gov9hip1hapv4e0can9taou4jm36mygat45i9ajcmo67exhsx834ynvf3hc6lu4fcfrkbu',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '60oozl6om0mpws83xg8ciql9wuzhkyhngx0tmd0bibecuyc7rvqd29eg52mqlrj4hnrq712d0j7bfcl6oyby0u8qnmm6la336ra2diiaxvuj5zmttqclyokots6vze39kpwasmkddigkrlj34932qyh4j8eaio8x',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ucztdilpthe4xe4b067lleft0okjmg446i3av6iznv9mjsbo08byfzimx13w0zua7uzdgvvrc3s5fioyxr6qzc01yezvsbw72ipnoasirxc4ic2z00be49dq0mirpe0scdv2slzj1hgwtqmvgh0xwxm7gl2hgauz',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '6bxtpfm0vtl30paxpa1h1fdgf1gi0oz4uwcbmve8numjitgh0q8rqocovo8hjharw4vro9iaa2ch0gzmbjvjroy88hu4dg2pgj40bhfx1ya9ym2xqipkirxr94yfxmbnlfdbuyjlqpi1sxv87oxkgav51vjifcyf',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'qbe2tv16387v2s69qja8ecaqmb58qfefejj3v5egujfgmdlse31no096fj0n9c2k1yxeyet3eoipyoezllrb3qw38jwacttmps1wtfhbh9o4okbqy7cxg4hge4j8f7s60noibtc8t7bf44zkba2ykzf86vqpp7h3',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '3curqqqwqrordxahsmthcgkstzjy4k136j0ea69781uid3w4bng4n4ax1z7wd4qi89l20cxkxh46qf1e28bldk9fulzgdq8regkwt3guibqjj4xp5d1myj91ztqswkdvrh4gofwlys6om7ssvjq1asm4glsm05pp',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '0y2bsdeo7clww0otjw1sqtjzfln13dey6x0jefbmwso3kn3iy5zenrcq7hjxwekebgj7d0kj5rs2081epstkefdew2zhypww6usdyi2okppzcs9eci4ol96jyjrmdwt6mdmef61r4dxnlyzqvbyduqk1b1q33ygffutdk3d4nz5zqs7y9ym7wgx1zer1fwaqt2wcibhtqrtdx29tm7i3nnz2bx8oynk0kwurw53knsze8msb5inz55yo1foipd8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 's7dattss3546c6uut4mucy7ttq1qern7o3wx1qjy59a4ezg8r514vsnlf7drbwqvq9ag44nel4ypl8exwml2lxlowieeiffxxzwl5x045jlmjmgo56qt2hxkdt281jam7xbtx6h1qyyh9klmbiojx3infx23u7v6kvctmblnlompw7hhnuml7148dr9wadovethim9qqi4flq2e4wnjw63jka9d0h3joxb9i5siox9y3npzyguy79mreke1jbjx57y22meh8s77nvkbpizfwisth5rwvuier3i40cvu3klaou1fw4q9t7gdg0qlyj4h1',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'fr558r6vq3i3tpw3sy1jedhdohbtow2ykmr55klcjgcl5z065tghxraestg2tr546segw6ql25e3czw8ewye1294mbwgthtoy73ainixbb3no2ocnz8m3eyiwydmi3qmk469in4uemdzna1tz818k1mkfop26iq5c0weaxaj5i8h3jr0fh9008v1o5itaa4383j4ojw1vavyrudnql8atzd8g6xdsatzewke9m80sl6siu2k6pjyu5t4oao08nmgrimm89elporvod928voigniubl7s2y24bre1y8p2cjzl7a723h30gf4w86dbxpc3',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'kidlywlo2ipnkd4p115pz7j4ccmfisjg6g8x6qxmulwb5fcvnijhinp5g98ggrgmowo56qikz4zo96409gqv1by4xz6w0xsxa19gxx2wy2muog3mqgxnc7xh4df9p44rtbulob55zicfr25lvyhz2st0sgltovr9sbu2ekjlomtfjhsh29av7gquq6w1invgtbbfnuaq6duc19no0zjdh4aa2fc8m4ous6uia5abjzyo5pt8iu7w3ulwli8uhlr03r5j7jmolj2pus6dyplfpz3qeacltumvw7mxu741lb25a7120jv9gl18cz0euk5mybs6d3a0oh6w9wx3zxlflnqv83sxlxol8mrc5tdluif51r7syla1cdxl11z6dtuycb6xarpqhc6x95xbtxxktoc6q1ukjp903ublrmb5fzojnyavhd156alt68ysg367x2r0q8lsopblgr0mhkuos0kv4a4ojobenehy93abhh9oq57i3ga5iixnjpk3prkve2bc9jr5bi2dq8s0xj0pffm6hectomnc447phacexwxqu3nnltacwpp77zgqyvv7w2b717sltplhw8a999l27mwx42s93u9jrwkzma64hfvtz7zjlrkvmpty46zlxrqa2332mabfq2h9701lwarh0p3fsgaw2n4mjo3e4blzcsedyqu3tq2ekloznwy56uoz5xabfkr6wezalndcy98pncmy5pizuq9vl4pabdd688r3worrczvg5izbblnge6doqifa4tewt5kv9a3fr0pq1ld5dqqbmqx2dcwvf1ffq4s4ddh9teih9icll8ce44lsss0yz66gcq20pjh2hjkeku9sboansq3ico983p7ujr2bvxnpe29kkt5rps430rhc5q0mf62qz47x8e7xy9gabmuqomjq7ytwg3xjkvvc5qcxy0zt0e063aioovwiqunm93c30lrgzshny7c2g8r3wgwjpzdugv1d3livx6f12ek67t3im6fs5exetmalsgm1',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-07 10:29:03',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-06 18:30:02',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-07 11:17:34',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
