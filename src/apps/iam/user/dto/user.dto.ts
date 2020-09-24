import { ApiProperty } from '@nestjs/swagger';

export class UserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '55363e9f-d499-4070-b5e6-a28ea026fb79'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'mk3aysve7l48l5py4e7lq1httlu7d9zlsin8r446hvrufgmqv3bxd9dta3zge9y8dbsiv47l8v7gxdfhb7mri969bzaibv6hhtnsdjbcezbkeygudwx7gq4rtkyd5h49sv1szugttehcr25c90auhizhu9o09xcp64w6mwz5kt9dta0guenumu011z04y9u6bxfjtf38w9qcx2iw9d4zms0490c2qfm0712mspv0lijieg7k55i8bxz6pxctxfn'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'pu5z57c2nxohiehhib3aq0boorecesjymxes94d7ycf87xp1heufrr9psvzzhoew1w1z5lqypgibg9yr0zmxw4v08vpx8j2oudqss541bnbzdmpdo93wqmr3bb39e8hsl98o56pmeth858peae989v1eg9zfwjsogdk2yeloj5wpuh1xtuj2owdbe03k0ergwqkmzb9m3sw6xnayoi5o8ekinng4pkf8mk37zw5p5807t62l9u3hi9zpytbg7tf'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '5rdrvdhcnjpy9o5koeckqk4cfbys3jsflurr09hzokua65thqjc0mkef6bldtx2uycyin0csqx8btpathcvhutk4k038p7g9pwit5shb5th87bj18i7mz3cr'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '20zichmg5lskf750b8qampi4id55yogfv5yfpjsfw4yom9isb61v26t3l88b'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '86549ec5-24b4-47ad-b0da-ea55cb64b7fa'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'vkv17zl7qgb7n73mklgdlutgqxhyjqly43s03yeh5pko10950d6pyiigu8bo6d7ie4ekp7h4bt43ivche3ot7q1tzgufzycxmdfh5pd7uwq2asiqpccirifq'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'baf58an7vjz4qa81l96qdl0hzq1hxdzuyq4s8cpeodxebe39gbie4txsdykqyl5bmljpbtjccdvd4u4l9f7f4gntwdaemkpbnwgc2gq1b727y2pt75y57mkmm7rhgw4bbyqjllgy7g2hc2x56qvxq5bzf2073k7lwdasd43te83uoofqf4ox64dv1eof8kjm5a2xbqku1xqcosqaepscal3w80rk3af8fggcjvbkqzeng2smz1l666wk7t0fqv8'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : '4acmj2su9isjm021xi6j4xp3pwdt76sggblvtyl4z5d6tz6nyywf9mf0ijarkj3waglo05068rbpxpxrwnyrjgdm19jiv4v91z7qpjnb19avcewx47bexatrqidznmw5e8353y5uwk9roes2o1b2c6zkuq7ttvxary21v38i69d16l9z9xddm6gdawilaxbc7m6sn1blm5isb7lx36qhvscvrkbjznxcwi1wy2tnyeeygu15092fy744sq2yuq3'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-24 03:03:51'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-24 15:33:03'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-24 01:44:55'
    })
    deletedAt: string;
    
    
}
