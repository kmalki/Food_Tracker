import React from 'react';
import '../App.css';
import CustomCarousel from './customCarousel.js';

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiTitle,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
    EuiText,
    EuiBasicTable,
    EuiLink
} from '@elastic/eui';

export default function Home() {

    const columns = [
        {
            field: 'objet',
            name: 'Objet',
        },
        {
            field: 'quantity',
            name: 'Quantité',
        }
    ];

    const items = [{
        objet: 'Pomme',
        quantity: 5
    },
    {
        objet: 'Eau',
        quantity: 6
    },
    {
        objet: 'Steak',
        quantity: 2
    }];

    return (
        <EuiPage>
            <EuiPageBody>
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle size='l'>
                                <h1>Food Tracker</h1>
                            </EuiTitle>
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody>
                        <EuiFlexGroup>
                            <EuiFlexItem>
                                <EuiTitle size='m'>
                                    <h3>Aliments</h3>
                                </EuiTitle>
                                <EuiBasicTable
                                    items={items}
                                    columns={columns}
                                />
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <EuiTitle size='m' style={{ margin: 'auto' }}>
                                    <h2>Ma liste de course</h2>
                                </EuiTitle>
                                <EuiText textAlign="center">
                                    <h3>Paniers automatiques</h3>
                                </EuiText>
                                <CustomCarousel />
                                <EuiSpacer />
                            </EuiFlexItem>
                        </EuiFlexGroup>
                        <EuiSpacer />
                        <EuiLink href="/" >
                            Retour
            </EuiLink>{' '}
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    );
}