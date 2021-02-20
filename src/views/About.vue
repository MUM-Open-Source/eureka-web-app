<template>
    <div class="about page-pad">   
        <div class="about__content text--center">
            <div class="about__content--title mar__b--2 text--center">
                <img class="about__logo" src="@/assets/logo.svg"/>
                <div class="heading mar__t--3 mar__b--2">About us</div>
            <div class="about__description body">
                <p class="mar__b--1"> Hi there, Weclome to Eureka Open Source ! </p>
                <p class="mar__b--1">
                We are a platform that connects like minded individuals who will be, are or have been students of Monash University, from a variety of disciplines and interests, in order to build something amazing ! 
                </p> 
                <p class="mar__b--1">
                Organizers can post their competitions on our Browse Events page and easily reach a pool of keen talent.
                </p>
                <p class="mar__b--1">
                We are making it easier for competitors too ! Not enough teammates? No problem, you can search through our Find Talent page and connect with your fellow peers and alumni that have similar interest and the required expertise !
                </p>
                <p class="mar__b--1">
                New to Hackathons? Need some direction on how to start things off? We got you covered ! Our Find Mentor page allows competitors to network with Mentors who will be more than happy to show you the ropes and set you up for success !
                </p>
                <p class="mar__b--3">
                We have incorporated features that allow you to wave at other talent as well as like competitions, which will keep things organized in your dashboard!
                </p>
                <p>
                What's more? Eureka is an open source project ! Can think of new features that will make the platform better? Feel free to contribute!
                </p>
                <a class="mar__t--2" href="https://github.com/The-Eureka-Project/eureka-platform/" target="_blank">
                    <img class="about__socials--icon pad__t--1" src="@/assets/github-icon.svg" />
                </a>
                <p>We cant wait to see what you build :)</p>
            
            </div>
            </div>
        </div>
    </div> 
</template>

<script>

export default {
    name: 'About'
}
</script>

<style lang="scss" scoped>
.about__content {
    max-width: $about-max-width;
    margin-left: auto;
    margin-right: auto;
}

.about__logo{
    max-width: 400px;
    width: 100%;
}
.about__socials {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        &--icon {
            width: $about-social-icon-width;
            margin: $about-social-icon-margin;
        }}
</style> 
