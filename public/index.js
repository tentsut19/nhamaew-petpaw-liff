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
    var weightRange = document.getElementById("weightRange");
    var genderCat = document.getElementById("genderCat");
    var breedsSelect = document.getElementById("breedsSelect");
    // var year = document.getElementById("year");
    // var month = document.getElementById("month");
    var sterilization = document.getElementById("sterilization");
    var vaccine = document.getElementById("vaccine");
    // var historyDrugAllergy = document.getElementById("historyDrugAllergy");
    var surgery = document.getElementById("surgery");
    var congenitalDisease = document.getElementById("congenitalDisease");
    var initialSymptoms = document.getElementById("initialSymptoms");

    var valid = true;
    valid = valid && nameCatText(nameCat,100);
    valid = valid && addOrRemoveClassIsInvalid(breedsSelect);
    if("อื่นๆ" == breedsSelect.value){
        var breedsInput = document.getElementById("breedsInput");
        valid = valid && breedsInputText(breedsInput,100);
    }
    valid = valid && addOrRemoveClassIsInvalid(weightRange);
    valid = valid && addOrRemoveClassIsInvalid(genderCat);
    // valid = valid && addOrRemoveClassIsInvalid(year);
    // valid = valid && addOrRemoveClassIsInvalid(month);
    valid = valid && addOrRemoveClassIsInvalid(sterilization);
    valid = valid && addOrRemoveClassIsInvalid(vaccine);
    // valid = valid && addOrRemoveClassIsInvalid(historyDrugAllergy);
    valid = valid && addOrRemoveClassIsInvalid(surgery);
    valid = valid && congenitalDiseaseText(congenitalDisease,100);
    valid = valid && addOrRemoveClassIsInvalid(initialSymptoms);

    if(!valid){
        // Swal.fire({
        //     title: 'กรุณากรอกข้อมูลให้ครบ',
        //     text: "กรุณากรอกข้อมูลให้ครบเพื่อไปต่อได้",
        //     icon: 'warning',
        //     confirmButtonColor: '#3085d6',
        //     confirmButtonText: 'ตกลง'
        //   }).then((result) => {
            
        //   })
        return;
    }
    nextPage();
}

function addOrRemoveClassIsInvalid(ele,limit){
    if(!ele.value || ele.value.length > limit){
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }else{
        ele.classList.remove("is-invalid");
        return true;
    }
}

function nameCatText(ele,limit){
    if(ele && ele.value){
        document.getElementById('nameCatText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('nameCatTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('nameCatTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('nameCatTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('nameCatText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function breedsInputText(ele,limit){
    if(ele && ele.value){
        document.getElementById('breedsInputText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('breedsInputTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('breedsInputTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('breedsInputTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('breedsInputText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function congenitalDiseaseText(ele,limit){
    if(ele && ele.value){
        document.getElementById('congenitalDiseaseText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('congenitalDiseaseTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('breedsInputTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('congenitalDiseaseText').innerHTML = '0/100';
        ele.classList.remove("is-invalid");
        return true;
    }
}

function changeBreedsSelect(){
    var breedsSelect = document.getElementById("breedsSelect").value;
    if("อื่นๆ" == breedsSelect){
        document.getElementById("divBreedsInput").style.display = '';
    }else{
        document.getElementById("divBreedsInput").style.display = 'none';
    }
}

function nextPage(){
    var nameCatValue = document.getElementById("nameCat").value;
    var weightRangeValue = document.getElementById("weightRange").value;
    var genderCatValue = document.getElementById("genderCat").value;
    var breedsValue = document.getElementById("breedsSelect").value;
    if("อื่นๆ" == breedsValue){
        breedsValue = document.getElementById("breedsInput").value;
    }
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
    "&weightRange=" + encodeURIComponent(weightRangeValue) + 
    "&genderCat=" + encodeURIComponent(genderCatValue) + 
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