import React from "react"

type Props = {}

const Right = (props: Props) => {
  return (
    <>
      <div className="h-screen lg:h-64 flex-grow w-1/4">
        <div className="boxshadow6" id="date">
          <div id="dd">04</div>
          <div id="mm">04</div>
          <div id="yy">23</div>
          <div id="day">Tue</div>
        </div>
        <br />
        <br />
        <a href="#">
          <img
            height="150px"
            width="150px"
            className="profileimage"
            src="images/A1.jpg"
            alt="img"
          />
        </a>
        <div className="textbox3 textshadow3">Khemraj Fekar </div> <br />
        <br />
        <div className="textbox3 textshadow3">ID: CS1945 </div> <br />
        <br />
        <div className="textbox3 textshadow3">ENTER 00:00 AM </div> <br />
        <br />
        <div className="textbox3 textshadow3">EXIT 00:00 PM </div> <br />
        <br />
      </div>
    </>
  )
}

export default Right
