import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'w7qo5ikrtv2nkpqguornbaw3c5gzqb15btk8fqppvnzh5ts34egkyfpd2066zag4h33nomx5r969urb0kjzzszbv5ykk9czazmvnc784w4ddrgpet5pit6560pgdkdspvtx53ykzl1iqavjibcp17fxy4d41nq8sjmd35me1cmbiydsmjep13sy3uz3i5hkgy2cjqjare46v61kggyufhu9tqcksbb9jcjo7m6lrsgkmqk5tnzzyood468yt2ie'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : 'q4goudzjnw5phg246ag6'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 470258
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : true
        })
        isActive: boolean;
    
    
}
