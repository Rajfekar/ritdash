import React from "react"

type Props = {}

const Left = (props: Props) => {
  return (
    <>
      <div className="h-screen lg:h-64 flex-grow w-1/4">
        <div className="boxshadow6" id="time">
          <div id="hour">00</div>
          <div id="minutes">00</div>
          <div id="seconds">00</div>
          <div id="ampm">AM</div>
        </div>
        <div className="textbox3 textshadow3"> Total: 0 </div> <br />
        <br />
        <div className="textbox3 textshadow3"> OUT: 0 </div>
        <br />
        <br />
        <div className="textbox3 textshadow3"> IN: 0 </div>
      </div>
    </>
  )
}

export default Left
