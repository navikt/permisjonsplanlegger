import * as React from 'react';
import { NedChevron } from 'nav-frontend-chevron';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import { FormattedMessage, useIntl } from 'react-intl';
import NorwayFlagSVG from './NorwayFlagSVG';
import { Language } from '../IntlProvider';
import './languageToggle.less';

interface Props {
    toggleLanguage: (langaugeCode: string) => void;
}

const getLanguageCodeFromValue = (value: string) => {
    return value === 'languageCode_nb' ? 'nb' : 'nn';
};

const renderMenuItem = (code: Language) => {
    return (
        <li key={code}>
            <MenuItem className="languageToggle__menu__item">
                <div className="languageToggle__button__flag">
                    <NorwayFlagSVG />
                </div>
                <div id={`languageCode_${code}`} className="languageToggle__button__language">
                    <FormattedMessage id={`språk.${code}`} />
                </div>
            </MenuItem>
        </li>
    );
};

const handleSelection = (value: JSX.Element[], e: any, toggleLanguage: any) => {
    toggleLanguage(getLanguageCodeFromValue(value[1].props.id));
};

const LanguageToggle: React.FunctionComponent<Props> = ({ toggleLanguage }) => {
    const intl = useIntl();
    const menuLanguages: Language[] = (['nb', 'nn'] as Language[]).filter((code) => code !== intl.locale);

    return (
        <div className="languageToggle">
            <Wrapper
                className="languageToggle__wrapper"
                onSelection={(value: JSX.Element[], e: any) => handleSelection(value, e, toggleLanguage)}>
                <Button className="languageToggle__button">
                    <span className="languageToggle__button__flag">
                        <NorwayFlagSVG />
                    </span>
                    <span className="languageToggle__button__language">
                        <FormattedMessage id={`språk.${intl.locale}`} />
                    </span>
                    <span>
                        <NedChevron />
                    </span>
                </Button>
                <Menu className="languageToggle__menu">
                    <ul>{menuLanguages.map((code) => renderMenuItem(code))}</ul>
                </Menu>
            </Wrapper>
        </div>
    );
};

export default LanguageToggle;
