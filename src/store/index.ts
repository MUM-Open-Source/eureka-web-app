import {createStore, Store} from "vuex";
import firebase from "firebase";
import firebaseApp from "firebase/app";
import "firebase/auth";
import {db, auth, storage} from "@/firebase";
import router from "@/router";
import Swal from "sweetalert2";
// types
import {AppState} from "@/types/AppTypes.interface";
import {User, Event, Feedback} from "@/types/FirebaseTypes.interface";

const getInitState = (): AppState => {
  return {
    user: auth.currentUser, // firebase auth user
    isSideNavCollapsed: true, // bool to check if sidenav is showing
    isLoading: true, // bool to keep track whether user is being retreived from the DB
    is_under_maintenance: true, // bool to know whether website is under maintenance and display maintenance screen
    user_data: null, // user data pulled from db
    is_new_user_data_available: false, // to identify if updated data is available to fetch
    user_image: "",
    upload_image: {url: "", fileName: ""}, // to help with the upload of profile image
    new_img_url: "",
    is_new: false, // used to ensure all mandatory details are filled after signup
    events: [],
    talent: [],
    mentors: [],
    feedback: [],
    liked_events: [], // list of events liked by the user
    user_waves: [], // list of users waved at by the auth user
    waves_from_other_users: [], // list of user ids who waved at the auth user
    filters: {
      event: {
        type: [],
        organizer: [],
        name: [],
      },
      talent: {
        interests: [],
        experience_level: ["Beginner", "Intermediate", "Advanced"],
        background: [],
        full_name: [],
      },
      mentors: {
        skill: [],
        experience_level: ["Beginner", "Intermediate", "Advanced"],
        background: [],
        full_name: [],
      },
    },
  };
};

