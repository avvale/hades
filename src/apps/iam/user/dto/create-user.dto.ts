import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto
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
        example     : 'ugb1rp5p3dwtqlc3z3l1kbr257jshz5wpl5x8e7xri7e1qo869sr6rm0mg4x1ish0tapeasm3xmm8chmszybzrmmlogsfmb7ju9fhtjeqlpvito6pi1yiz6mqmtz1fgruwtpvfacr76ywlht0qqbyvqind5oaxtvhtr3eg2tkxnpoprtzghtcq0rcznwhlqroauh5yjd3fqczyj2fy9mgai8ugk67i4fde457v3nbzrdofom9k1d2rlufkbill2'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'cf7zct7wvpbm5bkdwdmoiqukcqa6hj7ew59if10s8ep3gyl61auw3re3wdmuv85uqgm7vkrfdqx0u6dgutf3m8cc5fqe1oqfmq3u4c1c6k6ecycruye0f7encq3gdzwx1obcg002xaax4ns4aiuvc8wpwidv5meyhh1zt5gjttc6y4xbtuq0nk454ikxh8xam0p6iexvnduo888wvu3kfvih9es6cfyp2ojz7wdry6k9c2d91e4ky1yp62fhpar'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'jx87fmfg4i13slm2xto4peyxu03xftlyu4njxz29x1rfcdxnv07qsbici2xvnns5d4h98ov9a6k4v711jjva6j012jidkl5g40oouenburjix51ikcf2masihzw4rd0oji04defc7j5tbt1g7i5egfm4kmjrbzf24dt5grnvz40ybxn3hwy0j4el5evb1b8mu97dm8h0jrogo31oe7bl8akajg89q4upo21n5xobujpmv08zjonps7s0u2j7y74'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'b7h9wcwwmzy0wqsz69sj4qnj5yudzdtw3lye7035v4lh2tuvglgd86l87c1e'
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
        example     : '1ii315gcb9og6gjl2sdm6q06xpm79o7qqip3ytz2hoefhsgeas19vkow40a7ksvp4wv5xgftov2cjopeik7yt9jtsspbqn08nt5k6g8w31h4x86vt1ja256s'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'k3fhvskqq2u9uutsyecciq4tbtwdpctwz2uv2kgrbd0xgw3t6691glzidit3ce40cmz9bbstdb8aax5u31ie6qzgoyuct91nu0ldqwt2fqkgb9jaxb4j0cg5zfb99hr7q5k2hp2rs4gaqz4zg7pxkohr2itvd5100xk53jnzargjqx7hnbs3ts26b8dktvvgwc0rphwfugdog6qdlt24c6i3yapjyxzqndi39oxqgzom9ewl5woo5j04pxp2e8w'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'fl688u9q2wzr5jcy5w4nvphvxdpbp4nv3655ubehhposoe1ov84q01z0ekyfmzv47hyd7thlm1e67umfvndk95wsj2fhrt8w9yr0fz0d1k8548kcb4xvqlvqic05p2mpmhwb0jx1qm8bgtfszwavlju6t5c6vc9n57d8tvqtzxnwxislde2lcn82objk2w8vnw7gxe38h5w008cuv54hb160l5nddg13bk1fuku798mtjry6kvyty021spup369'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
