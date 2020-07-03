import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '927455c7-af1c-4132-98d5-bc91f9286763',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bnc05jg0mhn3ixsgv82zguep3rllbsprheetlyq8i5htr5g4p4b18mjebqauupgtvun5yab6ygt5mv3eca1a0twz27wdoxonzxxk5nbh7f7f16pl7tvxec7l47ipz5mhdsqgoanlplmj15gpb2agmscvf3lvvpc1dopim4nwlc4q46m1rmgz8x04mhgsyosjnzdury78psfq0t6t3k071cdjxrl2wq53qhuzx2z9xsjbxrmcblj9x23mtiwfncf',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 't56olw59my8psc30oue5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 679937,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    sort: number;
    
    
    
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
        example     : '2020-07-02 15:03:27',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-02 10:57:52',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-02 14:05:45',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
