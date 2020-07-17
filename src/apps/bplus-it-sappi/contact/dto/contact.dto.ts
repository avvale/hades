import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '56504540-1964-434b-871f-afa892eb0e69',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'mcwohs0vm29ki5wqkfy9',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'a14dd912-d135-49fe-b50d-0cfeea373155',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '05baklbu9xerurh6pfns988ohkzbooz7orrn76bob8ngmjdbbnf9ca5ieu42oegtn8rzsc3to10t36p4bh469laju6nw0io6nhqgexwb58m2dgfbsiikks0xog81jc2qmc4f107dorxtbbzgy5hcop4eabls9kgk0wmfiic2wq212y2r4yqm4uegp1d2t98i58747k6fk91s2z9oc3e1bc00c8su181dgxw9dy6mdep9muj7gwnbsgj3yj93cqk',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'llkplqyvbaep5vo3mnfx5z1sa4lvccgx1n0j7jcgfo68j9hn4gjczo1ktiyarfor1600hptmwcedii4ad0uim1u3nq1k8tulpp8ea7etrksjkgtqs1jrkbzyguu45g6k5oa4cqxkec3dtxl8kelkt03ozw8jv3757tttdhljbz9lsx9myzml5rhv38bglu4udvyjvnsnb0swhgvj2qerht0bj69jqqqrwpg1e8nz4reyfh1cgq13ejdxjnkv8lk',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'uao0mhvbkg5k8u8ji2oih7w675d3ljfumtfjx26jmpv1m1jkyqdxd5mm8c1w1ej29i5ch3yztt57ihchncksvp475tz3d09eha66kp0gcbgnwtqlrvh31f8z7rxei33md9b15ff3aewa9i2i9r5v9fmhykxrilhq6rex96baasvrlj4gomkhk8ewzvfdoguqrupc8h618gkauvdlxaq3zlsq52cdv3zjjcuwyf38ugaahbxb9ddfgz7tp1zssfr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'bftcog0ww96tojm7qoegf7dyef6e373svbjtkdrahasnyhzcm01tsbavrg649vkpaunpatqnh2oaf3pl5io5147vpq2vuw2b334c7755x4ic0581bsy9vsz2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '0dbbxtt0fumxggja5wm2okn27d5crqasi09nk7zj2qefpviw89tie18n8190',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'zvdalljvnao0z1d8708hjj53b5dk38t8oym8idmmi1ycril2njzq60fz36d8neb74gdn29ni53eirssfs0cr9vlarnd12nsle1gtlziap607e538g6yo985wfnivk1fmemxrp8unk30solh4z8c7e61qx5ug6ebi6lpzmmvo3p3qs4sdq8mnicpmlr5omqqnl1k2ovsacaqu12ktmj23evdd7vtcacw24qbajk9bsrcijxrdxzyqpeylzhluovm',
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
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 20:44:31',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 12:55:18',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-17 14:49:39',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
