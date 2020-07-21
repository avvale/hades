import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '4656ddca-bd05-4403-9f07-e40b3f66d107'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'otmohys990z1esrr59mv'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelId [input here api field description]',
            example     : 'beeadc23-e9ea-4efb-8641-f0f54437148e'
        })
        channelId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelParty [input here api field description]',
            example     : 'xpsfsrw4y74zkn3kr130wu072vb30we3l0l319zypnb0lvdqfa1wr7lrunaeumy1526co3cht8vx2mzk1i465q1dm9evn0xc3nstx4d4x4wps9sgdzx8ak2wgoh8eutaemu6kejlo39wexgnfqbphgwrh7tk45po'
        })
        channelParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelComponent [input here api field description]',
            example     : 'jj7mwn2crzgoa7ev5sy45d0124n9onukm43lw3ejox7arp8vnlpcs0s55bquvi51i91h0ak8ry7u7zktsorp0uskxlegowikf4nwvxxm6xboi85ikvsa2yofc8nsrc502v0wp1k5o866q1pt5e4s4ilv089hbf83'
        })
        channelComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelName [input here api field description]',
            example     : 'xxp0dkyykoq7fw27fiwde3gzgjx9z41uu4fv9ic7p0rr8wlnx0tdga1e6o1mlipd7bpzd5504cyz3p34j27uazn277yn1uxr8ws9hm2fxh3tknf0yvebkewno9zawxptz0ml77r1ungsicrtgm6oh25e24eyynpo'
        })
        channelName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : '570vrtzbpuyltv8itkww9yc5nus7p4flexkakxkcz3jz2co12a2ykqr6c5aryfgu7icv4kwlecbm5jyyy1y7hqf9weib49lmx4cgposoux2agwkx1si017yqb490iw3i5p75jngocxr57xwr1e5t3c7atb7bl6uy'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'prwh746rwjsk1y80xfl1na2rhv5gepm2rbcgys863qq7kucnto0y69w4ojlklb11nbka3oloesqcy5wwssjvpmivj5qqnriruj9bl09vkpcic28gbv959pa413e2f70eci9jcofeex1fpkpgydxta3fplmlyib9a'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : '55ew0mabdm02u8g9kyov9y30y0r9vx6o97o97ls38zybiq9t3j5a8w4oaj40ujr68kq5uyq4wbix7tf37e0jhijva952em9s9ld7kmz2pyd8kmwqxsxe1zv8gjstvc3yl0gyep8e203aq1zm620iaz5o417ygrhe'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'bpwoa5qc145v71x84j2nkwzgm8swpwxjlbwyf42lhua6bwlqhs781muf6izxmxuuboszgjv5jqt437xaz50mkrd02wmn8lkbc755rbg39ehieo2gzzvtp3t7i7j5n8utqnufqnejgxwmxzvofu8pwfe8moshyedv'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterGroup [input here api field description]',
            example     : '8duhin4hkt6vqjmawwtfs7nd0tgkqxt8xhejcbgeiocb9yz3tm6anggmt1celgfsebyqgq1j2vk8hjco2mbvmnbkb5k1g1mc7ttm0aff8oz3wp5p77m0547dj71vhvnzdt6dxvehfpzjnvuu4284s9cg7g4e61urh2elmwpsj4nwyjpytg16ynkduz1lps072qm3yopla7f9tl57rmwq8a9imrnibl9oa5xvbpf39upivmzpk8rfhk5n80e00qb'
        })
        parameterGroup: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'ekdnilrdvf2xa4cigpua23sjlbjuv0j13dqip8xdzeh0fd5nevlsv8qxgwh2forjj4qckjz2ts9i1ouojd6i20s81fh3ddx0yuxscib4d9svswpeaffgighzsyr61l7kqs6798tpi5w46fxbjqlkl6d0qn1fxiss9ix7phwoaybhuq2v755p0b6bhqai7cpbd7aaheq4wqgdtdpbyigj95llq62e2tvtvr10kuv4ftzkajrglnabk4s8nbcactiqx7paint3htn3yu670axvd8lv7gf3h79xkqakjb3tketeu6r7p022w3kb0hmfppow'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterName [input here api field description]',
            example     : 'kv9l2mw1t8o0rjcfm63y3xuck1oh6kjosizb6jms1awlf65bjqusdayy051snfq4e80vrq1rrwlceuwutoy8zwbczmt6polelnhnmc9055qjwgr67hk2p9coggw0s9u62ixquue33ydlqp5o1q1ddtsdtbbotg0oof4ua5n5o0w8mqveaeq0hb1vgf1bdyisc1gvbdh1izss38kqp3igs4kspofrxbotbcoepjvci85eugiac8r2g0thsioxzp8g62ekrimo01gpy6iaqv2qnweciizjmgmjfu14ihiuk4k5zb8x40mfyyj0drc5inur'
        })
        parameterName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterValue [input here api field description]',
            example     : '14h88j57ptpnl34mf5u8nklkcjpp9fm3jgff02dccmgoaziy4jdlkmh7d8m13pz3rg5iuv8b3pvhcpb6co2gtyx8eqvn1bzyd4o69kcct1mu8fg5gu2frt69vde6w56p7m4e6mtnfj4wqju4592oaxxfup676a50jb4onek2zp53246l04wn8ha91rvcu6f7bx9rc3p6bv6uh4rw2pfagt0oi87gd3y71c6vqn262eeuqieny918dlz4rdmpr2hqbu3t1fvyr3ob4tmkv089ri56mmmst2vc18tjlhz03xwqgwl7b0jnzs6cqquqf1lbpocj9lsqmxtim4bgnilmc2znsk90b95e507rzhldj4o7vh3g4zykmxiqi7wsfadfd52wep9x4f4y0dkpeczz01do49xqucfzsj9hlc7qqb6day6zxdjl9gr1tqgr4zdl9la4x2aof959gqogakuk4qyy70al4q9rxia86jb479thtsm71fzronn3r29aduydh62dwtcukf5yb1b5n6wc86t3i6nqihvyoddy02zvgkiox18bbb9iqg4gzbob2afyf5k8tr3washfv7gs9v1908zpos66ypbgrmz7bvfdw5o0bpfl5gnx95hky6a09tzjy8tgzaoznpncaqpijb7y942i4x3fpk21lp9im84bi6etu09p3ql9rhv2zcyq6j1n3e4mwhmf2tz9wa2ugx1by0nk13yq8klin8rd1jwrkqmk8yd5ldvxrelsgzzorhc9p06d05oqr6llapvpy776s0upa5uap0hczkcuzunsilee599gac5cqpza7j3epumukmhdmvjr81v0x5xctzduwtkhz3fh52bwu3kx4b74ip6ogaqj17a50ljcfc7mjg5tm0itn5oqihj0mwza0duvwb7olldsybvpe3x1bwx9dj2tevg52ou8nmdho981c2ki8ym02hl6gh79ccpzhn6kq29sq3rnnvmf4d7s0z31u6mjrwxliesj3ixvhk8uz8lm'
        })
        parameterValue: string;
    
    
}
