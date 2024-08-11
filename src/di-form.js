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
    let spotDiv =builDiv(spot, 'sectInp_'+ident);
    let spotLabel =builDiv(spotDiv, 'sectInpLabel_'+ident);
    let labelF = document.createElement("label");
    labelF.for = 'inp_'+ident;
    labelF.innerHTML = elem_a.label; 
    spotLabel.appendChild(labelF);
    switch (elem_a.input_type) {
        case 'text':
            let spotInput =builDiv(spotDiv, 'sectInput_'+ident);
            let inputF = document.createElement("input");
            inputF.name = 'inp_'+ident;
            inputF.id = 'inp_'+ident;
            inputF.type = elem_a.input_type;
            spotInput.appendChild(inputF);
            break;
        case 'radio':
               let spotMulti =builDiv(spotDiv, 'sectMulti_'+ident);
                elem_a.answers.forEach(function (elem_b, b) {    
                let spotMultiInpOpt =builDiv(spotMulti, 'sectMultiOpt_'+ident+ '_'+elem_b.value);   
                let labelRadioF = document.createElement("label");
                labelRadioF.for = 'inpMult_'+ident + '_'+elem_b.value;
                labelRadioF.innerHTML = elem_b.label; 
                let spotMultiLabel =builDiv(spotMultiInpOpt, 'sectMultiLabel_'+ident + '_'+elem_b.value);
                spotMultiLabel.appendChild(labelRadioF);
                let inputRadioF = document.createElement("input");
                inputRadioF.type = elem_a.input_type;
                inputRadioF.name = 'inpMult_'+ident;
                inputRadioF.id = 'inpMult_'+ident + '_'+elem_b.value;
                inputRadioF.value = elem_b.value;
                let spotMultiRadio =builDiv(spotMultiInpOpt, 'sectMultiInp_'+ident + '_'+elem_b.value);
                spotMultiRadio.appendChild(inputRadioF);
            });
            break;        
    }
  });

  function builDiv(spot, ident){
    let div = document.createElement("div");
    div.name = ident;
    div.id = ident;
    spot.appendChild(div);
    let spotDiv = document.getElementById(ident);
    return spotDiv;
  }
}

function impre(element) {
  console.log(element);
}
