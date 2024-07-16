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

    if (!liff.isLoggedIn() && PROD) {
        const destinationUrl = window.location.href;
        liff.login({redirectUri: destinationUrl});
        return;
    }

    friendship = await liff.getFriendship();
    console.log(friendship);
    if(!friendship.friendFlag){
        Swal.fire({
            //   title: 'ยืนยันการส่งข้อมูลใช่ไหม?',
            //   text: "เมื่อกดยืนยัน คุณจะได้รับเลขนัดปรึกษาสัตวแพทย์ทางไลน์ หากไม่ได้รับกรุณาติดต่อแอดมิน",
            html: "<b style='font-size: 24px;'>ปรึกษาสัตวแพทย์ฟรีครั้งแรก<br>เฉพาะผู้ที่เป็นเพื่อนกับ LINE<br>หน้าแมวเอไอ (Nhamaew Ai) เท่านั้น</b><br><br><label style='font-size: 20px;'></label>",
            icon: 'warning',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#06c755',
            confirmButtonText: 'เพิ่มเพื่อน Nhamaew Ai'
        }).then((result) => {
            console.log(result);
            window.location.href = "https://lin.ee/ZHdJ99P";
        })
    }
}

function validateValue(){
    var valid = true;

    var nameCat = document.getElementById("nameCat");
    var petTypeSelect = document.getElementById("petType").value;
    if("CAT" == petTypeSelect){
        var weightRange = document.getElementById("weightRangeCat");
        var breedsSelect = document.getElementById("catBreedsSelect");
        if("อื่นๆ" == breedsSelect.value){
            var breedsInput = document.getElementById("catBreedsInput");
            valid = valid && catBreedsInputText(breedsInput,100);
        }
    }else if("DOG" == petTypeSelect){
        var weightRange = document.getElementById("weightRangeDog");
        var breedsSelect = document.getElementById("dogBreedsSelect");
        if("อื่นๆ" == breedsSelect.value){
            var breedsInput = document.getElementById("dogBreedsInput");
            valid = valid && dogBreedsInputText(breedsInput,100);
        }
    }
    var genderCat = document.getElementById("genderCat");
    //var breedsSelect = document.getElementById("breedsSelect");
    // var year = document.getElementById("year");
    // var month = document.getElementById("month");
    var sterilization = document.getElementById("sterilization");
    var vaccine = document.getElementById("vaccine");
    // var historyDrugAllergy = document.getElementById("historyDrugAllergy");
    var surgery = document.getElementById("surgery");
    var congenitalDisease = document.getElementById("congenitalDisease");
    var initialSymptoms = document.getElementById("initialSymptoms");

    
    valid = valid && nameCatText(nameCat,100);
    valid = valid && addOrRemoveClassIsInvalid(breedsSelect);
    // if("อื่นๆ" == breedsSelect.value){
    //     var breedsInput = document.getElementById("breedsInput");
    //     valid = valid && breedsInputText(breedsInput,100);
    // }
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

function catBreedsInputText(ele,limit){
    if(ele && ele.value){
        document.getElementById('catBreedsInputText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('catBreedsInputTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('catBreedsInputTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('catBreedsInputTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('catBreedsInputText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function dogBreedsInputText(ele,limit){
    if(ele && ele.value){
        document.getElementById('dogBreedsInputText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('dogBreedsInputTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('dogBreedsInputTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('dogBreedsInputTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('dogBreedsInputText').innerHTML = '0/100';
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

function changePetType(){
    var petTypeSelect = document.getElementById("petType").value;
    if("CAT" == petTypeSelect){
        document.getElementById("divCatWeightRange").style.display = '';
        document.getElementById("divDogWeightRange").style.display = 'none';

        document.getElementById("catBreed").style.display = '';
        document.getElementById("dogBreed").style.display = 'none';
    }else if("DOG" == petTypeSelect){
        document.getElementById("divDogWeightRange").style.display = '';
        document.getElementById("divCatWeightRange").style.display = 'none';

        document.getElementById("dogBreed").style.display = '';
        document.getElementById("catBreed").style.display = 'none';
    }
}

function changeDogBreedsSelect(){
    var breedsSelect = document.getElementById("dogBreedsSelect").value;
    if("อื่นๆ" == breedsSelect){
        document.getElementById("divDogBreedsInput").style.display = '';
    }else{
        document.getElementById("divDogBreedsInput").style.display = 'none';
    }
}

function changeCatBreedsSelect(){
    var breedsSelect = document.getElementById("catBreedsSelect").value;
    if("อื่นๆ" == breedsSelect){
        document.getElementById("divCatBreedsInput").style.display = '';
    }else{
        document.getElementById("divCatBreedsInput").style.display = 'none';
    }
}

function nextPage(){
    var nameCatValue = document.getElementById("nameCat").value;

    var petTypeSelect = document.getElementById("petType").value;
    if("CAT" == petTypeSelect){
        var weightRangeValue = document.getElementById("weightRangeCat").value;
        var breedsValue = document.getElementById("catBreedsSelect").value;
        if("อื่นๆ" == breedsValue){
            breedsValue = document.getElementById("catBreedsInput").value;
        }
    }else if("DOG" == petTypeSelect){
        var weightRangeValue = document.getElementById("weightRangeDog").value;
        var breedsValue = document.getElementById("dogBreedsSelect").value;
        if("อื่นๆ" == breedsValue){
            breedsValue = document.getElementById("dogBreedsInput").value;
        }
    }

    var genderCatValue = document.getElementById("genderCat").value;
    var yearValue = document.getElementById("year").value;
    var monthValue = document.getElementById("month").value;
    var sterilizationValue = document.getElementById("sterilization").value;
    var vaccineValue = document.getElementById("vaccine").value;
    var historyDrugAllergyValue = document.getElementById("historyDrugAllergy").value;
    var surgeryValue = document.getElementById("surgery").value;
    var congenitalDiseaseValue = document.getElementById("congenitalDisease").value;
    var initialSymptomsValue = document.getElementById("initialSymptoms").value;
    var petTypeValue = document.getElementById("petType").value;

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
    "&initialSymptoms=" + encodeURIComponent(initialSymptomsValue) +
    "&petType=" + encodeURIComponent(petTypeValue);
    
    // Redirect to html2.html
    window.location.href = url;
}

async function checkFriendship(){
    try {
        if (!liff.isLoggedIn() && PROD) {
            const destinationUrl = window.location.href;
            liff.login({redirectUri: destinationUrl});
            return;
        }

        var profile
        if (PROD) {
            profile = await liff.getProfile();
        }else{
            profile = profileTest;
        }

    } catch (error) {
        console.error('API Error:', error);
    }
}
