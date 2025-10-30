import profileImage from "../assets/images/1.jpg";
import backgroundImage from "../assets/images/backgroun.jpg";
import Lottie from "lottie-react";
import skillAnimation from "../assets/animation/skillAnimation.json";
import chatAnimation from "../assets/animation/chatAnimation.json";
import GitHub from '../assets/images/github.svg';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";

const Home = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => setDialogOpen(false);
  const handleClickOpen = () => setDialogOpen(true);

  return (
      <div>
        <Dialog open={dialogOpen} onClose={handleClose} className="w-full">
          <DialogContent className="bg-amber-300 w-screen">
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Disagree</button>
            <button onClick={handleClose} autoFocus>Agree</button>
          </DialogActions>
        </Dialog>

        <div className="w-full h-screen bg-cover bg-center fixed" style={{ backgroundImage: `url(${backgroundImage})`, zIndex: -2 }}></div>
        <div className="h-screen flex flex-col items-center justify-center z-10">
          <img src={profileImage} alt="Akila Heshan" className="w-60 rounded-full hover:scale-110 duration-500 z-20 border-[7px] hover:border-sky-400" />
          <p className="font-mono font-extrabold text-3xl md:text-4xl text-white mt-10 typing-demo">M.R. Akila Heshan</p>
          <p className="font-serif text-sm md:text-base text-gray-200 mt-2">SOFTWARE ENGINEER | FRONT END & BACK END</p>
        </div>

        <div>
          <p className="text-3xl text-white text-center font-serif font-bold mb-7">/* About Me */</p>
          <div className="w-full grid md:grid-cols-2 justify-center">
            <div className="flex justify-center items-center">
              <img src={profileImage} alt="Akila Heshan" className="h-70 rounded-3xl hover:scale-110 duration-500 hover:border-sky-400" />
            </div>
            <div className="flex flex-col items-center max-sm:mt-8">
              <div className="text-lg font-mono bg-white text-blue-800 p-3 rounded-lg mb-7">BEng (HONS) SOFTWARE ENGINEERING</div>
              <div className="w-[90%] text-white text-lg text-justify mb-4">
                I am a passionate and ambitious software engineering undergraduate at the Java Institute, eager to dive deep into the ever-evolving world of technology. With a strong foundation in Java, PHP, MySQL, Firebase, Android Studio(Java), HTML, JavaScript, CSS, and frameworks like Bootstrap, Tailwind, Vite (React), EXPO, and Hibernate, I specialize in both web and mobile application development.
              </div>
              <div className="w-[90%] text-white text-lg text-justify">
                Driven by curiosity and a desire for continuous learning, I see every challenge as an opportunity to grow both personally and professionally. Whether it's mastering new technologies or tackling coding puzzles, I'm always ready to push boundaries and expand my horizons in the field of software development.
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className="text-3xl text-white text-center font-serif font-bold my-12">My Skills</p>
          <div className="flex flex-wrap items-center justify-center ">
            <div className="w-[100%] md:w-[40%] max-sm:mb-5 flex justify-center">
              <Lottie animationData={skillAnimation} className="w-[90%]" />
            </div>

            <div className="w-[100%] md:w-[40%] flex flex-wrap justify-center gap-4">
              {[
                ["html.png", "HTML"],
                ["css.png", "CSS"],
                ["javascript.png", "Javascript"],
                ["typescript.png", "Typescript"],
                ["php.png", "PHP"],
                ["java.png", "Java"],
                ["swing_application.png", "Java Swing"],
                ["android.png", "Android (Java)"],
                ["hibernate.svg", "Hibernate"],
                ["mysql.png", "MYSQL"],
                ["firebase.png", "Firebase"],
                ["expo.png", "EXPO"],
                ["boostrap.png", "Boostrap"],
                ["tailwind.png", "Tailwind"],
                ["vite.png", "Vite + React"],
                ["express.png", "Express"],
                ["arduino.png", "Arduino"]
              ].map(([logo, name]) => (
                  <div key={name} className="h-28 w-28 bg-neutral-900/35 rounded-3xl flex flex-col items-center justify-center border-[3px] border-cyan-700 hover:border-white">
                    <img src={`/src/assets/images/logos/${logo}`} className="w-20 rounded-full" alt={name} />
                    <p className="text-white font-bold text-[13px] text-center">{name}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-3xl text-white text-center font-serif font-bold my-7">My Projects</p>
          <div className="pb-5 w-60 bg-sky-400/55 rounded-3xl flex flex-col items-center">
            <Lottie animationData={chatAnimation} className="w-[90%]" />
            <p className="text-justify w-[90%] mb-5 text-white">
              A real-time chat app built with Expo, Java backend, and MySQL, allowing users to send and receive instant messages securely.
            </p>
            <div className="flex space-x-5">
              <button className="bg-[#6e5494] flex w-20 items-center space-x-4 p-2 rounded-lg text-white">
                <img src={GitHub} className="w-5 mr-2" alt="" /> Code
              </button>
              <button className="bg-black w-20 p-2 rounded-lg text-white" onClick={handleClickOpen}>MORE</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col m-0 ">
          <div className="w-full bg-black/50 p-10 mt-16 text-white text-center fix">
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
            <p className="mb-2">📧 Email: mangalaakila412@gmail.com</p>
            <p className="mb-2" >📞 Phone: +94 712 549 571</p>
            <p className="mb-4">🌐 GitHub: <a href="https://github.com/akila-heshan" >github.com/akila-heshan</a></p>
            <a href="mailto:mangalaakila412@gmail.com" className="bg-sky-500 px-6 py-2 rounded-full hover:bg-sky-700 transition duration-300">Send Email</a>
          </div>

          <footer className="text-center py-4 bg-neutral-900 text-white m-0">
            © {new Date().getFullYear()} Akila Heshan. All rights reserved.
          </footer>
        </div>

        <div className="w-full flex justify-center">
          <div
              className="h-15 w-90 md:w-100 bg-black/50  rounded-full fixed bottom-5 flex justify-evenly items-center"
              style={{ zIndex: 500 }}
          >
            <a className="w-10 h-10 flex items-center justify-center bg-blue-800/40 border-[4px] mx-3 cursor-pointer text-white transition duration-500 border-sky-600 rounded-full hover:scale-125  hover:border-sky-400 text-2xl ">
              H
            </a>
            <a className="w-10 h-10 flex items-center justify-center bg-blue-800/40 border-[4px] mx-3 cursor-pointer text-white transition duration-500 border-sky-600 rounded-full hover:scale-125  hover:border-sky-400 text-2xl ">
              H
            </a>
            <a className="w-10 h-10 flex items-center justify-center bg-blue-800/40 border-[4px] mx-3 cursor-pointer text-white transition duration-500 border-sky-600 rounded-full hover:scale-125  hover:border-sky-400 text-2xl ">
              H
            </a>
            <a className="w-10 h-10 flex items-center justify-center bg-blue-800/40 border-[4px] mx-3 cursor-pointer text-white transition duration-500 border-sky-600 rounded-full hover:scale-125  hover:border-sky-400 text-2xl ">
              H
            </a>
            <a className="w-10 h-10 flex items-center justify-center bg-blue-800/40 border-[4px] mx-3 cursor-pointer text-white transition duration-500 border-sky-600 rounded-full hover:scale-125  hover:border-sky-400 text-2xl ">
              H
            </a>
          </div>
        </div>

      </div>
  );
};

export default Home;

