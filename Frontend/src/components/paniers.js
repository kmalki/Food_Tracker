import React, { useState, useEffect } from 'react';
import '../App.css';
import CustomCarousel from './customCarousel.js';
import AuthService from '../services/auth-service';
import axios from "axios";

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

  const [items, setItems] = useState([]);
  const [file] = useState(buildFileSelector());

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

  const removeOneItem = (item) => {
    console.log(item);
    axios.post(API_URL_PRODUCTS + 'removeProduct', {
      "quantity": 1,
      "code": item.puk.code
    }, config).then(() => {
      getProducts().then((response) => {
        setItems(response.data);
      });
    }, (error) => {
      console.log(error);
    });
  };

  const deleteItem = (item) => {
    axios.post(API_URL_PRODUCTS + 'removeProduct', {
      "quantity": item.quantity,
      "code": item.puk.code
    }, config).then(() => {
      getProducts().then((response) => {
        setItems(response.data);
      });
    }, (error) => {
      console.log(error);
    });
  };

  const actions = [

    {
      name: 'Ajouter 1 item',
      description: 'Ajouter 1 de quantité à cet item',
      icon: 'plusInCircle',
      type: 'icon',
      onClick: addOneItem
    },
    {
      name: 'Supprimer 1 item',
      description: 'Supprimer 1 de quantité à cet item',
      icon: 'minusInCircle',
      type: 'icon',
      onClick: removeOneItem
    },
    {
      name: 'Supprimer totalement cet item',
      description: 'Supprimer totalement cet item',
      icon: 'trash',
      type: 'icon',
      color: 'danger',
      onClick: deleteItem
    }
  ];

  const columns = [
    {
      field: 'product_name',
      name: 'Produit',
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

  const handleFileSelect = (e) => {
    e.preventDefault();
    file.click();
  }

  const getProducts = () => {
    return axios
        .get(API_URL_PRODUCTS + 'getProducts', config)
        .then(response => {
            return response;
        });
  }

  function addNewItem(item) {    
    const data = new FormData();
    data.append('image', this.files[0]);
    data.append("quantity", 1);
    axios.post(API_URL_PRODUCTS + 'addProduct', data, config).then(() => {
      getProducts().then((response) => {
        setItems(response.data);
      });
    }, (error) => {
      console.log(error);
    });
    this.value = '';
  }

  function addOneItem(item) {
    const data = new FormData();
    data.append('image', this.files[0]);
    data.append("quantity", 1);
    axios.post(API_URL_PRODUCTS + 'addProduct', data, config).then(() => {
      getProducts().then((response) => {
        setItems(response.data);
      });
    }, (error) => {
      console.log(error);
    });
    this.value = '';
  }

  function buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.onchange = addNewItem;
    return fileSelector;
  }

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
                      <EuiButton iconType="plusInCircleFilled" onClick={handleFileSelect}>
                        Ajouter un article
                      </EuiButton>
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