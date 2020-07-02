import React, { useState, Fragment } from 'react';
import AuthService from '../services/auth-service';
import ProfilePopover from './profile_popover.js';
import CustomCarouselFavorites from './customCarouselFavorites.js';
import CustomCarouselHistory from './customCarouselHistory.js';
import CustomCarouselTests from './customCarouselTests.js';

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
  EuiLink,
  EuiSwitch,
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiText
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

  const [items] = useState(recettes);
  const [isLoading] = useState(false);
  const [value, setValue] = useState(['', '']);

  const [checked, setChecked] = useState(false);

  const onChangeSwitch = e => {
    setChecked(e.target.checked);
  };

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

  if (AuthService.getCurrentUser()) {
    return (
      <Fragment>
        <EuiHeader>
          <EuiHeaderSectionItem border="right">
            <EuiHeaderLogo href="/home">Food Tracker</EuiHeaderLogo>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <EuiHeaderLinks aria-label="App navigation links example">
              <EuiHeaderLink href="/home">
                Home
          </EuiHeaderLink>
              <EuiHeaderLink href="/paniers">
                Mes paniers
          </EuiHeaderLink>
              <EuiHeaderLink href="/consumed">Mes produits consommés</EuiHeaderLink>
              <EuiHeaderLink href="/download">Télécharger les données clients</EuiHeaderLink>
                <EuiHeaderLink iconType="help" href="/help">
                Help
      </EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        </EuiHeader>
        <EuiPage>
          <EuiPageBody>
            <EuiPageContent>
              <EuiPageContentHeader>
                <EuiPageContentHeaderSection style={{ "width": "100%" }}>
                  <EuiFlexGroup justifyContent="spaceBetween" style={{ "width": "100%" }}>
                    <EuiFlexItem grow={false} tyle={{ minWidth: 200 }}>
                      <EuiTitle size='l'>
                        <h1>Recettes</h1>
                      </EuiTitle>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <ProfilePopover />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPageContentHeaderSection>
              </EuiPageContentHeader>
              <EuiPageContentBody>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiSpacer />
                    <EuiSwitch
                      label="N'afficher que des recettes faisables avec les aliments disponibles"
                      checked={checked}
                      onChange={e => onChangeSwitch(e)}
                    />
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
                  <EuiFlexItem>
                    <EuiText textAlign="center">
                      <h3>Favoris</h3>
                    </EuiText>
                    <CustomCarouselFavorites />
                    <EuiSpacer />
                    <EuiText textAlign="center">
                      <h3>Historique</h3>
                    </EuiText>
                    <CustomCarouselHistory />
                    <EuiSpacer />
                    <EuiText textAlign="center">
                      <h3> A tester</h3>
                    </EuiText>
                    <CustomCarouselTests />
                    <EuiSpacer />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer />
                <EuiLink href="/home" >
                  Home
              </EuiLink>{' '}
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      </Fragment>
    );
  }
  else {
    window.location.href = '/login';
  }
}