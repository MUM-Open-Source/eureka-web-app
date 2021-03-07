import { createStore } from 'vuex';
import firebase from 'firebase';
import firebaseApp from 'firebase/app';
import 'firebase/auth'
import router from '@/router';
import { db, auth, storage } from "@/firebase";
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
    talent: [],
    mentors: [],
    feedback: [],
    liked_events: [],                     // list of events liked by the user
    user_waves: [],                       // list of users waved at by the auth user
    waves_from_other_users: [],           // list of user ids who waved at the auth user
    filters: {
      event: {
        type: [],
        organizer: [],
        name: [],
      },
      talent: {
        interests: [],
        experience_level: ['Beginner', 'Intermediate', 'Advanced'],
        background: [],
        full_name: [],
      },
      mentor: {
        skill: [],
        experience_level: [],
        background: [],
        full_name: [],
      }
    },

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
          // fetch the user data
          this.commit('FETCH_CURRENT_USER_DATA_FROM_DB');
          state.isLoading = false;
          // save the last login in the db
          db.collection("users").doc(auth.currentUser.uid).set({
            last_login: firebaseApp.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        } else {
          // resetting the user's details
          state.user = null;
          state.user_data = null;
          state.isLoading = false;
          router.push({ name: 'Home' });
        }
      })
    },
    SIGNOUT_USER(state) {
      state.isLoading = true;
      auth.signOut().then(() => {
        Swal.fire({ icon: 'success', title: "You have logged out" });
      }).catch((error) => {
        Swal.fire({ icon: 'error', title: error.message });
      });
    },
    SIGNUP_USER(state, signUpUser) {
      const DOMAIN_NAMES = ['@student.monash.edu']
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');

      function checksEmailMatchesDomains(arrayOfAcceptableDomainNames, userEmail) {
        return arrayOfAcceptableDomainNames
          .map((domain_name) => userEmail.toLowerCase().endsWith(domain_name))
          .includes(true)
      }
      function evaluatesUserMail(userEmail, arrayOfAcceptableDomainNames, onAccepted, onRejected) {
        checksEmailMatchesDomains(arrayOfAcceptableDomainNames, userEmail) ?
          onAccepted() :
          onRejected()
      }
      function whenAccept(authUser) {
        db.collection("users").doc(auth.currentUser.uid).set({
          created_at: firebaseApp.firestore.FieldValue.serverTimestamp(),
          id: auth.currentUser.uid,
          first_name: signUpUser.first_name,
          last_name: signUpUser.last_name,
          full_name: signUpUser.first_name + " " + signUpUser.last_name,
          image_url: "https://firebasestorage.googleapis.com/v0/b/eureka-development-860d4.appspot.com/o/default-user-image.png?alt=media&token=a3a39904-b0f7-4c56-8e76-353efa9b526b",
          background: "",
          bio: "",
          interests: [],
          experience_level: 0,
          roles: [signUpUser.role],    // TODO: retrieve this from the signup form
          social_links: {
            email_id: authUser.email,
            github_url: "",
            linkedin_url: "",
            website_url: "",
          }
        });
        router.push({ name: 'Home' });
      }
      function whenReject(user, errorMessage) {
        // If it doesn't match, deletes the user from authentication
        auth.signOut().then(() => {
          user.delete();
          errorMessage()          
        }).catch((error) => {
          Swal.fire({ icon: 'error', title: error.message });
        });        
      }

      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          var isNewUser = result.additionalUserInfo.isNewUser
          if (isNewUser) {
            if (signUpUser)
              evaluatesUserMail(user.email, DOMAIN_NAMES, () => whenAccept(user),
                () => whenReject(user, () => Swal.fire({ icon: 'error', title: 'You need a Monash student account' })));
            else
              whenReject(user, () => Swal.fire({ icon: 'error', title: 'Please Sign Up Your Account' }))
          }
          else
            router.push({ name: 'Home' });
        });
    },
    FETCH_CURRENT_USER_DATA_FROM_DB(state) {
      db.collection("users").doc(auth.currentUser.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            state.user_data = doc.data();
          } else {
            console.log('User not found')
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    },

    GET_EVENTS(state) {
      db.collection("events")
        .get()
        .then((querySnapshot) => {
          // fetch liked events
          this.commit('GET_LIKED_EVENTS');
          // update state
          querySnapshot.forEach((doc) => {
            // populating the respective filter array
            if (!state.filters.event.type.includes(doc.data().type)) {
              state.filters.event.type.push(doc.data().type)
            }
            if (!state.filters.event.organizer.includes(doc.data().organizer)) {
              state.filters.event.organizer.push(doc.data().organizer)
            }
            if (!state.filters.event.name.includes(doc.data().name)) {
              state.filters.event.name.push(doc.data().name)
            }

            // populating the event array 
            state.events.push(doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting document:" + error)
        });
    },
    SET_EVENTS(state, eventObj) {
      db.collection("events")
        .doc(eventObj.id)
        .set(eventObj).catch(function (error) {
          console.log("Error getting document:" + error)
        });
    },
    ADD_EVENTS(state, eventObj) {
      db.collection("events")
        .doc(eventObj.id)
        .set(eventObj).then(() =>
          state.events.push(eventObj)
        ).catch(function (error) {
          console.log("Error getting document:" + error)
        });
    },
    DELETE_EVENTS(state, eventObj) {
      db.collection("events")
        .doc(eventObj.id)
        .delete().then(
          () => {
            const index = state.events.findIndex((e) => e.id === eventObj.id)
            if (index >= 0)
              state.events.splice(index, 1)
          }
        );
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
    GET_TALENT(state) {
      db.collection("users")
        .where("id", "!=", auth.currentUser.uid)
        .where("roles", "array-contains", "talent")
        .get()
        .then((querySnapshot) => {
          // fetch users that auth user waved at
          this.commit('GET_USER_WAVES');
          querySnapshot.forEach((doc) => {

            // populating the respective filter array
            if (!state.filters.talent.interests.includes(doc.data().interests)) {
              state.filters.talent.interests.push(doc.data().interests)
            }
            if (!state.filters.talent.background.includes(doc.data().background)) {
              state.filters.talent.background.push(doc.data().background)
            }
            if (!state.filters.talent.full_name.includes(doc.data().full_name)) {
              state.filters.talent.full_name.push(doc.data().full_name)
            }

            // populating the talent array
            state.talent.push(doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    },

    GET_MENTORS(state) {
      db.collection("users")
        .where("id", "!=", auth.currentUser.uid)
        .where("roles", "array-contains", "mentor")
        .get()
        .then((querySnapshot) => {
          // fetch users that auth user waved at
          this.commit('GET_USER_WAVES');
          querySnapshot.forEach((doc) => {

            // populating the respective filter array
            if (!state.filters.mentor.skill.includes(doc.data().skill)) {
              state.filters.mentor.skill.push(doc.data().skill)
            }
            if (!state.filters.mentor.background.includes(doc.data().background)) {
              state.filters.mentor.background.push(doc.data().background)
            }
            if (!state.filters.mentor.full_name.includes(doc.data().full_name)) {
              state.filters.mentor.full_name.push(doc.data().full_name)
            }

            // populating the mentors array
            state.mentors.push(doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    },
    GET_FEEDBACK(state) {
      db.collection("feedback")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            state.feedback.push(doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    },

    GET_USER_WAVES(state) {
      // if it is not already populated
      if (!state.user_waves.length) {
        db.collection("user_waves")
          .where("from_user_id", "==", auth.currentUser.uid)
          // listening for realtime updates
          .onSnapshot((snapshot) => {
            // only working with the changes and not entire collection
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                // add the event like to the state
                state.user_waves.push(change.doc.data().to_user_id);
              }
              if (change.type === "modified") {
                // we don't support modification yet so let's just console.log
                console.log("Modified user wave: ", change.doc.data());
              }
              if (change.type === "removed") {
                // remove the user wave from the state 
                const index = state.user_waves.indexOf(change.doc.data().to_user_id);
                if (index > -1) {
                  state.user_waves.splice(index, 1);
                }
              }
            });
          });
      }
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
        .doc(auth.currentUser.uid + '_' + eventId)
        .set({
          event_id: eventId,
          user_id: auth.currentUser.uid
        })
        // Alert with SweetAlert2
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
        .doc(auth.currentUser.uid + '_' + eventId)
        .delete()
        // Alert with SweetAlert2
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

    WAVE_AT_USER(_, toUserId) {
      // SweetAlert config
      const waveToast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });

      // writing event like to DB
      db.collection("user_waves")
        // from_to -> fromUserId_toUserId
        .doc(auth.currentUser.uid + '_' + toUserId)
        .set({
          from_user_id: auth.currentUser.uid,
          to_user_id: toUserId
        })
        // Alert with SweetAlert2
        .then(() => {
          waveToast.fire({
            icon: 'success',
            title: 'You just waved!'
          });
        })
        .catch((error) => {
          console.log(error);
          waveToast.fire({
            icon: 'error',
            title: 'Can\'t wave now'
          });
        });
    },

    UNWAVE_AT_USER(_, toUserId) {
      // SweetAlert config
      const waveToast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });

      // writing event like to DB
      db.collection("user_waves")
        // from_to -> userId_eventId
        .doc(auth.currentUser.uid + '_' + toUserId)
        .delete()
        // Alert with SweetAlert2
        .then(() => {
          waveToast.fire({
            icon: 'success',
            title: 'Removed your wave'
          });
        })
        .catch((error) => {
          console.log(error);
          waveToast.fire({
            icon: 'error',
            title: 'Can\'t undo a wave now'
          });
        });
    },

    SEND_FEEDBACK(state, feedback) {
      // writing feedback to db
      db.collection("feedback").add({
        user_id: auth.currentUser.uid,
        user_name: state.user_data.full_name,
        created_at: firebaseApp.firestore.FieldValue.serverTimestamp(),
        subject: feedback.subject,
        message: feedback.message
      })
        .then(() => {
          Swal.fire({ icon: 'success', title: "Thank you!", text: "Your feedback is well received!" });
        })
        .catch((error) => {
          Swal.fire({ icon: 'error', title: error });
        });
    },

    RESET_PASSWORD(_, emailId) {
      auth.sendPasswordResetEmail(emailId)
        .then(() => {
          // Email sent.
          Swal.fire({ icon: 'success', title: "Email sent", text: "Please reset your password with sent link." });
          router.push('Login');
        })
        .catch(error => {
          // An error happened.
          Swal.fire({ icon: 'error', title: error });
        });
    },

    GET_WAVES_FROM_OTHER_USERS(state) {
      db.collection("user_waves")
        .where("to_user_id", "==", auth.currentUser.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // populating the mentors array
            state.waves_from_other_users.push(doc.data().from_user_id);
          });
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });},
    UPDATE_USER_PROFILE(_, user){
      // updating user profile
      db.collection("users").doc(auth.currentUser.uid).update({
        background: user.background,
        bio: user.bio,
        interests: user.interests,
        experience_level: user.experience_level,
        //roles: [user.role],    // TODO: retrieve this from the signup form
        social_links: {
          github_url: user.github_url,
          linkedin_url: user.linkedin_url,
          website_url: user.website_url,
        }
      })
      .then(() => {
        this.commit('FETCH_CURRENT_USER_DATA_FROM_DB');
        Swal.fire({icon: 'success', title: "Thank you!", text: "Your profile is updated!"});
      })
      .catch((error) => {
        Swal.fire({icon: 'error', title: error});
      });
      
    },
    UPLOAD_USER_IMAGE(_, user){
      const task = storage.ref().child(user.fileName).put(user.file,user.metadata)
      task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        db.collection("users").doc(auth.currentUser.uid).update({
          image_url: url
        })
        .then(() => {
          this.commit('FETCH_CURRENT_USER_DATA_FROM_DB');
          Swal.fire({icon: 'success', title: "Thank you!", text: "Your profile picture is updated!"});
        })
        .catch((error) => {
          Swal.fire({icon: 'error', title: error});
        });
      })
    },
    SET_DEFAULT_USER_IMAGE(){
      db.collection("users").doc(auth.currentUser.uid).update({
        image_url: "https://firebasestorage.googleapis.com/v0/b/eureka-development-860d4.appspot.com/o/default-user-image.png?alt=media&token=a3a39904-b0f7-4c56-8e76-353efa9b526b"
      })
      .then(() => {
        this.commit('FETCH_CURRENT_USER_DATA_FROM_DB');
        Swal.fire({icon: 'success', title: "Thank you!", text: "Your profile picture is set to default!"});
      })
      .catch((error) => {
        Swal.fire({icon: 'error', title: error});
      });

    }

  },

  // functions to be called throughout the app that, in turn, call mutations
  actions: {

    toggleSideNavState({ commit }) {
      commit('SET_IS_SIDE_NAV_COLLAPSED')
    },
    setAuthUser({ commit }) {
      commit('SET_AUTH_USER');
    },
    signoutUser({ commit }) {
      commit('SIGNOUT_USER');
    },
    fetchCurrentUserFromDB({ commit }) {
      commit('FETCH_CURRENT_USER_DATA_FROM_DB')
    },
    signUpUser({ commit }, user) {
      commit('SIGNUP_USER', user);
    },
    setEvents({ commit }, eventObj) {
      commit('SET_EVENTS', eventObj);
    },
    getEvents({ commit }) {
      commit('GET_EVENTS');
    },
    deleteEvents({ commit }, obj) {
      commit('DELETE_EVENTS', obj);
    },
    getTalent({ commit }) {
      commit('GET_TALENT');
    },
    addEvents({ commit }, obj) {
      commit('ADD_EVENTS', obj)
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

    waveAtUser({ commit }, toUserId) {
      commit('WAVE_AT_USER', toUserId);
    },

    unwaveAtUser({ commit }, toUserId) {
      commit('UNWAVE_AT_USER', toUserId);
    },

    sendFeedback({ commit }, feedback) {
      commit('SEND_FEEDBACK', feedback);
    },

    getFeedback({ commit }) {
      commit('GET_FEEDBACK');
    },

    resetPassword({ commit }, emailId) {
      commit('RESET_PASSWORD', emailId);
    },

    getWavesFromOtherUsers({ commit }) {
      commit('GET_WAVES_FROM_OTHER_USERS');
    },
    updateUserProfile({ commit }, user) {
      commit('UPDATE_USER_PROFILE', user);
    },
    uploadUserImage({ commit }, user){
      commit('UPLOAD_USER_IMAGE',user);
    },
    setDefaultUserImage({ commit }){
      commit('SET_DEFAULT_USER_IMAGE');
    }
  }

  });