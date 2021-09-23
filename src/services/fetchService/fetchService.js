import { fetchData } from '../../helpers/fetchHelper/fetchHelper';
import { API_URL } from '../../constants/apiURLConstants';

export const getSpeakersList = async () => (
    await fetchData({ url: API_URL.speakers })
);

export const getLanguagesList = async () => (
    await fetchData({ url: API_URL.languages })
);

export const getOrganisations = async () => (
    await fetchData({ url: API_URL.organisations })
);

export const getSearchingResult = async ({ organisationId, speakerId, languageId }) => (
    await fetchData({ url: API_URL.searchingResults(organisationId, speakerId, languageId) })
)