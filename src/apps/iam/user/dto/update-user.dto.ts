import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e8a0bf76-15a6-4b08-b470-aec36c59e4d2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '22471b50-059c-4924-bf1f-17479e3aebb0'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ihfqry80hqf3wtyqv5nexd6ntvlbwyaeod68se9a8vzo29zvjjrsm1yckiepnus7u3y8h8tm37me2791ikw7xo9k7cp45st8nabe1j4kbwf13exi4su92c6tkuoir114i6xqgkcd0j38efzw5ej4kydwic7rnqr8fb965iiixgyme85ze8l4w054sn7dyx2ebo2zrff5czfc8vounwchn6oxoz6ovyzwr16cn2mvl5sez0ylgsszj1zm8r3be3l'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'bti8ebiy49nk0nn5z6mmk73ybxwjsuuhavdpb5nufuo24q0vd99k5nxzf9d5yzvrihwb47upx84jes8kfvkgrlul9sxmtz15bqew9hw2rrdusluyr9szlj6oqfz11q21flmh2gq3k25i4wbpemigsxga3j1nwttppwipblsua62vwjghk97v1k32330p5pdue6lkriet0eu8btdfpnk02d8ku7pfpsmo033svn2z2fx7exlfnowdqrj8py456ca'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'eejdwdrgboz5wd3yog7onzwck82or0rvknew4bjyeybjxgubsr4aka5km3cll44jnl9bihexwrg21q5ruomcx864ck0tvehf7iggd8ags7f1y627bh2nlgxzs4vjpv4tserj8p0mlcnx15cqquxqdcoshq16wqhwc8zfqbe8127kcrn5xxeqwhhgv8wctilrm4pa2xlon99gmva3dk22ci2xmlugwvz2845e1rcjs0d5f5n306uj9kcejoqvxyw'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'edfknjwi5lk6btby58959m1o8xxasfz1ud8px91f0qhoklf4vlfa69nlk47c'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : 'bf7dba2a-e61a-49be-8f61-1629492d0de6'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'libeg7fed8dyl0wamfre6zpr25rpck3lbqoq5agyt17auotqiuf23pb40gwdlfntq8ppqbemh8imktxa6wehy0dj2xrbo4pc2ijtrx3tytezwcfozq0nxyeh'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'zbt495a5e7o24cnq1bqpq0z0o3kth13nj6lit7601r9csi0476tleer8mmhyrjawdvj05zykiz25jsxuo2y4kz5ojbru9kete24txv2bsy32vyf04diozgx3fwo3rgs16g3kfjao1nz1898p2h7vftdduqt74crymmifu8z4orhsizkm0q2l6vm46p83aafrvb69viw7empcdhb7lm2rsz310m42y0pk4p99ygr2fhrzeoyf5qh30tuskfwirhj'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'p4fcpdle6hgl7jq7lokv6rnixjmvr00rqnki06eyzi7n7ve6pk7vlawe9rc66qlbm0rth1e9noad9lwpblh2ul51ojg55gc0ltuq3fzhpst59g5x8ofy0905df6787u8aw7ujnajvspa94xqlvwyudxm3snn3vi93u4hgm8th66eow3sfen20fga2xzzq57tv65psd8zde1k3phr8npuovgxqki5ann0qsvzdbfk1oysu8hn1gcu3wvfts9fu6i'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
