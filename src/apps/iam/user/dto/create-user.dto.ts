import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto 
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
        example     : 'f258gz4cxhhii8pdahas177t97oegd4jxr4co872pqfhkalzyaxqhhyk9b4v4i9hcsobcyk9bm9v0hnbuyol9io3lsnmb243nunfmtoyeqvvc2707r029dk9ek9ix26lzknx3em2cp9l8goh2a21li0ije48tlu0evx576inb3uvcew2oscfvmlle7r508h2xg3z4yi4pjj9oz5bzgwf1xgnpmnigqls194e3bm78kk8bptx7t5wucu1oqng6am'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'q91k2edofjougximhlpyxaew1m63tx8cdw7if7exmiqzzfqhfaqkkkzqlr250gdatoujck5pbhc4ua67wvy7zp5lo5um7xpomfxks76fpsxcir180rc8hympnlt50gvn9rdl222gapv2tpd9ltrrgdt984wydg1u0l5tvg091zkvv4ll4w567vw3qt4xqfsgs35eloqw0gjdoz3rsryiy256vn72tk0hy4aqk384qyb62ygdhc657mysr0cw26v'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'mywl2zgffn1kac8zjw2sd5ymu9owd6mpmvgcryt00svxshtcb7um3kna98tenh3avgu8ioabwsf4c9wq0d17vfjsx0c5sv87jpdt0qh3vixy2pq8lzi5kxszot7hpblhcmqk8vvzxaes21b7785gfvx0nls7rhz3230dfj9jymtgt0dhgoe8qioz1qk044zwa46vto8e367jh47ukm33eynb036pswr949jrltgf6f6b7szznwn4fm7nuxkgvwe'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'wzxpt0136dilybrcqv491oyerw8pb2u7w4pzinxwtwo0h2vhym7aotq8j7waemu0c83bk170v7trsup7hs86a80782c86kc7tt0fik6jt74mqjrpfb2g6dt8'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'x7xexsxkev2g5diyarfoaj0ut5bmq6qjkm1gi6lqx3r5jzsevpxdjduaqd7r'
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
        example     : 'gydguf8p9hw9olt3qr2qyamvals2gulxrmiw0eo89k2ksmx34c2lolocpjtxhbhq9e5tawjbpc0temlizgu3bmzegwdl84b8nfg7mhsoa7p6nnm4g7i1eu2d'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : '8v4we74q4qik9ypwnns117ky7w1ba3dz36fr5vdlaqrco5e6k8upph2u3rtmb5vd1978338999ttgqpunyp3i1mi5pcdxf8wez23sj63o1set2an4zup4fg61ubgyh7dyc6fegrqwrt33ky4mkrr2um636nyewzp8pzp9x66sv5pdvqelf6y3rglesaimrae5f6sp1aj4oj1faisdqgexdh63cm1tem8w2srlh5amozkvywoef3f2uhtgizoepl'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : '2ndv0y88rt782s9nxdnid4rhgtwcyo0frt9v4uffggyyzlvmmag6lr13tcn8q7lscginbzpxm6to8qjgv5ikrz3sghz7x6ns168srhmgs6a1cm80fjslu3wsr5fbxklvqzyoja9p2ptprh3uhvfvjuv54comzhxsxu7g51gccd1nqmyuezqnhyo7a1aspjdbqc48m1h3l46w00tln7hwem5sj179dt8yklycvfsp3tlb474wrp8pdbou79blnbe'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
