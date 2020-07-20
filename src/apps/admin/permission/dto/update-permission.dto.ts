import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'ef1363e9-19a6-4d9b-8197-64c4357f1038'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : '57bf6214-4089-48bc-a72b-a84cd60d6b71'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'morse2h9250zhahmxpmmn682swxa0a22wbaak35ukf4w7hepcd4dc6k17pcxrx960evrdbezcu6aw9tq1d4kerx41uzbgmqnzh6ookfz6wmlt6vgkvhv8mhisz0t4a6kbyj6bht8nugpue6othgpj6h8nl3i3d2gbmr4b8n5ifxenw38evbzb3jmq0wu3f6i55yy6777ae6lrps2dzhye55jjo8ffosaob0yo5tgi91y7p9ye8ilzkl40tcsl4p'
        })
        name: string;
    
    
}
