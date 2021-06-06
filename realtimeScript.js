size = 0;
querySnapshot = 0;

db.collection('dbform').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added' || change.type == 'removed') {
            db.collection("dbform").get().then(function(querySnapshot) {      
                document.getElementById('db').textContent = querySnapshot.size;
                console.log(querySnapshot.size)
            });
            db.collection('dbform').where('name', '==', sessionStorage.getItem('user')).get().then(us => {
                us.docs.forEach(users => {
                    if (users.data().name == sessionStorage.getItem('user')) {
                        tagname.style.color = "lime";
                        console.log('lime')
                    } else {
                        tagname.style.color = "red";
                        console.log('red')
                    }
                });
            });
        }

    });
});