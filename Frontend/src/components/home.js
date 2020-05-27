import React, { useState, useEffect } from 'react';
import '../App.css';
import CustomCarousel from './customCarousel.js';
import AuthService from '../services/auth-service';
import axios from "axios";
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
  EuiText,
  EuiBasicTable,
  EuiCallOut,
  EuiButton
} from '@elastic/eui';

export default function Home() {

  const [items, setItems] = useState([]);
  const config = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('foodTrackerAuthorization'))
    }
  }

  const API_URL_PRODUCTS = 'http://localhost:8080/products/';
  useEffect(() => {
    axios
      .get(API_URL_PRODUCTS + 'getProducts', config)
      .then((response) => {
        setItems(response.data);
      })
    // eslint-disable-next-line
  }, [])

  const columns = [
    {
      field: 'product_name',
      name: 'Produit',
    },
    {
      field: 'quantity',
      name: 'Quantité',
    }
  ];

  if (AuthService.getCurrentUser()) {
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection style={{ "width": "100%" }}>
                <EuiFlexGroup justifyContent="spaceBetween" style={{ "width": "100%" }}>
                  <EuiFlexItem grow={false} tyle={{ minWidth: 200 }}>
                    <EuiTitle size='l'>
                      <h1>Food Tracker</h1>
                    </EuiTitle>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <ProfilePopover/>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <div>
                <EuiCallOut
                  title="Gérer vos recettes ainsi que vos paniers automatiques !"
                  iconType="pin">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                  </p>
                  <EuiButton
                    href="/recettes"
                  >
                    Gérer les recettes
                  </EuiButton>
                  <EuiSpacer />
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                  </p>
                  <EuiButton
                    href="/paniers"
                  >
                    Gérer les paniers
                  </EuiButton>
                </EuiCallOut>
              </div>

              <EuiSpacer size="m" />
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
                    <h2>Recettes</h2>
                  </EuiTitle>
                  <EuiText textAlign="center">
                    <h3>Favoris</h3>
                  </EuiText>
                  <CustomCarousel />
                  <EuiSpacer />
                  <EuiText textAlign="center">
                    <h3>Historique</h3>
                  </EuiText>
                  <CustomCarousel />
                  <EuiSpacer />
                  <EuiText textAlign="center">
                    <h3> A tester</h3>
                  </EuiText>
                  <CustomCarousel />
                  <EuiSpacer />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
  else {
    window.location.href = '/login';
  }
}