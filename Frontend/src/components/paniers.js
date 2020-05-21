import React, { useState } from 'react';
import '../App.css';
import CustomCarousel from './customCarousel.js';
import AuthService from '../services/auth-service';
import ProductService from '../services/products-handler';

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
  EuiLink,
  EuiButton
} from '@elastic/eui';

export default function Home() {

  const [items, setItems] = useState([{
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
  }]);

  const arrayRemove = (value) => {
    setItems(items.filter(function(ele){ return ele !== value; }));
  };

  const actions = [
    {
      name: 'Delete',
      description: 'Supprimer cet item',
      icon: 'trash',
      type: 'icon',
      color: 'danger',
      onClick: arrayRemove
    }
  ];

  const columns = [
    {
      field: 'objet',
      name: 'Objet',
    },
    {
      field: 'quantity',
      name: 'Quantité',
    },
    {
      actions,
      width: '1%'
    }
  ];

  /*let items = [{
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
  }];*/



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
                    <EuiButton onClick={() => AuthService.logout()}> Logout </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
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
                    hasActions={true}
                  />
                  <EuiSpacer />
                  <EuiFlexGroup justifyContent="spaceAround">
                    <EuiFlexItem grow={false}>
                      <EuiButton iconType="plusInCircleFilled" onClick={() => ProductService.getProducts()}> Ajouter un article</EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
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
              <EuiLink href="/home" >
                Home
              </EuiLink>{' '}
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