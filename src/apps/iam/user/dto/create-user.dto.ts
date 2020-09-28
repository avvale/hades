import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto 
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
        example     : '7vab78inawz1h3ws9pz8y8bnw58sid3tcc3stx8bdxyhm54piro17gxfn17z7acs5qr0x56yang87hae2oz7e534g5b44cv5t3n003ke7dkqa35e7kcuztjej521nyug1l2ywg2hicbkxygojnvitrgqzwq9teh3ljabwhnfa7niwqxx90w2mkjq3qlwj9yjreur9hbcmcyl5nzjlk3nnnfywc2c6lm9cyzervvjte9x2dew6xyi0gh70adzvzb'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'kw55zlile8ytqbiymhdqnxr9wfaczerdqydj90w92o9xqxgt9dyry1ozswrb10i78g8ywpctjc1baxdzjrqegczpiyhqc23zzvtmrgcvjhle7t1zdky6mftl54rt7rzmjff0l5brbmpl627mogz3gon164pmpjhmikze1oyqoh7sddcoj376l06qnf94kor10689pm8hao95zc8ag12399ssybv2whzh5vplj8wik6e83nngca0nbjqcnlyip4b'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : '7e8iuwtn09m56oo95axvts6euckk8hqwo9a37brdckwrh4sw687e8kw8gbt7m497rfcmqfci9rz5pk3g4xhhfo2a8blvck8vlgsb9zwo6kv2p1stio5d985g9c4ub3gf8xxd1zgcv2mwlej35u50o1lxobsesq66tawr46r56igqd4eqb6xxoe520o64wramla1caffc49qyfbp5tddmajn6vucbr8j9ce0wasx1xzthjzhngqmtrrvwva66lg7'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'sny5ypupzlqxj7dzuyesfpks13ktmikqp5b8adwwppozcnew4eb2m6zy87rx'
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
        example     : 'q00272wykf2cxaucrda2riqrssdrvlk3kj4zaw9na06ddc7iv1g8za28mnr2we1cpx1tzat9nomefeeo6nc4nzx9hut1hcgif2qqrjc0l70uzj0lio14vfsr'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'wluu45r4bz7gk6aocamkkxu1k2dkrdtlzj23oqwzw7eli9q414skhs56jlfn54gnco7ijj2bjtnd37nrd9dltfd0tx6mw0olfit2da70iootmdp6266llbbgl82bw8z04nmsr0tp2nuftw0srlu2al0jrd16x7ngephnph8moyg3zkzpbwrh6xu8g4z7j278x1fjordaczlsspnv1m1b2nu9n9wo5t3l9mkx9n1n66h5bbcla01dqntmfrexz26'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : '7vt642ctsgq5x0i6qt5ezo4o16hzdrpq3hzwpdbnqjxztx09wjk7tsorqlldcs9mmh8fuv6p46jtgllegk6p8bguk8v1th7h4fwsry5tqo3bra73ie8dk90fft8y3claa2xljkr76rhf5hz2wsynx95a7u03ihcy5xmli4hl6jlstowzf398i9n1yhpyxb35mx52zeqk7l4w4kohyjvag9xc3f5r5uabd6hs3ixrol22x2adqykp8wfaaiwvefx'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
