import React, { useState, useEffect } from 'react';
import '../App.css';
import CustomCarousel from './customCarousel.js';
import AuthService from '../services/auth-service';
import ProductService from '../services/products-handler';
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

  useEffect(() => {
    ProductService.getProducts().then((response) => {
      console.log(response.data)
      setItems(response.data);
    })
  }, [])

  const handleFileSelect = (e) => {
    e.preventDefault();
    file.click();
  }

  const arrayRemove = (value) => {
    console.log(value);
    let config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('foodTrackerAuthorization'))
      }
    }
    axios.post('http://localhost:8080/products/removeProduct', {
      "quantity": 2,
      "code": value.puk.code
    }, config);
    ProductService.getProducts().then((response) => {
      console.log(response.data)
      setItems(response.data);
    })
    setTimeout(() => {
      ProductService.getProducts().then((response) => {
        console.log(response.data)
        setItems(response.data);
      })
    }, 1000);
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

  function inform() {
    let config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('foodTrackerAuthorization'))
      }
    }
    console.log(this.files);
    const data = new FormData();
    data.append('image', this.files[0]);
    data.append("quantity", 2);
    axios.post('http://localhost:8080/products/addProduct', data, config);
    this.value = '';
    setTimeout(() => {
      ProductService.getProducts().then((response) => {
        console.log(response.data)
        setItems(response.data);
      })
    }, 1000);

  }

  function buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.onchange = inform;
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