import React from "react"
import QRScanner from "./QRScan"

type Props = {}

const Middle = (props: Props) => {
  return (
    <>
      <div className="h-screen lg:h-64 flex-grow w-1/2">
        <div className="scan h-32 W-32">
          <div className="qrcode">
            <QRScanner />
          </div>
          <h3>Scanning...</h3>
          <div className="border"></div>
        </div>
      </div>
    </>
  )
}

export default Middle
