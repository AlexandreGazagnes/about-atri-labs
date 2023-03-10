import { useLayoutEffect, useEffect } from "react";
import useStore, { updateStoreStateFromController } from "../hooks/useStore";
import useIoStore from "../hooks/useIoStore";
import { useNavigate, useLocation } from "react-router-dom";
import { subscribeInternalNavigation } from "../utils/navigate";
import {fetchPageProps} from "../utils/fetchPageProps"
import { Div as Div1 } from "@atrilabs/react-component-manifests/src/manifests/Div/Div.tsx";
import { TextBox as TextBox1 } from "@atrilabs/react-component-manifests/src/manifests/TextBox/TextBox.tsx";
import { Form } from "@atrilabs/react-component-manifests/src/manifests/Form/Form.tsx";
import { useDiv6Cb, useTextBox6Cb, useForm1Cb } from "../page-cbs/hello";
import "../page-css/hello.css";
import "../custom/hello";

export default function Hello() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = subscribeInternalNavigation((url) => {
      navigate(url);
    });
    return unsub;
  }, [navigate]);

  const location = useLocation();
  useLayoutEffect(()=>{
    fetchPageProps(location.pathname, location.search).then((res)=>{
      updateStoreStateFromController(res.pageName, res.pageState)
    })
  }, [location])

  const Div6Props = useStore((state)=>state["hello"]["Div6"]);
const Div6IoProps = useIoStore((state)=>state["hello"]["Div6"]);
const Div6Cb = useDiv6Cb()
const TextBox6Props = useStore((state)=>state["hello"]["TextBox6"]);
const TextBox6IoProps = useIoStore((state)=>state["hello"]["TextBox6"]);
const TextBox6Cb = useTextBox6Cb()
const Form1Props = useStore((state)=>state["hello"]["Form1"]);
const Form1IoProps = useIoStore((state)=>state["hello"]["Form1"]);
const Form1Cb = useForm1Cb()

  return (<>
  <Div1 className="p-hello Div6 bpt" {...Div6Props} {...Div6Cb} {...Div6IoProps}>
<Form className="p-hello Form1 bpt" {...Form1Props} {...Form1Cb} {...Form1IoProps}/>
</Div1>
<TextBox1 className="p-hello TextBox6 bpt" {...TextBox6Props} {...TextBox6Cb} {...TextBox6IoProps}/>
  </>);
}
