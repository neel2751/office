import { MARKETINGFIELD } from "@/allFormField/field";
import { TextFormInput } from "@/components/fromInput/FormInput";
import { PhotoCard } from "@/components/ImageUpload/ImageUpload";
import { ReactHookForm } from "@/components/ModelForm/FormModel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PictureInPicture } from "lucide-react";
import { useEffect, useState } from "react";

export default function UploadPDF() {
  const [pdfData, setPdfData] = useState(""); // Store extracted PDF data
  const [formData, setFormData] = useState({
    total: "",
    subtotal: "",
    vat: "",
  });
  const [resetFlag, setResetFlag] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadPDFJS = async () => {
      if (typeof window !== "undefined" && !window.pdfjsLib) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js";
        script.onload = () => {
          window.pdfjsLib = window["pdfjs-dist/build/pdf"];
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";
        };
        document.body.appendChild(script);
      }
    };
    loadPDFJS();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // we have to store the file in state and show  it in the card
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        extractPdfText(arrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const extractPdfText = async (arrayBuffer) => {
    if (typeof window.pdfjsLib === "undefined") {
      console.error("PDF.js is not loaded yet!");
      return;
    }

    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer })
      .promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }

    setPdfData(text);
    extractTotals(text);
  };

  const extractTotals = (text) => {
    // Regex to find Total, Subtotal, and VAT
    const totalMatch = text.match(/Total\s*:\s*£(\d+(\.\d{1,2})?)/);
    const subtotalMatch = text.match(/SubTotal\s*:\s*£(\d+(\.\d{1,2})?)/);
    const vatMatch = text.match(/VAT\s*:\s*£(\d+(\.\d{1,2})?)/);

    // Update formData state with extracted values
    setFormData({
      total: totalMatch ? totalMatch[1] : "",
      subtotal: subtotalMatch ? subtotalMatch[1] : "",
      vat: vatMatch ? vatMatch[1] : "",
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload PDF and Fill Form</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <span className="text-neutral-700 text-sm font-medium">
              Add PDF
            </span>
            <div>
              {/*  we have to show pdf file here */}
              {image && (
                <PhotoCard
                  imgSrc={URL.createObjectURL(image)}
                  imgAlt={formData?.file?.name}
                />
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <label
                htmlFor="file"
                type="button"
                className="text-neutral-400 border-neutral-400 border-dotted border-2 rounded-lg justify-center shrink-0 size-16 flex items-center group hover:border-cyan-800 hover:text-cyan-600 cursor-pointer"
              >
                {/* input file */}
                <input
                  name="file"
                  id="file"
                  className="sr-only"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                />
                <PictureInPicture className="size-5 shrink-0" />
              </label>
            </div>

            <div className="mt-3">
              <p className="text-neutral-400 text-xs">
                Employee find images and videos more helpful than text alone.
              </p>
            </div>
          </div>
          <div className="max-w-2xl mt-8">
            <ReactHookForm fields={MARKETINGFIELD} setResetFlag={setResetFlag}>
              <div className="flex gap-8 items-center w-full mt-6">
                <TextFormInput
                  labelText={"Total"}
                  type="text"
                  value={formData.total}
                  onChange={(e) =>
                    setFormData({ ...formData, total: e.target.value })
                  }
                />
                <TextFormInput
                  labelText={"SubTotal"}
                  type="text"
                  value={formData.subtotal}
                  onChange={(e) =>
                    setFormData({ ...formData, subtotal: e.target.value })
                  }
                />
                <TextFormInput
                  labelText={"VAT:"}
                  type="text"
                  value={formData.vat}
                  onChange={(e) =>
                    setFormData({ ...formData, vat: e.target.value })
                  }
                />
              </div>
            </ReactHookForm>
            {/* <div className="flex gap-8 items-center">
              <TextFormInput
                labelText={"Total"}
                type="text"
                value={formData.total}
                onChange={(e) =>
                  setFormData({ ...formData, total: e.target.value })
                }
              />
              <TextFormInput
                labelText={"SubTotal"}
                type="text"
                value={formData.subtotal}
                onChange={(e) =>
                  setFormData({ ...formData, subtotal: e.target.value })
                }
              />
              <TextFormInput
                labelText={"VAT:"}
                type="text"
                value={formData.vat}
                onChange={(e) =>
                  setFormData({ ...formData, vat: e.target.value })
                }
              />
              <Button className="mt-5" onClick={handleSubmit}>
                Save
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
