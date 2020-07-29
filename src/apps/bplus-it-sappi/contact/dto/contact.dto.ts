import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '44bfcaac-d3a4-4b86-80f6-567fbe6b5be5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4650ddd7-2c95-4b2e-8bfc-1a0cf4732448'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9hnov32bf0pjisx6sulgbctwjpywd9uds8pm7pgr7tc3znyspr'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3a2e6498-b3e5-4590-8ee4-b694a6cfb284'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zzlruytl084tth7meplm'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '9632430d-9630-4357-ac9b-af4802e29e63'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'ifpszpyfjoyw7w2s88f90536f3arahl7024viwf562mncetx4tshojnbc1v468v76yveygjxjl4oppgh8i5fd6puuiv2qvyminf13k8my654d2bmkq6tw9txto61xq8j8mk2f2xhmxyc1leqantg57l49ufmb3b31cf83jhygd5se93865u9nerl0p54igb4c2w3xcmxuqxwrplx0emgd7i2i1yay8ilsdm229d0opk4gd5nbpnp0m7bvjeshjj'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ois1lbqcz7atjkmofhj0v9yqelyx0wrw7ev01jkvzpt7tkb5qqi9pxhl3t9hdpzadwxaxwalnp4t2hfefnz8e524o4i9jijfwh9dbojudrgkdvpx89att34ylsf0ufcfm38xtrgtq1ychx8udz9ajm6is1fnf3gszlbe0gr2x270y8d0y1gamforac90cvmnva6i8fia0hhtfz4qyh3jiuq9ykcryimyvid1b06lbydpr5h3qwcyf9qhgi4zql8'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'n55m7h7z1jv6un3et204o82gws5moexmy6xp4ewje0bbs70w2ja1w37gnzhm3knibba1hzmyr6x4ndvj4wbduoo55hx425mhswxpc5tof9yprcl6gvr80ln0gnr3qvvni8aw9zyh839c85oanr5po7s9jauvudgombq1ub2n1mrs04h3f1mei7kf8tst9yk579avqdh8c5vxpkiqohakv6yjjerc68x5lcvezzcm37n5u6faxr3akafvcgcebw2'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '0im766mmtfaxkmkitmikbl4j5xgqherz57usahykm5h0q97vzcb8x1rfn96tx5ihoj76c1besubeu7b2u24yubbhpfca6m5exczbe5dry46csdmhb6kq9j9u'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'f36e4wopbm90cr261tzbpkorwydcz6lwnt8qqi4emwbwcmb109km76jwxdq3'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'cf918muj2enjc8cnfqx4sfzif97np2xupv1i8y1sblcq001wox5kt1ga3owd71uzcveov3oiyp8o3wjdmndfyd87zgu9va3aq3chnryye4u16os7mc8ii5gw4ruistb5b69ohgga5nsitlv9vb3mnwalhg7km7ha2q2jyvf1xoksd2dt82t30np217zw5gfq34umadcltsojacetfvqrpsxeth3vsvnor89nmbgm1xy9ilxevgotdne1xti36yj'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 15:03:31'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 02:36:29'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 09:52:44'
    })
    deletedAt: string;
    
    
}
