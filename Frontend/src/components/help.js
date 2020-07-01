import React, { Fragment } from 'react';
import AuthService from '../services/auth-service';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiPageHeader,
  EuiPageHeaderSection
} from '@elastic/eui';

export default function Help() {

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
              <EuiHeaderLink iconType="help" href="/help">
                Help
      </EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        </EuiHeader>
        <EuiPage>
          <EuiPageBody component="div">
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle size="l">
                  <h1>Help</h1>
                </EuiTitle>
              </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiPageContent>
              <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                  <EuiTitle>
                    <h2>A quoi sert cette appli ?</h2>
                  </EuiTitle>
                </EuiPageContentHeaderSection>
              </EuiPageContentHeader>
              <EuiPageContentBody>Cette application permet de gérer ses vivres à la perfection en suivant le stock de vos aliments. Elle permet également
              de suivre votre consommation et d'en tirer des statistiques dans le but de vous aider tant sur un plan financier que nutritionnel.
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