export default createStore({
  // application-level data
  state: getInitState(),

  // functions that affect the state
  mutations: {
    SET_IS_SIDE_NAV_COLLAPSED(state) {
      state.isSideNavCollapsed = !state.isSideNavCollapsed;
    },

    SET_AUTH_USER(state) {
      state.isLoading = true;
      // listening for changes to user auth
      auth.onAuthStateChanged((user) => {
        if (user) {
          state.user = user;
          state.isLoading = false;
          // save the last login in the db
          db.collection("users")
            .doc(auth.currentUser!.uid)
            .update({
              last_login: firebaseApp.firestore.FieldValue.serverTimestamp(),
            });
          state.is_new_user_data_available = true;
        } else {
          // resetting the user's details
          state.user = null;
          state.user_data = null;
          state.isLoading = false;
          router.push({name: "Home"});
        }
      });
    },

    SIGNOUT_USER(state) {
      state.isLoading = true;
      auth
        .signOut()
        .then(() => {
          Object.assign(state, getInitState());
          Swal.fire({icon: "success", title: "You have logged out"});
        })
        .catch((error) => {
          Swal.fire({icon: "error", title: error.message});
        });
    },

    SIGNUP_USER(
      state,
      signUpUser: Pick<User, "first_name" | "last_name" | "roles">
    ) {
      const DOMAIN_NAMES = ["@student.monash.edu", "@monash.edu"];
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("email");

      const checksEmailMatchesDomains = (
        arrayOfAcceptableDomainNames: string[],
        userEmail: string
      ): boolean =>
        arrayOfAcceptableDomainNames
          .map((domain_name) => userEmail.toLowerCase().endsWith(domain_name))
          .includes(true);

      const evaluatesUserMail = (
        userEmail: string,
        arrayOfAcceptableDomainNames: string[],
        onAccepted: Function,
        onRejected: Function
      ): void =>
        checksEmailMatchesDomains(arrayOfAcceptableDomainNames, userEmail)
          ? onAccepted()
          : onRejected();

      const whenAccept = (authUser: firebase.User): void => {
        const userObj: User = {
          created_at: firebaseApp.firestore.FieldValue.serverTimestamp(),
          last_login: firebaseApp.firestore.FieldValue.serverTimestamp(),
          id: auth.currentUser!.uid,
          first_name: signUpUser.first_name,
          last_name: signUpUser.last_name,
          full_name: signUpUser.first_name + " " + signUpUser.last_name,
          image_url:
            "https://firebasestorage.googleapis.com/v0/b/eureka-development-860d4.appspot.com/o/default-user-image.png?alt=media&token=a3a39904-b0f7-4c56-8e76-353efa9b526b",
          background: "",
          bio: "",
          interests: [],
          experience_level: 0,
          roles: signUpUser.roles, // TODO: retrieve this from the signup form
          social_links: {
            email_id: authUser?.email ?? "",
            github_url: "",
            linkedin_url: "",
            website_url: "",
          },
        };

        // write to db
        db.collection("users")
          .doc(auth.currentUser!.uid)
          .set(userObj);

        // handle the next steps
        state.is_new = true;
        router.push({name: "Home"});

        Swal.fire({
          icon: "warning",
          title: "Complete Your Profile Setup",
          confirmButtonText: "Let's Go",
        }).then((result) => {
          // Prompting users to complete their profile
          if (result.isConfirmed) {
            router.push({name: "Profile"});
          }
        });
      };

      const whenReject = (user: firebase.User, errorMessage: string) => {
        // If it doesn't match, deletes the user from authentication
        auth
          .signOut()
          .then(() => {
            user.delete();
            Swal.fire({
              icon: "error",
              title: errorMessage,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: error.message,
            });
          });
      };

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user: firebase.User | any = result.user;
          if (result.additionalUserInfo!.isNewUser) {
            if (signUpUser && signUpUser.roles.includes("talent"))
              evaluatesUserMail(
                user!.email ?? "",
                DOMAIN_NAMES,
                () => whenAccept(user),
                () =>
                  whenReject(
                    user,
                    "You need a Monash student account, or are you a spy?"
                  )
              );
            else if (signUpUser && signUpUser.roles.includes("mentor"))
              whenAccept(user);
            else whenReject(user, "Please Sign Up An Account First.");
          } else router.push({name: "Home"});
        });
    },

    FETCH_CURRENT_USER_DATA_FROM_DB(state) {
      console.log("Fetch user details");
      if (auth.currentUser) {
        db.collection("users")
          .doc(auth.currentUser!.uid)
          .get()
          .then((doc) => {
            if (state.is_new_user_data_available && doc.exists) {
              const user: User = {
                background: doc.data()!.background,
                bio: doc.data()!.bio,
                created_at: doc.data()!.created_at,
                experience_level: doc.data()!.experience_level,
                first_name: doc.data()!.first_name,
                full_name: doc.data()!.full_name,
                id: doc.data()!.id,
                image_url: doc.data()!.image_url,
                interests: doc.data()!.interests,
                last_login: doc.data()!.last_login,
                last_name: doc.data()!.last_name,
                roles: doc.data()!.roles,
                social_links: doc.data()!.social_links,
              };
              state.user_data = user;
            } else {
              console.log("User not found");
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
            state.is_new_user_data_available = false;
          });
      }
    },

    GET_EVENTS(state) {
      db.collection("events")
        .get()
        .then((querySnapshot) => {
          // update state
          querySnapshot.forEach((doc) => {
            // populating the respective filter array
            if (!state.filters.event.type.includes(doc.data().type)) {
              state.filters.event.type.push(doc.data().type);
            }
            if (!state.filters.event.organizer.includes(doc.data().organizer)) {
              state.filters.event.organizer.push(doc.data().organizer);
            }
            if (!state.filters.event.name.includes(doc.data().name)) {
              state.filters.event.name.push(doc.data().name);
            }

            const event: Event = {
              dates: doc.data().dates,
              description: doc.data().description,
              id: doc.data().id,
              image_url: doc.data().image_url,
              link: doc.data().link,
              name: doc.data().name,
              organizer: doc.data().organizer,
              type: doc.data().type,
            };

            // populating the event array
            state.events.push(event);
          });
        })
        .catch(function(error) {
          console.log("Error getting document:" + error);
        });
    },

    SET_EVENT(state, event: Event) {
      db.collection("events")
        .doc(event.id)
        .set(event)
        .catch(function(error) {
          console.log("Error getting document:" + error);
        });
    },

    ADD_EVENT(state, event: Event) {
      db.collection("events")
        .doc(event.id)
        .set(event)
        .then(() => state.events.push(event))
        .catch(function(error) {
          console.log("Error getting document:" + error);
        });
    },

    DELETE_EVENT(state, event: Event) {
      db.collection("events")
        .doc(event.id)
        .delete()
        .then(() => {
          const index = state.events.findIndex((e) => e.id === event.id);
          if (index >= 0) state.events.splice(index, 1);
        });
    },

    GET_LIKED_EVENTS(state) {
      db.collection("event_likes")
        .where("user_id", "==", auth.currentUser!.uid)
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
              const index = state.liked_events.indexOf(
                change.doc.data().event_id
              );
              if (index > -1) {
                state.liked_events.splice(index, 1);
              }
            }
          });
        });
    },

    GET_TALENT(state) {
      db.collection("users")
        .where("id", "!=", auth.currentUser!.uid)
        .where("roles", "array-contains", "talent")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // populating the respective filter array
            doc.data().interests.forEach((interest: string) => {
              if (!state.filters.talent.interests.includes(interest)) {
                state.filters.talent.interests.push(interest);
              }
            });

            if (
              !state.filters.talent.background.includes(
                doc.data().background
              ) &&
              doc.data().background != ""
            ) {
              state.filters.talent.background.push(doc.data().background);
            }
            if (
              !state.filters.talent.full_name.includes(doc.data().full_name)
            ) {
              state.filters.talent.full_name.push(doc.data().full_name);
            }

            const talent: User = {
              background: doc.data().background,
              bio: doc.data().bio,
              created_at: doc.data().created_at,
              experience_level: doc.data().experience_level,
              first_name: doc.data().first_name,
              full_name: doc.data().full_name,
              id: doc.data().id,
              image_url: doc.data().image_url,
              interests: doc.data().interests,
              last_login: doc.data().last_login,
              last_name: doc.data().last_name,
              roles: doc.data().roles,
              social_links: doc.data().social_links,
            };

            // populating the talent array
            state.talent.push(talent);
          });
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    GET_MENTORS(state) {
      db.collection("users")
        .where("id", "!=", auth.currentUser!.uid)
        .where("roles", "array-contains", "mentor")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // populating the respective filter array
            doc.data().interests.forEach((interest: string) => {
              if (!state.filters.mentors.skill.includes(interest)) {
                state.filters.mentors.skill.push(interest);
              }
            });
            if (
              !state.filters.mentors.background.includes(
                doc.data().background
              ) &&
              doc.data().background != ""
            ) {
              state.filters.mentors.background.push(doc.data().background);
            }
            if (
              !state.filters.mentors.full_name.includes(doc.data().full_name)
            ) {
              state.filters.mentors.full_name.push(doc.data().full_name);
            }

            const mentor: User = {
              background: doc.data().background,
              bio: doc.data().bio,
              created_at: doc.data().created_at,
              experience_level: doc.data().experience_level,
              first_name: doc.data().first_name,
              full_name: doc.data().full_name,
              id: doc.data().id,
              image_url: doc.data().image_url,
              interests: doc.data().interests,
              last_login: doc.data().last_login,
              last_name: doc.data().last_name,
              roles: doc.data().roles,
              social_links: doc.data().social_links,
            };

            // populating the mentors array
            state.mentors.push(mentor);
          });
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    GET_FEEDBACK(state) {
      db.collection("feedback")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const feedback: Feedback = {
              created_at: doc.data().created_at,
              message: doc.data().message,
              subject: doc.data().subject,
              user_id: doc.data().user_id,
              user_name: doc.data().user_name,
            };
            state.feedback.push(feedback);
          });
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    GET_USER_WAVES(state) {
      // if it is not already populated
      if (!state.user_waves.length) {
        db.collection("user_waves")
          .where("from_user_id", "==", auth.currentUser!.uid)
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
                const index = state.user_waves.indexOf(
                  change.doc.data().to_user_id
                );
                if (index > -1) {
                  state.user_waves.splice(index, 1);
                }
              }
            });
          });
      }
    },

    LIKE_EVENT(_, eventId: string) {
      // SweetAlert config
      const likeToast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      // writing event like to DB
      db.collection("event_likes")
        // from_to -> userId_eventId
        .doc(auth.currentUser!.uid + "_" + eventId)
        .set({
          event_id: eventId,
          user_id: auth.currentUser!.uid,
        })
        // Alert with SweetAlert2
        .then(() => {
          likeToast.fire({
            icon: "success",
            title: "Liked event",
          });
        })
        .catch((error) => {
          console.log(error);
          likeToast.fire({
            icon: "error",
            title: "Can't like the event now",
          });
        });
    },

    UNLIKE_EVENT(_, eventId: string) {
      // SweetAlert config
      const likeToast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      // writing event like to DB
      db.collection("event_likes")
        // from_to -> userId_eventId
        .doc(auth.currentUser!.uid + "_" + eventId)
        .delete()
        // Alert with SweetAlert2
        .then(() => {
          likeToast.fire({
            icon: "success",
            title: "Unliked event",
          });
        })
        .catch((error) => {
          console.log(error);
          likeToast.fire({
            icon: "error",
            title: "Can't unlike the event now",
          });
        });
    },

    WAVE_AT_USER(_, toUserId: string) {
      // SweetAlert config
      const waveToast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      // writing event like to DB
      db.collection("user_waves")
        // from_to -> fromUserId_toUserId
        .doc(auth.currentUser!.uid + "_" + toUserId)
        .set({
          from_user_id: auth.currentUser!.uid,
          to_user_id: toUserId,
        })
        // Alert with SweetAlert2
        .then(() => {
          waveToast.fire({
            icon: "success",
            title: "You just waved!",
          });
        })
        .catch((error) => {
          console.log(error);
          waveToast.fire({
            icon: "error",
            title: "Can't wave now",
          });
        });
    },

    UNWAVE_AT_USER(_, toUserId: string) {
      // SweetAlert config
      const waveToast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      // writing event like to DB
      db.collection("user_waves")
        // from_to -> userId_eventId
        .doc(auth.currentUser!.uid + "_" + toUserId)
        .delete()
        // Alert with SweetAlert2
        .then(() => {
          waveToast.fire({
            icon: "success",
            title: "Removed your wave",
          });
        })
        .catch((error) => {
          console.log(error);
          waveToast.fire({
            icon: "error",
            title: "Can't undo a wave now",
          });
        });
    },

    SEND_FEEDBACK(state, newFeedback: Pick<Feedback, "message" | "subject">) {
      // old code
      const feedback: Feedback = {
        user_id: auth.currentUser!.uid,
        user_name: state.user_data!.full_name,
        created_at: firebaseApp.firestore.FieldValue.serverTimestamp(),
        subject: newFeedback.subject,
        message: newFeedback.message,
      };

      // writing feedback to db
      db.collection("feedback")
        .add(feedback)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Thank you!",
            text: "Your feedback is well received!",
          });
        })
        .catch((error) => {
          Swal.fire({icon: "error", title: error});
        });
    },

    RESET_PASSWORD(_, emailId: string) {
      auth
        .sendPasswordResetEmail(emailId)
        .then(() => {
          // Email sent.
          Swal.fire({
            icon: "success",
            title: "Email sent",
            text:
              "Please reset your password with the link sent to your inbox.",
          });
          router.push("Login");
        })
        .catch((error) => {
          // An error happened.
          Swal.fire({icon: "error", title: error});
        });
    },

    UPDATE_USER_PROFILE(state, user: User) {
      // old code
      // const updatedAttributes = {
      //     background: user.background,
      //     bio: user.bio,
      //     interests: user.interests,
      //     experience_level: parseInt(user.experience_level),
      //     social_links: {
      //         ...state.user_data.social_links,
      //         github_url: user.github_url,
      //         linkedin_url: user.linkedin_url,
      //         website_url: user.website_url,
      //     }
      // }

      // updating user profile
      db.collection("users")
        .doc(auth.currentUser!.uid)
        .update(user)
        .then(() => {
          state.is_new = false;
          Swal.fire({
            icon: "success",
            title: "Thank you!",
            text: "Your profile is updated!",
          });
          state.is_new_user_data_available = true;
        })
        .catch((error) => {
          Swal.fire({icon: "error", title: error});
        });
    },

    //set user image url only in db
    SET_USER_IMAGE_URL(state, url: string) {
      db.collection("users")
        .doc(auth.currentUser!.uid)
        .update({
          image_url: url,
        })
        .then(() => {
          state.new_img_url = "";
          Swal.fire({
            icon: "success",
            title: "Thank you!",
            text: "Your profile picture is updated!",
          });
          router.push({path: "/profile"});
          state.is_new_user_data_available = true;
        })
        .catch((error) => {
          Swal.fire({icon: "error", title: error});
        });
    },

    DELETE_PROFILE_IMAGE_FROM_STORAGE(_, fileName) {
      storage
        .ref()
        .child(fileName)
        .delete()
        .catch((error) => {
          console.log(error);
        });
    },

    UPLOAD_USER_IMAGE(state, user) {
      const task = storage
        .ref()
        .child(user.fileName)
        .put(user.file, user.metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => (state.new_img_url = url));
    },

    SET_DEFAULT_USER_IMAGE(state) {
      const defaultImageURL =
        "https://firebasestorage.googleapis.com/v0/b/eureka-development-860d4.appspot.com/o/default-user-image.png?alt=media&token=a3a39904-b0f7-4c56-8e76-353efa9b526b";
      db.collection("users")
        .doc(auth.currentUser!.uid)
        .update({
          image_url: defaultImageURL,
        })
        .then(() => {
          state.user_data!.image_url = defaultImageURL;
          Swal.fire({
            icon: "success",
            title: "Thank you!",
            text: "Your profile picture has been reset!",
          });
        })
        .catch((error) => {
          Swal.fire({icon: "error", title: error});
        });
    },

    UPLOAD_USER_CROPPED_IMAGE(state, file) {
      const task = storage
        .ref()
        .child(file.fileName)
        .put(file.file, file.metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          state.upload_image = {url: url, fileName: file.fileName};
        });
    },

    GET_WAVES_FROM_OTHER_USERS(state) {
      db.collection("user_waves")
        .where("to_user_id", "==", auth.currentUser!.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // populating the mentors array
            state.waves_from_other_users.push(doc.data().from_user_id);
          });
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
  },
  // functions to be called throughout the app that, in turn, call mutations
  actions: {
    toggleSideNavState({commit}) {
      commit("SET_IS_SIDE_NAV_COLLAPSED");
    },
    setAuthUser({commit}) {
      commit("SET_AUTH_USER");
      // fetch the user data
      commit("FETCH_CURRENT_USER_DATA_FROM_DB");
    },
    signoutUser({commit}) {
      commit("SIGNOUT_USER");
    },
    fetchCurrentUserFromDB({commit}) {
      commit("FETCH_CURRENT_USER_DATA_FROM_DB");
    },
    signUpUser(
      {commit},
      user: Pick<User, "first_name" | "last_name" | "roles">
    ) {
      commit("SIGNUP_USER", user);
    },
    setEvents({commit}, eventObj: Event) {
      commit("SET_EVENT", eventObj);
    },
    getEvents({commit}) {
      commit("GET_EVENTS");
      commit("GET_LIKED_EVENTS");
    },
    deleteEvents({commit}, obj: Event) {
      commit("DELETE_EVENT", obj);
    },
    getTalent({commit}) {
      commit("GET_TALENT");
      // fetch users that auth user waved at
      commit("GET_USER_WAVES");
    },
    addEvents({commit}, obj: Event) {
      commit("ADD_EVENT", obj);
    },
    getMentors({commit}) {
      commit("GET_MENTORS");
      // fetch users that auth user waved at
      commit("GET_USER_WAVES");
    },
    likeEvent({commit}, eventId: string) {
      commit("LIKE_EVENT", eventId);
    },

    unlikeEvent({commit}, eventId: string) {
      commit("UNLIKE_EVENT", eventId);
    },

    waveAtUser({commit}, toUserId: string) {
      commit("WAVE_AT_USER", toUserId);
    },

    unwaveAtUser({commit}, toUserId: string) {
      commit("UNWAVE_AT_USER", toUserId);
    },

    sendFeedback({commit}, feedback: Pick<Feedback, "message" | "subject">) {
      commit("SEND_FEEDBACK", feedback);
    },

    updateUserProfile({commit}, user: User) {
      commit("UPDATE_USER_PROFILE", user);
      // fetch the user data
      commit("FETCH_CURRENT_USER_DATA_FROM_DB");
    },

    uploadUserImage({commit}, user) {
      commit("UPLOAD_USER_IMAGE", user);
      commit("SET_USER_IMAGE_URL");
    },

    setDefaultUserImage({commit}) {
      commit("SET_DEFAULT_USER_IMAGE");
    },

    uploadUserCroppedImage({commit}, file) {
      commit("UPLOAD_USER_CROPPED_IMAGE", file);
    },

    setUserImageURL({commit}, image_url: string) {
      commit("SET_USER_IMAGE_URL", image_url);
      // fetch the user data
      commit("FETCH_CURRENT_USER_DATA_FROM_DB");
    },

    deleteProfileImageFromStorage({commit}, fileName) {
      commit("DELETE_PROFILE_IMAGE_FROM_STORAGE", fileName);
    },

    getFeedback({commit}) {
      commit("GET_FEEDBACK");
    },

    resetPassword({commit}, emailId: string) {
      commit("RESET_PASSWORD", emailId);
    },

    getWavesFromOtherUsers({commit}) {
      commit("GET_WAVES_FROM_OTHER_USERS");
    },
  },
});
