import React, { useState } from "react"
import { Calendar, CalendarChangeEvent } from "primereact/calendar"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import Image from "next/image"
import getConfig from "next/config"
export default function FormatDemo() {
  const contextPath = getConfig().publicRuntimeConfig.contextPath
  const [date, setDate] = useState<string | Date | Date[] | null>(null)
  const attendance = [
    {
      id: 1,
      libid: "CS1945",
      name: "Khemraj Fekar",
      type: "Student",
      branch: "CSE",
      intime: "10:00 AM",
      outtime: "11:00 AM",
    },
    {
      id: 2,
      libid: "CS1933",
      name: "Priyanshu Pardhi",
      type: "Student",
      branch: "CSE",
      intime: "10:00 AM",
      outtime: "11:00 AM",
    },
    {
      id: 3,
      libid: "CS1932",
      name: "Nancy Singh",
      type: "Student",
      branch: "CSE",
      intime: "10:00 AM",
      outtime: "11:00 AM",
    },
    {
      id: 4,
      libid: "CS1935",
      name: "Rishabh Parth Choudhary",
      type: "Student",
      branch: "CSE",
      intime: "10:00 AM",
      outtime: "11:00 AM",
    },
    {
      id: 5,
      libid: "CS1925",
      name: "Shreya Tembhurkar",
      type: "Student",
      branch: "CSE",
      intime: "10:00 AM",
      outtime: "11:00 AM",
    },
    {
      id: 6,
      libid: "CS1928",
      name: "Anjali Sahu",
      type: "Student",
      branch: "CSE",
      intime: "10:00 AM",
      outtime: "11:00 AM",
    },
    {
      id: 7,
      libid: "CS1985",
      name: "Dilcharan Rajak",
      type: "Student",
      branch: "CSE",
      intime: "10:00 AM",
      outtime: "11:00 AM",
    },
  ]
  const imageBodyTemp = () => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <Image
          height={40}
          width={40}
          alt={"img"}
          src={`${contextPath}/demo/images/avatar/bernardodominic.png`}
        />
      </>
    )
  }
  return (
    <>
      {/* <h5>{`Select Date`}</h5>
      <div className="card flex justify-content-center">
        <Calendar
          value={date}
          onChange={(e: any) => setDate(e.value)}
          dateFormat="dd/mm/yy"
        />
      </div> */}
      <DataTable
        value={attendance}
        tableStyle={{ minWidth: "50rem" }}
        scrollable
      >
        <Column field="id" header="ID"></Column>
        <Column body={imageBodyTemp} header="Image"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="libid" header="LibraryID"></Column>
        <Column field="type" header="Type"></Column>
        <Column field="branch" header="Branch"></Column>
        <Column field="intime" header="InTime"></Column>
        <Column field="outtime" header="OutTime"></Column>
      </DataTable>
    </>
  )
}
