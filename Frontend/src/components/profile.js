import React, { Fragment } from 'react';
import AuthService from '../services/auth-service';
import ProfilePopover from './profile_popover.js';

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
  EuiAvatar,
  EuiLink,
  EuiHorizontalRule,
  EuiFlexGrid,
  EuiPanel,
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '@elastic/eui';

export default function Profile() {

  const ITEM_STYLE = { width: '300px' };

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
          <EuiPageBody>
            <EuiPageContent>
              <EuiPageContentHeader>
                <EuiPageContentHeaderSection style={{ "width": "100%" }}>
                  <EuiFlexGroup justifyContent="spaceBetween" style={{ "width": "100%" }}>
                    <EuiFlexItem grow={false} style={{ minWidth: 200 }}>
                      <EuiTitle size='l'>
                        <h1>Food Tracker</h1>
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
                    <EuiTitle size='m'>
                      <h3>Profile</h3>
                    </EuiTitle>
                    <EuiSpacer />
                    <h1>
                      <EuiTitle size="m">
                        <h2><EuiAvatar style={{ marginRight: "10px", marginBottom: "5px" }} color="#BD10E0" size="xl" name={AuthService.getCurrentUser()} /> {AuthService.getCurrentUser()}</h2>
                      </EuiTitle>
                    </h1>
                    <EuiHorizontalRule />
                    <EuiPanel paddingSize="m">
                      <EuiFlexGrid columns={2}>
                        <EuiFlexItem style={ITEM_STYLE}>
                          <div><b>Nom</b></div>
                        </EuiFlexItem>
                        <EuiFlexItem style={ITEM_STYLE}>
                          <div>{AuthService.getCurrentUser()}</div>
                        </EuiFlexItem>
                        <EuiFlexItem style={ITEM_STYLE}>
                          <div><b>Email</b></div>
                        </EuiFlexItem>
                        <EuiFlexItem style={ITEM_STYLE}>
                          <div>test@gmail.com</div>
                        </EuiFlexItem>
                        <EuiFlexItem style={ITEM_STYLE}>
                          <div><b>Ville</b></div>
                        </EuiFlexItem>
                        <EuiFlexItem style={ITEM_STYLE}>
                          <div>Paris, 75015</div>
                        </EuiFlexItem>
                        <EuiFlexItem style={ITEM_STYLE}>
                          <div><b>Age</b></div>
                        </EuiFlexItem>
                        <EuiFlexItem style={ITEM_STYLE}>
                          <div>23 ans</div>
                        </EuiFlexItem>
                      </EuiFlexGrid>
                    </EuiPanel>
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