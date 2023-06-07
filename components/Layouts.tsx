import { Content } from "next/font/google"
import HeaderComponent from "./Header"
import FooteComp from "./FooteComp"

const RootLayouts = (props: any) => {
  return (
    <>
    
          <div className="bg-secondary bg-gradient">
            <header><HeaderComponent /></header>
          </div>
          <div className="main-content">
            <main>{props.children}</main>
          </div>
        <div className="footerpart bg-secondary bg-gradient">
          <footer><FooteComp /></footer>
        </div>
        
    </>
  )
}

export default RootLayouts