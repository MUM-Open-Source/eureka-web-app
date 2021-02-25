import { createStore } from 'vuex';
import firebase from 'firebase/app';
import router from '@/router';
import { db, auth } from "@/firebase";
import Swal from 'sweetalert2';

export default createStore({
  // application-level data
  state: {
    user: auth.currentUser,               // firebase auth user
    isSideNavCollapsed: true,             // bool to check if sidenav is showing
    isLoading: true,                      // bool to keep track whether user is being retreived from the DB
    user_data: null,                      // user data pulled from db
    user_image: null,
    events: [],
    liked_events: [],                     // list of events liked by the user
    talent:[],
    mentors: [],
  },

  // functions that affect the state
  mutations: {

    SET_IS_SIDE_NAV_COLLAPSED(state) {
      state.isSideNavCollapsed = !state.isSideNavCollapsed;
    },

    SET_AUTH_USER(state) {
      state.isLoading = true;
      // listening for changes to user auth
      auth.onAuthStateChanged(user => {
        if (user) {
          state.user = user;
          // save the last login in the db
          db.collection("users").doc(auth.currentUser.uid).set({
            last_login: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
          // fetch the user data
          this.commit('FETCH_CURRENT_USER_DATA_FROM_DB');
          state.isLoading = false;
        } else {
          state.user = null;
          state.isLoading = false;
          router.push({ name: 'Home' });
        }
      })
    },

    SET_USER(state, user) {
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          // authenticated successfully
          router.push({ name: 'Home' });
        })
        .catch((ex) => {
          //catching errors and display them
          Swal.fire({icon: 'error', title: ex.message});
        });
    },

    SIGNUP_USER(_, user) {
      auth
        .createUserWithEmailAndPassword(user.email_id, user.password)
        .then(() => {
          //signed up successfully  
          router.push({ name: 'Profile' });
          // writing user to db
          db.collection("users").doc(auth.currentUser.uid).set({
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            id: auth.currentUser.uid,
            first_name: user.first_name,
            last_name: user.last_name,
            full_name: user.first_name + " " + user.last_name,
            image_url: "https://firebasestorage.googleapis.com/v0/b/eureka-development-860d4.appspot.com/o/default-user-image.png?alt=media&token=a3a39904-b0f7-4c56-8e76-353efa9b526b",
            background: "",
            bio: "",
            interests: [],
            experience_level: 0,
            roles: [user.role],    // TODO: retrieve this from the signup form
            social_links: {
              email_id: user.email_id,
              github_url: "",
              linkedin_url: "",
              website_url: "",
            }
          });
        })
        .catch((ex) => {
          //catching errors and display them
          Swal.fire({icon: 'error', title: ex.message});
        });
    },

    FETCH_CURRENT_USER_DATA_FROM_DB(state){
      db.collection("users").doc(auth.currentUser.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            state.user_data = doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    GET_EVENTS(state){
      db.collection("events")
        .get()
        .then((querySnapshot) => {
          // fetch liked events
          this.commit('GET_LIKED_EVENTS');
          // update state
          querySnapshot.forEach((doc) => {
            state.events.push(doc.data());
          });
        })
        .catch(function(error) {
          console.log("Error getting document:"+ error)
        });
    },

    GET_LIKED_EVENTS(state) {
      db.collection("event_likes")
        .where("user_id", "==", auth.currentUser.uid)
        // listening for realtime updates
        .onSnapshot((snapshot) => {
          // only working with the changes and not entire collection
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              // add the event like to the state
              state.liked_events.push(change.doc.data().event_id);
            }
            if (change.type === "modified") {
              // we don't support modification yet so let's just console.log
              console.log("Modified liked event: ", change.doc.data());
            }
            if (change.type === "removed") {
              // remove the event like from the state 
              const index = state.liked_events.indexOf(change.doc.data().event_id);
              if (index > -1) {
                state.liked_events.splice(index, 1);
              }
            }
          });
        });
    },
    
    GET_TALENT(state){
      db.collection("users")
        .where("id", "!=", auth.currentUser.uid)
        .where("roles", "array-contains", "talent")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            state.talent.push(doc.data());
          });
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    GET_MENTORS(state){
      db.collection("users")
        .where("id", "!=", auth.currentUser.uid)
        .where("roles", "array-contains", "mentor")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            state.mentors.push(doc.data());
          });
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    LIKE_EVENT(_, eventId) {
      // SweetAlert config
      const likeToast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });

      // writing event like to DB
      db.collection("event_likes")
        // from_to -> userId_eventId
        .doc(auth.currentUser.uid+'_'+eventId)
        .set({
          event_id: eventId,
          user_id: auth.currentUser.uid
        })
        // TODO: Replace with SweetAlert2
        .then(() => {
          likeToast.fire({
            icon: 'success',
            title: 'Liked event'
          });
        })
        .catch((error) => {
          console.log(error);
          likeToast.fire({
            icon: 'error',
            title: 'Can\'t like the event now'
          });
        });
    },

    UNLIKE_EVENT(_, eventId) {
      // SweetAlert config
      const likeToast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });

      // writing event like to DB
      db.collection("event_likes")
        // from_to -> userId_eventId
        .doc(auth.currentUser.uid+'_'+eventId)
        .delete()
        // TODO: Replace with SweetAlert2
        .then(() => {          
          likeToast.fire({
            icon: 'success',
            title: 'Uniked event'
          });
        })
        .catch((error) => {
          console.log(error);
          likeToast.fire({
            icon: 'error',
            title: 'Can\'t unlike the event now'
          });
        });
    },

    SEND_FEEDBACK(_, feedback) {
      // writing feedback to db
      db.collection("feedbacks").add({
        id: auth.currentUser.uid,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        subject: feedback.subject,
        message: feedback.message
      })
      .then(() => {
        Swal.fire({icon: 'success', title: "Thank you!", text: "Your feedback is well received!"});
      })
      .catch((error) => {
        Swal.fire({icon: 'error', title: error});
      });
    },

  },


  // functions to be called throughout the app that, in turn, call mutations
  actions: {
    
    toggleSideNavState({ commit }) {
      commit('SET_IS_SIDE_NAV_COLLAPSED')
    },

    setAuthUser({ commit }) {
      commit('SET_AUTH_USER');
    },

    setUser({ commit }, user) {
      commit('SET_USER', user);
    },

    signUpUser({ commit }, user) {
      commit('SIGNUP_USER', user);
    },

    getEvents({ commit }) {
      commit('GET_EVENTS');
    },
    
    getTalent({ commit }) {
      commit('GET_TALENT');
    },
    
    getMentors({ commit }) {
      commit('GET_MENTORS');
    },

    likeEvent({ commit }, eventId) {
      commit('LIKE_EVENT', eventId);
    },

    unlikeEvent({ commit }, eventId) {
      commit('UNLIKE_EVENT', eventId);
    },

    sendFeedback({ commit }, feedback) {
      commit('SEND_FEEDBACK', feedback);
    }

  }

})
