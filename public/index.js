document.addEventListener('DOMContentLoaded', function () {
    initializeLiff();
});

var roomNumber;
var profile;

async function initializeLiff() {
    console.log('--- initializeLiff ---')
    await liff.init({ liffId: LIFF_ID });

    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');
    if (userId != null && userId != '') {
      console.log(userId);
    }

    if (!liff.isLoggedIn()) {
        const destinationUrl = window.location.href;
        liff.login({redirectUri: destinationUrl});
        return;
    }

}

function validateValue(){
    var nameCat = document.getElementById("nameCat");
    var breeds = document.getElementById("breeds");
    var year = document.getElementById("year");
    var month = document.getElementById("month");
    var sterilization = document.getElementById("sterilization");
    var vaccine = document.getElementById("vaccine");
    // var historyDrugAllergy = document.getElementById("historyDrugAllergy");
    var surgery = document.getElementById("surgery");
    // var congenitalDisease = document.getElementById("congenitalDisease");
    var initialSymptoms = document.getElementById("initialSymptoms");

    var valid = true;
    valid = valid && addOrRemoveClassIsInvalid(nameCat);
    valid = valid && addOrRemoveClassIsInvalid(breeds);
    valid = valid && addOrRemoveClassIsInvalid(year);
    valid = valid && addOrRemoveClassIsInvalid(month);
    valid = valid && addOrRemoveClassIsInvalid(sterilization);
    valid = valid && addOrRemoveClassIsInvalid(vaccine);
    // valid = valid && addOrRemoveClassIsInvalid(historyDrugAllergy);
    valid = valid && addOrRemoveClassIsInvalid(surgery);
    // valid = valid && addOrRemoveClassIsInvalid(congenitalDisease);
    valid = valid && addOrRemoveClassIsInvalid(initialSymptoms);
    if(!valid){
        return;
    }
    nextPage();
}

function addOrRemoveClassIsInvalid(ele){
    if(!ele.value){
        ele.classList.add("is-invalid");
        return false;
    }else{
        ele.classList.remove("is-invalid");
        return true;
    }
}

function nextPage(){
    var nameCatValue = document.getElementById("nameCat").value;
    var breedsValue = document.getElementById("breeds").value;
    var yearValue = document.getElementById("year").value;
    var monthValue = document.getElementById("month").value;
    var sterilizationValue = document.getElementById("sterilization").value;
    var vaccineValue = document.getElementById("vaccine").value;
    var historyDrugAllergyValue = document.getElementById("historyDrugAllergy").value;
    var surgeryValue = document.getElementById("surgery").value;
    var congenitalDiseaseValue = document.getElementById("congenitalDisease").value;
    var initialSymptomsValue = document.getElementById("initialSymptoms").value;

    // Encode the values and construct the URL
    var url = "index2.html?nameCat=" + encodeURIComponent(nameCatValue) + 
    "&breeds=" + encodeURIComponent(breedsValue) + 
    "&year=" + encodeURIComponent(yearValue) + 
    "&month=" + encodeURIComponent(monthValue) + 
    "&sterilization=" + encodeURIComponent(sterilizationValue) + 
    "&vaccine=" + encodeURIComponent(vaccineValue) + 
    "&historyDrugAllergy=" + encodeURIComponent(historyDrugAllergyValue) + 
    "&surgery=" + encodeURIComponent(surgeryValue) + 
    "&congenitalDisease=" + encodeURIComponent(congenitalDiseaseValue) + 
    "&initialSymptoms=" + encodeURIComponent(initialSymptomsValue);
    
    // Redirect to html2.html
    window.location.href = url;
}