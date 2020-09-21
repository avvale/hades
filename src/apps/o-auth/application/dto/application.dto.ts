import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tbvzfe8nsj9k3tkkew4ohbcjgngn1i3gpe0pyu8zg9ic7xffvexqb89w5q0i8u76a36l5s6e6tdjyb49f2g03epseft6tnz9hbzjxzbea1h9fm6lbyftxffssjug6oqya7i27hmtee2sxzsv2huvifnmqjoh8vsre1gxjsjfphvyje2xvqubqcc1kkh43p8msdwwfrs989o216v3ftnr8ttxwiqz9begwy1z5o1q3dt54ldknfjzs0d49hcif13'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'olknm60wdafz2plvptddvf59j83aeuswy4lbbygrtis0keh95y'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'i4uzb11h8zydua3u4gl2o2njdnonbdzczlp7rd56e57oume9v4hepqvutexy3t9aoou2s36gtms0yscbd4e173qhst'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-21 00:48:21'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 21:58:24'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-21 02:44:36'
    })
    deletedAt: string;
    
    
}
