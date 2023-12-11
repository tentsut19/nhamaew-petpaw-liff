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
}


function validateValue(){
    var zipcode = document.getElementById("zipcode");
    var ownerNameValue = document.getElementById("ownerName");
    var phoneNumberValue = document.getElementById("phoneNumber");
    var emailValue = document.getElementById("email");

    var valid = true;
    valid = valid && validateZipcode(zipcode);
    valid = valid && addOrRemoveClassIsInvalid(ownerNameValue);
    valid = valid && addOrRemoveClassIsInvalid(phoneNumberValue);
    valid = valid && addOrRemoveClassIsInvalid(emailValue);
    if(!valid){
        return;
    }
    submit();
}

function validateZipcode(ele){
    if(!ele.value){
        var html = '<b>กรุณา</b> ค้นหาและเลือกที่อยู่';
        $('#demo2-output').html('<div class="uk-alert-danger" uk-alert>' + html + '</div>');
        return false;
    }else{
        return true;
    }
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
        var breedsValue = decodeURIComponent(breeds);
        var yearValue = decodeURIComponent(year);
        var monthValue = decodeURIComponent(month);
        var sterilizationValue = decodeURIComponent(sterilization);
        var vaccineValue = decodeURIComponent(vaccine);
        var historyDrugAllergyValue = decodeURIComponent(historyDrugAllergy);
        var surgeryValue = decodeURIComponent(surgery);
        var congenitalDiseaseValue = decodeURIComponent(congenitalDisease);
        var initialSymptomsValue = decodeURIComponent(initialSymptoms);

        var district = document.getElementById("district").value;
        var amphoe = document.getElementById("amphoe").value;
        var province = document.getElementById("province").value;
        var zipcode = document.getElementById("zipcode").value;
        var ownerNameValue = document.getElementById("ownerName").value;
        var phoneNumberValue = document.getElementById("phoneNumber").value;
        var emailValue = document.getElementById("email").value;

        var profile = await liff.getProfile();

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
                breeds: breedsValue,
                year: yearValue,
                month: monthValue,
                sterilization: sterilizationValue,
                vaccine: vaccineValue,
                historyDrugAllergy: historyDrugAllergyValue,
                surgery: surgeryValue,
                congenitalDisease: congenitalDiseaseValue,
                initialSymptoms: initialSymptomsValue,
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


async function callAPICreateWorkSheet2() {
    try {
        if (!liff.isLoggedIn()) {
            liff.login();
            return;
        }
        const dataContainer = document.getElementById('data-container');
        document.getElementById('overlay').style.display = 'block';

        this.profile = await liff.getProfile();

        this.roomNumber = document.getElementById('room-number').value;
        const response = await fetch('https://cabsat-api.easynet.co.th/api/v1/workSheet/line', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // หากต้องการส่ง Access Token
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // ข้อมูลที่ต้องการส่งไปยัง API ในรูปแบบ JSON
                lineUserId: this.profile.userId,
                displayName: this.profile.displayName,
                statusMessage: this.profile.statusMessage,
                pictureUrl: this.profile.pictureUrl,
                roomNumber: this.roomNumber,
                userId: document.getElementById('userId').value
            })
        });
        document.getElementById('overlay').style.display = 'none';
        const data = await response.json();
        console.log('API Response:', data);

        // เรียกใช้ LIFF ในการตอบกลับไปยัง Line
        if (liff.isInClient()) {
            // dataContainer.innerHTML = '<h1>เปิดใบงานเรียบร้อย\nใบงานเลขที่: ' + JSON.stringify(data.workSheetCode) + '</h1>';
            alert('เปิดใบงานเรียบร้อย\nใบงานเลขที่: ' + JSON.stringify(data.workSheetCode));
            setTimeout(() => {
                liff.closeWindow();
            }, 500);

            liff.sendMessages([
                {
                    type: 'text',
                    text: 'เปิดใบงานเรียบร้อย\nใบงานเลขที่:' + JSON.stringify(data.workSheetCode)
                }
            ]).then(() => {
                console.log('Message sent');
            }).catch((error) => {
                console.error('Error sending message:', error);
            });
        } else {
            alert('เปิดใบงานเรียบร้อย\nใบงานเลขที่: ' + JSON.stringify(data.workSheetCode));
        }
    } catch (error) {
        document.getElementById('overlay').style.display = 'none';
        // alert('เกิดข้อผิดพลาด');
        alert(error);
        console.error('API Error:', error);
    }
}