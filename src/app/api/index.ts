import axios from 'axios';
import { formaterDato } from 'common/util/datoUtils';
import { GetTilgjengeligeStønadskontoerParams } from './types';
import Environment from '../../app/Environment';

const uttakBaseUrl = Environment.FP_UTTAK_SERVICE_URL;

function getUttakskontoer(params: GetTilgjengeligeStønadskontoerParams) {
    const {
        antallBarn,
        farHarRett,
        morHarRett,
        termindato,
        morHarAleneomsorg,
        farHarAleneomsorg,
        startdatoUttak,
        dekningsgrad
    } = params;

    const urlParams = {
        farHarRett,
        morHarRett,
        morHarAleneomsorg: morHarAleneomsorg || false,
        farHarAleneomsorg: farHarAleneomsorg || false,
        antallBarn,
        dekningsgrad,
        termindato: formaterDato(termindato, 'YYYYMMDD'),
        startdatoUttak: formaterDato(startdatoUttak, 'YYYYMMDD')
    };

    return axios.get(`${uttakBaseUrl}/konto`, {
        timeout: 15 * 1000,
        params: urlParams
    });
}

const api = {
    getUttakskontoer
};

export default api;
