
import "../../app/globals.css"
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Work from "../components/Work/Work";
import Form from "../components/Form/Form";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";


export default function Home() {
 return<>

<div className="">
  <Navbar />
   <div id="home" className="scroll-mt-20">
     <Hero/>
   </div>

    <div className="sections
    px-[20px] min-[820px]:px-[28px] min-[1300px]:px-[80px]  min-[2560px]:px-130
    ">
        <About />

        <div id="work" className="scroll-mt-30">
        <Work />
      </div>
      
    </div>
         <div id="contact" className="">
        <Form />
      </div>

    
        <Footer/>

</div>


 
 
 
 </>
}
