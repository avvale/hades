import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd3dee798-f6cf-4df9-9217-fa39aecca96d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 1337633199
    })
    code: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ed76b37c-6380-4331-8d33-a8bde35e16fa'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '2bq2fwcsg31mu7bgzmv13mrqyip9pxodmjjp1b8omsa1ixowf1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : 'k86sk41fad7w3gsoybfwngsck4rtkj69cm7g8inoil6p7a8mn2559qcgbf0dalre17ob7pvz1p859n9r74i7las6xc2g54ebkyo5qqm08bouxjgb9r6lad7w9nzr2joyprfq3za80ax6anuxb8dqzhluf7cdak9gqt6uk8pa7glr8emi49x0207ytyvgb9s8abnzq1c96b65qvl34v24nhlfera2nizlexozji8pp2pmsdxs07exiq7lr7c50ck'
    })
    urlBase: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'params [input here api field description]',
        example     : { "foo" : "bar" }
    })
    params: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'offset [input here api field description]',
        example     : 432191
    })
    offset: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : false
    })
    isSessionRequired: boolean;
    
    
}
