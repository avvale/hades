import { ApiProperty } from '@nestjs/swagger';

export class UserDto 
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
        example     : 't3idohdphd59r7qclqyscv2xqfrb118ef1c86z6xmg9ei8lfo6jnilgrfgtgdi2h37yfoy17t7wlm77lkpcgl1ea9o1dbhh04qmagojw279tdztcmc3lzx0x909et9gie83s4f496h58eff6q219iemkiju80718g6gexzhhfc4rvny2mhf5tg9jeq27abfzrhp8gr9souyiubrqc8w9cg07pc9yxk6uh6rzto95jcspo0rrvodb3peohbbucs2'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'ot0bqnxqsbvpdlzxpsf6cen05e2psemc2ery1sgf0ai0szdu6tepj9r4h536vk7vebf9qe167az6mpp6l6csw36mzaqxu8b4iikwk5dqgzayf9zzz2bbrilsn1252zessqmh679jfaxt856w0djd4srta0zxkryn0o4q3eukkb09x21yv7nxzhuc1ryiotrnyyfxthce7q7x96jlml3kiciqoyg7kflozjxu73sfe4ez4akvmnyccaov7wlaa9s'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'h2z0sgjg0bteukb7stxthuquuke2ov05suph0hbxx9t8ex3ezdjsylmscg5gimu49oie05u0hx1xy8uxsx1yymbda31wvx1r6gfgbu12x5bps46sowthpcvexf3u05kqrbpoc4g157b8g8735f227il6wc9gjdjzmiht1iv7o7lnxi8vy4ch3ft46djksgu9jj6j89nzpgfx222omld82a155r2ukx25wupj1yo6k5vrl9kv8pf1stb546bnsl8'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'ky9undcfn5ar7a0gfw8lunp7exmqmcx0o4rv8kiy4coj8tw4iwro81wuhd19'
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
        example     : 'pi6jmnnvn5k5kjemu7lj9cftb2u7y8bf2oy16w3yxaei2ofnpxdhw60pklcmkxp9j7xvihkxh28j4kvowd00yycw0tqx4vvs69m2j678cyuxshwpti27uu9q'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'pmcdf75rm7xddforcs4noiqmeo1ypr6rxiljin3kpsspohfcqlrsvu5u3klgr17sg38agzoxc95qtwnp7n9nvb3orftkamszbqgh9ds7s60oll0pu37mh8g1vzwztzxbip8p3hxkyd1wx8eq1kym3wvsjhtp30wyoutrpwik66j3c4fzxdfh21i3x38undig55bdyevduazage30i1rh0chpwcy9avi1h9o55b4y0yvmg6k5k91pmeofffnru6f'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'tu8n69hox23csi8newrs2ebixg9s657nzj66vtvuqr8z03wqnnht2fuxzc0z2ngykk4hr5eaolwpw62yv7q2ou0wfaudurx7b1oi3f786v0xfmkh6n07dadoc1j9x2svru76jiiy5m2b7wp2hkjgoai1os0vrogk5ybjgdzmw1aw0z4mkryy714aftn6zgsxa6sl4z2slu42qbyn4j9g8abrzkkr8u3hiiqtv8cu7qh9ack1uzawcduwvvs9v8t'
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
        example     : '2020-09-27 21:59:02'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-27 13:47:57'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-27 23:24:31'
    })
    deletedAt: string;
    
    
}
