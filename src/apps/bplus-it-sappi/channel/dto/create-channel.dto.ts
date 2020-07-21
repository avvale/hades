import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '2028247a-900e-49c3-a24e-9796ebc79504'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '66fda8d6-28d0-43b4-816a-f52a7c3c4b2a'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '0c46e65e-ca64-4dd3-8089-74d299456790'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : 'ya0667u708uxug6l91wxdi982nt536f6f3g2nmijtbale6ej5xkhxs8om198o4yep6t1haqwkqwkkmvbeu1t3086gvbub75euhpef3kmj9kxt66lah9o2a8jyyu0nhm1ekbe4lmg498j3jlg9g3vzzyy7lbsf5o4'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : 'inc9jgdq5dgr1vm9se5w11a4dzkxn8jyeqyjzbbt8qfl31fi0aojzd81njtj2vg734orovd62jz1k2qnle4j5uqu8gfkq14jdfynpr72moyt715w217r7c4fghyni3119hkuyytwnojnln55vrtpbd0ibxrpm70p'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'ar82z2sptd3dkqe932rwxpvs82pip84xr13x71yxh6oem2xgzlajlikutm1z8vgg1ktqh0kof281hvlj84e836n9w7fsskbx2718sy09qjnjeys28rr7wb7mgzt36l4fkbihw8j6ygl06gkyw1pf01yp31tnzixj'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : 'r5dyvh8hzcy8x6qblmdftcw398x230kmdejknee1gc3b4fma3r00occ27wzne85hb7e7yleelo8qfn8mrbc03z8k2x7zyl2hf7juv81rjtz5mywfzo4y0xqwn1ilgglq5k8b4vt3hkk5jb7j3eqf4lggkhkxd67o'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'dlp5ie9kt9ghauxeiur6hihyyn0pv3sfody71mp9efdn1j1256pkj69son0olahy95689pmpad1bgibid4wkikct01tac3pjuvs5w5y49fojl882w51esvtryjc30msukfg6vseg4gpty7dk5ht0txkycu6yurmw'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'ivmf83hq5t85rj8mfh57upoja2kylc6cih3auoj67r4b7qje1d45zf7v02wiyuoks4v4jzrahm792h7d3vgntbtdij71aaqtdh44au87ckncg1sfw81rtskfapbr26s0w8liqah92bwcma3taegz5f9g2q61wjjb'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'zc2i27036mticz5yzh355yd26rccc3svcsoqxwbrw30razxb9iiyaj5l1y6m2y1vmm63z73bladri36jfpdo9xxrgyz8jldm3ibcfvhxkqufbcft1ovqis9owomy0g0p5szwvrxpqrqh2z6lepbttuq88ki9rtbj'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterType [input here api field description]',
            example     : 'hs9ben4lui1qlt9uak4una0lmr7dejz180m52u6w21pu1m612ss3rh12rqpa'
        })
        adapterType: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'direction [input here api field description]',
            example     : 'SENDER',
            enum        : ['SENDER','RECEIVER']
        })
        direction: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'transportProtocol [input here api field description]',
            example     : '9teqr0b6u35p8m63goec6qamdxdyuyxggclc1wlghp3c72es5ckx3r9spdcb'
        })
        transportProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'messageProtocol [input here api field description]',
            example     : '5kc07xm6c12znzbkkuj6rjud0v2ltqw3oe9u32r81ff6tpnxcbjkzwsu90j7'
        })
        messageProtocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'adapterEngineName [input here api field description]',
            example     : 'y5vol5qhyww1bckf0hiuig6jc4lzrd2jfi1nr82sosg1coosz337byv7ozsoyly7i7w1n63dlqtvqtqfkar6q07jz8ylyd201sw2dznc37pfrmdqrut51zmehz9kqd2telnydwbca248ut7rk8fbgrjs9iyg5vhj'
        })
        adapterEngineName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'url [input here api field description]',
            example     : 'x0ezqj61dxnrsas5vtdept6uqclhfipmkq0d3wqfzp2cz29pwh8zsfv3zvx1q4olm29owfhpvo4hmfemtfoi3ecp12top43ytgfgtdobi0vm2r3i8yx1qkhoo749cz3nu7g5cbs18k4dibqbf4unedaeid6ozhvvamdemi8w9r3s6lq2f9ue06kj6gzxm12gabgjfeqzstcve7cwcescuulktkbiuupsjrp9arloqkoh0sscg4wn53rf71fwupnecuo768icftdv1rvty3xiww57rwc5z1ifk4u94kbynnqevc42n9yvjlo462nfgp6j'
        })
        url: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'username [input here api field description]',
            example     : 'u54ttr2bmmzl4lucxqm6kl88mdk6zt7kugf9kkgyn8vmgg0tao8amu60ccb3'
        })
        username: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'remoteHost [input here api field description]',
            example     : 'jx3yg2gcns90vzst53jju3tq5c8huw3gxcvij1k0a0kyqw9avg2k5zkpifanfah3ryucmsuv3det2hs2lgf2hv9hv15xkj2zozlf2u93pn06v6frn9jv44bk9n18jl1it835uf213z48wpvy3wvvjoxc8bos2oeu'
        })
        remoteHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'remotePort [input here api field description]',
            example     : 9436676920
        })
        remotePort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'directory [input here api field description]',
            example     : 'xz06xjscn2qlu4ycdp2ltjademdb29fge12f9r0tb2vm5rg0z3z87afw53n2hyrxb3pva7jfo2zjh4qvbmp17wt0hycxoh4qao1gyew8443hkamn52gcio10twwxkjodut5l20p9mzapazgql66aht3hqrjg8bzea2xfpesszbopc7nwrmfmvf8340sa6084q5m5m4x0cwe3rvnp9ptsoqs6e8t6txa0ljcmhiqggvw93s9wlo77hf1fn1lcqutnsi7got8lvuur0dgkz3um38g4dmuxr8j2t2v4x5aoy2kl45z0txb3ejb49slw9pprs4jx791u2lt0qzp5nwp2nvwjdneubxlriftx7h0nchhrelzjtrnk8ppjvxt7p9b1ignh7422u21gb9wr6x7yrg1obxs4y12wske0tde97vqj9feir7u2wvy9kmsu6rqc0fam4arznhyym3n2kabw5gw6pwtcb5zsp6hwkex8ws20ycc3nnyh1b2cf03vsfcgj0kr1tjdr3lu682enssjlwb8sxj59yx3n64ww3tfea45g6saexzju4is1nkeikcv0qzar0ss6l47k45v1a0htbwa8gayk467v5kerv9xiczuslhkyt8akzzfshi6jup869eq6xshv8jc23gtxdfsmkjisjkmbzaqoozg36yk4r4w3lrcdcihr9l4pd3r4wsowxk008egromdjt4yjsqd1qhbxe72ihefd0zs3s9upmet9ljd8myc0s6z3at1ha0vh6s253caz19ckx6wni1e126mgxq4qk964jnu0esro4rx1yp1dgiuqt2146mjjsvztqtbnfu2dc7dalclj7fwjrbxfac3u5g99dwvuex9v40qba0ugvfoov00voznyz1kdb3nafv6ar0c7ij8x6esg60e57krac4brbxtfrotehsidb7slkpwkqcdnumnm6rz6yxy651fdouvuv6ssg00nq1rwesto7jui4sz1ztrmddxa8c1he3w2onp0dlb54lr'
        })
        directory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'fileSchema [input here api field description]',
            example     : 'v7gxju5sqc48mulzvuilkxvqckewe2ln20spyavjc53swfcvod65ftyldemnj2djjcuo8bznlpgxso2bkwegpbm1j1kwma0nu2a50va4io8rntzwzz3iez3ow4xjjy8mzsjoy9l4v0121qdk7a87tcihqwqz12m83mbhbneeq79bgqmzpvmv5u3pyd5opk5nubqjfsqmf1k3lj8yxt2okatstrkiim4d4kn3qqt90fn3lkyffhztoq515jeqdgordurg3trp7abfhgkw3vl7gw9ms944oezec6j7dnl4qkmynm35cveg6mcx2pmm2n9dsta3ed7fphm7hfmsbgqi0px0fptm9jwmbiqb0rnxgr0hcg1u5tzd69ccgipz4jnjgy78sauekxltdl680mh3xqa9rqantt9bvyr1h5nobkfrgn8ln5n1zmmxwwsw16kadg00wxu67rfxdk9x0voheqymgz90qww1l1yypri05qtad2gpgynbjn98uab7jb7c2kqecrfxwi4aznjdhcgxctdhjaxdz29iitmtaxum5ln39eljqnw92tl8zg0tlfd3epx0pwqux9m3fkkayqinwc9c0q7jnrywmiw9eytdpe6yhucx7pigd63g4c6zlpywrcxyaqtan6pep05x8v4khqzxrkwg4nrvjwyqpnq39t7klkpfbq9133vwolnebihx6kcs97hsadgq6gut40wp0mzo0wcwp6jcvwzhvu8ldd6nf2iuv7k73b29rfn4x2pldotzau7b4srg1g9krapjhmn2a5glw9stizkoi4p24vk5f64wtc6amel1n5s308jnll3ey4m8o4qm32vmo9apoi8wqc5uh383czhwvuel3hw6tjobzrwdz9aeyipbuogxg683u8jp68zd0o1uvns5d5jyicfpnrwzc8g2thqmnzuwqtcsphszfh54itsyqna7ukc2wcmxr0lsd0jooqypt3ixaa3bthqk3276vrhocqa7f5or437nmcoxsvmq3dcf'
        })
        fileSchema: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'proxyHost [input here api field description]',
            example     : 'l6q0lilk8jtibxs77ltzb184kazu82rbvvgebtdcrovq88mtinbuc6q5b2bf'
        })
        proxyHost: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'proxyPort [input here api field description]',
            example     : 4523398790
        })
        proxyPort: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'destination [input here api field description]',
            example     : '7pg8rktpho0hatt4badbuhjaq3ky7kqv3mu72xcgprpghe6fagizzozdevb68bcqtlw16ycts8fgu4juo2kln4iir05o2bobnxafxp4ryzyj2ese6b3gaam3kwbhn31mxmz6vh41xwkafvd26zv3swpjp96iatde'
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
            example     : 'ktpd3diwwq09wmd9nu4xo50o9t4pr9x5sq6v2mbjit90m4ol6atuvc7228f84bibnlz1godx8jpzz28pglgrgmlp6v5s8arrhvw6c317mkrujv4tmdbi4to4sz23g3xn3w9nbi9ems75h7m26kwktva8kazjsyon'
        })
        softwareComponentName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccountName [input here api field description]',
            example     : 'i1ia4pzhvier50e35ej3'
        })
        responsibleUserAccountName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : '9xnrvxvr6hxfkib6j7io'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-21 04:35:33'
        })
        lastChangedAt: string;
    
    
}
