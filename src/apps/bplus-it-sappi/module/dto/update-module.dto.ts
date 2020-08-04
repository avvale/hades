import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '64300cea-782f-453b-a5c7-256772586f85'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '797027ff-6f70-46aa-bdea-41ed9d6b3696'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'via4ptu7gd33ecj2207fd06wczrkikfu9sgea60tad55lcn9a5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3321c9dc-3c88-448a-b48e-887da60ba47c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'z93rrn86ypov7xwe5lim'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '6bfae48e-37b6-4b4d-9f12-3fa7349e7a05'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ayafom5pvpqsk2gaszqy9lflzde5fl2zt1poxfaoa73uw5604um7jwwg15821d9gpg5zguzmfjqvlmch79dqv2zdkb37s06sev8r3q0g8vnlisr4k0jpatr809pth9kvs9w0d4w12rm34n4y5i73nt3mii3xazyq'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '0olxmqgy9miy4846dbxg9kn63qnle3t5k3g1y6gqlj600wwrbhbydac55qphiwqwp2vgfshclvpwt15ew2b5cuubqu907jhke9nd6bwz70eaubhnkbydd7ejybj0fdv62wifvrvfqsvqi2wlicva2eolhhpbcyuo'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'drs2yi6l7oft3wcz9bn5o3od7x5uk5pqk6hkat5i2j49qtc2bvtq5cu4xgiodd9kyxbs3resesvrl8jtotgepu0gej7ms3bjcmugvez0d3i6t6ssmghlad78a5pzlai6ecdj7457g2o378wmae2inay3l1g61gcs'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'f1v2mvhfvd27in5no40nflc5ngusixlfoe4co548'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'g4y5c2cte8plf5s3epsv27y6qe11hjiitib0s0jbpqwsapk6htwbu9j66cvwmx2ovi3hskbfq85l3lxrz63xexrodeiyb5xsiisr2lo1j60uq9k5t3ecqzobynmknssferfa7oabn3lknqt5ysr40seah5yg0pbt'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'hpczrtn0lxl0rjnkk0cnw6elnn31hqoahg3bhk7nnzciiqglol13s1snpf7hsfjxqf8d0654aj1e5e464bohcqnuapua9t7d6tjdq1iyviioj4zct1wz5ekx1maao3ibjd1unj49tpdd3kcjgk1u9iaftvqsikcp'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3jnfvrb8sxgg9bbgvhr926jvc6b1uo5uvr29h04tk8c4vk7lf07xi4e1w6i8yfkw7thlgkxyf2c3ydiliam7ho9xc212xodt5cuugs852lusexobqcgsanm6tfhh02srr7c67q65wkpyguuo6mq35ad1pf0imz4i'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'zk3a9k7nwfze1bqcz2jk49zm30mb24821l7qxgzof40dmlk9qryb2sf2pu62okb81j9dzpgpkwtiqq9lh21wtt8v5bh0bon0y36wxu3vnkk4tn15nspdiwo8zckyf6y9brp71mb662h535nw34xdsijvpqyz5by5'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'fi6ycsnpas0bgrzrfmy6'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'ji55p66gb45sr6wlv6fm91w5jm4x3pikbp5n58ltb7o4eotzur3p7xd414tnyeal3zxouz94rg5h12ictvaau2fcgp2ey3pubrxisyngos7mngqm9e4h3j4aafd3slkr27vhrsmh1a92lpa3btyb8w77ngwk80v1dzomdyn5y0ywb329mihgi6oizjtu0p2ezjrlpbwcljcl2makritqam5vdu1ptnf30neh355n66dbkvl0rk5wekcer1gvhkc'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'wr3fap5ixalkb7jzjcivnsfhvoutuvfn6dp6sn8q611f0mzkq97xgd4gb7r5ybkna86klbbf0i9rw6t01pojj6nqbfpuebltvdvoil18ntmpom5y9oz30rpda7t3mkywt7lt1jw3fv5yg1s1uhbs9ssjkz8by7uwesd801bdg7kqiim3sjjnh7yd7g9um5empfwzjy1jkw0s0t8w5qoyebeok4uz2kpk21ll2oe741j85pgi7v8ib1n68yvx2tpz6jedmks5233xk1ukft0gh01tcfkcpd9ul67l49mr4t867w92p9w3wryz2010ukpa'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'zm2itugdke0yjocehydfklqr7xs09zobkad1zn84dtmyc4u8j08p3h86aparcl5n3pfus1ao4yrgk2z2p8hp6w5j4sjkm7zlyvab9y5zt7f3sj62wo4fb8f6ej3r9yxec43b71yhnp3crrp5pbep8g22uri4fagbqw3fy3yqvuwqp744yxc4w9lzruwxst85xyyec5vtx1yvnwolfltdhfkpvq4vrjo752rfnva35bjvhezbxwargb74yp0aako0tsi6g7vjsf2uiebppvpd9ffhhl1qmcggla08qpk5j8qyxnpv5n71xc5degfpuoy7'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'gh7prsghlfgb0omwg3lbcnkxn9ommdlttcg7v4ok3pji6ftb1l3avov19y6ep7tktja3n7nqrdu8wqi5tngcw7augzyaa9k9rmu27mcp29hxyg3e0gmfmwer7r03o01aufh921o0wumsg5a28v3jz7g1rzw1ainndf8t5nprw7bcs1vitcb3f8rv7fpp0wgyr7n0hzd54j0b302pieo9dbd3wx2kes89rhn9y22yjha45ovsgdojpn12nfpb4rhwmaas8sl4h8aq58ogn96zu82scyr5jf7xjcgows7kdrc0tek4zh58f6ck0rzf9pnpuv9tlzebu5yetv8rw9dnuz2uq2kma8hnnjlb10tn6ydt8eercki6qawqgvpa5enj0zcbo93kkcgi98vu5y522opupe9ik9xl0ghbblb3efb747rrsiuquteb2m5n041resahtcumhat1ucs7x20l69l9czyzdc28ejw04m6apsvfbgzs3hufqzbpsm00jglgh68ij0mwg15ro2bqtah6bdo8aaip8xtklcrj036gl9qbgkmr1qvzu4ny8v0jgwkelwhop4uegwutdd6nj4mnxwjas4xu88mnmbuibpzfkfv1eisqgd4ehm9ogbewsfgk9qtbnewka44a2cqq8b2blk15lyuzujfzws95up9xirelf4x8p8pfsumcqrbke8hie6gbr85kxz1d92u9yp5pn4wsxbh92fe6ou23db48sxmya9gywjz9pml4qoiz7mgwmknq4q8al9yqs78inx8s6y9mwvil9fmbs1z4xfod6ry7n7idl6h646mflj0qtuiq3w5bpnwwr04471xry3rqa64ajaxwgorr0rsrkt4i3mv61w9ek29vvlmofhocfe78x8o9f82qj815i4s5j05vvkuhm00ljrdaq2pz72eojyoe38j719i3dun2455swl2yxr9jy2f09b1j3vxkk7fp0fnd3r6ds3ti3falti7rtd8pu8duukq0p80z5ohaw6a3'
    })
    parameterValue: string;
    
    
}
