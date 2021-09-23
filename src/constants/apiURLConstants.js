const DOMAIN_PART = 'http://localhost:3000'

export const API_URL = {
    speakers: `${DOMAIN_PART}/speakers`,
    languages: `${DOMAIN_PART}/languages`,
    organisations: `${DOMAIN_PART}/organisations`,
    searchingResults: (organisationId, speakerId, languageId) => (
        `${DOMAIN_PART}/lectures/${organisationId}${speakerId}${languageId}`
    ),
};