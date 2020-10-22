import { ApiProperty } from '@nestjs/swagger';

export class UserDto 
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
        example     : 'chmgpavonzcvnhno4pteri90548iquh5k4etoaomwdwyhemph6qkwpqcvy4y8ex62tpwnempggrb6ghpwdhdh9bw3bhcwt705pdxh0fiqynirvmnlg67e7qra72mdchvbwd4l4lf1zzvviso2n1woeepongeu95ewpyj08peq11g0wjvna4zngt40gtsdw4rajdkui66xhcp9fcvs43jt86xwqizi9n00abksn2um5bnwt4f1kew4kbwh4o3rne'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'xl05c7j6vypq9gr9s362shhnaimro2xk5rtq86w69vhinw1z0fnzi5pcp8v9d8xghxiyd2198opxdcup6bnw9nrjjvpqobjeiytc9udc0v7haxg1w147qzz5i81oabx2lgtinio45guymmd7fr8le17jw8llol0sbl6hfv8a8zgpfqvodqg3vcng407q16dqmxz2hgczo1swuouq3ps5r7p28dyv23rlz7rlxfu12rxy87jmrk9ak2kzz7mumbx'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'dbp95u7jua7si9h3m3k1dvcrgr2l3gu4xxwvex9qz8uqtoxj92rpmp4st327h2rxbderr81qzsrshe5srddfwfo9bvh9ldnvlhdo1p0quoa9ga0jg5ii0hwzo8lbpe4lv211kxc10n19tfkx2c84yxc6gezwcobokn513pt6wpiu6hte3d3tvalvub28vu3fonv9q5ogtbsjm7rsndwme58mg5ztmkcqlo562mis0r6wftwrlp717qkcsdjvc46'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'uy9f6uc8xivzfswhvmf5a4lmesfpa1t6llc9jfcx9nz1lioshz06lv5jw9f5'
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
        example     : '2m6632r5e7vpc9y3k7b7w9cs9wno4ygvic813qd8shu6jm571ff9eebk65satas2eewysimz80e3kpt6u4whyk1jdtvc8eid131m3x6sx14xn608gxla509t'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'zku1ixb48d47rt3ev2y2gtzrts9e6gkar5h6a0kfh7fqywh4mwgm0cintibk6kpuvfpwbmq33j57gwwk2t9akx0708usdmio9jcepqi1jv8xldzzoex9028ao7gedlir0djopljufvv5hu8toceck3xiymiykdik4w0lgcyzagc1vhwwsrpmlwcyjsssbdjy0ixa7oa4lfwyvinpcq8zn5q2uhvwcqh53vkcyk1u9qt23kpwrzc1tdw2sd5f7il'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'jg4e95jfy69ddo6bm7j1787ywo1zzjru23dxh5kmisf64j7nr5sp5q3ylwe6fbxoaqkhwslrmsltf1sgzt16xa22lh0inxkabyxhh0m5zr5z7q8x4t6ajqot2h51tsbgo74w25wrfqhwrgrrc1rxykkjq3wntopw7081mtjjk5cvdptylccxygsqmrw1zvz5031f3hhp7mdxdm0xtz2almje9402kdo8ifz2rvmkkpskqr9at1bkf9qklrhllph'
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
        example     : '2020-10-22 19:13:31'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 23:00:21'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-22 04:52:00'
    })
    deletedAt: string;
    
    
}
