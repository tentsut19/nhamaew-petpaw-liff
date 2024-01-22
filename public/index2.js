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

function openConsent(){
    Swal.fire({
        // title: "ข้อตกลง Consent การให้ข้อมูลส่วนบุคคล",
        html: "<button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button><br><br><b style='font-size: 18px;'>ข้อตกลง Consent การให้ข้อมูลส่วนบุคคล</b><br><br><div style='text-align: left;'><label style='font-size: 14px;'>เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป</label><br><b style='font-size: 14px;'>1. ข้อมูลที่จะให้</b><br><label style='font-size: 14px;margin-bottom: 0;'>ผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลเบื้องต้นของเจ้าของและสัตว์เลี้ยง</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลสุขภาพทั่วไปของสัตว์เลี้ยงประวัติการรักษาทางการแพทย์</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลเกี่ยวกับการนัดหมายและการรักษา</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลประวัติการจ่ายเงินและการเรียกเก็บเงิน</label><br><b style='font-size: 14px;'>‍2. วัตถุประสงค์ในการให้ข้อมูล</b><br><label style='font-size: 14px;margin-bottom: 0;'>ข้อมูลที่ได้รับจะถูกนำมาใช้เพื่อวัตถุประสงค์ต่อไปนี้:</label><label style='font-size: 14px;margin-bottom: 0;'>- การให้บริการทางการแพทย์</label><label style='font-size: 14px;margin-bottom: 0;'>- การจัดการนัดหมายและการรักษาการบันทึกประวัติการรักษา</label><label style='font-size: 14px;margin-bottom: 0;'>- การชำระเงิน</label><label style='font-size: 14px;margin-bottom: 0;'>- การปรับปรุงคุณภาพการบริการ</label><br><b style='font-size: 14px;'>‍3. การรักษาความปลอดภัยของข้อมูล</b><br><label style='font-size: 14px;margin-bottom: 0;'>‍โรงพยาบาลในเครือจะดูแลรักษาความปลอดภัยของข้อมูลส่วนบุคคลของผู้ให้ข้อมูลตามนโยบายความปลอดภัยที่เป็นไปตามกฎหมายที่เกี่ยวข้อง.</label><br><b style='font-size: 14px;'>‍‍4. การยกเลิก Consent</b><br><label style='font-size: 14px;margin-bottom: 0;'>‍‍ผู้ให้ข้อมูลสามารถยกเลิกการให้ข้อมูลได้โดยการแจ้งให้ทราบลายลักษณ์อักษรถึง support@petpaw.com การยกเลิกนี้จะมีผลเมื่อทางเราได้รับข้อมูลแล้วเท่านั้น</label><br><label style='font-size: 14px;margin-bottom: 0;'>‍‍วันที่: 19 ธันวาคม 2566</label></div><br><button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button>",
        // text: "เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป\n\n1. ข้อมูลที่จะให้\nผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:",
        showCancelButton: false,
        showConfirmButton: false
    });
}

function closeSwal(){
    Swal.clickConfirm();
}

function openDialogConfirm(){
    Swal.fire({
    //   title: 'ยืนยันการส่งข้อมูลใช่ไหม?',
    //   text: "เมื่อกดยืนยัน คุณจะได้รับเลขนัดปรึกษาสัตวแพทย์ทางไลน์ หากไม่ได้รับกรุณาติดต่อแอดมิน",
      html: "<b style='font-size: 24px;'>ยืนยันการส่งข้อมูลใช่ไหม</b><br><br><label style='font-size: 20px;'>เมื่อกดยืนยัน คุณจะได้รับเลขนัดปรึกษาสัตวแพทย์ทางไลน์ หากไม่ได้รับกรุณาติดต่อแอดมิน</label>",
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
    var addressDetail = document.getElementById("addressDetail");
    var ownerName = document.getElementById("ownerName");
    var phoneNumber = document.getElementById("phoneNumber");
    var email = document.getElementById("email");
    var consent = document.getElementById("consent");

    var valid = true;
    valid = valid && addOrRemoveClassIsInvalid(province);
    valid = valid && addOrRemoveClassIsInvalid(amphoe);
    valid = valid && addOrRemoveClassIsInvalid(district);
    valid = valid && addOrRemoveClassIsInvalid(zipcode);
    valid = valid && addressDetailText(addressDetail,100);
    valid = valid && ownerNameText(ownerName,100);
    valid = valid && phoneNumberText(phoneNumber,100);
    valid = valid && emailText(email,100);
    valid = valid && validateConsent(consent);
    if(!valid){
        // Swal.fire({
        //     title: 'กรุณากรอกข้อมูลให้ครบ',
        //     text: "กรุณากรอกข้อมูลให้ครบเพื่อส่งคำขอนัดปรึกษาสัตวแพทย์",
        //     icon: 'warning',
        //     confirmButtonColor: '#3085d6',
        //     confirmButtonText: 'ตกลง'
        //   }).then((result) => {
            
        //   })
        return;
    }
    openDialogConfirm();
}

function clickConsent(){
    var consent = document.getElementById("consent");
    validateConsent(consent);
}

function validateConsent(ele){
    if(ele.checked){
        document.getElementById("consentInvalid").style.display = 'none';
        return true;
    }else{
        document.getElementById("consentInvalid").style.display = '';
        return false;
    }
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

function addressDetailText(ele,limit){
    if(ele && ele.value){
        document.getElementById('addressDetailText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('addressDetailTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('addressDetailTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('addressDetailTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('addressDetailText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function ownerNameText(ele,limit){
    if(ele && ele.value){
        document.getElementById('ownerNameText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('ownerNameTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('ownerNameTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('ownerNameTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('ownerNameText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function phoneNumberText(ele,limit){
    if(ele && ele.value){
        document.getElementById('phoneNumberText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('phoneNumberTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('phoneNumberTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('phoneNumberTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('phoneNumberText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function emailText(ele,limit){
    if(ele && ele.value){
        document.getElementById('emailText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('emailTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('emailTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
        
    }else{
        document.getElementById('emailTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('emailText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
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
        var weightRange = urlParams.get('weightRange');
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
        var weightRangeValue = decodeURIComponent(weightRange);
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

        var url = "https://cabsat-api.easynet.co.th/api/v1/cat-bot/create/consult-veterinarian";
        // var url = "https://cat-bot-api.com/api/v1/cat-bot/create/consult-veterinarian";
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
                weightRange: weightRangeValue,
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
