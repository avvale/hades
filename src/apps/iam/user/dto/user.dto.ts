import { ApiProperty } from '@nestjs/swagger';

export class UserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '78782da7-e8aa-4668-84b5-0232a2a9039c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : 'a19e48fd-b959-46ae-ad76-ebf13d1701fa'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'qmmm64x6h1j77p1s9jx7nmaj0w7vmijzjmdqe5bvvn9musqe93d0zslw7gwsle356sdo8lynfjc37muaq71i4zpv8leb052vsf3qv70g7iu71n6rvzb1gyx6h8ot33ilr7ut71dfdwrrwui6dwikwrqefyuj925t8wyas9byxzntmpld0il6305shzol078doje56me6s6yna0o5o280qd6rzlys1aqpp0rcwmlfdew3urb5k8hclnhvohkcgmt'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'v2gsmyvkkh4cgh5wphn4jz2k5wm9xy460plnb0bbqt1eeulqz1rew2vu367gd34t6f3ogf5lk68jl8mljgpwrfj2uspwjd894b7nfdqvcev522xr8czmrtt6w9p0khnmz6agddu25xt7igdmjz6vueu34z0mqxsx1wp3t9lhv208s1wc0yh6wtp1paq69msnvyt3oi3zoxhn58zw2ab7mmtng7x68p65tox0to014fhr4qpx4tz0fqk5m7cei41'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : '9znsw56luznjuoohpg6gnvx33ev8bslpxqp0cb8m3ol24wig3a0kxw7i6i6iridlmpl158phanc4fd9iaxs6e5p2d9u4lxn12cxrj2bjv5yho0eynk5ukw8iwvihqxjm22se2ibbaw8lycwqc5lum8577jywed8nfzw09qutuyvyjn473n6zi9t4ljt3kfe9gkf7rt7xabby4xph0nvt2v42mnjwds9bh31g7b0xgb98ts6fa6240ni3gtjwmem'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '9wkyfyppjw1r3lb3s1sfk8duqqw3wkjyefq9bi79u970db5sy6ivnw2sx4la'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '4026894e-51dd-4542-9699-f2f32a5a6c8d'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'm6k9kxkr6vku5jvrnxiu65mud9dt1ib3nq7kepo4y3u3kx60dgp0na2v04je6zglj0jkq73c7cblub3tk4vt1pgoidy89wasu3f63ehqriei037vfzdhxvfu'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : '6cdpw6it0th9oiatcpd8pa6nvrzz4pj7kunpwk6dn2lnuw2gucdfa08xh51nyn7vritdpszg9ern8g1f4gzlp8vfckai01u1pb8nxgywi37pq0dodqt7bd2z0vb6lucwrb9fimfgppc69pudmxiicv7xjax1rmbnnhra3i3hcrdi4onohl91pieqi89wp48u73bbg6dvyn6lou9ofkoiusqerwdrew3um6re0bojgr8z6s3rusn6eubvj6jhsmf'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'sof9g6yyouv9tebs6nikewwur2uiulbwn6leiss96de5xtw894gzzr2rvfzv80pq0cbgjb75wsothy4nqlaczev5wms8lwifxyq66luogr7ewm3gbc7o6u1anq6zq8c6sfe4uvfru739gjjmzfzfykdh6o26opfd63cjjlobx0gobmp6o63uexh2b60hnafilgb9dzeibycugr5q39pg6h40x7yobzfv71ocsrqskynae73tfcd54phtt8mv2ai'
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
        example     : '2020-10-16 12:24:28'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-16 20:30:11'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 12:57:18'
    })
    deletedAt: string;
    
    
}
