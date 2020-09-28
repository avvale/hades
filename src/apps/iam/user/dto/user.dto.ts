import { ApiProperty } from '@nestjs/swagger';

export class UserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5109fd03-621e-4c9b-bfcf-b240394770f9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : 'a8ac502f-deeb-4168-934f-3d5a038e830a'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bou92in8a36as64ncylli36y5tkmj4eejr4x9j95tv1yrxdi7py4kbs9rjro3mruqbq627wsau5l9quh0ldfzlhsr8iivpdtid3bi07fgdyosenmu2ec4nugxef191skimqi1j5xb6aryg6ggh5udgektd4x2yqaxgl67dx2zcu19izvfomk3kzk5q02gllukr24q9w4saekz6wzjkb46wl86b9o9b4v8wha5bfq8373sas9u6o8wv7q87go5mz'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '7qsxdgqozgfidesmiml8h8ndynim1u2jw69yf4vqz636u6ajllziw8p4kymx3pu2wdky47g2a0vqm1rfzj3wgn9br68sqzt5ycnpnxlpxkseeklk0ctxlpccvqasl9jiuhif65z5egrep74davpbu6u2rd10mo9j658ivziayqu316hq3wzh3njxradtjc2xfinupmb4lb9eerhvqo6u230ebvvnvuaazryh75gyhlj3giqkbfe7lt0dt9eh1hu'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 't440ynm79avltllujuscofww9799mfcqmnopxdteivhcbo5o2r0r96ien64aiqm96jyaxfun8vx28kwa28p9wbgz8viuky24q1tidb8i6bymtr2dw25jvkkkzkexfsg3ej8vaeg867a88nfh1mau7mijbg4crrosxjet4ir3rk9844jdumdpo1v0ebvu3xmgyv9sex05i530a586izmb8kjkxqcelgrf5d5rwn9mogkt5ky7kmcpvowi85e9om4'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'ynyh1wxc3sq61g6653oj19omn2vy0a3msbxnm10izgiz9p6fjaw122u1cn4k'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '91s6tjumxwdeqzefs48gry9eo0iukua3xv9qrtqphu6647htrdk1lgbxmyy5t5vlk78dag76kd8yrchif9euk7o5nuq1y4thtfs959sgof08k6tlt8ibxm6d'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'hscg50lqbfjdh8mktzbl2gpvpb213ullqvfbk9o8meg9eiozk2y9as6y6wm6xhc3kzwhmffh8x4qfcfj12p7hr5ce7c5yojrcakvadrkzv6oidqjl94r3a5r7k5n6099mwqic0mzfccn2ousy53xv4p07iktc6vvkfk7kveqjt3igyz3v8dfozgdmred0tatyo24n1y0lasisex8660911xpt5bcjb9vaw81cz1sl319ys8c3ekirqkiufrqpee'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'jxg3iu48u349fvjo9behaxtodwed5v24ih1mhhhjsga2k30phtiyeixdw9ctpxzxd7zaks7ktgyffkhc41mh4eizu0e84jp9j9olmgrfjd37nsyyl0pcigvwgtc19wq7u49s4vgmtk4xrmtvhnz12jx8ia12npwjltvov3vw3xb5iw058zcwp26rko1m9itjt3rlps5185r3yzmx7b2o0s2xltjrb56vm8efu0y688w9wybaf70abobeb3qikdx'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-28 11:48:08'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-27 21:25:37'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-28 11:28:37'
    })
    deletedAt: string;
    
    
}
