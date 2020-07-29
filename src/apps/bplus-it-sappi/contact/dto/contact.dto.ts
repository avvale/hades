import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '727fba7f-4b0c-4856-b09b-96250feef2d5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vnbgsdsothfn5zh61txf9syonmxc6rk76boqbm2jc104ut4dgs'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f17531e8-c0c6-456a-ac34-f01517b5b029'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '16n6e5d4got0hxj23q4t'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '784520b1-78ed-4748-9f33-d29a04436a8e'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'ekcvjnqk35m2reijkkyv1f0540b2sl07rry6kqclug7rr6coox0767qat6lhdl6224uzxpboeif9flvshkhedbynhdiuvpaeqa4tb7e2dx3qyysxv3dzmv1z4mh3l666rggpz3ulelbv91wjs9zkzx90vi7i6nr82sicuuwk9hr0ssdp1hk035omqaoo9kjx9vpmgkd93oez1fq7tisls4e86gz1b3qct8qcvz63n5kha0pdrxpr4renvd17onm'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'eq38zlhr8qgcj6rv4alw66s818ohvuuhyw6ul984bwjqbefz4cfdyno3v9e40j8idtw9uvjk30e59yub714qxaqf8vcxf6hh7vbf2366flv1bzwf2st10rh2kjaq1nmlwwe6rrutx38kmzt8xi5xmy8z1n1esd1w3qq7jmur9xy0lvzln24krr6820onlkl8inmsaupz61n3lyqvd55bu69h090lmzkukdfh80a6wn09kz55rct1qkwd84vk912'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'p93rtnx0t9sur1emkqtugd09wpxb40np78g0m3ogv90h2xt5cenkojjcxxjhnw4hunahbhnljgzr6elq8vd18qmsdkl4vgcj51h55ztq86etd37gxljs074o54d92vq36bbs8qc8qdsnnv8v8z6yo7evdy86zj3x5dw3w4hp238b9ba5bxkc6awwmd5aivnurim9bhy2ldnrfibcjbb8swymw94il4l57qnnxbpc8sn20tygx100w2fep4y47g7'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'qamkn68dvthvoef1l08aks91p2kq8m4sk0ear7haet1b9w9g6ogqc80v3o9q134w09e3ul87q44jucv3xazqi17ht3mv5l9db1evvki6b8ke4qv7o5mq0atm'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'qw04m6pq10ttbm6ixgcjk8srfaj82xxr137sardup9ueli3oaynfjy5wtn57'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'xeryij8bomqwxt0k5esznrdr10d3ekqtd1gvjbhc9p0t5hz03j8yj0hqncblq6imfe0pfveo6cy2ljavsdpk8vkd6o3wfnv6cht7s9q97ydzumua1z7j7dvzs25386yfmrjdb51cnwtlfrvr0qrel8zh815i9f3a3l1c9s92aa4oq3zz55fyv6ttjuc0ffh2vyp0zdkqs084143cbq428sfy645n5ww2jaz01a4xvpkbcfqwo82pbg3dpwsq9e2'
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
        example     : '2020-07-29 00:44:15'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 12:39:02'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 10:39:02'
    })
    deletedAt: string;
    
    
}
