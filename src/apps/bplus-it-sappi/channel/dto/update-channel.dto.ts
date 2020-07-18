import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '227dd6b3-43f5-46ad-ae48-6b31543f4d7f'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '26cd62b1-51c4-46aa-97a0-d3af7cd1a0ce'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'dad995ab-8a20-44c2-b73a-a37c488191c2'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : '3xs1nn0ql8dl3vghd8rqz1b39k0sypk785crft6is6cnkqc2x30kia9vatjwp0cljoivqcm4vb5u62z26l8q4bm6avvnfh6qwwlrouco1pb6o2fvyg6pgfgdegiauebl46uuwclrxx94blig26ev0x5kxzdndchr'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : '939ii7uwreqjak3caajoie3z5y7kxvfv3nz360nt9ctwqmlbe9yu9guznh94pnsnh9d24cf3ydzoicgeba9qw46nxy6aj9tcxq8mpvpqgsnwtrkb7q49m9svn09e7baqvj806im9tcb5rt5ti777jg9a4nkti5vf'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'm2r1u4l19xso7iuo898mwthzwbqsmwmajjn6o15ne45yu8r1i7m964z5yg6ozqhx0e13gfjpmlj3sa12zjcxz86pv7g5pp9whwot4uofrmsxqmpj7lo3kjxcy0ciekfoqexg0rqz2edajz9ibljxfxyqxxb2xo24'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : 'a4wbgn29cgvrdd6unh9q3ofcsn1dbhe62b6uny1qze6dgh0zhj3vbmjlymacr0ts8fg499j9cqw87htp2mo36391pksna3v96gn7hyxgulu821fekz6m3ct4l3dus79n5val7qyoneq4logudc6qjzzs1rk1hyvp'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : '4k17f2w67nzsbyijzwcw55k1u98yq9krser6s6egx6l7spj7ds6s0gmmyzwngbv57ldevee69niqqxvhwbq22dvi4rjknze7yiblz9tu4ljqx59t5t4d5gyglg8904ur0zn5soykcqykcgq2z0u7wswbgzhbg4tx'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'g9osz426gg9ml3pnjnholkhkndn1qshzdtsckr8ij6x3292788themnms8mivch5qqib6dsl1fg127zct7y4y1zhmmvxfo42q2s7g2s0h0chcww01ozy50fqq4ijwde42351f9wwsrnrgkpte6njv1wfb9jqkyxo'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'gmrmz04rhag6yxwbal21nn25a5i4lelfwoqrt79ywmr4k0euw17galjfm6zy1e1gfd0btesyrpkwxr6wa50lgazssl4505ef29xf4go5bwmb2znnay575ole9dl5hid7x635ezf09wvsi8yzqaip81l3yttvoy24'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterType [input here api field description]',
            example     : 'ahgdln5oger3bs4inn04flp9qn5zkbrmqhjl9971dzp2sitjhdusfo1lu5yy'
        })
        adapterType: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'direction [input here api field description]',
            example     : 'RECEIVER',
            enum        : ['SENDER','RECEIVER']
        })
        direction: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'transportProtocol [input here api field description]',
            example     : 'ebotfuaybyebdjsr4z0vba223313pamyvgh9w2aooifpk5t3p6qlz1o0h3ad'
        })
        transportProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'messageProtocol [input here api field description]',
            example     : 'cd6ot6bbtilq2i9fjuq9w436cn0obgsgcb9adym4ys5puak0mnovcxng04o3'
        })
        messageProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterEngineName [input here api field description]',
            example     : '4fig8oyxqc7bfxwae0guzllq0gy7imvhohbpv69x9bv7kqhdfir960idze0lgeney9xmdi99bk1ur7wun69bdmzhd3f9tbnd1rxtbk87few5zf6r7mzjwjdaxrmk4oskwpaj2lsf5aweq6c5btv6sa8x3lui0c2n'
        })
        adapterEngineName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'url [input here api field description]',
            example     : '7pz35e9grdyecj16811ep4wvpc2wvh1386v9hn7p2o4e4lhhp63551ejf6m0bjam24rq6pppvo7hf0otgmnhglomjjf2h6vq9hi7s97jajzg680gfq9xfi3cmenjtr52e444pwrh42j8k7k9ekrdxrkqqbow0y923sibvc61fvvqb0vozu4gnqxnl3w490pdnyik8mcoz8pyyp8jlqfqrczyi9oq8lf5mhfiz9vuhrnvq27mlyzchay0led2fypi51u7v57rrmukb6agmc9tufeukir32x8ikmrrvs4o6m67e9b2j993b9aiqbn83ci6'
        })
        url: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'username [input here api field description]',
            example     : '31edr0ki81bxiylsyh7kwpv3ajpri46jgjp8x53nz5zt28tg5xqxxv74jcsb'
        })
        username: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'remoteHost [input here api field description]',
            example     : 'ff9f6ef2kbhk21qtwa1v9bifg5rq1y4n0533omsq89bbgohzb2bku4mwhgz1viwh3vvgxemi9qr3ibzfzajb7lpaqncizu2lu7rcr3c1vzbq0z4bxuivung7tb40y6n4xcpnhpj7guov77ljo3hn2t3mgl4976ue'
        })
        remoteHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'remotePort [input here api field description]',
            example     : 1295140288
        })
        remotePort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'directory [input here api field description]',
            example     : '1hee37d5dljd0xed9xwbikjuhjchd0kq0f766vm8kqavsjc0ly87qdgjo6fg6ciifk8gpfdh3yud0safd2j42b86xa2g92wz4fc85vuquaqkc663c946x4cpiaezuf7wnl8eoceiwzy4jv6w759qzsz4oydw8o6byffb6awtz6e9tnwzx8dan2erf2gx3d4kutjtfuzmvopz5aedwz0qexkky1faxqe88h4osh43toywzqektb8w8gcd3a0choufb75o6cpkpn4gpkfujtb4z4t2qm6tdfdweedyfwr90esub0byobktlbp8w7vcoyudrzm6jlm6bew6m6qhq9mckibeobimxmdgcv2axpkxij9tb9g30zb3wsg5ijvd290c59bzdqxzp3q6a42iy83j2edwghj0qfte3h5q377h4zunvj1z4z3gxwn65p0kan9at4887fi5vsuvreezjehlvyompnk4omcvmk9q7t6ki081f6x4t9s2rpq3mqqpry4lcgb674zkjdy07wm64pw2miol7xjntooq7ucwb3qdkha3sfzlf1pm4n8adoks4bhcy3xzbl990ylwxewq1874i1sbqwepf37cxhpaahlt5oq5h44zqkch3e1y8tzlng2bz6i3as6w8bin1vzwcalpje3h82bp5qb51yqhmj1f9n31sgcgh3ewbklxcn5qgp772euvbov3f3sbxvvtqx3en4avcb93ftgizx0dlijeo4u9h1e3dpqnq4g966akeh76j7rqw9ea7r7eic3ka2vwp4ui7ofmhy5lf9bxikxmk86wjc9wgr71hcrx74obbttmyjgc279u4eyoxi4x1otolt9vyzi807z5dv9wnro6aidj1wnoq849y1mtpbaiye4wk39cdbnf9btc5ws3u89xvn35dwgpetskhgsukzea18v2jzk28y64ir13wgn09033ya1nrj1h8aclbynf0svw5yapsof1s7890iych0khwpnkymlfwv67uiemnzbjxzpe'
        })
        directory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'fileSchema [input here api field description]',
            example     : 'y31r6vz2182boaetgrhq5xg4tljnxlk1wqbfoaz8svg5keuxqdp2hfmo59hbbg3uh0a6mb8tya7tbsx5n7q7noiapc7025soaxqsur96jv4podp60iem56uxo1xmxrq534mesmdpbushejdyokw50qz653iceos48jupmwip5kgzv9dbnnifa23e18udtt0ynb4t0errtdzr0462fi0hu0s3yr10oj0cvuns8ecnu87ma3qrudtlg03eq11bzrlqvnb0afiyzs2chhak8e4tnjyezibdqnl1bedsqi2oitnczto86qriw06ydc6pg6532glwm9lc6m8brab1g7u3czxg57il9oe7hqzrtl15wvi56b7smd1ubif2gmuyvvdh92ub5ksb2eu24q42b95t98xsexdvmctr34gha6tq0kwzea3gtl3uzguex8rxb7w94s3bnh264u52bbkhah7jcabxqysxmn503i6muf57babq56mfquz3hiosjp0jqw4rkcv85tj2879lu6fsjiu7z2sc93nctx58pdlnvocrvgu7mxkss9a4myuwfh7hz9k4tph98uf9lilh1e0d8xro9qvnto69zkm3lb0fv2t71ve31rbpb5gbfkv4iy35boo2hnpjdckd2uzp0q2v94fpfxnr34bti3wb9nfrwgo4idh5i6afhfth452cl53yk77pqogremogvigy8sgxa2jr4v51ibt7sw2nourujnkeac810kk12o1w58i51r1uzzlgvgxl5z8ntu4cdcouf8kggak3ilf1yqoiiiqjexgig8lyl58jtpe9dmv3xnk7y2ktgjhvqsg4sg78a8ssad62eh0qjnlbgw8fbi725ymcyw2z2eu6f1kh2kbcd31uvmn8m2hl06g429e1gzx47fcx8467vqdtx7yasxkmw990zjeawhl6tj1ae2mgwf1wgczw7fk8zt8sj6d4rrq3r0zlkx9rwvyxtmcx1tvn1k1pvwwag1q8dsil4wy678k2ibov'
        })
        fileSchema: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'proxyHost [input here api field description]',
            example     : 'woqh2tonohvkakjja8ilkus94xmejev7ateh54c9wim0rupdsm66gu98xz8l'
        })
        proxyHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'proxyPort [input here api field description]',
            example     : 8233696405
        })
        proxyPort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'destination [input here api field description]',
            example     : 'dmrz2gd3i6zps2r05w1i18y1jp75f6zdiw73tiev5zypcf3cvy60z32jwsitrh94jde3gyg4gawssmkwrnwsc9mzhx4m72my044kfx2xsunszltu5tgeoptf24tv5ba4ksskuc91dkum5mfdvfiu2wtkrkf35apz'
        })
        destination: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterStatus [input here api field description]',
            example     : 'INACTIVE',
            enum        : ['ACTIVE','INACTIVE']
        })
        adapterStatus: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'softwareComponentName [input here api field description]',
            example     : 'kmil3fi9s0n051cvkn6sdhcolscvvmaz6pkcdywkssrbrfhajyhdcbashnn2tf7l3a4pvqfxdwb0yhf2d0fpq15jhcp57an702664g10xyiua9tiqhbsg4xg4k7d608i8oupka8uti5v59ufhjooxyfz2sx0uwkv'
        })
        softwareComponentName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccountName [input here api field description]',
            example     : 'xvksqlormco6qopxcx7b'
        })
        responsibleUserAccountName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : 'c0lvyzsnb8txifh10ife'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-17 20:11:58'
        })
        lastChangedAt: string;
    
    
}
