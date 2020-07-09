import { ApiProperty } from '@nestjs/swagger';

export class TagDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b91fa74f-012c-4830-9dd1-a930fa42296d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 4668952662,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    code: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9659665e-b461-4578-9df2-5bd2f5cc5014',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5ym5z4bgmyv43yo19q85ksedy007cuvz29c3l3wn4vz7b0sy4s',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : '71l1fiaf2lr8090hc5di89b18tira6fdy726k4h4mwe6ymz6jn58vlt9omu2n8e1hxwe26marz2cgwkqzk0rheu5ebb7gafxxbjyf2zdtxrftd3qjf8miw4ch9rd7tefv3xngbgkyrxr2mt26jr4wlnkhi8od681z8n4b6gc2qg8qkjyezfekj0hnwhycmfwtdx9574acy1nro48xth96ak6dtpiblhxohph0ifr4clvim2cd4af7pv1gtj1tm5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    urlBase: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'params [input here api field description]',
        example     : { "foo" : "bar" },
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    params: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'offset [input here api field description]',
        example     : 646370,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    offset: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : false,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isSessionRequired: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-09 05:16:13',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-08 20:06:15',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-08 19:50:58',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
