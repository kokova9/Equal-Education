document.addEventListener('DOMContentLoaded', () => {
    checkLogin()
});

let namez = "";
let emailz = "";

var username = document.getElementById('texx');
topnav = document.getElementById('topnav');


function dynamicSignin() {

    
    aTag = document.createElement('a');
    aTag.id = 'signin';
    aTag.setAttribute('class','signin');
    aTag.setAttribute('onclick','googleSignin()')
    img = document.createElement('img');
    img.setAttribute('src','google.png');
    img.setAttribute('width','15px');
    img.setAttribute('height','15px');
    // paragraph = document.createElement('h1');
    // paragraph.setAttribute('class','para');
    
    aTag.innerHTML = 'Sign in&ensp;';
    
    aTag.appendChild(img);
   
    topnav.appendChild(aTag);
    
}


var loginCheck = false;


function checkLogin() {
    if (loginCheck == false) {
        dynamicSignin();
    }else{
        setTimeout(googleSignout,20000);
    }
    
}

function test() {
    alert('kuy');
}

//Google Authentication (firebase)
function googleSignin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token);
        console.log(user);
      if (user != null) {
user.providerData.forEach(profile => {
//   console.log(profile.displayName);
//   console.log(profile.email);
  namez = profile.displayName;
  emailz = profile.email;
  tagName = document.createElement('a');

  tagName.id = 'tagname'
  tagName.innerHTML = 'Hello '+namez;

  topnav.appendChild(tagName);

  aTag.setAttribute('onclick','dynamicSignin()');
  aTag.innerHTML = 'Sign out'

  loginCheck = true;
  // console.log(profine.providerId);
  // console.log(profile.phoneNumber);
}); //this will give you all the urls once there is user data
}

    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code);
        console.log(error.message);
    });

    var user = firebase.auth().currentUser;
    

    

    // setTimeout(showName,7000);
    return namez,emailz,loginCheck;
    

}

function showName() {
    db.collection('authendb').add({
        name: namez,
        email: emailz,
        online: 'online'
    });
    aTag.innerHTML = namez;
    console.log(namez);
}

function googleSignout() {
  firebase.auth().signOut().then(function() {
      console.log('signout success');
  },function(error) {
      console.log('signout failed')
  });
    tagName.innerHTML = "";
    aTag.innerHTML = "Sign in";
    aTag.setAttribute('onclick','googleSignin()');

  loginCheck = false;
}
