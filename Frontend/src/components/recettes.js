import React, { useState } from 'react';

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
  EuiInMemoryTable,
  EuiSpacer,
  EuiAccordion,
  EuiDualRange,
  EuiFormHelpText,
  EuiLink
} from '@elastic/eui';

export default function Recettes() {

  /*let debounceTimeoutId;
  let requestTimeoutId;*/

  const columns = [
    {
      field: 'recette',
      name: 'Recette'
    },
    {
      field: 'categorie',
      name: 'Catégorie'
    }
  ];

  const recettes = [{
    recette: 'Gateau choco',
    categorie: 'Patisserie'
  },
  {
    recette: 'Couscous',
    categorie: 'Plat'
  },
  {
    recette: 'Velouté de potorion',
    categorie: 'Soupe'
  }];

  const [items, setItems] = useState(recettes);
  const [isLoading, setIsLoading] = useState(false);


  const [value, setValue] = useState(['', '']);

  const onChange = value => {
    setValue(value);
  };

  /*const onQueryChange = ({ query }) => {
    clearTimeout(debounceTimeoutId);
    clearTimeout(requestTimeoutId);

    debounceTimeoutId = setTimeout(() => {
      setIsLoading(true);

      requestTimeoutId = setTimeout(() => {
        const items = recettes.filter(recette => {
          const normalizedName = `${recette.recette} ${
            recette.recette
            }`.toLowerCase();
          const normalizedQuery = query.text.toLowerCase();
          return normalizedName.indexOf(normalizedQuery) !== -1;
        });

        setIsLoading(false);
        setItems(items);
      }, 500);
    }, 300);
  };*/

  const search = {
    //onChange: onQueryChange,
    box: {
      incremental: true,
    },
    filters: [
      {
        type: 'field_value_selection',
        field: 'categorie',
        name: 'Catégorie',
        multiSelect: false,
        options: recettes.map(recette => ({
          value: recette.categorie,
          name: recette.categorie
        })),
      },
    ]
  };

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
                  <h3>Recettes</h3>
                </EuiTitle>
                <EuiSpacer />
                <EuiAccordion
                  id="accordion"
                  buttonContent="Gérer le temps des recettes"
                  paddingSize="m">
                  <EuiDualRange
                    min={0}
                    max={100}
                    step={20}
                    value={value}
                    onChange={onChange}
                    showLabels
                    showTicks
                    aria-label="An example of EuiDualRange"
                    showInput={true}
                  />
                  <EuiFormHelpText id="levelsHelp">
                    Temps de préparation nécessaire pour les recettes en minutes.
                  </EuiFormHelpText>
                </EuiAccordion>
                <EuiSpacer />

                <EuiInMemoryTable
                  items={items}
                  loading={isLoading}
                  columns={columns}
                  search={search}
                  pagination={true}
                  sorting={true}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer/>
            <EuiLink href="/" >
              Retour
            </EuiLink>{' '}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}