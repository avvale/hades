import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto 
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
        example     : 6776507598
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
        example     : 'sfm97vtioxnvthhpjwiecp07r82p9erwd50ci5ah22ul7qs5r8'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : '3zfbqbm0qtvr1ruuf75odcyp9c5wtvqesvd0f2g871npi2djctfcybk2eg2jg3z0xxni29gnhqyghs9oy4jhx6337cpycb4n7yt1ugnklo5dpjhckz5yi2ea7ls07zuqb182qjr2rvr10n1brqthb7q8b5ux7inf7r9o671xg29izotefoywt33we79uc7shx8t5a54dke5vzura5h9w5amua607gkfia1jy7ns0zqito5hr84t4ol5hhabzxa4'
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
        example     : 432941
    })
    offset: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : false
    })
    isSessionRequired: boolean;
    
    
}
