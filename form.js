
let form = document.querySelector('#database');

let signIn = document.querySelector('#signin');
let tagname = document.getElementById('tagname');


namez = '';
emailz = '';


var provider = new firebase.auth.GoogleAuthProvider();


signIn.addEventListener('click', (e) => {
    e.preventDefault();
    

    if (sessionStorage.getItem('user') == null) {

        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(token);
            console.log(user);
            if (user != null) {
                user.providerData.forEach(profile => {
                    //   console.log(profile.displayName);
                    //   console.log(profile.email);
                    // namez = profile.displayName;
                    // emailz = profile.email;
                    if (profile.displayName != null) {
                        //    tagname.innerHTML = namez; 
                        sessionStorage.setItem("user", profile.displayName);
                        sessionStorage.setItem('email', profile.email);
                        tagname.textContent = profile.displayName;

                        db.collection('dbform').where('name', '==', sessionStorage.getItem('user')).get().then(us => {
                            us.docs.forEach(users => {
                                if (users.data().name == sessionStorage.getItem('user')) {
                                    tagname.style.color = "lime";
                                } else {
                                    tagname.style.color = "red";
                                }
                            });
                        });
                        if (sessionStorage.getItem('user') != null) {
                            signIn.textContent = 'Sign out';
                        }
                    }
                });
            }
        })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode,errorMessage);
            });
        var user = firebase.auth().currentUser;

    } else {
        firebase.auth().signOut().then(function () {
            console.log('signout success');
        }, function (error) {
            console.log('signout failed');
        });
        sessionStorage.removeItem('user');
        tagname.textContent = '';
        signIn.textContent = 'Sign in';

    }

});



document.addEventListener('DOMContentLoaded', () => {
    tagname.textContent = sessionStorage.getItem('user');
    console.log(sessionStorage.getItem('user'));
    if (sessionStorage.getItem('user') != null) {
        signIn.textContent = 'Sign out';
    } else {
        signIn.textContent = 'Sign in';
    }
    // tagname.innerHTML = "";
});



// let form2 = document.querySelector('#login')
// let auth = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    allowForm = true;
    if (sessionStorage.getItem('user') == null && form.gender.value == 'none') {
        alert('??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????');
    }else{
    db.collection('dbform').get().then(user => {
        user.docs.forEach(users => {
            if (users.data().email == sessionStorage.getItem('email') && users.data().name == sessionStorage.getItem('user') || users.data().email == form.email.value && users.data().name == form.name.value) {
                allowForm = false;
                console.log(allowForm);
            }
        });
        if (allowForm == false) {
            console.log(allowForm);
            alert('?????????????????????????????????????????????????????????????????????????????????????????????');
        } else {
            if (sessionStorage.getItem('user') == null) {
                if (form.name.value == '' || form.email.value == '' || form.surname.value == '' || form.country.value == '' || form.city.value == '') {
                    alert('????????????????????????????????????????????????????????????????????????');
                } else {
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
                    form.gender.value = form.gender.value;
                    alert("??????????????????????????????????????????????????????????????????????????????");
                    choose();
                }
            }
            else {
                if (form.gender.value == 'none') {
                alert('?????????????????????????????????????????????????????????????????????');
                }else if (form.gender.value == 'Man' || form.gender.value == 'Woman' || form.gender.value == 'NoGender'){
                db.collection('dbform').add({
                    name: sessionStorage.getItem('user'),
                    email: sessionStorage.getItem('email'),
                    gender: form.gender.value
                });
                alert("??????????????????????????????????????????????????????????????????????????????");
                }
            }
        }
    });
    }
});



    
    
    
