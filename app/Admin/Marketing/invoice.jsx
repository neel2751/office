import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileIcon,
  MailIcon,
  PencilIcon,
  TrashIcon,
  SaveIcon,
  CircleHelp,
  PackagePlus,
  Trash2,
  Send,
  Crown,
  Cog,
  XCircle,
  Plus,
  Minus,
  Eye,
  Download,
  Loader,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label, TextFormInput } from "@/components/fromInput/FormInput";
import Image from "next/image";
import { ReactHookForm } from "@/components/ModelForm/FormModel";

const companyInfo = {
  name: "Creative Design & Construction",
  address: "595A Cranbrook Rd, Gants Hill, Ilford IG2 6JZ",
  logo: "/images/Logo.svg", // Replace with your actual logo path
};

const calculateTotal = (products) => {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

const calculateFinalTotal = (invoiceDetails) => {
  const subtotal = calculateTotal(invoiceDetails.products);
  const discountAmount = subtotal * (invoiceDetails.discount / 100);
  const taxAmount = (subtotal - discountAmount) * (invoiceDetails.tax / 100);
  return subtotal - discountAmount + taxAmount;
};

export default function PDF() {
  const [invoices, setInvoices] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({
    customer: "",
    email: "",
    company: "",
    subject: "",
    dueDate: "",
    currency: "GBP",
    products: [
      {
        id: 1,
        name: "",
        quantity: 1,
        price: 0,
      },
    ],
    discount: 0,
    tax: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
  }, []);
  async function downloadPdf(invoice) {
    try {
      setInvoiceDetails(invoice);
      setIsDownload(true);
      setTimeout(async () => {
        const content = document.getElementById("content");
        if (!content) {
          throw new Error("Content element not found.");
        }
        const canvas = await html2canvas(content, {
          scale: 2,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf");
        setInvoiceDetails({
          customer: "",
          email: "",
          company: "",
          subject: "",
          dueDate: "",
          currency: "GBP",
          products: [
            {
              id: 1,
              name: "",
              quantity: 1,
              price: 0,
            },
          ],
          discount: 0,
          tax: 0,
        });
        toast.success("Invoice has been downloaded successfully!");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("Error downloading invoice");
    } finally {
      setTimeout(() => {
        setIsDownload(false);
      }, 1000);
    }
  }

  const handleInputChange = (e, productId = null) => {
    const { name, value } = e.target;
    if (productId !== null) {
      setInvoiceDetails((prev) => ({
        ...prev,
        products: prev.products.map((product) =>
          product.id === productId
            ? {
                ...product,
                [name]:
                  name === "quantity" || name === "price"
                    ? Number(value)
                    : value,
              }
            : product
        ),
      }));
    } else {
      setInvoiceDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addNewProduct = () => {
    setInvoiceDetails((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          id: Date.now(),
          name: "",
          quantity: 1,
          price: 0,
        },
      ],
    }));
  };

  const removeProduct = (id) => {
    setInvoiceDetails((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product.id !== id),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!invoiceDetails.customer)
      newErrors.customer = "Customer name is required";
    if (!invoiceDetails.email) newErrors.email = "Email is required";
    if (!invoiceDetails.subject) newErrors.subject = "Subject is required";
    if (!invoiceDetails.dueDate) newErrors.dueDate = "Due date is required";
    invoiceDetails.products.forEach((product, index) => {
      if (!product.name)
        newErrors[`product${index}Name`] = "Product name is required";
      if (product.quantity <= 0)
        newErrors[`product${index}Quantity`] =
          "Quantity must be greater than 0";
      if (product.price <= 0)
        newErrors[`product${index}Price`] = "Price must be greater than 0";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveDraft = () => {
    if (validateForm()) {
      const updatedInvoice = {
        ...invoiceDetails,
        id: invoiceDetails.id || Date.now().toString(),
        status: "Draft",
        createdAt: invoiceDetails.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedInvoices = isEditing
        ? invoices.map((inv) =>
            inv.id === updatedInvoice.id ? updatedInvoice : inv
          )
        : [...invoices, updatedInvoice];
      setInvoices(updatedInvoices);
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      setInvoiceDetails({
        id: "",
        customer: "",
        email: "",
        company: "",
        subject: "",
        dueDate: "",
        currency: "IDR",
        products: [{ id: 1, name: "", quantity: 1, price: 0 }],
        discount: 0,
        tax: 0,
        status: "Draft",
        createdAt: "",
        updatedAt: "",
      });
      setIsEditing(false);
      toast.success("Invoice saved successfully!");
    } else {
      toast.error("Please fill in all required fields");
    }
  };
  const sendInvoice = () => {
    if (validateForm()) {
      const updatedInvoice = {
        ...invoiceDetails,
        id: invoiceDetails.id || Date.now().toString(),
        status: "Sent",
        createdAt: invoiceDetails.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedInvoices = isEditing
        ? invoices.map((inv) =>
            inv.id === updatedInvoice.id ? updatedInvoice : inv
          )
        : [...invoices, updatedInvoice];
      setInvoices(updatedInvoices);
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      setInvoiceDetails({
        id: "",
        customer: "",
        email: "",
        company: "",
        subject: "",
        dueDate: "",
        currency: "GBP",
        products: [{ id: 1, name: "", quantity: 1, price: 0 }],
        discount: 0,
        tax: 0,
        status: "Draft",
        createdAt: "",
        updatedAt: "",
      });
      setIsEditing(false);
      toast.success("Invoice sent successfully!");
    } else {
      toast.error("Please fill in all required fields");
    }
  };
  const editInvoice = (invoice) => {
    setInvoiceDetails(invoice);
    setIsEditing(true);
  };

  const deleteInvoice = (id) => {
    const updatedInvoices = invoices.filter((inv) => inv.id !== id);
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    toast.success("Invoice deleted successfully!");
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customer.toLowerCase().includes(filterTerm.toLowerCase()) ||
      invoice.company.toLowerCase().includes(filterTerm.toLowerCase()) ||
      invoice.email.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 divide-x divide-neutral-400 divide-dashed">
          <span className="text-2xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-purple-600 to-blue-600 tracking-tight">
            CDC
            <span className="text-sm ms-0.5 font-semibold text-transparent bg-gradient-to-r bg-clip-text from-purple-600 to-blue-600">
              plus
            </span>
          </span>
          <h1 className="text-lg font-medium text-neutral-800 pl-2">
            Create Invoice
          </h1>
        </div>
        <div className="space-x-2 inline-flex items-center">
          <Button variant="outline" className="text-neutral-800">
            <CircleHelp className="size-4 text-neutral-500 me-2" />
            Do you need help?
          </Button>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            className="text-neutral-800 relative group"
            size="icon"
          >
            <Cog className="size-4 group-hover:animate-spin transition duration-300 ease-in" />
            <span className="group-hover:block hidden transition-all duration-700 ease-in-out transform absolute bottom-10 bg-gray-200 py-0.5 px-2 rounded-full text-neutral-800 text-xs">
              Compnay Settings
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label labelText={"People"} />
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between  mt-1 cursor-pointer border border-gray-200 p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                        {invoiceDetails.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("") || "NC"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-600">
                          {invoiceDetails.customer || "No customer"}
                        </p>
                        <p className="text-xs font-normal text-neutral-500">
                          {invoiceDetails.email || "No email"}
                        </p>
                      </div>
                    </div>
                    <div
                      className="px-2.5 py-1 rounded-full bg-gradient-to-tr from-green-600 to-blue-700 text-white text-xs right-0 border-none
                    hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-700"
                    >
                      {invoiceDetails.company || "Company"}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Customer Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label labelText={"Name"} />
                      <TextFormInput
                        id="customerName"
                        name="customer"
                        placeholder=" Enter customer name"
                        value={invoiceDetails.customer}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label labelText={"Email"} />
                      <TextFormInput
                        id="customerEmail"
                        name="email"
                        type="email"
                        placeholder="Enter customer email"
                        value={invoiceDetails.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label labelText={"Company Name"} />
                      <TextFormInput
                        id="companyName"
                        name="company"
                        placeholder="Enter company name"
                        value={invoiceDetails.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <Label labelText={"Subject"} />
              <TextFormInput
                id="subject"
                name="subject"
                placeholder="Enter subject"
                value={invoiceDetails.subject}
                onChange={handleInputChange}
                className={errors.subject ? "border-red-500" : ""}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject}</p>
              )}
            </div>

            <div>
              <Label labelText={"Due Date"} />
              <div className="relative">
                <TextFormInput
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  placeholder="Select due date"
                  value={invoiceDetails.dueDate}
                  onChange={handleInputChange}
                  className={errors.dueDate ? "border-red-500" : ""}
                />
                {errors.dueDate && (
                  <p className="text-red-500 text-sm">{errors.dueDate}</p>
                )}
              </div>
            </div>

            <div>
              <Label labelText={"Currency"} />
              <Select
                defaultValue={invoiceDetails.currency}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "currency", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    <SelectItem value="GBP">GBP - Pound Sterling</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h3 className="text-lg font-semibold mb-2">Products</h3>
              <div className="border rounded-md p-4 divide-y divide-dashed divide-gray-300 space-y-4">
                {invoiceDetails.products.map((product, index) => (
                  <div key={product.id}>
                    <div className="flex items-center justify-center space-x-4 pt-2">
                      <div className="flex-grow">
                        <Label labelText={"Product Name"} />
                        <TextFormInput
                          id={`product${index}Name`}
                          name="name"
                          value={product.name}
                          placeholder="Enter product name"
                          onChange={(e) => handleInputChange(e, product.id)}
                          className={
                            errors[`product${index}Name`]
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {errors[`product${index}Name`] && (
                          <p className="text-red-500 text-sm">
                            {errors[`product${index}Name`]}
                          </p>
                        )}
                      </div>
                      <div className="max-w-max w-20">
                        <Label labelText={"Qty*"} />
                        <TextFormInput
                          id={`product${index}Quantity`}
                          type="number"
                          className="w-20"
                          name="quantity"
                          value={product.quantity}
                          onChange={(e) => handleInputChange(e, product.id)}
                          min="1"
                        />
                        {errors[`product${index}Quantity`] && (
                          <p className="text-red-500 text-sm">
                            {errors[`product${index}Quantity`]}
                          </p>
                        )}
                      </div>
                      <div className="max-w-max w-28">
                        <Label labelText={"Price"} />
                        <TextFormInput
                          id={`product${index}Price`}
                          type="number"
                          className="w-24"
                          name="price"
                          value={product.price}
                          onChange={(e) => handleInputChange(e, product.id)}
                          min="0"
                          step="0.01"
                        />
                        {errors[`product${index}Price`] && (
                          <p className="text-red-500 text-sm">
                            {errors[`product${index}Price`]}
                          </p>
                        )}
                      </div>
                      {index !== 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mt-5 hover:bg-transparent group"
                          //   size="sm"
                          onClick={() => removeProduct(product.id)}
                        >
                          <Trash2 className="size-4 text-neutral-700 group-hover:text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <span
                  onClick={addNewProduct}
                  className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 group cursor-pointer pt-4"
                >
                  <PackagePlus className="text-blue-600 group-hover:text-blue-800 size-4" />
                  Add New
                </span>
              </div>
            </div>

            <hr />

            <div className="flex items-center gap-4">
              <div className="w-full">
                <Label labelText={"Discount (%)"} />
                <TextFormInput
                  id="discount"
                  name="discount"
                  type="number"
                  value={invoiceDetails.discount}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
              </div>
              <div className="w-full">
                <Label labelText={"Tax (%)"} />
                <TextFormInput
                  id="tax"
                  name="tax"
                  type="number"
                  value={invoiceDetails.tax}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Last saved: {new Date().toLocaleString()}</span>
              <div className="flex items-center">
                <Button variant="outline" className="mr-2" onClick={saveDraft}>
                  <SaveIcon className="h-4 w-4 mr-2" /> Save Draft
                </Button>
                <Button onClick={sendInvoice}>Send Invoice</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Preview
              <div className="flex space-x-2">
                <Button disabled variant="outline" size="sm">
                  <FileIcon className="h-4 w-4 mr-2" /> PDF
                </Button>
                <Button variant="outline" size="sm">
                  <MailIcon className="h-4 w-4 mr-2" /> Email
                </Button>
                <Button variant="outline" size="sm">
                  Payment page
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 space-y-6">
              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center space-x-4">
                  <Image
                    src={companyInfo.logo}
                    alt="Company Logo"
                    width={60}
                    height={60}
                  />
                  <div className="mt-1">
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-700">
                      {companyInfo.name}
                    </h2>
                    <p className="text-sm text-gray-600 tracking-tight">
                      {companyInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start border-t pt-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    Hi {invoiceDetails.customer || "No Customer"},
                  </h2>
                  <p className="text-gray-600">
                    {invoiceDetails.subject ||
                      "Your invoice was just paid. Go on, check it out."}
                  </p>
                </div>
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="p-2 text-base text-white font-semibold">
                    {invoiceDetails.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("") || "NC"}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-neutral-700 text-base mb-2">
                  Invoice Number:{" "}
                  <span className="text-blue-600 tracking-tight font-base">
                    CDC{invoiceDetails.id || "2398-08-087"}
                  </span>
                </h3>
                <hr />
                <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                  <div>
                    <p className="text-gray-500">Billed to</p>
                    <p>{invoiceDetails.customer}</p>
                    <p>{invoiceDetails.email}</p>
                    <p>{invoiceDetails.company}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Currency</p>
                    <p>{invoiceDetails.currency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Invoice date</p>
                    <p>{new Date().toDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Due date</p>
                    <p>
                      {new Date(invoiceDetails.dueDate).toDateString() ||
                        new Date().toDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <table className="w-full text-sm ">
                <thead>
                  <tr className="border-b">
                    <th className="text-left text-neutral-500 font-medium text-xs py-2">
                      DESCRIPTION
                    </th>
                    {/* <th className="text-right py-2">QUANTITY</th> */}
                    <th
                      colSpan="2"
                      className="text-right text-neutral-500 font-medium text-xs py-2"
                    >
                      PRICE
                    </th>
                    <th
                      colSpan={"1"}
                      className="text-right text-neutral-500 font-medium text-xs py-2"
                    >
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetails.products.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2 w-80">
                        {product.name || "Product Name"}
                        <br />
                        <span className="text-gray-500">
                          Qty: {product.quantity}
                        </span>
                      </td>
                      {/* <td className="text-right py-2">{product.quantity}</td> */}
                      <td colSpan="2" className="text-right py-2 ">
                        {product.price.toLocaleString()}{" "}
                        {/* {invoiceDetails.currency} */}
                      </td>
                      <td className="text-right py-2">
                        {(product.price * product.quantity).toLocaleString()}{" "}
                        {/* {invoiceDetails.currency} */}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t">
                    <td colSpan="3" className="py-2">
                      Subtotal
                    </td>
                    <td className="text-right py-2">
                      {calculateTotal(invoiceDetails.products).toLocaleString()}{" "}
                      {invoiceDetails.currency}
                    </td>
                  </tr>
                  {/* {invoiceDetails.discount > 0 && ( */}
                  <tr>
                    <td colSpan="3" className="py-2">
                      Discount ({invoiceDetails.discount}%)
                    </td>
                    <td className="text-right py-2">
                      -
                      {(
                        calculateTotal(invoiceDetails.products) *
                        (invoiceDetails.discount / 100)
                      ).toLocaleString()}{" "}
                      {invoiceDetails.currency}
                    </td>
                  </tr>
                  {/* )} */}
                  <tr>
                    <td colSpan="3" className="py-2">
                      Tax ({invoiceDetails.tax}%)
                    </td>
                    <td className="text-right py-2">
                      {(
                        calculateTotal(invoiceDetails.products) *
                        (1 - invoiceDetails.discount / 100) *
                        (invoiceDetails.tax / 100)
                      ).toLocaleString()}{" "}
                      {invoiceDetails.currency}
                    </td>
                  </tr>
                  <tr className="font-semibold">
                    <td colSpan="3" className="py-2">
                      Total
                    </td>
                    <td className="text-right py-2">
                      {calculateFinalTotal(invoiceDetails).toLocaleString()}{" "}
                      {invoiceDetails.currency}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-0.5">Notes</h3>
                  <p className="text-sm text-gray-600">
                    Thank you for your business!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-5">
        <InvoiceTable
          filterTerm={filterTerm}
          setFilterTerm={setFilterTerm}
          filteredInvoices={filteredInvoices}
          editInvoice={editInvoice}
          deleteInvoice={deleteInvoice}
          downloadPdf={downloadPdf}
          isDownload={isDownload}
          invoiceDetails={invoiceDetails}
        />
      </div>
      {isDownload && (
        <PDFView companyInfo={companyInfo} invoiceDetails={invoiceDetails} />
      )}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

const InvoiceTable = ({
  filterTerm,
  setFilterTerm,
  filteredInvoices,
  editInvoice,
  deleteInvoice,
  downloadPdf,
  isDownload,
  invoiceDetails,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Invoices
          <TextFormInput
            placeholder="Filter invoices..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="max-w-sm"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>View</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>CDC{invoice.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    {invoice.customer}
                    <span className="text-xs text-neutral-500 mt-0.5">
                      {invoice.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{invoice.company}</TableCell>
                <TableCell>
                  {calculateFinalTotal(invoice).toLocaleString()}{" "}
                  {invoice.currency}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === "Sent"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="rounded-full max-w-max p-2 text-blue-800 hover:bg-blue-200 transition duration-200 flex gap-1 items-center cursor-pointer">
                        <Eye className="size-4 text-blue-600" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Invoice Details</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <h2 className="text-xl font-bold mb-2">
                          Invoice for {invoice.customer}
                        </h2>
                        <p>
                          <strong>Email:</strong> {invoice.email}
                        </p>
                        <p>
                          <strong>Company:</strong> {invoice.company}
                        </p>
                        <p>
                          <strong>Subject:</strong> {invoice.subject}
                        </p>
                        <p>
                          <strong>Due Date:</strong> {invoice.dueDate}
                        </p>
                        <p>
                          <strong>Status:</strong> {invoice.status}
                        </p>
                        <h3 className="text-lg font-semibold mt-4 mb-2">
                          Products
                        </h3>
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left">Name</th>
                              <th className="text-right">Quantity</th>
                              <th className="text-right">Price</th>
                              <th className="text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.products.map((product) => (
                              <tr key={product.id}>
                                <td>{product.name}</td>
                                <td className="text-right">
                                  {product.quantity}
                                </td>
                                <td className="text-right">
                                  {product.price.toLocaleString()}{" "}
                                  {invoice.currency}
                                </td>
                                <td className="text-right">
                                  {(
                                    product.quantity * product.price
                                  ).toLocaleString()}{" "}
                                  {invoice.currency}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-4">
                          <p>
                            <strong>Subtotal:</strong>{" "}
                            {calculateTotal(invoice.products).toLocaleString()}{" "}
                            {invoice.currency}
                          </p>
                          <p>
                            <strong>Discount:</strong> {invoice.discount}%
                          </p>
                          <p>
                            <strong>Tax:</strong> {invoice.tax}%
                          </p>
                          <p>
                            <strong>Total:</strong>{" "}
                            {calculateFinalTotal(invoice).toLocaleString()}{" "}
                            {invoice.currency}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editInvoice(invoice)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteInvoice(invoice.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                  {invoiceDetails.id === invoice.id ? (
                    <Button
                      onClick={() => downloadPdf(invoice)}
                      variant="ghost"
                      size="sm"
                      disabled={isDownload}
                    >
                      {isDownload ? (
                        <Loader className="animate-spin h-4 w-4" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => downloadPdf(invoice)}
                      variant="ghost"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const PDFView = ({ companyInfo, invoiceDetails }) => {
  return (
    <div
      id="content"
      className="border rounded-lg p-6 space-y-6 bg-white max-w-xl mx-auto"
    >
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center justify-center space-x-4">
          <Image
            src={companyInfo.logo}
            alt="Company Logo"
            width={60}
            height={60}
          />
          <div className="mt-1">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-700">
              {companyInfo.name}
            </h2>
            <p className="text-sm text-gray-600 tracking-tight">
              {companyInfo.address}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start border-t pt-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Hi {invoiceDetails.customer || "No Customer"},
          </h2>
          <p className="text-gray-600">
            {invoiceDetails.subject ||
              "Your invoice was just paid. Go on, check it out."}
          </p>
        </div>
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
          <span className="p-2 text-base text-white font-semibold">
            {invoiceDetails.customer
              .split(" ")
              .map((n) => n[0])
              .join("") || "NC"}
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-neutral-700 text-base mb-2">
          Invoice Number:{" "}
          <span className="text-blue-600 tracking-tight font-base">
            CDC{invoiceDetails.id || "2398-08-087"}
          </span>
        </h3>
        <hr />
        <div className="grid grid-cols-2 gap-4 text-sm mt-3">
          <div>
            <p className="text-gray-500">Billed to</p>
            <p>{invoiceDetails.customer}</p>
            <p>{invoiceDetails.email}</p>
            <p>{invoiceDetails.company}</p>
          </div>
          <div>
            <p className="text-gray-500">Currency</p>
            <p>{invoiceDetails.currency}</p>
          </div>
          <div>
            <p className="text-gray-500">Invoice date</p>
            <p>{new Date().toDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Due date</p>
            <p>
              {new Date(invoiceDetails.dueDate).toDateString() ||
                new Date().toDateString()}
            </p>
          </div>
        </div>
      </div>

      <table className="w-full text-sm ">
        <thead>
          <tr className="border-b">
            <th className="text-left text-neutral-500 font-medium text-xs py-2">
              DESCRIPTION
            </th>
            {/* <th className="text-right py-2">QUANTITY</th> */}
            <th
              colSpan="2"
              className="text-right text-neutral-500 font-medium text-xs py-2"
            >
              PRICE
            </th>
            <th
              colSpan={"1"}
              className="text-right text-neutral-500 font-medium text-xs py-2"
            >
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetails.products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 w-80">
                {product.name || "Product Name"}
                <br />
                <span className="text-gray-500">Qty: {product.quantity}</span>
              </td>
              {/* <td className="text-right py-2">{product.quantity}</td> */}
              <td colSpan="2" className="text-right py-2 ">
                {product.price.toLocaleString()}{" "}
                {/* {invoiceDetails.currency} */}
              </td>
              <td className="text-right py-2">
                {(product.price * product.quantity).toLocaleString()}{" "}
                {/* {invoiceDetails.currency} */}
              </td>
            </tr>
          ))}
          <tr className="border-t">
            <td colSpan="3" className="py-2">
              Subtotal
            </td>
            <td className="text-right py-2">
              {calculateTotal(invoiceDetails.products).toLocaleString()}{" "}
              {invoiceDetails.currency}
            </td>
          </tr>
          {/* {invoiceDetails.discount > 0 && ( */}
          <tr>
            <td colSpan="3" className="py-2">
              Discount ({invoiceDetails.discount}%)
            </td>
            <td className="text-right py-2">
              -
              {(
                calculateTotal(invoiceDetails.products) *
                (invoiceDetails.discount / 100)
              ).toLocaleString()}{" "}
              {invoiceDetails.currency}
            </td>
          </tr>
          {/* )} */}
          <tr>
            <td colSpan="3" className="py-2">
              Tax ({invoiceDetails.tax}%)
            </td>
            <td className="text-right py-2">
              {(
                calculateTotal(invoiceDetails.products) *
                (1 - invoiceDetails.discount / 100) *
                (invoiceDetails.tax / 100)
              ).toLocaleString()}{" "}
              {invoiceDetails.currency}
            </td>
          </tr>
          <tr className="font-semibold">
            <td colSpan="3" className="py-2">
              Total
            </td>
            <td className="text-right py-2">
              {calculateFinalTotal(invoiceDetails).toLocaleString()}{" "}
              {invoiceDetails.currency}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="border-t pt-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold mb-0.5">Notes</h3>
          <p className="text-sm text-gray-600">Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed w-full sm:max-w-sm shadow-2xl overflow-scroll py-2 duration-600 transition-all ease-in-out bg-[#FCFCFC] border flex-col z-[80] end-0 right-4 px-2 rounded-xl bottom-4 top-4 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-600">
          Company Management
        </h2>
        <XCircle
          onClick={() => setIsOpen(false)}
          className="size-5 text-gray-600 cursor-pointer hover:text-gray-900"
        />
      </div>

      <div>
        <CardHeader>
          <CardTitle> Company List</CardTitle>
          <CardDescription>
            List of all companies registered with us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompnayCard />
        </CardContent>
      </div>
    </div>
  );
};

const Premium = () => {
  return (
    <div className="w-full border-gray-300 border mb-4 rounded-lg bg-gradient-to-br from-blue-300 via-blue-800 via-20% to-blue-400">
      <div className="flex items-end justify-between  p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-white first-letter:text-4xl">
            Unlock Premium Features
          </h2>
          <p className="text-sm text-neutral-100">
            Get access to advanced features, priority support, and gain
            exclusive access to our entire collection of professonally Invoice
            templates. Create stunning Invoices effotlessly and elevate your
            business to the next level. Sign up for our premium plan today!
          </p>
        </div>
        <Button className="bg-black text-white">
          Get Your Premium Plan
          <Crown className="size-4 ms-2" />
        </Button>
      </div>
    </div>
  );
};

const CompnayCard = () => {
  const [resetFlag, setResetFlag] = useState(false);
  const [initialValues, setInitialValues] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const allCompany = [
    {
      id: 1,
      name: "Creative Design & Construction",
      address: "595A Cranbrook Rd, Gants Hill, IG26JZ",
      phone: "2012345678",
      email: "info@cdc.construction",
      image: "/images/Logo.svg",
      default: true,
    },
    {
      id: 2,
      name: "Webmints",
      address: "595A Cranbrook Rd, Gants Hill, IG26JZ",
      phone: "2012345678",
      email: "info@webmints.com",
      default: false,
    },
  ];
  const [company, setCompany] = useState();
  const [companyList, setCompanyList] = useState(allCompany);

  const TASKFIELD = [
    {
      name: "name",
      labelText: "Company Name",
      type: "text",
      size: true,
      helperText: "*This name will appear on Invoice.",
      placeholder: "Enter  Company Name",
      validationOptions: {
        required: "name is required",
      },
    },
    {
      name: "address",
      labelText: "Company Address",
      type: "text",
      size: true,
      helperText: "*This address will appear on Invoice.",
      placeholder: "Enter Company Address",
      validationOptions: {
        required: "address is required",
      },
    },
    {
      name: "phone",
      labelText: "Company Phone",
      type: "number",
      inputMode: "numeric",
      size: true,
      helperText: "*This  phone number will appear on Invoice.",
      placeholder: "Enter  Company Phone",
      validationOptions: {
        required: "Phone No. is required",
        pattern: {
          value: /^\d{10}$/,
          message: "Invalid phone number. Must be exactly 10 digits.",
        },
      },
    },
    {
      name: "email",
      labelText: "Company Email",
      type: "email",
      size: true,
      helperText: "*All  Invoices will be sent to this email.",
      placeholder: "Enter Company Email",
      inputMode: "email",

      validationOptions: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email format. Please check and try again.",
        },
      },
    },
  ];

  const onEdit = (item) => {
    setIsEdit(true);
    setInitialValues(item);
  };

  const setDefault = (id) => {
    // we have to set default company
    const newItems = companyList.map((item) =>
      item.id === id ? { ...item, default: true } : { ...item, default: false }
    );

    setCompanyList(newItems);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="space-y-3">
        {companyList.map((item) => (
          <div
            key={item.id}
            className={`p-1 bg-gray-100 border-gray-200 border rounded-2xl flex flex-col`}
          >
            {/* Body */}
            <div
              key={item.id}
              className=" shadow-sm p-4 bg-white rounded-xl min-h-40 h-full"
            >
              <div className="gap-2 justify-between items-center flex-wrap flex mb-3">
                <div className="grow">
                  <Image
                    src={"/images/Logo.svg"}
                    alt="CDC"
                    height={40}
                    width={40}
                    className="size-8"
                  />
                  {/* <h5 className="text-neutral-800 font-semibold">CDC</h5> */}
                </div>
                {item.default && (
                  <span className="text-indigo-800 font-medium text-xs py-0.5 px-2 bg-indigo-100 border-indigo-200 rounded-full gap-x-1.5 items-center inline-flex border">
                    Default
                  </span>
                )}
              </div>
              <ul>
                <li className="text-neutral-900 text-sm">{item.name}</li>
                <li className="text-neutral-900 text-sm">{item.address}</li>
                <li className="text-neutral-900 text-sm">{item.phone}</li>
                <li className="text-neutral-900 text-sm mt-2">{item.email}</li>
              </ul>
            </div>
            {/* Footer */}
            <div className="mt-auto">
              <ul className="flex flex-wrap items-center justify-center gap-3">
                <li className="inline-flex items-center pe-3.5 text-neutral-800 relative after:bg-gray-300 after:-translate-y-1/2 after:w-px after:h-3 after:inline-block after:top-1/2 after:end-0 after:absolute">
                  <button
                    onClick={() => onEdit(item)}
                    type="button"
                    className="underline underline-offset-4 text-neutral-900 font-medium text-xs py-3 hover:text-indigo-600"
                    data-hs-overlay="#hs-pro-sheam"
                  >
                    Edit
                  </button>
                </li>
                <li className="inline-flex items-center pe-3.5 text-neutral-500 relative after:bg-gray-300 after:-translate-y-1/2 after:w-px after:h-3 after:inline-block after:top-1/2 after:end-0 after:absolute">
                  <button
                    onClick={() => setDefault(item.id)}
                    type="button"
                    className={`${
                      !item.default
                        ? "underline underline-offset-4 hover:text-indigo-600"
                        : ""
                    } text-neutral-500 font-medium text-xs py-3 `}
                    data-hs-overlay="#hs-pro-sheam"
                    disabled={item.default}
                  >
                    Remove
                  </button>
                </li>{" "}
                <li className="inline-flex items-center pe-3.5 text-neutral-800">
                  <button
                    onClick={() => setDefault(item.id)}
                    type="button"
                    className={`${
                      !item.default
                        ? "underline underline-offset-4 hover:text-indigo-600"
                        : ""
                    } text-neutral-500 font-medium text-xs py-3 `}
                    data-hs-overlay="#hs-pro-sheam"
                    disabled={item.default}
                  >
                    Set as default
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="mt-4 flex items-center w-full"
        onClick={() => setIsEdit(!isEdit)}
      >
        {isEdit ? (
          <Minus className="shrink-0 text-neutral-200 size-5" />
        ) : (
          <Plus className="shrink-0 text-neutral-200 size-5" />
        )}
        <span className="text-neutral-100 text-xs">
          {isEdit ? "Close" : "Add Company Info"}
        </span>
      </Button>
      {isEdit && (
        <CardContent className="bg-white rounded-md shadow-sm border border-gray-200 space-y-2 mt-4 pt-5">
          <CardTitle> Company Details</CardTitle>
          <ReactHookForm
            fields={TASKFIELD}
            initialValues={initialValues}
            onSubmit={onSubmit}
            btnName={"Add Company Info"}
            editBtnName={"Edit"}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
          />
        </CardContent>
      )}
    </>
  );
};
