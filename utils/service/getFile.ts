import { error } from "console";

export const uploadFile = (): any => {
  const inputFile = document.createElement("input") as HTMLInputElement;
  inputFile.type = "file";

  inputFile.addEventListener("change", (e: any) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.addEventListener("load", (e: any) => {
      const fileContent = reader.result;
      console.log("uploaded file: ", fileContent);

      return fileContent;
    });

    reader.readAsDataURL(file);
  });
  inputFile.click();
};
