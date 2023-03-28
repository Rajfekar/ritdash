/* eslint-disable @next/next/no-img-element */
import getConfig from "next/config"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { FileUpload } from "primereact/fileupload"
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton"
import { Rating } from "primereact/rating"
import { Toast } from "primereact/toast"
import { Toolbar } from "primereact/toolbar"
import { classNames } from "primereact/utils"
import React, { useEffect, useRef, useState } from "react"
import { ProductService } from "../../../demo/service/ProductService"
import { Dropdown } from "primereact/dropdown"
import { Demo } from "../../../types/types"
import Image from "next/image"
import jsPDF, { AcroFormCheckBox } from "jspdf"
import "jspdf-autotable"
declare module "jspdf" {
  interface jsPDF {
    autoTable: (config: any) => jsPDF
  }
}
const Index = () => {
  // get user type
  const memberType: {
    [key: number]: string
  } = {
    0: "STUDENT",
    1: "FACULTY",
    2: "LIBRARIAN",
    3: "PRINCIPAL",
    4: "ACCOUNTENT",
    5: "HRMANAGER",
    6: "TP",
    7: "EMP",
    8: "ADMIN",
  }
  function getType(index: number) {
    return index == undefined || index == null ? "undefined" : memberType[index]
  }

  //   get user branch
  const memberBranch: {
    [key: number]: string
  } = {
    0: "CSE",
    1: "CIVIL",
    2: "EEE",
    3: "MECHANICAL",
    4: "ELECTRONICS",
    5: "BIOTECH",
    6: "THERMAL",
    7: "CHEMICAL",
    8: "IT",
    9: "ENVIRONMENTAL",
    10: "ENERGYMA.",
    11: "LIBRARY",
    12: "OTHER",
    13: "MBA",
    14: "MCA",
  }
  function getBranch(index: number) {
    return index == undefined || index == null ? "Null" : memberBranch[index]
  }

  let emptyProduct: Demo.Product = {
    id: "",
    libid: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    type: 0,
    course: "",
    status: "",
    branch: 0,
    image: "",
    sem: "",
  }
  const [dropdownValue1, setDropdownValue1] = useState(null)
  const [dropdownValue2, setDropdownValue2] = useState(null)
  const [products, setProducts] = useState<Demo.Product[]>([])
  const [productDialog, setProductDialog] = useState(false)
  const [deleteProductDialog, setDeleteProductDialog] = useState(false)
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false)
  const [product, setProduct] = useState<Demo.Product>(emptyProduct)
  const [selectedProducts, setSelectedProducts] = useState<Demo.Product[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [globalFilter, setGlobalFilter] = useState("")
  const toast = useRef<Toast>(null)
  const dt = useRef<DataTable<Demo.Product[]>>(null)
  const contextPath = getConfig().publicRuntimeConfig.contextPath

  useEffect(() => {
    const productService = new ProductService()
    productService.getProducts().then((data) => setProducts(data))
  }, [])

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
  }

  const openNew = () => {
    setProduct(emptyProduct)
    setSubmitted(false)
    setProductDialog(true)
  }

  const hideDialog = () => {
    setSubmitted(false)
    setProductDialog(false)
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false)
  }

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false)
  }

  const saveProduct = () => {
    setSubmitted(true)

    if (product.name.trim()) {
      let _products = [...products]
      let _product = { ...product }
      if (product.id) {
        const index = findIndexById(product.id)
        _products[index] = _product
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        })
      } else {
        // let id = `RIT${product}`
        // console.log(products[-1])
        _product.id = createId()
        _product.image = "product-placeholder.svg"
        _products.push(_product)
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        })
      }

      setProducts(_products)
      setProductDialog(false)
      setProduct(emptyProduct)
    }
  }

  const editProduct = (product: Demo.Product) => {
    setProduct({ ...product })
    setProductDialog(true)
  }

  const confirmDeleteProduct = (product: Demo.Product) => {
    setProduct(product)
    setDeleteProductDialog(true)
  }

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id)
    setProducts(_products)
    setDeleteProductDialog(false)
    setProduct(emptyProduct)
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    })
  }

  const findIndexById = (id: string) => {
    let index = -1
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i
        break
      }
    }

    return index
  }

  const createId = () => {
    product.length()
    let id = ""
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return id
  }
  const exportCSV = () => {
    dt.current?.exportCSV()
  }
  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // 'portrait' or 'landscape'
    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)
    doc.setFontSize(15)
    const title = "RIT CENTRAL LIBRARY (MEMBERS)"
    const headers = [
      ["ID", "LibraryID", "Name", "Type", "Branch", "Mobile", "Status"],
    ]
    let data: any = products.map((obj: any) => {
      let utype = getType(obj.type)
      let ubranch = getBranch(obj.branch)
      let arrdata: any[][] = [
        obj.id,
        obj.libid,
        obj.name,
        utype,
        ubranch,
        obj.mobile,
        obj.status,
      ]
      return arrdata
    })

    const content = {
      startY: 50,
      head: headers,
      body: data,
    }
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("members.pdf")
  }

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true)
  }

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts?.includes(val))
    setProducts(_products)
    setDeleteProductsDialog(false)
    setSelectedProducts([])
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    })
  }

  const onCategoryChange = (e: RadioButtonChangeEvent) => {
    let _product = { ...product }
    _product["category"] = e.value
    setProduct(_product)
  }

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || ""
    let _product = { ...product }
    _product[`${name}`] = val

    setProduct(_product)
  }

  const onInputNumberChange = (
    e: InputNumberValueChangeEvent,
    name: string
  ) => {
    const val = e.value || 0
    let _product = { ...product }
    _product[`${name}`] = val

    setProduct(_product)
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedProducts || !selectedProducts.length}
          />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" /> */}
        <Button
          label="PDF"
          icon="pi pi-upload"
          className="inline-block mr-2"
          onClick={exportPDF}
        />
        <Button
          label="CSV"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    )
  }

  const idBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Code</span>
        {rowData.id}
      </>
    )
  }

  const libidBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Code</span>
        {rowData.libid}
      </>
    )
  }

  const nameBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.name.toUpperCase()} <br />
      </>
    )
  }

  const imageBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <Image
          height={40}
          width={40}
          alt={"img"}
          src={`${contextPath}/demo/images/avatar/bernardodominic.png`}
        />
        {/* <img src={`${contextPath}/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="80" /> */}
      </>
    )
  }

  const mobileBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Mobile</span>
        {rowData.mobile}
      </>
    )
  }

  const typeBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Type</span>
        {getType(rowData.type)}
      </>
    )
  }

  const branchBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className="p-column-title">Branch</span>
        {getBranch(rowData.branch)}
      </>
    )
  }

  const statusBodyTemplate = (rowData: Demo.Product) => {
    const status = rowData.status == 0 ? "Active" : "DeActive"
    const status2 = rowData.status == 0 ? "instock" : "outofstock"
    return (
      <>
        <span className="p-column-title">Status</span>
        <span className={`product-badge status-${status2}`}>{status}</span>
      </>
    )
  }

  const actionBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Members</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  )

  const productDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </>
  )
  const deleteProductDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </>
  )
  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </>
  )

  type InputValue = {
    name: string
    code: number
  }
  const dropdownValues1: InputValue[] = [
    { name: "STUDENT", code: 0 },
    { name: "FACULTY", code: 1 },
    { name: "EMPLOYEE", code: 2 },
    { name: "LIBRARY", code: 3 },
  ]
  const dropdownValues2: InputValue[] = [
    { name: "CSE", code: 0 },
    { name: "FACULTY", code: 1 },
    { name: "EMPLOYEE", code: 2 },
    { name: "LIBRARY", code: 3 },
  ]
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) =>
              setSelectedProducts(e.value as Demo.Product[])
            }
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
            globalFilter={globalFilter}
            emptyMessage="No Users found."
            header={header}
            responsiveLayout="scroll"
          >
            {/* <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column> */}
            <Column
              field="id"
              header="N"
              sortable
              body={idBodyTemplate}
              headerStyle={{ minWidth: "5rem" }}
            ></Column>
            <Column
              field="libid"
              header="LibraryID"
              sortable
              body={libidBodyTemplate}
              headerStyle={{ minWidth: "8rem" }}
            ></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column
              field="name"
              header="Name"
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: "15rem" }}
            ></Column>
            <Column
              field="type"
              header="Type"
              sortable
              body={typeBodyTemplate}
              headerStyle={{ minWidth: "6rem" }}
            ></Column>

            <Column
              field="branch"
              header="Branch"
              body={branchBodyTemplate}
              sortable
            ></Column>

            <Column
              field="mobile"
              header="Mobile"
              body={mobileBodyTemplate}
              sortable
            ></Column>

            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              headerStyle={{ minWidth: "5rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}
            ></Column>
          </DataTable>

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Member Details"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            {product.image && (
              <>
                <img
                  src={`${contextPath}/demo/images/product/${product.image}`}
                  alt={product.image}
                  width="150"
                  className="mt-0 mx-auto mb-5 block shadow-2"
                />
                <div className="field">
                  {product.status && (
                    <InputText
                      id="status"
                      value={product.status.toString()}
                      onChange={(e) => onInputChange(e, "status")}
                      required
                      className={classNames({
                        "p-invalid": submitted && !product.status,
                      })}
                    />
                  )}
                </div>
              </>
            )}

            <div className="field">
              <label htmlFor="libid">LibraryID</label>
              <InputText
                id="libid"
                value={product.libid}
                onChange={(e) => onInputChange(e, "libid")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.libid,
                })}
              />
              {submitted && !product.libid && (
                <small className="p-invalid">LibraryID is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={product.name}
                onChange={(e) => onInputChange(e, "name")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.name,
                })}
              />
              {submitted && !product.name && (
                <small className="p-invalid">Name is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="type">Type</label>
              <Dropdown
                id="type"
                value={dropdownValue1}
                onChange={(e) => setDropdownValue1(e.value)}
                options={dropdownValues1}
                optionLabel="name"
                placeholder="Select"
              />
            </div>
            <div className="field">
              <label htmlFor="branch">Branch</label>
              <Dropdown
                id="branch"
                value={dropdownValue2}
                onChange={(e) => setDropdownValue2(e.value)}
                options={dropdownValues2}
                optionLabel="name"
                placeholder="Select"
              />
            </div>
            <div className="field">
              <label htmlFor="mobile">Mobile</label>
              <InputText
                id="mobile"
                value={product.mobile.toString()}
                onChange={(e) => onInputChange(e, "mobile")}
                required
                className={classNames({
                  "p-invalid": submitted && !product.mobile,
                })}
              />
              {submitted && !product.mobile && (
                <small className="p-invalid">Mobile is required.</small>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" />
              {product && (
                <span>
                  Are you sure you want to delete <b>{product.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductsDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" />
              {product && (
                <span>
                  Are you sure you want to delete the selected products?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Index
