import React from "react"
import Script from "next/script"
// import "../bootstrap.min.css"
// import "../page.module.css"

import Left from "./Left"
import Middle from "./Middle"
import Right from "./Right"
type Props = {}

const index = (props: Props) => {
  return (
    <main className="h-screen w-screen">
      <div className=" lg:flex ">
        <Left />
        <Middle />
        <Right />
      </div>
      <Script src="qrcode.js" />
    </main>
  )
}

export default index
