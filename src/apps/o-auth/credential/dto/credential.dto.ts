import { ApiProperty } from '@nestjs/swagger';

export class CredentialDto
{
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'CLIENT_CREDENTIALS',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    tokenType: string;

    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'fq53q81rk6jlths5j988drzzbxxdi3el0ir22jlppr11mx1utl7ok5tt6unge9nnxm3m3978b16j4hlpppkks6p2pynpgeeqa1urvb1tr02wa7vjfc5iyawhpywpdgjvsyfp2ttmdda61mo1pgbum84k57vng66jvad5q035lijoq1gv7ry8wtzdan4huhn5cb19mlc3uvjk7l7pdw9cl1o8f1e4co55evbzoxx1oaa6qzy8dwswyzwlvv5dlzr'
    })
    accessToken: string;

    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 's3tqk6mbr6cowgl52eq11fp6daqihlq6sqn8r77il0up6zajtvqfc0uq3sr1gjfa3215ha7x7datkhfjt8ic4oj4d81jdcrd4qahy72wcrcfwoz1i5raevyoxvuxb9mzcv1rlyjetx3w9h1lzp198hfwpxu0a2i109072mscvyiuixaj1j7q77qxregpsjp3qaernzyr95bcg6bc8dve40ie2gpll0re0zonsz2ckpazdmkktb746sg7p28rv1g'
    })
    refreshToken: string;

    @ApiProperty({
        type        : Number,
        description : 'accessTokenId [input here api field description]',
        example     : '077e099f-2640-4f12-b1d8-eef80ee8cff9'
    })
    expiresIn: number;
}