import { useEffect } from "react";

 const useAddRmvStyle = (href, id) => {
  useEffect(() => {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = href;
    link.id = id;

    head.appendChild(link);

    // returned function will be called on component unmount
    return () => {
      var sheet = document.getElementById(id);
      sheet.disabled = true;
      sheet.parentNode.removeChild(sheet);
    };
  }, []);
};

export default useAddRmvStyle;
