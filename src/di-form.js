class Extract_data {
  constructor(dataMain) {
    this.dataMain = dataMain;
  }
  questions() {
    return this.dataMain.form.questions;
  }
}
const dataMain = JSON.parse(form_b00);
const dataForm = new Extract_data(dataMain);
//impre(dataForm);

function buildForm(spotP) {
  impre(dataForm.questions());
  const spot = document.getElementById(spotP);
  dataForm.questions().forEach(function (elem_a, a) {
    let ident = elem_a.identifier;
    let spotDiv = builDiv(spot, 'sectInp_' + ident);
    let spotLabel = builDiv(spotDiv, 'sectInpLabel_' + ident);
    buildInputsItems(ident, 'label', spotLabel, '', elem_a.label)
    switch (elem_a.input_type) {
      case 'text':
        let spotInput = builDiv(spotDiv, 'sectInput_' + ident);
        buildInputsItems(ident, elem_a.input_type, spotInput, '');
        break;
      case 'radio':
        let spotMulti = builDiv(spotDiv, 'sectMulti_' + ident);
        elem_a.answers.forEach(function (elem_b, b) {
          let spotMultiInpOpt = builDiv(spotMulti, 'sectMultiOpt_' + ident + '_' + elem_b.value);
          buildInputsItems(ident, 'label-multi', spotMultiInpOpt, elem_b.value, elem_b.label)
          buildInputsItems(ident, elem_a.input_type, spotMultiInpOpt, elem_b.value, '');
        });
        break;
    }
  });

  function builDiv(spot, ident) {
    let div = document.createElement("div");
    div.name = ident;
    div.id = ident;
    spot.appendChild(div);
    let spotDiv = document.getElementById(ident);
    return spotDiv;
  }

  function buildInputsItems(ident, type, spot, val, lab) {
    switch (type) {
      case 'text':
        let inputF = document.createElement("input");
        inputF.name = 'inp_' + ident;
        inputF.id = 'inp_' + ident;
        inputF.type = type;
        spot.appendChild(inputF);
        break;
      case 'radio':
        let inputRadioF = document.createElement("input");
        inputRadioF.type = type;
        inputRadioF.name = 'inpMult_' + ident;
        inputRadioF.id = 'inpMult_' + ident + '_' + val;
        inputRadioF.value = val;
        let spotMultiRadio = builDiv(spot, 'sectMultiInp_' + ident + '_' + val);
        spotMultiRadio.appendChild(inputRadioF);
        break;
      case 'label':
        let labelF = document.createElement("label");
        labelF.for = 'inp_' + ident;
        labelF.innerHTML = lab;
        spot.appendChild(labelF);
        break;
      case 'label-multi':
        let labelRadioF = document.createElement("label");
        labelRadioF.for = 'inpMult_' + ident + '_' + val;
        labelRadioF.innerHTML = lab;
        let spotMultiLabel = builDiv(spot, 'sectMultiLabel_' + ident + '_' + val);
        spotMultiLabel.appendChild(labelRadioF);
        break;
    }
  }
}

function impre(element) {
  console.log(element);
}
