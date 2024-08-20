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
  buildFormDivInp(dataForm.questions(), 'parent', spot, '', '')

  function buildFormDivInp(array, type, spot, w1, w2) {
    array.forEach(function (elem_a, a) {
      let ident = elem_a.identifier;
      let spotDiv = builDiv(spot, 'sectInp_' + type + '_' + ident);
      let labelId = 'sectInpLabel_' + type + '_' + ident;
      if (!document.getElementById(labelId) && (type == 'child' ? w2 == true : w2 == false)) {
        let spotLabel = builDiv(spotDiv, labelId);
        buildInputsItems(type, ident, 'label', spotLabel, '', elem_a.label)
      }
      switch (elem_a.input_type) {
        case 'text':
          let textIdInput = 'sectInput_' + type + '_' + ident;
          if (!document.getElementById(textIdInput) && (type == 'child' ? w2 == true : w2 == false)) {
            let spotInput = builDiv(spotDiv, textIdInput);
            buildInputsItems(type, ident, elem_a.input_type, spotInput, '');
          }
          break;
        case 'radio':
        case 'checkout':
          let multiIdInput = 'sectMulti_' + type + '_' + ident;
          if (!document.getElementById(multiIdInput) && (type == 'child' ? w2 == true : w2 == false)) {
            let spotMulti = builDiv(spotDiv, multiIdInput);
            elem_a.answers.forEach(function (elem_b, b) {
              let spotMultiInpOpt = builDiv(spotMulti, 'sectMultiOpt_' + type + '_' + ident + '_' + elem_b.value);
              buildInputsItems(type, ident, 'label-multi', spotMultiInpOpt, elem_b.value, elem_b.label);
              if (elem_a.dependence) {
                let dependenceData = JSON.stringify(elem_a.dependence_data);
                buildInputsItems(type, ident, elem_a.input_type, spotMultiInpOpt, elem_b.value, '', dependenceData, spotDiv);
              } else {
                buildInputsItems(type, ident, elem_a.input_type, spotMultiInpOpt, elem_b.value, '', 'NA', '');
              }
            });
          }
          break;
      }
    });
  }

  function buildInputsItems(type, ident, typeInp, spot, val, lab, w01, w02) {
    switch (typeInp) {
      case 'text':
        let inputF = document.createElement("input");
        inputF.name = 'inp_' + type + '_' + ident;
        inputF.id = 'inp_' + type + '_' + ident;
        inputF.type = typeInp;
        spot.appendChild(inputF);
        break;
      case 'radio':
      case 'checkout':
        let inputRadioF = document.createElement("input");
        inputRadioF.type = typeInp;
        inputRadioF.name = 'inpMult_' + type + '_' + ident;
        inputRadioF.id = 'inpMult_' + type + '_' + ident + '_' + val;
        inputRadioF.value = val;
        inputRadioF.onclick = function () { manageDependence(w01, ident, val, w02) };
        let spotMultiRadio = builDiv(spot, 'sectMultiInp_' + ident + '_' + val);
        spotMultiRadio.appendChild(inputRadioF);
        break;
      case 'label':
        let labelF = document.createElement("label");
        labelF.for = 'inp_' + type + '_' + ident;
        labelF.innerHTML = lab;
        spot.appendChild(labelF);
        break;
      case 'label-multi':
        let labelMultiF = document.createElement("label");
        labelMultiF.for = 'inpMult_' + type + '_' + ident + '_' + val;
        labelMultiF.innerHTML = lab;
        let spotMultiLabel = builDiv(spot, 'sectMultiLabel_' + type + '_' + ident + '_' + val);
        spotMultiLabel.appendChild(labelMultiF);
        break;
    }
  }

  function manageDependence(obj, ident, val, spotDep) {
    if (obj != 'NA') {
      let dataDependence = JSON.parse(obj);
      let arrayQuestions = [];
      dataDependence.dependence_question.forEach(function (elem_c, c) {
        arrayQuestions.push(elem_c);
      })
      if (dataDependence.dependence_val == val) {
        buildFormDivInp(dataDependence.dependence_question, 'child', spotDep, ident, true);
      } else {
        arrayQuestions.forEach(function (elem_d, d) {
          removeDiv('sectInp_child_' + elem_d.identifier);
        })
      }
    }
  }

  function builDiv(spot, ident) {
    let div = document.createElement("div");
    div.name = ident;
    div.id = ident;
    spot.appendChild(div);
    let spotDiv = document.getElementById(ident);
    return spotDiv;
  }

  function removeDiv(id) {
    let divCh = document.getElementById(id);
    if (divCh !== null) {
      while (divCh.hasChildNodes()) {
        divCh.removeChild(divCh.lastChild);
      }
    }
  }

}

function impre(element) {
  console.log(element);
}