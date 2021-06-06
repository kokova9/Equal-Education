// document.addEventListener('DOMContentLoaded', () => {
//     db.collection("dbform").get().then(function(querySnapshot) {      
//     document.getElementById('db').textContent = querySnapshot.size;
// });
// });

let form = document.querySelector('#database');
// let form2 = document.querySelector('#login')
// let auth = 0;
size = 0;
querySnapshot = 0;
form.addEventListener('submit' , (e) => {
    e.preventDefault();
    db.collection('dbform').add({
        name: form.name.value,
        surname: form.surname.value,
        email: form.email.value,
        country: form.country.value,
        city: form.city.value,
        gender: form.gender.value
    });
    form.name.value = "";
    form.surname.value = "";
    form.email.value = "";
    form.country.value = "";
    form.city.value = "";
    form.gender.value = "Man";
    alert("send successful");
});

db.collection('dbform').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            db.collection("dbform").get().then(function(querySnapshot) {      
                document.getElementById('db').textContent = 999999;
                console.log("test");
            });
        }
    });
});









