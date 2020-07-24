import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
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
        example     : 'd026lca2v1p0w1c85hi8j1zrlsfo98bfysvjyz2o3jqf9lo07f'
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
        example     : 'y3p4muaxxhx90sudi8di'
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
        example     : '9uomssjwzrtnrzrnp9j88l13zez0b8nw8el7p9pgw3apzbcjctie47i9vo77orrqbcvpmo1fxzf8di6bif4u5k6pfa76cana2wdzy5i8d6ffnmemo2l05pjvp6lrhkywm9887on5ityy0qa0ow5e1f3j49ivx6hg'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'n32nje7anl3ssl9e2tc7u1uc8tl9cdc10dfgflssjubqb154bfw30d1upqp720ow581zqut2fae8cqbaj6ipqnk58i3bvx0ce1hlx7dxd320qxqwebtqteta29cbp8tt51xyaa43p267ygflk930f19lv48fv3lm'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'vdt2okv8nc99xyjyx1r1kxwrsyc8j35kgh26pswqtlat6i0spe719fhdjngm3ovyek8ouwnggqqz5nw2l8tzdnxg1z1ph111potuhloesjl8zddw9s9eyk1sj5v98hd1j3zquskl0zjfjw7dxxrqrsiblzaaviy3'
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
        example     : '4dkt27v10jxswmzjo8kggqn0a1g9huziu5pdvice4jxa2suboaftnhxls14l9335nnc1vfdwcjalu9x8wq2omzq48e0l9hegkdsdeh8ock099tez7x3rpv9oy3uat4ylvqh4qjh82p7ds8vv3a72wq4eznuw6u2p'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '814e8v4qv6n193vmharttj2mstyjd2u5t7cdr456txy9gluznqg3k3b3vj6opxw2az1c6aod4o80g6wrtcy3m9e49elrn571e0ylia504ksele9u2qz540b0uk2m4y8rgnbq2pi51auy69vhoolj0ja8xmq3scc0'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gzjhrl4bph5kf3e6vkfc02olfosfo96cpbpjt2wy5mi40j50bgi5a5ld5agj8hsr1lmv2nv5l6jpsrbsvqw3p23zku634jhiy2u9a755t57b3ss366fdm2wkus0a9otu90sb9pxxsu49dchbfabqwz9kyj8407dn'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'zq96uy8my1acx2s5r7hc9pmf46kc0npd7vmgowcfkpgmencdi8fhqo9e08rboh1stsj4k79p9eedchsld612ykluwp1mnabtigjcr2a4rz9ma910xbvtfmia7zyy0omiw4uo2l96l4v7xb04iausysnnjrm16ur0'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'fkl3fzixou4mlx5pthl5ho7ez9izzyevfo7qqcyjimozw22mkryrf83hpzdryrr3vq3cau67w9cqlporolg2pd7qoj6x7m6wzwco4v7luijegu0n8jpw3y8wkzm81n1xxbbtni8y2mn5f1jbv4t9azu1p06qyq6tj0x63yso6ysbl66vsiz424ifim3cy7j3o31qrc2o2344fkf6l7iwd7rvpgdvx2cedywrn77cijtpkfnsl0o2nrk0y0yqzde'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'db2ahbltj7mqpr0385lii3yurytcb58866yhcwfd5shuvdy5pw4ncqwlcudnvi4xmjvizof00wife3rp1u95a31u98axwl2jtwkxtgyrszabz0zi6308lyttu0vga57vgqssmp6xbcv647a0d273m4c8f84axfnzdhwaswaxhtuwcxh5v4f38orc4q05v606cx2gu2icsjhgdwdtmr043nc0x01830hubcnanmcobrby8w4rq0ioejxhysg9rymqkj68ny9ftnjw34ca79ld2c3wz9w83ivonkciz8ed3dte6n53czxau9cp6xug4hzp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'f4oqnnyzggutqatc3yfycb1voea308int9rc7p55u934vjahkb6qynqqiwkagfazrj5g6no4ln3e2rpzputwiw4uh9it974yswqgh73t6cehr0d1fh4uqlrtg1gd1rrqco91jasylw1iww774lfu7hoharsv5qlx7ltsk6mkt116a6z0kiv3ap49veddqqe766i7vhcgay7twc247mii1giacbcs63kpjtos1xshqxcia9mteu6csrdy30lz6sdujccu08x82j6j35z47foxr2s6rxddaqy1s1h6pv1okrcr1feciyacy83r04r9qqj1'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'peu0ug5373rzccwf3itpf78uamzup1et5lhya0nxlorpjvgor185oewzt1qch521bhze500u8m2tqzgs34w7um5d79ytipbutfsyvz6zqsbgji9dx5tyue792hy6w3tc1d12arcgmhd7w62mijr1m1e12nn512ws4mp5zcjo6hp5da5hdd9uzhah83lyofbb3fn1i3qj0nqqw75sz1vwcj1oyae4um2yrsa5wk1nyp24zcq8pn1p5cwcrp45olxuookqm1t58etlvb0lov4vh4i3xjbi0l30lhhdob0glvoih9lhertph1lbcogneartca20r209h8uhoqg6rvglztxqo84kbby7y6jnu63jo1mqaruaunjczmrars0ymnluenamsjxk406ti646g6bae91k5lwujatnmlfupos3vvfphecg7c86pkawlzy5ysl7u8qj86sj5rhx6l435gjp77ec4ncfla3zn4ysk53t9lv3jjecks35q1im70jot1oc0kwzceogpb3cuwvpnvvrl23r65xxledaantt05fv3z8vmcwdu03m777839canshlp6z1pths190y1xta7e1crtknpf1p3bx283ykdd08qmdyfhubfubwno64uqrtdpeu52qh3q3zjyvzlqad7tyvu61u3by36d86ztcn46x812nr20mh5kgp30oypynkrxxku1m5a0ad9xa8frnuqu79zt80gl2wb8lp6l6cxdgirzqd32b885yv5ftfdvk9b5ubngxzdvlcje7edt1brzutnignm9oy9uzniaz0y7w0upgfm254njo0ldc42vdig9yik18xwaytikygfqd5sw9njh74b9qplaa1t9h24onzwd4f1ugu9o4omv24hhtrf86vdltxhs5n79iuwnlb3gx2gby86l372syf5xb88wxikqpaq4nntq3n1mxh6wdfzop1d5xjr41rfcxj7olhbyndqcsn1ewa1vvkfynkms00o6bg42i07lqhob5h4htzvihr'
    })
    parameterValue: string;
    
    
}
