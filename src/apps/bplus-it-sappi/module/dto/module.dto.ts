import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ec9d7cef-6b13-4354-a789-de58439230f1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ae2eb0ktkkyfd9wjcor7tr4sxlrrur9q2djxzozyz7jzpbbtlo'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a0f79650-b44e-4018-aed6-c2105c2f0d08'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'z04du4exwvncfdk6wuw5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '427risjr7kqimdnichaz9d358c0cvwdf6i4yohq346wc27sumhff87nt8icp39im8gflbuntr82tdvnb1qjm4c52rnwplw9ohlea7z3ld4vh0ooxhjurpsefjoya428dofnp2gtvojd3dv2v9aqoepjj5oou2kgn'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'des6hysa3eyp1dy7atetsgep39g2proanlg6fugpnba5eulablcdmzhnnh62y0lq49n8s3p6t61fj0h4bm8imrn1hnq2cu91obj8osb848p6a9dn8smw0h6cr2qo8i0k2igkb432gi1uznxym6zrp2aklpqgfenm'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'rku1p5hhoci82kuseu5b8p0qoy4pvhq0ama62ezbno2fmbm6a00hvsfmskflfpaoo50ibez0d22p5n8k7k3dnk8ahgnonjgq035rpoe3ycl5o5uwbt3cy8gbzzsefb9q1jj90kwn2ehj2yazm14w4zyx7we8y0x7'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'c10bc3f2-cd95-499d-a95d-188526a6815c'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'dof09tyjztlo6zsnojoy3ub7asy9za6ss6ea054ey8sncjghhagkbivxqubdyl18u0r1wgq8azqb15j0lucjrru0fjy6y79o3xbme3b2qshmqojd7q9yg8gfpeyqbydhurrc5jzryby14dbejs0sryb9zzd4j5m2'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'jqyymla63t5ycn07j98rmn2dbmhrguhpswjsfj5pp2it2gdcbnrq3xz6loyhdeyaowdm94m3gv35zirtyt7g8tdq01xehz3a7fnuqehixwshyw6dngiog3z0uzvovfjyj9ql4cm4jt3x3omxeqfgn81utczhulto'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3coebcn744sbinb3wtypcfp9k1lw3xt5xj46m4xhcgdpgsfb73krrt01qp1xpi52imur1fyv100ttkpe3yfxz0l91nmbuhlwcdot2igx0ofdv8mryurvxr05grbq90jvuucb0caqg1wqv2trsg4ob2sjn3gtluie'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '5bg7lq3rijkixlwd6h6v5sli5vsilwu9in3t7p8bjc90a1wxjl337kbkk4plj6janaydk6tsa66qlq6gt1058e4kehb7vlayzkasg7u5s6derk8558umxbn3r34uqocniwqq7z76mzpvdyvezmxhe7pldd22dr01'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'ysvwlp686603lejkckz28yqsjv4t0exf3j13aybemh61o0w9um5dorxvt9i7fcz69n9qsm16nw6kd1skzfr0kbva6lxwckq6dwi7p0736yn4x8raoys551pt9ta29jl57qv70hn1cq96auem24onywixxjoiruhuawe7drgy5iuxvmo74w6ungrkgxuzl6j4dvhdbe13pc1e2vyjsulfr8hugyj95to2b63y4gy6b7xwgf17z7l9huvl0kl8k9i'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'm7uudgcyzeu4hmd727tno7kwtj29djufcv56xa7ghed2w4fjglxzdk2smgjnnkxl9mdrtj766d1pua1ohszexbkcj37bvxtf6htvttc5j9jvro9jg10x1gmjs0xwu4yjxcx61x4xrp975n28fhc4hyrov9d2zmk1me4tidncbshcclrmbqwjymve8avnamc0gvab6zu1new2o70jogjfaxa9ifrlclp8o1bm1af05clu2j3b6k53mez2jojb5fvb493cbqftx2vsa26lvwbwqy5qquo3doq2idx6bpwny87h6pg071nmmk32d7536tu6'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '075iwvox5m0lduytkt41odpwrx9dlavi49yzwnvh40prk9f4cyfd8ggjvcruugn0gungbprwknrhmlpjtsq1t4lz83vbdfxmu1lpxoppwvv56v7l67sxvfff7qloicaq36g52vkhkmkjzmskx9cwbm5807oo388379fy3vd3avgwrqfpn4ndliw4yomu96l4z8y5hixglpczd238up7i8vboyzy6ho6t74fpm5wbn94uzky5wiv4hx3y9d51jh47rovhgcnbtstfrahdsrntifjten0n8qvl09cjwkzwirlav4yx9qfq2vjab5aknrsb'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'sjwuupqowoh4p8jgo12dv9wm5bkqh7sbm7yu22dfra6xr2pkef7hkj2i3fst8h4t433dej5wesns0azzfygc08qagcub2pjlynay1h4y0b5uzicm9v9mcgqpltii29zqfi8j4gw6qmx0gvix435m9fe9fhib12dasib06rfiaayuz7fvfjj45phs8ulftodyqt8svt56kcxfvax3corpyp4dp3glvjrev3zyy1cmgdcls848yzdfl4bqn8txk6nig59l6myv1ormnw3ilklivtyzf5an3g1hbxoy8f8lwn3kef3zayju8cwaiayhgiqqqptm10v8263hf785bzwz8e6uwwqvnqeo1xwznd6fqjix7bqcgehevog6pg57cr16wf9r6ylt2gvbjoj3ittoe8000lysnly6ph8xvcmf5btc0ff0d1mch334x0yspg4dy56esqvofrb32meosjwkgxubmv4d2lfp24imiet4dlqm719r4sqcc4ffr8idpbzple6l4bxkt9fsaukarqhbxlhuoo5f3jc2f5cyi6nuhxv4b9zqm9lm750ov5nn4m33tegcn4n337khm7g3xq32zvh8tfa9r2qiy8vktuzufr5hgiowo4jjzy9j7zqjz0syqe6fvcrvn11wdpfop2prnrzthn09fc1oed0esctssi7c6dzymhomu6e1t6dukc1w7b4uu2nltness7qs5m3dpo0me0wdlkya1v79lm5pm3d94qpn1trbdo2jcrkufxjm2vx69zlz2b68kik2kxju1gfqsxdbgl3auuizs2i08i2q4dpkbb2mgjeapfzptavrgnvftjei7jnsoxecnrm5of9p2xw1ve3tmdm2m6ounma9oe746ogvdrta249elkljj74us8ubitvru1e44ggvbmswfnrse2mgiv491xe09at8qvlqnkc1nlvye4ir9eodu101b2y3f2kc5ag3fl37x1arbfmzk4pq1mujbzst6ru71278hfkvewclnafzahgx'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-23 11:45:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-22 22:53:16'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-22 23:43:28'
    })
    deletedAt: string;
    
    
}
