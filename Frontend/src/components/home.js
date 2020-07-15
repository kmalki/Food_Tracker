import React, { useState, useEffect, Fragment } from 'react';
import '../App.css';
import AuthService from '../services/auth-service';
import axios from "axios";
import ProfilePopover from './profile_popover.js';
import moment from "moment";
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

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
  EuiDatePickerRange,
  EuiSpacer,
  EuiGlobalToastList,
  EuiProgress,
  EuiPortal
} from '@elastic/eui';

export default function Home() {

  const API_URL_PRODUCTS = 'http://localhost:8080/products/';

  const [items, setItems] = useState([]);
  const [startDate, setstartDate] = useState(moment("2020-07-13"));
  const [endDate, setendDate] = useState(moment("2020-07-15"));
  const [toasts, setToasts] = useState([]);
  const [dates, setdates] = useState([moment("2020-07-13"), moment("2020-07-15")]);
  const [glucideArray, setglucideArray] = useState([]);
  const [lipideArray, setlipideArray] = useState([]);
  const [proteineArray, setproteineArray] = useState([]);
  const [calorieArray, setcalorieArray] = useState([]);
  const [calciumArray, setcalciumArray] = useState([]);
  const [selArray, setselArray] = useState([]);
  const [showProgress, setShowProgress] = useState(true);

  const toastsList = [
    {
      id: "0",
      title: 'Erreur',
      color: 'danger',
      iconType: 'help',
      text: <p>Une erreur est survenue</p>
    }
  ];

  useEffect(() => {
    
    requestGraphData();

    // eslint-disable-next-line
  }, [])

  const requestGraphData = () => {
    setShowProgress(true);
    axios.post(API_URL_PRODUCTS + 'getNutrition',
      {
        "less": {
          "year": endDate.year(),
          "month": endDate.month() + 1,
          "day": endDate.date()
        },
        "greater": {
          "year": startDate.year(),
          "month": startDate.month() + 1,
          "day": startDate.date()
        }
      }, config)
      .then((response) => {
        setdates(response.data.dates.map(x => moment({ year: x.year, month: x.month - 1, day: x.day })));
        setglucideArray(response.data.glucide);
        setlipideArray(response.data.lipide);
        setproteineArray(response.data.proteine);
        setcalorieArray(response.data.calories);
        setcalciumArray(response.data.calcium);
        setselArray(response.data.sel);
        setShowProgress(false);
      }, (error) => {
        setdates([startDate, endDate]);
        console.log(error);
        setToasts(toasts.concat(toastsList[0]));
        setShowProgress(false);
      });
  }

  const removeToast = removedToast => {
    setToasts(toasts.filter(toast => toast.id !== removedToast.id));
  };

  const handleChangeStart = date => {

    setstartDate(date);

    if (startDate < endDate) {
      requestGraphData();
    }
  }

  const handleChangeEnd = date => {

    setendDate(date);

    if (startDate < endDate) {
      requestGraphData();
    }
  }

  const config = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('foodTrackerAuthorization'))
    }
  }

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Lipides (g)',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(10,19,92,1)',
        data: lipideArray
      },
      {
        label: 'Glucides (g)',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(178, 36, 255, 1)',
        data: glucideArray
      },
      {
        label: 'Proteines (g)',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(75,192,192,1)',
        data: proteineArray
      }
    ]
  };

  const data2 = {
    labels: dates,
    datasets: [
      {
        label: 'Calories (Kcal)',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(174, 41, 41, 1)',
        data: calorieArray
      }
    ]
  };

  const data3 = {
    labels: dates,
    datasets: [
      {
        label: 'Sel (g)',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(0, 113, 219, 1)',
        data: selArray
      }
    ]
  };

  const data4 = {
    labels: dates,
    datasets: [
      {
        label: 'Calcium (mg)',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(219, 139, 0, 1)',
        data: calciumArray
      }
    ]
  };

  useEffect(() => {
    axios
      .get(API_URL_PRODUCTS + 'getProducts', config)
      .then((response) => {
        setItems(response.data);
      }, (error) => {
        console.log(error);
        setToasts(toasts.concat(toastsList[0]));
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

  let progress = null;

  if (showProgress) {
    progress = (
      <div>
        <div style={{ position: 'absolute', zIndex: '5' }}>
          <EuiPortal>
            <EuiProgress size="xs" color="accent" position="fixed" />
          </EuiPortal>
        </div>
      </div>
    );
  }

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
              <EuiHeaderLink href="/download">Télécharger les données clients</EuiHeaderLink>
              <EuiHeaderLink iconType="help" href="/help">
                Help
          </EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        </EuiHeader>
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
                    <EuiFlexItem grow={false} style={{ minWidth: 200 }}>
                      <EuiTitle size='l'>
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
                      <h2>Graphes nutritionnels</h2>
                    </EuiTitle>
                    <EuiSpacer size='s' />
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
                    <EuiSpacer />
                    <EuiFlexGroup justifyContent="spaceAround">
                      <EuiFlexItem>
                        <div>
                          <Line
                            data={data}
                            options={{
                              responsive: true,
                              maintainAspectRatio: true,
                              scales: {
                                xAxes: [{
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
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
                                  },
                                }],
                                yAxes: [{
                                  ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 300
                                  }
                                }]
                              },
                              annotation: {
                                annotations: [{
                                  type: 'line',
                                  mode: 'horizontal',
                                  scaleID: 'y-axis-0',
                                  value: 260,
                                  borderColor: 'rgba(178, 36, 255, 0.5)',
                                  borderWidth: 2,
                                  label: {
                                    enabled: true,
                                    content: 'Limite journalière glucide (260g)'
                                  }
                                },
                                {
                                  type: 'line',
                                  mode: 'horizontal',
                                  scaleID: 'y-axis-0',
                                  value: 70,
                                  borderColor: 'rgba(10,19,92, 0.5)',
                                  borderWidth: 2,
                                  label: {
                                    enabled: true,
                                    content: 'Limite journalière lipide (70g)'
                                  }
                                },
                                {
                                  type: 'line',
                                  mode: 'horizontal',
                                  scaleID: 'y-axis-0',
                                  value: 50,
                                  borderColor: 'rgba(75,192,192,1)',
                                  borderWidth: 2,
                                  label: {
                                    enabled: true,
                                    content: 'Limite journalière protéine (50g)'
                                  }
                                }]
                              }
                            }}
                          />
                        </div>

                        <div>
                          <Line
                            data={data2}
                            options={{
                              responsive: true,
                              maintainAspectRatio: true,
                              scales: {
                                xAxes: [{
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
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
                                }],
                                yAxes: [{
                                  ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 2500
                                  }
                                }]
                              },
                              annotation: {
                                annotations: [{
                                  type: 'line',
                                  mode: 'horizontal',
                                  scaleID: 'y-axis-0',
                                  value: 2000,
                                  borderColor: 'rgba(174, 41, 41, 0.5)',
                                  borderWidth: 2,
                                  label: {
                                    enabled: true,
                                    content: 'Limite journalière calories (Kcal)'
                                  }
                                }]
                              }
                            }}
                          />
                        </div>


                        <div>
                          <Line
                            data={data3}
                            options={{
                              responsive: true,
                              maintainAspectRatio: true,
                              scales: {
                                xAxes: [{
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
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
                                }],
                                yAxes: [{
                                  ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 6
                                  }
                                }]
                              },
                              annotation: {
                                annotations: [{
                                  type: 'line',
                                  mode: 'horizontal',
                                  scaleID: 'y-axis-0',
                                  value: 5,
                                  borderColor: 'rgba(0, 113, 219, 0.5)',
                                  borderWidth: 2,
                                  label: {
                                    enabled: true,
                                    content: 'Limite journalière sel (g)'
                                  }
                                }]
                              }
                            }}
                          />
                        </div>

                        <div>
                          <Line
                            data={data4}
                            options={{
                              responsive: true,
                              maintainAspectRatio: true,
                              scales: {
                                xAxes: [{
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
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
                                }],
                                yAxes: [{
                                  ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 850
                                  }
                                }]
                              },
                              annotation: {
                                annotations: [
                                {
                                  type: 'line',
                                  mode: 'horizontal',
                                  scaleID: 'y-axis-0',
                                  value: 800,
                                  borderColor: 'rgba(219, 139, 0, 0.5)',
                                  borderWidth: 2,
                                  label: {
                                    enabled: true,
                                    content: 'Limite journalière calcium (mg)'
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
        {progress}
      </Fragment>
    );
  }
  else {
    window.location.href = '/login';
  }
}
