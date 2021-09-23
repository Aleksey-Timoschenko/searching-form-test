import {
    getLanguagesList,
    getOrganisations,
    getSearchingResult,
    getSpeakersList
} from '../fetchService/fetchService';
import { isObjectEmpty } from '../../helpers/objectHelper/objectHelper';

const prepareOptionsForViewing = options => (
    options
        ? ([
            { id: 'none', value: '', label: 'None' },
            ...options.map(({ id, name }) => ({
                id,
                value: id,
                label: name,
            }))
        ])
        : []
)

export const getOrganisationsForViewing = async () => {
    const organisations = await getOrganisations();

    return ({
        organisationIdByNameMap: organisations.reduce((result, organisation) => {
            result[organisation.name] = organisation.id

            return result;
        }, {}),
        organisationsList: organisations.map(({ id, name }) => ({
            key: id,
            value: name,
        }))
    })
};

export const getSpeakersListForViewing = async () => {
    const speakersList = await getSpeakersList();

    return prepareOptionsForViewing(speakersList);
};

export const getLanguagesListForViewing = async () => {
    const languagesList = await getLanguagesList();

    return prepareOptionsForViewing(languagesList);
};

export const getSearchingResultsForViewing = async ({
    organisationId,
    speakerId,
    languageId,
}) => {
    const searchingResult = await getSearchingResult({
        organisationId,
        speakerId,
        languageId,
    } );

    return (
        isObjectEmpty(searchingResult)
            ? []
            : searchingResult.list.map(({ id, name }) => ({
                key: id,
                value: name,
            }))
    )
}