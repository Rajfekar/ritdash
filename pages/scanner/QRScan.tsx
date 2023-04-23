import React from "react"

type Props = {}

const QrScanner = (props: Props) => {
  return (
    <div>
      <div className="h-52 w-52">
        <div>Scanner</div>
        <div id="reader"></div>
      </div>
    </div>
  )
}

export default QrScanner
