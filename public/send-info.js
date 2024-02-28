document.addEventListener('DOMContentLoaded', function () {
    initializeLiff();
});

var profile;

async function initializeLiff() {
    console.log('--- initializeLiff ---')
    try {
        await liff.init({ liffId: LIFF_ID });

        const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
        const params = new URLSearchParams(queryString);
        const hospitalPetpawId = params.get('hospital_petpaw_id');
        if (hospitalPetpawId != null && hospitalPetpawId != '') {
            console.log(hospitalPetpawId);
        }
        const consultVeterinarianId = params.get('consult_veterinarian_id');
        if (consultVeterinarianId != null && consultVeterinarianId != '') {
            console.log(consultVeterinarianId);
        }

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

        document.getElementById("overlay").style.display = "block";

        const response = await fetch(URL_SEND_INFO, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hospital_petpaw_id: hospitalPetpawId,
                consult_veterinarian_id: consultVeterinarianId,
            })
        });

        document.getElementById("overlay").style.display = "none";
        console.log('response:', response);
        if(response.status == 200){
            swalSuccess('ส่งข้อมูลเพื่อให้โรงพยาบาลติดต่อกลับเรียบร้อย','');
            setTimeout(function() {
                liff.closeWindow();
              }, 3000);
        }else{
            swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
        }
    } catch (error) {
        swalError('เกิดข้อผิดพลาด','');
        console.error('API Error:', error);
    }

}

function swalSuccess(title,text){
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        showConfirmButton: false,
        timer: 3000
      })
}

function swalError(title,text){
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        
      })
}