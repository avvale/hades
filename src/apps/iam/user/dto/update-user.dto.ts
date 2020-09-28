import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4a5ae6bb-e625-4f61-bb4e-5425f68de35a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '3e7cf0e2-fa25-4c24-8181-c99c2d2b4755'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3holckln2wbmr2ll0tmtvyzdcao1eugtgbbrdln9v5tb3rfxzsl04se7ttmpjps9avgk842spd3kqijhxd2vrbn9gdbdqss9pwhzi2g50mtf4r1zjp7p51lexgjie3cuh0qpby02iyiv5dwlc5lty41xd3z63qdm0ty25jlsxd89jo91s18mqpeuubvro7czpv5hlm1cz5gw9x3xmtipbise9vdm91cm8pt4wlug82jic348hjtu1gzis5fsgr6'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'm1o3qoro9eoog6acio661n5rur2pi5e7cse3pcxrnlqlb6jhdypcvxindlbnmb08rsl2q7k6p41okhwgr717x3avwrzyg3vqqorty6oeeik1dnjxxibp0fvu0d15vckzywrwppqf30xj3ihbcybvzlny95g14xvy5y2655jg1locdrvz4ye364vok3k26ujxucaju1akeomclscpgoig1hfa2n36hwsjohyx21fvj2rmk7ixvldjb06f0cub9i4'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'dwf6b33puc1jtao0rxxpczfmfz88bcq5ktwlkhx2f0xobdppdoadon29rhoq5gki5vrvvb44ketm333lje3jf3bfzeomz1g82bk9og2ya4ap9e1z09m0l9qp20uetywlzxnnj1iaiwi1xhxozd8q3krgy0nc3cdia9sy2n1m6u7mlcnt7zvqevngis6vl0im5h5s574kicvnqxbo6pzr4l6ndoifk87g1bt19is9xpnxgzgnwbml2i0o6pvvl4h'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'qzsm7hq7naen1eds4a3cpmaxnw9d7qhc4m0cs1rkqnbu1253nem43yk9sgxjuruiqwzbkarzc2x0iul4e3synxa74pnejy6gvipgfm0nbi2baymtyctlspz0'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'jv2qfqa86t7l0iowxto1ycs0efskflmfpsdk71c8v9ztcx7uoyzolbrr8z3v'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : 'ff15b4ae-9e05-4bc9-a0a2-5d54a4fa092b'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '82kytc0t3k07ycey12ecm99l1tn1rl1xzm8yosrfe2od64d64quv9vwb48x91blc5ce0yt6vrbt1yjlojjmzbnp3ce4jt4ayfvys771mn1hrtbglaldzc0ki'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'fhwwqb5jw752ur659b6rml94oaw5rgmjib85qys2715gp6mnyprniu68s1gacbw1a4uoyotbaoxacilmo46j2e6x5ysr6a3ndqkz3pxnvc3ru1bu2u24jo61l3gv0h1ldvx9b663gh9amnc28dch8zf2exnh1i249m2wa8nyxkbp0fg929g52rwv6kyr7vkpk61gwmxl231lv1wdvi6l2w6xxv2qkiykbpytt3e7i1ek2ulz69l87daetqo8rnm'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : '5hd8sgkexxekr2zbn7a3qewovcvmrm81df4wqj91t6ys3qunjvpt3lyqy650bvzbgeo46ji4bj3i9ej2pt0iqvc3bt7vamhe55n80fr0fenl3it4teswyxeb6uagpwo6eumasrgwuylm6b65ni3z33p7rq8e8cyn8m07oailx0lxmecog357oziwkcyaeb9c65e2hcgmg6c35xqs3rwmyfcm9z70wqnvxjbvaytydhz3x8j1iv43ssuf1b83gbr'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
