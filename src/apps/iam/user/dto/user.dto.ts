import { ApiProperty } from '@nestjs/swagger';

export class UserDto 
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
        example     : 'sjuhcsyv4h01tp71fh48ycb6f9doo0p00trddykkdhnr32avu7x8m6i74euj63t7yial6gy0t4bav8zdlfhyq6zn2khzqh3nnv4mnopr7whtx5vith3cqhsgnio457webalnqkxmhbq9ce99ii4mwfrjsovkomo4uass7laiutim59t4d99skkpszqyc2yl7jnbkejda0lymko1nk4vpzos5o0w2crqqieiscf3uvyre5byotdrjcai0kojygjs'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'gz1w3kbcewtqw9kofldpu0lhik86v085ewcdp2bnvv2rzy07zclyno4pjp3zd1k6m5ot06rklkf06ufamu116ufggf0860ckre39vw6uy13vtl0g7udp2g349h76lighgsii2bt8vbbkmvs1xqunymbqgq98w2a5tkppred4ddpihdn83r3x4ovmry6c3d4yqrstfwm6t250oc5puarif6c8wkisanptab41dm7fd66bfz4frx3yicuzqxp7sf6'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'gej3ah6an3ww2g5ozxnueusw0jlczx6o88lg2dher6xgu1csmbtqlavvm9l7iu8nc0g2xrgfmgd0yvekp7a1slpa1pima7a2411i86lv6m7s9j5t2epzid0vnkjrrbl4sc7jej5kv4ls8n7embv2effun1na1k0pijd76c80vyxrnmxjghujb1kfph7e0se9a1d72z07nm9e8fmcrpjx1ftv57lnyywoqmxnklxjwl34nk21pr2ck9z8sg7srm7'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'av6ihyildsbouqg4z6r6svi0xve6elb5o6ko23x8aqll5du8bcm7sduw1oiadmaj0ezmrvfi9uyu3ztmpao7uq4f0i9u31bin2rffr5u6pmdvr88xuhfiw6t'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'jrn6a3ez2myskn41zezuesbnvzt1hcpfcpviumum8jznhv593i4h7dshtdix'
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
        example     : '6nl5fsxr8ns7uor426rcqe81zevcaog66v7ynkwr1k2iywcfrp4nxd6i94igsefy6hu0qtk7mlpetjvix9gezryx5imhog7zkbcjsww538zeumnzx90agf2j'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'db98d80cti099zn5zwt7mwxae2rjduztev8pcaz6cfqc05s4brym9d9zd1ypopg9967sh2t5ifddu8dkizyqp51zwsh8d54a7ccyu8tjhlnl9k5sxsfp9wsajhuqjpshwtvg8eb56xz6lyuac26tteqs2igzyur698vllj9jwtbenq1s03msrrugtvqpcv16pdwe4v38lo2klrukht28gzfktdljr7x7q43jhicwgm56tlcoh5abnrxbbwki6dj'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : '0orhpv94n2urm17o3owrezqa0af0buw174v9zj0vn58qz5o4n38brrwsdcw4hpopwga7ipr7jugfu627tw5blbxsiyfajdy3u0nj9rxd4wskxsxlt1l4xtlnqs7nojbo8cm0qeie595kiphpclgbtt36sbalmxdhg233ui3j746tbxpjejex29zdo79bhy2rz5lnjkqwhq2gchr89bbtbehfit7wa4vb4z6f9g2l7bjxciztgdh2ydz03adjdjw'
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
        example     : '2020-09-28 03:13:28'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-28 06:46:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-28 04:40:15'
    })
    deletedAt: string;
    
    
}
