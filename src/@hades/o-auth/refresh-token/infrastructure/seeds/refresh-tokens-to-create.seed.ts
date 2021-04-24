
/**
 * This mock file is different from the table structure, because when creating an access token, specific fields are required.
 * specific fields, in the process of creating the access token you obtain the necessary data to populate the table.
 * the table. For this reason to perform testing we need two different data structures, a list of access tokens, which would be a list of
 * of access tokens, which would be the one already registered in the database and a list of access tokens that would be necessary to generate an access token in the database.
 * to generate an access token in the database.
 */

export const refreshTokensToCreate = [
    {
        id: 'b75e5845-5759-4d15-a56f-ce916252f86c',
        accessTokenId: 'ebf8a6ab-0920-4d27-a371-128aa626b37c',
        expiredRefreshToken: 86400,
    },
    {
        id: '6c20fe90-a96d-4e9c-a9ff-1938cc99028e',
        accessTokenId: '06e9e5e8-ac76-4e4e-8c9b-91e9729cc7cc',
        expiredRefreshToken: 86400,
    },
    {
        id: '563292f2-6b30-4ded-8b9f-8216e2f90002',
        accessTokenId: '00c5447f-bc81-4b77-ba85-de2ad9327eeb',
        expiredRefreshToken: 86400,
    },
    {
        id: '3641eb64-cbd1-4cb5-888d-aa641a1a16e5',
        accessTokenId: '1f51a2bc-c41b-46ef-a384-3246dbfc456d',
        expiredRefreshToken: 86400,
    },
    {
        id: 'f315f218-92e1-4938-b41a-c2d768405ccf',
        accessTokenId: '21e96fed-5132-4d2d-8b57-9b5a49210422',
        expiredRefreshToken: 86400,
    },
];