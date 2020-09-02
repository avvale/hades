import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '40d09675-d86b-4634-a169-6156e4250d5f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2dm08yntl1z42sq071juruuwbrol6fbemb5dhvdtkr8x0h8gbng1ukdh008knyqri0kuvv7wsec49y8qtqctb15qfuhxeolgljkfensb4cr6utap37kntgj1snewdnlwv1p8dzncotq6gta53ikl73zchf0cpvdwt42av8jsi47oucksves8twt87kxzf4p3b9hdkbab6coxr4an67faqrj8c6a2pxv4hurlzz0hq2yti895674df1ng1jk9k7g'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-02 01:06:48'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-02 17:03:20'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-02 14:48:48'
    })
    deletedAt: string;
    
    
}
