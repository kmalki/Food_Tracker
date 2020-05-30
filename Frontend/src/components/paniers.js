import React, { useState, useEffect, Fragment } from 'react';
import '../App.css';
import CustomCarousel from './customCarousel.js';
import AuthService from '../services/auth-service';
import axios from "axios";
import ProfilePopover from './profile_popover.js';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview';
import createPonyfill from 'web-speech-cognitive-services/lib/SpeechServices';
import DictateButton from 'react-dictate-button';

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
  EuiButton,
  EuiModal,
  EuiOverlayMask,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiFieldNumber,
  EuiGlobalToastList,
  EuiFieldText,
  EuiLoadingChart
} from '@elastic/eui';

export default function Home() {

  const [items, setItems] = useState([]);
  const [file, setFile] = useState(buildFileSelector());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSpeechVisible, setIsModalSpeechVisible] = useState(false);
  const [codeValue, setcodeValue] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [dataUri, setDataUri] = useState('');
  const [photoMode, setphotoMode] = useState(false);
  const [hasCamera, sethasCamera] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isDictionWorking, setisDictionWorking] = useState(false);

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
    }
  ];

  const removeToast = removedToast => {
    setToasts(toasts.filter(toast => toast.id !== removedToast.id));
  };

  const closeModal = () => {
    setIsModalVisible(false);
    let elementsEuiOverlay = document.getElementsByClassName('euiOverlayMask');
    elementsEuiOverlay[0].remove();
  }

  const closeSpeechModal = () => {
    setIsModalSpeechVisible(false);
    let elementsEuiOverlay = document.getElementsByClassName('euiOverlayMask');
    elementsEuiOverlay[0].remove();
    setcodeValue('');
  }

  function handleToastError(code) {
    switch (code) {
      case 404:
        setToasts(toasts.concat(toastsList[3]));
        break;
      case 400:
        setToasts(toasts.concat(toastsList[2]));
        break;
      default:
        setToasts(toasts.concat(toastsList[4]));
    }
  }

  function handleTakePhoto(dataUri) {
    setDataUri(dataUri);
    setphotoMode(false);
    showModal();
  }

  const showModal = () => setIsModalVisible(true);
  const showModalSpeech = () => setIsModalSpeechVisible(true);

  const config = {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('foodTrackerAuthorization'))
    }
  }

  const {
    SpeechGrammarList,
    SpeechRecognition
  } = createPonyfill({
    credentials: {
      region: 'westus',
      subscriptionKey: '58f7206e30fe4f56961f7d7d4b4f446c'
    }
  });

  const API_URL_PRODUCTS = 'http://localhost:8080/products/';
  useEffect(() => {
    axios
      .get(API_URL_PRODUCTS + 'getProducts', config)
      .then((response) => {
        setItems(response.data);
      }, () => {
        handleToastError();
      })

    navigator.getMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getMedia({ video: true }, function () {
      sethasCamera(true);
    }, function () {
      sethasCamera(false);
    });

    // eslint-disable-next-line
  }, [])

  const removeOneItem = (item) => {
    axios.post(API_URL_PRODUCTS + 'updateProduct', {
      "quantity": -1,
      "code": item.puk.code
    }, config).then(() => {
      getProducts().then((response) => {
        setItems(response.data);
        setToasts(toasts.concat(toastsList[1]));
      });
    }, (error) => {
      console.log(error);
      setToasts(toasts.concat(toastsList[5]));
    });
  };

  const deleteItem = (item) => {
    axios.post(API_URL_PRODUCTS + 'updateProduct', {
      "quantity": -item.quantity,
      "code": item.puk.code
    }, config).then(() => {
      getProducts().then((response) => {
        setItems(response.data);
        setToasts(toasts.concat(toastsList[1]));
      });
    }, (error) => {
      console.log(error);
      setToasts(toasts.concat(toastsList[5]));
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
    if (hasCamera) {
      setphotoMode(true);
    }
    else {
      e.preventDefault();
      file.click();
    }
  }

  const getProducts = () => {
    return axios
      .get(API_URL_PRODUCTS + 'getProducts', config)
      .then(response => {
        return response;
      });
  }

  function saveAction() {
    addNewItem();
  }

  function saveActionManuel() {
    closeSpeechModal();
    console.log(codeValue);
    console.log(quantity);
  }

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  function dictateClick() {
    setisDictionWorking(true);
  }

  function addNewItem() {
    const data = new FormData();

    if (hasCamera) {
      // Split the base64 string in data and contentType
      var block = dataUri.split(";");
      // Get the content type of the image
      var contentType = block[0].split(":")[1];
      // get the real base64 content of the file
      var realData = block[1].split(",")[1];
      // Convert it to a blob to upload
      var blob = b64toBlob(realData, contentType);
      data.append('image', blob);
    }
    else {
      data.append('image', file.files[0]);
    }

    data.append("quantity", quantity);
    axios.post(API_URL_PRODUCTS + 'addProduct', data, config).then(() => {
      getProducts().then((response) => {
        setItems(response.data);
        file.remove();
        setFile(buildFileSelector());
        closeModal();
        setToasts(toasts.concat(toastsList[0]));
      });
    }, (error) => {
      console.log(error);
      file.remove();
      setFile(buildFileSelector());
      closeModal();
      showModalSpeech();
    });
  }

  function launchModal() {
    showModal();
  }

  function addOneItem(item) {
    axios.post(API_URL_PRODUCTS + 'updateProduct', {
      "quantity": 1,
      "code": item.puk.code
    }, config).then(() => {
      getProducts().then((response) => {
        setItems(response.data);
        setToasts(toasts.concat(toastsList[0]));
      });
    }, (error) => {
      console.log(error);
      setToasts(toasts.concat(toastsList[6]));
    });
  }

  function onDictate(text) {
    let finalText = text.substring(0, text.length - 1);
    setisDictionWorking(false);
    setcodeValue(finalText);
  }

  const onChangeCode = e => {
    setcodeValue(e.target.value);
  };

  function buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', 'image/*');
    fileSelector.onchange = launchModal;
    return fileSelector;
  }

  let modal = (
    <EuiOverlayMask>
      <EuiModal onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Définir la quantité</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          {hasCamera ? (
            <Fragment>
              <ImagePreview dataUri={dataUri} />
              <EuiSpacer />
            </Fragment>
          ) : (
              null
            )}
          <EuiFieldNumber
            placeholder="1"
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value, 10))}
          />
        </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
          <EuiButton onClick={saveAction} fill>
            Save
            </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  )

  let modalSpeech = (
    <EuiOverlayMask>
      <EuiModal onClose={closeSpeechModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Code barre non reconnu</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiText size="s">
            <p>
              Il semblerait que le code barre ne soit pas reconnu, vous pouvez tenter de recommencer en essayant de bien centré le code barre ainsi que
              d'augmenter la luminosité de l'environnement dans lequel vous vous trouvez.
            </p>
            <p>
              Sinon vous pouvez également utiliser la reconnaissance vocale et épeler le code barre en cliquant juste en dessous
            </p>
            <DictateButton
              onDictate={({ result }) => onDictate(result.transcript)}
              speechGrammarList={SpeechGrammarList}
              speechRecognition={SpeechRecognition}
              onClick={dictateClick}
              lang={'fr-FR'}
            >
              {isDictionWorking ? 'Diction en cours, vous pouvez parler' : 'Cliquer ici pour commencer la diction'}
            </DictateButton>
            {isDictionWorking ? (
            <Fragment>
              <EuiLoadingChart style={{ marginLeft: '10px' }} size="xl" mono />
            </Fragment>
          ) : (
              null
            )}
            <EuiSpacer />
            <p>
              Il est toujours possible de rentrer le code barre à la main dans le champs prévu à cet effet
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiFieldText
            placeholder="Code barre"
            value={codeValue}
            onChange={e => onChangeCode(e)}
            aria-label="codebarre"
          />
          <EuiSpacer />
          <EuiTitle size="s">
            <h3>Quantité de l'item à ajouter</h3>
          </EuiTitle>
          <EuiSpacer />
          <EuiFieldNumber
            placeholder="1"
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value, 10))}
          />
        </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeSpeechModal}>Cancel</EuiButtonEmpty>
          <EuiButton onClick={saveActionManuel} fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  )

  if (AuthService.getCurrentUser()) {

    if (photoMode) {
      return (
        <Camera
          onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
          isFullscreen={false}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          imageType={IMAGE_TYPES.JPG}
          sizeFactor={1}
          isImageMirror={false}
        />
      );
    }
    else {
      return (
        <EuiPage>
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={6000}
          />
          {isModalVisible && modal}
          {isModalSpeechVisible && modalSpeech}
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
  }
  else {
    window.location.href = '/login';
  }
}