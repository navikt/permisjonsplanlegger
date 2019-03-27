import * as React from 'react';
import { RegelTestresultatInfo } from '../../utils/regler/types';
import { FormattedMessage, injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';
import { getRegelIntlValues } from '../../utils/regler/regelUtils';

interface Props {
    info: RegelTestresultatInfo;
}

const RegelAvvikFeilmelding: React.StatelessComponent<Props & InjectedIntlProps> = ({ intl, info }) =>
    info.renderAsHtml ? (
        <FormattedHTMLMessage id={info.intlKey || 'missingKey'} values={getRegelIntlValues(intl, info)} />
    ) : (
        <FormattedMessage id={info.intlKey || 'missingKey'} values={getRegelIntlValues(intl, info)} />
    );

export default injectIntl(RegelAvvikFeilmelding);