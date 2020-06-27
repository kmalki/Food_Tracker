import React, { useState, useEffect } from 'react';
import '../App.css';
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
  EuiBasicTable,
  EuiLink,
  EuiGlobalToastList,
} from '@elastic/eui';

export default function Consumed() {

  const [items, setItems] = useState([]);
  const [toasts, setToasts] = useState([]);

  const toastsList = [
    {
      id: "0",
      title: 'Item(s) ajouté(s) !',
      color: 'success',
      text: <p>Item(s) ajouté(s) avec succès</p>
    },
    {
      id: "1",
      title: 'Item(s) supprimé(s) !',
      color: 'success',
      text: <p>Item(s) supprimé(s) avec succès</p>
    },
    {
      id: "2",
      title: 'Erreur',
      color: 'danger',
      iconType: 'help',
      text: <p>L'item n'a pas pu être ajouté car le code n'est pas détécté, essayez de un angle et de meilleurs conditions d'éclairages</p>
    },
    {
      id: "3",
      title: 'Erreur',
      color: 'danger',
      iconType: 'help',
      text: <p>L'item n'a pas pu être ajouté car le produit n'est pas en base</p>
    },
    {
      id: "4",
      title: 'Erreur',
      color: 'danger',
      iconType: 'help',
      text: <p>Serveur non joignable</p>
    },
    {
      id: "5",
      title: 'Erreur',
      color: 'danger',
      iconType: 'help',
      text: <p>La suppression n'a pas pu s'effectuer (voir la console pour plus de détails)</p>
    },
    {
      id: "6",
      title: 'Erreur',
      color: 'danger',
      iconType: 'help',
      text: <p>L'ajout n'a pas pu s'effectuer (voir la console pour plus de détails)</p>
    },
    {
      id: "7",
      title: 'Erreur',
      color: 'danger',
      iconType: 'help',
      text: <p>Impossible de diminuer la quanité d'avantage</p>
    }
  ];

  const removeToast = removedToast => {
    setToasts(toasts.filter(toast => toast.id !== removedToast.id));
  };

  function handleToastError(code) {
    switch (code) {
      case 404:
        setToasts(toasts.concat(toastsList[3]));
        break;
      case 400:
        setToasts(toasts.concat(toastsList[2]));
        break;
      case 99:
        setToasts(toasts.concat(toastsList[7]));
        break;
      default:
        setToasts(toasts.concat(toastsList[4]));
    }
  }

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
        setItems(response.data.map(item => ({ code: item.puk.code, product_name: item.product_name, quantity: 0 })));
      }, () => {
        handleToastError();
      })

    // eslint-disable-next-line
  }, [])

  const addItem = item => {
    const elementsIndex = items.findIndex(element => element.code ===  item.code);
    let newArray = [...items];
    newArray[elementsIndex] = {...newArray[elementsIndex], quantity: newArray[elementsIndex].quantity + 1};
    setItems(newArray);
  };

  const removeItem = item => {
    if(item.quantity > 0) {
      const elementsIndex = items.findIndex(element => element.code ===  item.code);
      let newArray = [...items];
      newArray[elementsIndex] = {...newArray[elementsIndex], quantity: newArray[elementsIndex].quantity - 1};
      setItems(newArray);
    } 
    else {
      handleToastError(99);
    }
  };

  const actions = [
    {
      name: 'Ajouter 1 item',
      description: 'Ajouter 1 de quantité à cet item',
      icon: 'plusInCircle',
      type: 'icon',
      onClick: addItem
    },
    {
      name: 'Supprimer 1 item',
      description: 'Supprimer 1 de quantité à cet item',
      icon: 'minusInCircle',
      type: 'icon',
      onClick: removeItem
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
      actions
    }
  ];

  if (AuthService.getCurrentUser()) {
    return (
      <EuiPage>
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={6000}
        />
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
                    <ProfilePopover />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiTitle size='m'>
                    <h3>Aliments consomés</h3>
                  </EuiTitle>
                  <EuiBasicTable
                    items={items}
                    columns={columns}
                    hasActions={true}
                  />
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
