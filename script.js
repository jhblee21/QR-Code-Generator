// TEXT
const dataInput = document.querySelector('#data');

// IMAGE FORMAT
const imageFormat = document.querySelector('input[name="format"]:checked');

// COLORS
const mainColorPicker = document.querySelector('#color');
const bgColorPicker = document.querySelector('#bg-color');

const mainColorValue = document.querySelector('#color-value');
const bgColorValue = document.querySelector('#bg-color-value');

    // UPDATE MAIN COLOR HEX VALUE
const updateMainColor = (e) => {
    const value = e.target.value;
    mainColorValue.innerText = value;
}

    // UPDATE BACKGROUND COLOR HEX VALUE
const updateBGColor = (e) => {
    const value = e.target.value;
    bgColorValue.innerText = value;
}

    // EVENT LISTENER
const addColorPickerEventListeners = () => {
    mainColorPicker.addEventListener('change', updateMainColor);
    bgColorPicker.addEventListener('change', updateBGColor);
};

addColorPickerEventListeners();

// SLIDERS
const sizeSlider = document.querySelector('#size');
const marginSlider = document.querySelector('#margin');

const sizeValue = document.querySelector('#size-value');
const marginValue = document.querySelector('#margin-value');

    // UPDATE SIZE VALUE
const updateSize = e => {
    const value = e.target.value;
    sizeValue.innerText = `${value} x ${value}`;
}

    // UPDATE MARGIN VALUE
const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = value + 'px';
}

    // EVENT LISTENER
const addSliderEventListeners = () => {
    sizeSlider.addEventListener('change', updateSize);
    marginSlider.addEventListener('change', updateMargin);
}

addSliderEventListeners();

const submitButton = document.querySelector('#cta');

const showInputError = () => {
    dataInput.classList.add('error');
    
}

const addDataInputEventListener = () => {
    dataInput.addEventListener('change', (e)=> {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        }
        else {
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    })
}

addDataInputEventListener();

    // PREPARE PARAMETERS PER API DOCS
const prepareParameters = (params) => {
    return {
        data: params.data,
        size: `${params.size}x${params.size}`, // (integer)x(integer)
        color: params.color.replace('#', ''), // hex value in short format without '#'
        bgcolor: params.bgColor.replace('#', ''), // hex value in short format without '#'
        qzone: params.qZone,
        format: params.format,
    };
}

const settingsContainer = document.querySelector('#qr-code-settings');
const resultContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');

const displayQrCode = (imgUrl) => {
    settingsContainer.classList.add('flipped');
    resultContainer.classList.add('flipped');

    qrCodeImage.setAttribute('src', imgUrl);
}

const getQrCode = (parameters) => {
    const urlParams = new URLSearchParams(parameters).toString();
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code';
    
    const fullUrl = `${baseUrl}?${urlParams}`;

    fetch(fullUrl).then(response => {
        if (response.status == 200) {
            displayQrCode(fullUrl);   // display QR code only when request status is 200 
        }
    });
}

const onSubmit = () => {
    const data = dataInput.value;
    // VALIDATE DATA BEFORE SENDING REQUEST
    if (!data.length) {
        return showInputError();
    }

    const color = mainColorPicker.value;
    const bgColor = bgColorPicker.value;
    const size = sizeSlider.value;
    const qZone = marginSlider.value;
    const format = document.querySelector('input[name="format"]:checked').value;

    const parameters = prepareParameters({data, color, bgColor, size, qZone, format});

    getQrCode(parameters);
}

const addSubmitEventListeners = () => {
    submitButton.addEventListener('click', onSubmit);
}

addSubmitEventListeners();

const editButton = document.querySelector('#edit');

const onEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultContainer.classList.remove('flipped');
}

const addEditButtonEventListener = () => {
    editButton.addEventListener('click', onEdit);
}

addEditButtonEventListener();