// function check() {
//     etc = document.getElementById('text');
//     etc.enabled = true;
// }
let form2 = document.querySelector('#auth');

form2.addEventListener('submit' , (e) => {
    e.preventDefault();
    db.collection('authendb').where('user', '==', form2.user.value).get().then( user => {
        user.docs.forEach(users => {
            if (users.data().pass === form2.pass.value) {
                console.log('test');
            }else {
                console.log('testss');
            }
        });
    });
});

// let form = document.querySelector('#formtest');

// let time = document.getElementById('time').value

// form.addEventListener('submit' , (e) => {
//     e.preventDefault();
//     db.collection('testdb').where('stat', '==', form.pump.value ).get().then( u => {
//         u.docs.forEach(ua => {
//            if (ua.data().full == 'empty') {
//         db.collection("testdb").doc("sta1").update({
//         full: 'full'
//     });

//        }else if (ua.data().full == 'full') {
//         db.collection("testdb").doc("sta1").update({
//         full: 'empty'
//         });
//        } 
//        document.getElementById('test').textContent = ua.data().full + ' ' + time;
//         });
//     });
    
// });



// db.collection("testdb").doc("sta1")
//     .onSnapshot(function(doc) {
//         if (doc.data().full == 'full') {
//           db.collection("testdb").doc("sta1").update({
//                 full: aa
//             });
//         }
//         document.getElementById('test').textContent = doc.data().full + time;
//     });


