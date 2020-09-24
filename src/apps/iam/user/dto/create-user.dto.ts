import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '55363e9f-d499-4070-b5e6-a28ea026fb79'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 't5i1c30jcaij2htqy694ui6szkasefooj6fb4k5oye926tclwytxp13c5kafiltgdz6c3a2jmboqz3gk6cnuukn6fyenbtw0ho9dokzwb0vua0fuin8xq7epkm0nchj92r1y7q6tsougmkbqx1hefh2tsmzu46lbwpxorhh3at51pvwmh34bgzuahyizk0snb3f2ceeypn4wwft2eg89pzqklh6506ps43cyhg1bbujk8rb48u7fu7y1p9zqiuj'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : '99s11cst6b6po6db4m8vtzk6tw4t0lulp7g7unig7ou71hf86jwtdzs3ntr77v8kifgwxwrmh65j3yvp1wgi6kdzozkspz8is2k7x3w0wefk47eianyv8b7r428ybwxa5l0wagjrefe7nsigjst9m7rju21c8o95nrqo9lv3ciaffpe6urz2j63128ctn6zssnaaeop9mvqeijf65lqku44oscv6srvommbjf4voeag0slhbvlydgqddgwi7w00'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '122dosyh6iboswt97z4pym7nccxzrpxgl4a5nk3ytz3q3y8sexuoksxu7irjtobgzt68v3z68himyto6ybptxusm478m02g70e9bm7gkq920rp602vtw83gg'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'anof19v0y5hq8wdtt03ldx1l1zp26i81jdk52wz1khde0ynmclnw3iuy8wdm'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '86549ec5-24b4-47ad-b0da-ea55cb64b7fa'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '3kupmb14bn2qk2j4r1eqv9e92r843otkjh0wlo9zavsrqysc2z1ocofor45u0iiuyvxamnnq4o0jprjeqv44mpf2nb6ocij55ulr27mxbw928qk7wecdiv7i'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'adqdjrwa7hoxhujixt8dplokdqvp6zq9ht4skag2p1auxe20uq85iu5d23zb35bjfbn4uzkbspi3na6ajfiym3ueq6rtteppgzhkc4vbtxywuzphr1lkbv0cknq4tgqtsd2ce4izh835ff1j838kysotum91u097ku082h2wqyx72epghrbtrlrzuvi8q76sd8gr1dqxxtpsb9mhnx3m3aevk5frsyx77nyxicg14v2agg801ozmgzk32pey880'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'x5y068dsz4flbpksp6m7gqbgar7rqqiy5468g3z3nf9v3yq2xo3xfumfk9t5mcwtlru2hpali1f3lqaaybn0a16ff9rf72ki0drdncs7bgqrvvr4ui18bpkcbeajeva36gmjuhl9fhx1uzeosur5cl3q0k1erewqzu4er6i945scyyaedwr7mr8y8dserrdmo9hsipr7bv6zmdovnu796nevybdkzi3uzmomcqyd9j7kvi6mwu660olgzcaxu0u'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
