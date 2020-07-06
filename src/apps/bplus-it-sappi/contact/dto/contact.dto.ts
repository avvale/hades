import { ApiProperty } from '@nestjs/swagger';
import { FlowDto } from './../../../bplus-it-sappi/flow/dto/flow.dto';    

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e6a1b6d7-3d36-4cbb-896c-dafbeb0f4a80',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '93a48a94-53c9-4509-bef4-dc81f8af7be7',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c27ba79d-3ab6-41de-a5e5-31d6fda3e61f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'tbnl8xog73pk77a72wl2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'fd8a3d12-e9ea-41b6-81a1-aea17cf74a8c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'oc66l31r7w33ljw81y9ftn7otkboo0v3cngduusf4mipidm572zgxfvm880ctppsv3r1a0j7z8satlonscz29u7so1kzh1b5zptmzpwqmgdtr07c007gpxoxmgzff3936b9s20n9rw3eucvcxbuwz2uppypcrw0gkm1kv8evius2o9l079bfkswkuuppehnufclzolg2wghl9n85y7uwx3sgjvp77758hfe0cw078kdh674fgs8x32xf00olg3m',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4t61upmp0qregis2ctsvqkvtlobjs6jv2iupsb86aoq5qpx0tkq5pua48va19dkux0g1fccexvob54n1u10x8uksk59x1bhmcgcclcw2kqkd63151yd0uj7fknirrovk689kfrt7gd9vdcjt6yoyxwhcg032i4dhm3lcapd1vb73199sugfomvp488eoxgbt4oyqno7hswnny0j7exvnwcpxxu3sharaxq8ps2h9e0k4bl4j13nzrqjnwinyl5f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'gk6e940oev5zranp1vuymud58yjrjhj615n94jcmg1ssjt9mwiotxd4m15xje2zup3a7ckahimou4a22gzlt6ewbvwbqn085fx6izrxyjbc0tvic88lzzpua8jvghpdjgkx491savpdyojkqfh7fxw98ql6r1c1dyv74a12gmzy621s2z30pikfwei0wyodikkc7hjlq9qykng347a7wbz1wf8ceujvcwc6vt1pll3hhoner83jnigb4y9pa5bd',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'ye5jlgkgvtcm4syfpzgtpewgiw3s9l9igy21ux573ridt7wfok6u4s8n7ylfvuf3tssx06ol8zi12vte3u1o29wz1wzjkojbu1p515bvirq4nielgyl001to',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'sl09k563b06kgb12g3d772cbmcys0yhfwsutlcuvkpkkgfz4y7ghvh7i36ao',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'lsm1iowhoipk8z2m8l1cig3jdzqe6bjphbggiep3npegalc4jau3p3tjsgsyrqh27gvp6zhrvc5s7ej3p7e9mxl21x3b4hw3pbxm16zg8mmp8z0k0i6z1numew9i15gwy60t210adtt7b0pr9prjbsw0j2plo4xh85k7gs06gvlw1dvk9zrubxmolkdhwyr5jtjsfp3dt0owduvzm8a3jnsivc8v0xlcet0og6o8r0qjf7zuxfgh9xc7vvqujcq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : [FlowDto],
        description : 'flowsId [input here api field description]',
        example     : '',
    })
    flowsId: FlowDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-06 16:20:51',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-05 22:24:22',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-06 01:47:37',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
