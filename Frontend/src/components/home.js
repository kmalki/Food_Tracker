import React, { useState, useEffect, Fragment } from 'react';
import '../App.css';

import AuthService from '../services/auth-service';
import axios from "axios";
import ProfilePopover from './profile_popover.js';
import moment from "moment";
import { Line } from 'react-chartjs-2';

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
  EuiBasicTable,
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiDatePicker,
  EuiDatePickerRange
} from '@elastic/eui';

export default function Home() {

  const [items, setItems] = useState([]);
  const [startDate, setstartDate] = useState(moment());
  const [endDate, setendDate] = useState(moment().add(10, "d"));

  const handleChangeStart = date => {
    setstartDate(date);
    console.log(startDate);
  }
  const handleChangeEnd = date => setendDate(date);

  const config = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('foodTrackerAuthorization'))
    }
  }

  const data = {
    labels: [moment().add(1, "d"), moment().add(2, "d"), moment().add(3, "d"), moment().add(4, "d")],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

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
      <Fragment>
        <EuiHeader>
          <EuiHeaderSectionItem border="right">
            <EuiHeaderLogo href="/home">Food Tracker</EuiHeaderLogo>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <EuiHeaderLinks aria-label="App navigation links example">
              <EuiHeaderLink href="/paniers">
                Mes paniers
              </EuiHeaderLink>
              <EuiHeaderLink href="/recettes">
                Mes recettes
              </EuiHeaderLink>
              <EuiHeaderLink href="/consumed">Mes produits consommés</EuiHeaderLink>
              <EuiHeaderLink iconType="help" href="#">
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
                      <EuiTitle size='m'>
                        <h2>Home</h2>
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
                      <h3>Aliments</h3>
                    </EuiTitle>
                    <EuiBasicTable
                      items={items}
                      columns={columns}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiTitle size='m' style={{ margin: 'auto' }}>
                      <h2>Graphes</h2>
                    </EuiTitle>
                    <EuiFlexGroup justifyContent="spaceAround">
                      <EuiFlexItem grow={false}>
                        <EuiDatePickerRange
                          startDateControl={
                            <EuiDatePicker
                              selected={startDate}
                              onChange={handleChangeStart}
                              startDate={startDate}
                              endDate={endDate}
                              isInvalid={startDate > endDate}
                              aria-label="Start date"
                            />
                          }
                          endDateControl={
                            <EuiDatePicker
                              selected={endDate}
                              onChange={handleChangeEnd}
                              startDate={startDate}
                              endDate={endDate}
                              isInvalid={startDate > endDate}
                              aria-label="End date"
                            />
                          }
                        />
                      </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiFlexGroup justifyContent="spaceAround">
                      <EuiFlexItem>
                        <div>
                          <h2>Line Example</h2>
                          <Line
                            data={data}
                            options={{
                              responsive: true,
                              maintainAspectRatio: true,
                              scales: {
                                xAxes: [{
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10
                                  },
                                  type: 'time',
                                  time: {
                                    tooltipFormat: 'MMM DD, YYYY',
                                    displayFormats: {
                                      'millisecond': 'MMM DD, YYYY',
                                      'second': 'MMM DD, YYYY',
                                      'minute': 'MMM DD, YYYY',
                                      'hour': 'MMM DD, YYYY',
                                      'day': 'MMM DD, YYYY',
                                      'week': 'MMM DD, YYYY',
                                      'month': 'MMM DD, YYYY',
                                      'quarter': 'MMM DD, YYYY',
                                      'year': 'MMM DD, YYYY',
                                    }
                                  }
                                }]
                              }
                            }}
                          />
                        </div>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiFlexItem>
                </EuiFlexGroup>
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