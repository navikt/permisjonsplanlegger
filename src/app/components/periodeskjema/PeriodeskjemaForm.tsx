import * as React from 'react';
import { Form, FormikProps } from 'formik';
import Block from 'common/components/block/Block';
import TidsperiodeValg from './parts/TidsperiodeValg';
import { Knapp } from 'nav-frontend-knapper';

import './periodeskjema.less';
import PeriodetypeValg from './parts/PeriodetypeValg';
import ForelderValg from './parts/ForelderValg';
import Knapperad from 'common/components/knapperad/Knapperad';
import { PeriodeskjemaFormValues } from './types';

interface OwnProps {
    onCancel: () => void;
    formik: FormikProps<PeriodeskjemaFormValues>;
}

type Props = OwnProps;

class PeriodeskjemaForm extends React.Component<Props, {}> {
    render() {
        const { formik, onCancel } = this.props;
        const { fom, tom, type, forelder } = formik.values;
        return (
            <Form className="periodeskjema">
                <Block>
                    <PeriodetypeValg
                        periodetype={type}
                        onChange={(periodetype) => formik.setFieldValue('type', periodetype)}
                    />
                </Block>
                <Block>
                    <ForelderValg forelder={forelder} onChange={(f) => formik.setFieldValue('forelder', f)} />
                </Block>
                <Block>
                    <TidsperiodeValg
                        fom={fom}
                        tom={tom}
                        onChange={(tidsperiode) => {
                            formik.setFieldValue('fom', tidsperiode.fom);
                            formik.setFieldValue('tom', tidsperiode.tom);
                        }}
                    />
                </Block>
                <Knapperad>
                    <Knapp htmlType="submit">Ok</Knapp>
                    <Knapp htmlType="button" onClick={() => onCancel()}>
                        Avbryt
                    </Knapp>
                </Knapperad>
            </Form>
        );
    }
}
export default PeriodeskjemaForm;