# Quacker

Quacker is a full stack application designed to emulate twitter. Users can create quacks(posts) to share their thoughts and memes and reply to others as they see fit. If so desired, users can upload up to 4 images in addition to their quack. After posting, a user can click on it to view all of its replies, and all replies to that reply and so on.

Check out the deployed site here: [Quacker](https://quacker-fullstack.herokuapp.com/home)

## Installation

This project uses pip and npm for backend and frontend packages, respectively. After cloning, run the following commands in the root folder:

```bash
pipenv install
pipenv run flask run
```

Then open a new terminal and navigate to the react-app directory and run:

```bash
npm install
npm start
```

## Technologies Used

### Backend:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Frontend:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Hosting:
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Usage

### Landing Page

Here, the user can either sign up using the provided form, or log in with a demo user. If they have already created an account, the user can simply click the "sign in" button and a modal will pop up allowing them to sign in with their email and password.

![Signup](https://res.cloudinary.com/dpjpitop6/image/upload/v1662955657/signup_aifmqs.png)
![Signin](https://res.cloudinary.com/dpjpitop6/image/upload/v1662955661/signin_dcgf1z.png)

### Home Feed

Here, the 20 most recent quacks are displayed. The user can click on the large blue button on the left to open a new quack modal or use the form at the top of the page. The user can reply to quacks that interest them by clicking the reply icon underneath a specific quack. This opens up a modal containing the quack they're replying to as well as an input form for their reply. Here, the user can add images just like the form at the top of the page. Clicking on the ellipsis icon on the top right of a quack will drop down a menu giving the user the option to delete the quack, edit the quack or copy the quacks's link to their clipboard.

#### Infinite Scroll

The home feed is paginated and upon hitting the bottom of the page, another query is made for the next page of results, which are appended to the end of the feed automatically. Currently limited to 10 pages.

![Home](https://i.imgur.com/KoQiZh9.png)

![Reply](https://i.imgur.com/MWoQlUP.png)

![Delete](https://i.imgur.com/a1V9osF.png)

![Delete2](https://i.imgur.com/o0uZWdT.png)


### Single Quack Page

After clicking on a quack that interests them, the user is redirected to the single quack display where they can see all replies and the parent post (if there is one). The user can follow nested reply chains and navigate between them freely as well as open up the same reply modal as shown above. Submitting a reply on the main feed will redirect to this page.

![SinglePost](https://i.imgur.com/de19kbq.png)

### Profile Page

Here, the user can view all of their quacks, sorted by main posts, replies or those that contain media (only images for now).

![ProfilePage](https://i.imgur.com/66a6wmP.png)

Clicking on the edit profile button will open up a modal allowing the user to adjust their display name (required) and bio.

![EditProfile](https://i.imgur.com/htNzhVk.png)

### Upcoming features

- Ability to edit profile background and avatar
- Like posts
- DMs


