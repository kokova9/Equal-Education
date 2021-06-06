let form2 = document.querySelector('#auth');

form2.addEventListener('submit' , (e) => {
    e.preventDefault();
    db.collection('authendb').where('user', '==', form2.user.value).get().then( user => {
        user.docs.forEach(users => {
            if (users.data().pass === form2.pass.value) {
                alert('login');
            }else {
                alert('fuck');
            }
        });
    });
});