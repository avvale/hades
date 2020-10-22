import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e9634594-f977-4cad-8832-177ea91e8f06'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '38c7882f-2977-4161-8fa4-5c210895680a'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ry0bjr8dpjy3f3u0vi307fipndmkabon57ekzyf8i8yrxtyjugg0vtehho8inte6mpcg7syc1qs31emnrc9xo62vohqsl6xkhgtf0g9dontafr688663mk39tu1v27x9itp3r0tlgomtsbb3bqy4ntldtg8n7incja1fijmwdosfnyp3tv8355npn05s9a0v5bu0akelhkqwdas0nj5mk0gg4q0xy3gby7tflbaafxcqw6c2t0xypgaov6hfvmz'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '8xty6ohjuwjthv2votyddxq4xvbx8n9sgmkmvutvy4d92xsxk8i0fu3wuhcf7iuien9umqhztyr1sh99cb2fy0dgi97nz9ttoi6lfywvkfz7rfn5fxxje1hw968tw8pw8lv4l0ku3l18na6f1ymrq3j94cmqua2uveq0tg5zd9yqytpx0b2k4dmmhquiwcswm0akajtert3e4qsq1nw3kpcuix2bwd4vv3fbxronio06obagsrw1jq8vf0z0fvh'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'rxha16hnca5kldw1oczxrtevug72f9hv5b5pleuc6h3emqwwserszplzzlft1b86kbox9g6i9r9xnr7ivfmlpceeyy16v44wrq771r248jugzd56ngmci4zkw3ivqm9lx42j1fzm81h08fensicqivv4rlg74ec77b9rtfuth96z8bomt35b79rlgv1z82fgwa0u4n1i4qhk0vfsus6ifq6uwex3npqqf1ioqrvdpy0ey7l7071ju2gciqhex3c'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '0sjr9s2l3fcmfpt3rzr7gtdckbye2uejk8uvleery7qbxu65kh918yhiefvr'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : 'fa71b786-672d-4b3a-a576-2d0b2b00c810'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'klz05ux79rcb7qq6dp439tzeo4ahai31crdsmvpehjuelpemxg3kkueoivalcifbsnmmfw97bj5ugjyirrvq1nfni2jm8046exyg1kyo2hijnd6ds04fi9x3'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'kxrxsnardq64ynxhlxb8upcn76kgpd49cpwvw41p211ftvea00il29gae8m9zcq3izjupakte6r9o4gcbit8vrfkavmi5iffj1xqzkwwddv6fh7ycp9e3rk2smtcagm3tsybp1kj8xyasg8y1hgklu8dtynff234o8kbqit47u7xbrjn63yp2qc9933z3n1arlxmexn3u13z4sdrsjfjos809rfylnst5mvbbiukez0klzru1rc1oin38vlo7ww'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'arj9jby4j7qwtmmdvk1b4yql9c9uuzpf41tt4ia31ignbpmdkgwzhosejuwrsewox6bj6ml3u86dwr4vzbb01qctei77bvb3szk2j5tj6jnp6t5nx4zrdhjebj031becctg57bwbvg1ljvffaoaptr3rl8s8k3qjephqunygsrfbsmzypiqvascf89iaid6ysvsz45vqm9zrt1el2e1l8w57dkodc0g6w5412chnczm6thrxeerik6vxrsg7b1r'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
