import Image from "next/image";
import { SlideLeft, SlideUp } from "../ui/animation";
import Vision from "./vision";
import ButtonGroup from "./homebutton";

export default function Section2() {
  return (
         <section className=" flex flex-col gap-4 md:gap-14 md:flex-row justify-between items-center py-16 px-4 md:px-20 bg-lime-800">
          <div className=" md:w-1/2">
           <SlideLeft>
             <Vision />
          </SlideLeft>
          </div>
            <div className=" flex flex-col gap-5 text-gray-100 text-lg md:w-1/2">
              <SlideUp>
               <h1 className=" leading-9 text-4xl">Breaking Barriers to Education</h1>
              </SlideUp>
              <SlideUp>
               <h3 className=" leading-9 text-3xl">Making Tech Inclusive and Accessible</h3>
              </SlideUp>
              <SlideUp>
               <p>We are dedicated to breaking down the barriers that often hinder individuals from accessing opportunities in the tech industry. Understanding the challenges faced by aspiring tech enthusiasts, We actively work to eliminate obstacles and create a level playing field.</p>
              </SlideUp>
              <SlideUp>
               <p>By providing accessible training programs, mentorship, and a supportive community, We ensure that no one is left behind due to financial constraints, lack of resources, or limited networks.</p>
              </SlideUp>
              <SlideUp>
               <p>Through our inclusive approach, We are democratizing tech education and opening doors for individuals from diverse backgrounds to pursue their passion and thrive in the tech field.</p>
              </SlideUp>
              <SlideLeft>
                <ButtonGroup />
              </SlideLeft>
            </div>
         </section>
  )
}
