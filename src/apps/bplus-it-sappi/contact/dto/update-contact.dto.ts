import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
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
        example     : 'i5yvo75z1vnsbksfrxqjdii9ie9pqdurjf9gls0sjd0msa9ngn'
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
        example     : '3he29zierh2wk4vmwp8i'
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
        example     : '4trucry3xegh8evrplfoecm0pp6dsgnncozep385lap369lj81dz73vwx6kxd8r7rx90aemtznxgaz0a0qqmhfbhluz9acjb6wul64z5bymyousmlbe0vr8ko4zpc7009338zklsda56e0jv386g6s8qmmwu543q2jbxf2jv249ya1rlyamg0lv90tfeq6nn7gf45xrn7a2omomnkm4plnv1086fjbf942cl5ivrv9cxzxv0jlrtsex6v34s74i'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'j0tau3vn2rwdetzx2ysv3uvh491zqz1d13awcg5fky8q8dmj83fqrsz828vmsu4sxudizfpzhtr3961csw3r9jx503w7lldxh9tc5d7o47fpyhbo4199wdx2mhcv9hr3v5sfvljjl60sr7upcmpmggyxark8wwo7nk2l8e6iw7g4iuut5e9j0o27rnzr9uh9eqx9ahgcw00sthehz9wnpqzxyij9bq6adl66fpq0650q8hyx9evhlziyy5b52wz'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'bqrq53fmka3vke2jr3ljw9zt8cmdfrkg8ajj6hzl6i3doasdxcvfvh528tzroi32659woy8qhge79dintf1q8pa3eh84qry0ws60qtzql855j3ijku94rhqefi9wka16ipvwkjst3wihqlizbtbxlj8gsum806j24srzjgzeh6g9d9zzojtfz67psj9h76en6bgnw2p57voty7xyt7t5i5mjjnqjcjgladkbirv7u7ledea6rte3mdowpirzjhm'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '9kkpexzim8l9qta8tny9z14a3nwcd0y1u96jnhp32zpfxl7bdmccvryeb02zad27hqcwzfluah9gfpigs8xamojwvv4wtexoi0x7nk8ldzp2fmsno3prcjra'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '06ccjamrmlh2tpjb7ef5ol14gxgkfb9bx9bvj3glt62oq61b7moa1r0y5phu'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'q6w1bj2agulwnp9gmdmfr5708allbadl3fy5ryfy2r0xy37gwzmzkgdu15uxozzig5z4xwe9m49zpx9iu7j4yiig2qzl96p5pqd5p0bdikriqeyuokcqeyaxdbbb1vj7a2uw69aprtttn89kvot7adtjte9v9ist5s9e4b9r5lboltenu5r46xeclmbk765pvaylm6kw753uxzb8xrw0v0i2md2lwyzejnd2pjrwzqpba09jxam9ep2m503zokh'
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
    
    
}
