import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'bac4e3ad-e299-467e-b9f8-81453a5badc2'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'c87deb8b-4968-4e99-82e5-8b88b24983be'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : '1w1j6w40igl2bqayk310'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelId [input here api field description]',
            example     : '441e74fd-7959-4f83-b022-82ce46141f3b'
        })
        channelId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelParty [input here api field description]',
            example     : 'yowgd2050io8siyvemt2hp9cc1lfglncj30kavcn1vkujwzy02u14buq5cq6jc7kg5uwie0nsro4nu82abegs0u4j6rbc5ijmonzxzi8byhevbp83ntqfngqa2gwhzuly7e3jnkgnnpck7l2cbgu8j7xtut2uvsd'
        })
        channelParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelComponent [input here api field description]',
            example     : 'w2ch40d62tl2pj6sgeszdxp6aj8yf0684dt0z697eyq6ugws5qmt97z57t97vs8ryihmjqtewv5z8p7c0ziie4lcoypsd6laow4uh19ehozkd5lbcuu43njd6hijjdbf11wdsx64vqkpmwyx345ka1gtzvsrs52a'
        })
        channelComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelName [input here api field description]',
            example     : 'wo73irk4d6k8q1ya40g7osvic0zai74j0lc58k35qhu57dgp5326z8ig3wgv5qagdeu5drjdnvifc8vxydm4hnfn3ktnqkf21wdny47ajf5udupkvbxbg4lz3oif2aj33pp2nbnmhkc1mqkemt086d7j3czo6shr'
        })
        channelName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : 'mbrj3dujh1bhigkx24t4708wijl0tjeww53rr8ox09bcew1gfkr7lxonrrl62rb46cu14dyxiekkvb432vr829gteru16if84kb5mzxmutmzsjtsfjn6876q9i0ut66z85lctipypes7fnog2hkzp1votjmv1tn3'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : '1d1v1h9vl81z6ztl72vcha1rrpl0btg00aghlsvf62r3wwdq53fnpnljd3h7t532sowlekzbofh1esdvmg6zqcmul7qzgq3b0nbxegz1zfn9hscor8oew8j9lm6v0vmpgvc3v6agwnz1hauydyenefin3jbvhq32'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : '1kcmi2e8136evvqdkvwz1n4r0tffi7i1ejwhnop5ezdzjape5bglsqiuuxl47yak6a9618du0jdlxqmpchcucvsg0293p6lnz5ibg3zywon63iw7wewlidatoxyawr26c11h6jdjbo3dzs0nm7o73v35x63daxb2'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : '0avcm4ijfppzetimlf1eocfqar14b0wrzg37doqgq8ahckl5zycs6dwb9budbiy5dntmjhkp5zlr88hdlhf3ho4xn2xnkyi9gu5z1lep5j4rninbn90qqggei1w5o9u79ih2uc2h7q56j3w6ruupby5zr013s28z'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterGroup [input here api field description]',
            example     : 'hhimnnfscof8zapez1767viippssfmr4vftoxrj0ag0aycxk0ztvdigi5ec4dv7mrlbumslqlddzf3et3lmbihs9qny9oqisgatmxps24mzxrbwahdcrbs5e6y30lj26g2hifi2f4rccx5yapq5x2yyqfbbsmtu2o1imbmxhmyb6l7umd3ti3tpf3x5vjlued3thlg81ug74nofsd825ldbvvnzzsti6t9603mbw4xtxccruz2jcka2sjsp2i1o'
        })
        parameterGroup: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '0gwp43dvmvnwi7fvij3n3d5diulyaqe61rgiqozzrrocrm9rkiaotqtlxvugtdxvbfrdm2ki42se39l6m39sm8lsrjdc0jpssnjocnmzspreztk33wfv6qywgtsuajxyc0qjjjrugaph6260m3fqbz0ma26ps4q8s6nwi5ucqoerqxbvoksy9rarpo1mta7f0cmmufjzk5rrjzveg4dr71lxccyngweagzwotl1aoyqs4hrnzrlydm0lb4dvv3vtwz4uzxjlast7e8qpl33xbfl3hyxdequ188oyr9sneotjvz5ymtel8wc5wgucdtxp'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterName [input here api field description]',
            example     : '8nr1n2d8nv5ol5o24qs6x5w7s78w18jmjtjeiopw5gnfr2s3vjzfayp6mo8h33utd93u5m4jvuhhm5fnd5yki4p7uvpxvc30ovv36fh2e5umon346gnkubtvwcyzpihmdtqoe8zo71o1aeb3jg7tqetwwdp3etoii49woku06zi91hy8mt5gk8kpmdgnkxn66zgc4j73768g3a5modwq8vr6cn9pzpbqf8lspo0emf9yx17deatb3m6e9hn7pyw80e0ayuxsz2dels1s1ma6kao7xvnbmfaz50pisrvpyajom1wrz3b5jji8gzrs5y8g'
        })
        parameterName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterValue [input here api field description]',
            example     : 'cfqs7ajaq7von5i83279gjkj4xxzmmhy3of49as34cs2l3xcm1aobs6e42m2oyv4zx0gimsyxceb1je4joenxh87niwhltgcehcprrgnnuxw3h9i0lzowzn27alhtzy1b2u8esak0gfq8wp62meubwtz9k666hheyc2ulj4lcxilcrje6ufop1illcl16a5eyrlk1ueeqegj2jqtzijlwlqj88cqry0tddmrek5cthoffcuakfl2ggu1dgd5l5mpryd62xoen2gt6n488o7snbtlheswgzlqct8g5xtv0mcmv4ekn3yhlgv2ajh4z4wyticmnybxr5cxw4kkpvvci6tcqpytxrzc3w4dfuyms99pvtvgnuirxh61842jggywg858ywnnkkvjvf2g6aaeixn8mlcgid6tpvc6rpv5pnouguex1r33yfcx9vieynsij0tjig220ud065v6rxc6xdae93zrdiy70qsdqqyfyzzs51htuoq3sevingx7lostb9xdpq8jtby8qfjooonj0irq7s6tc48t2zf2ycafkkeq2st6jermmqor0hnzf3gjax5vz03zluj7oym0dqnhlny0nrc2pzylfdh85uv2pi615lc4a4g4ukdhdzl6oj5bewge55ddl4g7g9t3wqcv3hrh3plinz11acjggtmxmrb4c7qev7pdr270ezsyf9g868w2mlcp7yywvku0kp1tospxvpzikvq2nmpqgronwfcxs5wimegjw5ixxtxh8np7m193ed625nn60fqmttn178wwy6tgdfdm2ylnj0oslz6kavejdylkolqzdj8rov94hgxzaohqcjg5qi9t8s6x832xd5wzod3r90imssp8fmlpx29c7wn11ogkku5pltuis5yexdvo5urm1wst7343u5j3ybuy0ur9p6a5jde5nelwbk5oks3rcd9dbdgbe1bebdeczst57bthors2hmu18fbva9v7yaaski4q9w0v35w6puajr6hceylnn3j3t7z8'
        })
        parameterValue: string;
    
    
}
