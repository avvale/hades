import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b5c8236f-8381-425a-9320-978649a142ba'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bgfg7mwga7tmlygt6lcmbevfi9l890m5n6vbez69dnhzw5s0u6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '0q4698808awcqfo6kvjbb0qin15vry6em271rvaw45okyepuzneizw2rahgbyqpg4es6qyte8huuywz8f1kv5qv60oq1boc32avf6x2xzp4uqcas9ktbu4w9j37kq51dnfgrv73kztduu4igx8qczukbwluscrxm0uuzk45eivz6v5fk1wmwbczbh7rudnujulsbp1uxoqv0cjr9s6hg2vmkucpzbumuk8bq6xr2koxl8qbkgvnkg05yhgebjqw'
    })
    name: string;
    
    
}
