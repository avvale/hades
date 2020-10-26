import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd4509060-bfce-4080-a78b-5c384c0b0bde'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '12eaf98c-7fc6-488d-8df3-0bcd22a1f857'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'sf1hxngbofq0dumwdg65cvggtpermwwkaygkqqs7luo5wo58bgtig3u9tcgxur2s8r15x2vci5manli81lzhdmsqsucczlhf4uy29vpxmx9an474sadnttnvm3auqoez3y7qjg7xrxgrf0v70oqi66ye2paefwjqztwtdeb1qvvikuqtku5fixnjwtjd39ygyapecysnk1csia1kzh1ibcneda9d7pzirbzuasu863ao4ngzb2jqvg4olitu1e0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'jqzgpot3cao9wv3pdjnseyp4n742jiaa46kb6bt36gnb1hz55k75pqi9tsybfyeo2y16mja4kzdqrwfh17v5tr7y6nk9wbrbvxakobf58mwa52yokngs59l32xsoxk77scvcxzuw1px74jhf3s39a2ycmkbhl74cl355hzm3orykj5klzdr560iiba4tn0opddr7vcx9qs6a30nf1iukoa5uxbvnzvdvb78v439hfdfcspihkhik0u9l4a5n0rr'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'sbvszdd6xaj0xszjb7g7192qvhfmz4wq7uhuafpgsdl8qdtkhh104v9e1udt9pq76ktfmwa25zrs33uecvyis5mplpme8c0aite6p3me1t32mpgn1dew6ncn56ub79dgcrwwgsm2169h5o1g5sygbobdih1usi3k5np3o4mccv48wip26av5jw98jejkoe0k5mvpar3b607xrri796151buh8hkgawk2hmcy10rd74vf4zm3limi16nenhlibmu'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'fpmobt40pi7qny37r0zrq9hwmz6fs352lmwpwt2l1dm4rj8vlctayg2qemrt'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : 'ce47d65c-5809-475a-a234-f7f2867d4418'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'qm9foqzayziczzfdt9v0d06icektj4fdpm87dbc19i13v54y2lwiu1j73r6fbp0dc68pbnfvf7xdohz61dyiv42ji2rt65ib2g2h2ubjr2dmqza6w7rhvv9w'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'tgklaqnmmbkl1tz7a69px8ree8cffwt0ww9wlzk5a140a9ewqcbrup2nvj7qj0ncqvjdyo8umzrjsrpqojznrfczrv7f7aqvqw6uy1nderijwedwfftgifruvnwrtcixpd6qm7bb2xyzktq6ybc7vr9eob1pjv90g4gdqu1dax26wl1dkajwbwrpjjownp5tz1gbh2jafmqph42ae4a0o33w3gkfm6gla030f6v4158xjblrvz5h81mymxwxwh7'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : '1jsdfpzwnvmaoenv9m7i011lno65sop38xyf5rg2ujr3tj60rbtmsj3oj8h5sntubkhot27qjva2etkg42ij5kjtv2967obou3ij3chdp0yi30xsqux4u8s19990efrznwzn3g85ahmz19qcg1c2tx9xyvwuon3mcrt00m582itm2kpit2ga3x9kiplktbnlsid1fh2hz7mjuyg77tm34eorhtvspv7u7xfe8yxpyo5q9bl5jyhh9tofs6zypc3'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
