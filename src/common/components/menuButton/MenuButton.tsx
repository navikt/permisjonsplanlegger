import * as React from 'react';
import classnames from 'classnames';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import BEMHelper from 'common/utils/bem';
import MenuButtonLabelRenderer from 'common/components/menuButton/MenuButtonIconLabelRenderer';

import './menuButton.less';

export interface MenuButtonOption {
    value: string;
    label: string;
}

export type MenuButtonOptionRenderer = (option: MenuButtonOption, isSelected: boolean) => React.ReactNode;
export type MenuButtonIconRenderer = (option: MenuButtonOption, isSelected: boolean) => React.ReactNode;

interface Props {
    options: MenuButtonOption[];
    selectedValue?: string;
    optionRenderer?: MenuButtonOptionRenderer;
    onChange: (value: string) => void;
    headerRenderer?: () => React.ReactNode;
    iconRenderer?: MenuButtonIconRenderer;
    iconOnly?: boolean;
    dialogClassName?: string;
}

const bem = BEMHelper('menuButton');

const MenuButton: React.StatelessComponent<Props> = ({
    options,
    selectedValue,
    headerRenderer,
    iconRenderer,
    onChange,
    dialogClassName,
    iconOnly
}) => {
    const selectedItem = options.find((o) => o.value === selectedValue);

    return (
        <Wrapper className={bem.block} onSelection={onChange}>
            <Button className={bem.element('button')}>
                {selectedItem ? (
                    <MenuButtonLabelRenderer
                        option={selectedItem}
                        iconRenderer={iconRenderer}
                        isSelected={true}
                        iconOnly={iconOnly}
                    />
                ) : (
                    'Velg'
                )}
            </Button>
            <Menu className={classnames(bem.element('wrapper'), dialogClassName)}>
                {headerRenderer ? headerRenderer() : null}
                <ul>
                    {options.map((option) => (
                        <li key={option.value}>
                            <MenuItem
                                value={option.value}
                                className={classnames(bem.element('menuItem'), {
                                    [`${bem.element('menuItem--selected')}`]: option.value === selectedValue
                                })}>
                                {option.label}
                            </MenuItem>
                        </li>
                    ))}
                </ul>
            </Menu>
        </Wrapper>
    );
};

export default MenuButton;
