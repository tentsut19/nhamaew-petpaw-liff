document.addEventListener('DOMContentLoaded', function () {
    initializeLiff();
});

async function initializeLiff() {
    console.log('--- initializeLiff ---')
    await liff.init({ liffId: LIFF_ID });

    if (!liff.isLoggedIn()) {
        const destinationUrl = window.location.href;
        liff.login({redirectUri: destinationUrl});
        return;
    }

    getProvince();
}

function openDialogConfirm(){
    Swal.fire({
      title: 'ยืนยันการส่งข้อมูลใช่ไหม?',
      text: "ยืนยันการส่งข้อมูลเพื่อให้สัตวแพทย์ติดต่อกลับ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        submit()
      }
    })
}

var countryJson;
function getProvince() {
    var provinceElement = document.getElementById("province");
    var option = document.createElement("option");
    option.text = "--- จังหวัด ---";
    option.value = "";
    provinceElement.add(option);

    var amphoeElement = document.getElementById("amphoe");
    var option = document.createElement("option");
    option.text = "--- อำเภอ / เขต ---";
    option.value = "";
    amphoeElement.add(option);

    var districtElement = document.getElementById("district");
    var option = document.createElement("option");
    option.text = "--- ตำบล / แขวง ---";
    option.value = "";
    districtElement.add(option);

    fetch('./data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.countryJson = data;

      this.countryJson.forEach(element => {
        // console.log(element);
        var option1 = document.createElement("option");
        option1.text = element[0];
        option1.value = element[0];
        provinceElement.add(option1);
      });

    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

var amphurJson;
function getAmphur(e) {
    // console.log(e);
    // console.log(this.countryJson);
    var amphoeElement = document.getElementById("amphoe");
    while (amphoeElement.options.length > 0) {
        amphoeElement.remove(0);
    }
    var option = document.createElement("option");
    option.text = "--- อำเภอ / เขต ---";
    option.value = "";
    amphoeElement.add(option);

    var districtElement = document.getElementById("district");
    while (districtElement.options.length > 0) {
        districtElement.remove(0);
    }
    var option = document.createElement("option");
    option.text = "--- ตำบล / แขวง ---";
    option.value = "";
    districtElement.add(option);

    document.getElementById("zipcode").value = "";

    this.countryJson.forEach(element => {
        if(element[0] == e){
            console.log(element[1]);
            this.amphurJson = element[1];

            this.amphurJson.forEach(element => {
                // console.log(element);
                var option1 = document.createElement("option");
                option1.text = element[0];
                option1.value = element[0];
                amphoeElement.add(option1);
            });
        }
    });

}

var thumbonJson;
function getThumbon(e) {
    var districtElement = document.getElementById("district");
    while (districtElement.options.length > 0) {
        districtElement.remove(0);
    }
    var option = document.createElement("option");
    option.text = "--- ตำบล / แขวง ---";
    option.value = "";
    districtElement.add(option);

    document.getElementById("zipcode").value = "";

    this.amphurJson.forEach(element => {
        if(element[0] == e){
            console.log(element[1]);
            this.thumbonJson = element[1];

            this.thumbonJson.forEach(element => {
                // console.log(element);
                var option1 = document.createElement("option");
                option1.text = element[0];
                option1.value = element[0];
                districtElement.add(option1);
            });
        }
    });

}

function getZipCode(e) {
    this.thumbonJson.forEach(element => {
        if(element[0] == e){
            console.log(element[1]);
            document.getElementById("zipcode").value = element[1];
        }
    });
}

function validateValue(){
    var district = document.getElementById("district");
    var amphoe = document.getElementById("amphoe");
    var province = document.getElementById("province");
    var zipcode = document.getElementById("zipcode");
    var ownerName = document.getElementById("ownerName");
    var phoneNumber = document.getElementById("phoneNumber");
    var email = document.getElementById("email");

    var valid = true;
    valid = valid && addOrRemoveClassIsInvalid(province);
    valid = valid && addOrRemoveClassIsInvalid(amphoe);
    valid = valid && addOrRemoveClassIsInvalid(district);
    valid = valid && addOrRemoveClassIsInvalid(zipcode);
    valid = valid && addOrRemoveClassIsInvalid(ownerName);
    valid = valid && addOrRemoveClassIsInvalid(phoneNumber);
    valid = valid && addOrRemoveClassIsInvalid(email);
    if(!valid){
        return;
    }
    openDialogConfirm();
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

async function submit(){
    try {
        if (!liff.isLoggedIn()) {
            const destinationUrl = window.location.href;
            liff.login({redirectUri: destinationUrl});
            return;
        }
        // Get the parameter values from the URL
        var urlParams = new URLSearchParams(window.location.search);
        var nameCat = urlParams.get('nameCat');
        var genderCat = urlParams.get('genderCat');
        var breeds = urlParams.get('breeds');
        var year = urlParams.get('year');
        var month = urlParams.get('month');
        var sterilization = urlParams.get('sterilization');
        var vaccine = urlParams.get('vaccine');
        var historyDrugAllergy = urlParams.get('historyDrugAllergy');
        var surgery = urlParams.get('surgery');
        var congenitalDisease = urlParams.get('congenitalDisease');
        var initialSymptoms = urlParams.get('initialSymptoms');
        
        var nameCatValue = decodeURIComponent(nameCat);
        var genderCatValue = decodeURIComponent(genderCat);
        var breedsValue = decodeURIComponent(breeds);
        var yearValue = decodeURIComponent(year);
        var monthValue = decodeURIComponent(month);
        var sterilizationValue = decodeURIComponent(sterilization);
        var vaccineValue = decodeURIComponent(vaccine);
        var historyDrugAllergyValue = decodeURIComponent(historyDrugAllergy);
        var surgeryValue = decodeURIComponent(surgery);
        var congenitalDiseaseValue = decodeURIComponent(congenitalDisease);
        var initialSymptomsValue = decodeURIComponent(initialSymptoms);

        var addressDetail = document.getElementById("addressDetail").value;
        var district = document.getElementById("district").value;
        var amphoe = document.getElementById("amphoe").value;
        var province = document.getElementById("province").value;
        var zipcode = document.getElementById("zipcode").value;
        var ownerNameValue = document.getElementById("ownerName").value;
        var phoneNumberValue = document.getElementById("phoneNumber").value;
        var emailValue = document.getElementById("email").value;

        var profile = await liff.getProfile();

        document.getElementById("buttonSubmit").disabled = true;

        var url = "https://cat-bot-api.com/api/v1/cat-bot/create/consult-veterinarian";
        // var url = "https://f14c-184-22-106-189.ngrok-free.app/api/v1/cat-bot/create/consult-veterinarian";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lineUserId: profile.userId,
                displayName: profile.displayName,
                statusMessage: profile.statusMessage,
                pictureUrl: profile.pictureUrl,
                nameCat: nameCatValue,
                genderCat: genderCatValue,
                breeds: breedsValue,
                year: yearValue,
                month: monthValue,
                sterilization: sterilizationValue,
                vaccine: vaccineValue,
                historyDrugAllergy: historyDrugAllergyValue,
                surgery: surgeryValue,
                congenitalDisease: congenitalDiseaseValue,
                initialSymptoms: initialSymptomsValue,
                addressDetail: addressDetail,
                district: district,
                amphoe: amphoe,
                province: province,
                zipcode: zipcode,
                ownerName: ownerNameValue,
                phoneNumber: phoneNumberValue,
                email: emailValue
            })
        });

        const data = await response.json();
        console.log('API Response:', data);
        liff.closeWindow();
    } catch (error) {
        alert('เกิดข้อผิดพลาด');
        console.error('API Error:', error);
    }
}
