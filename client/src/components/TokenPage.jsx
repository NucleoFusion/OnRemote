import React, { useState } from "react";
import TextInput from "./TextInput";
import PassInput from "./PassInput";
import $ from "jquery";
import axios from "axios";

export default function TokenPage() {
  const [randToken, setRandToken] = useState("");

  async function postData(event) {
    event.preventDefault();
    const email = $("input[name='email']").val();
    const password = $("input[name='password']").val();
    console.log(email, password);
    const result = await axios.get("http://localhost:3000/token", {
      params: {
        email: email,
        password: password,
      },
    });
    setRandToken(result.data.token);
    console.log(await result);
  }

  return (
    <div className="TokenPage-container">
      <h1>Create a Unique Token</h1>
      <TextInput name="email" />
      <PassInput name="password" />
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        onClick={postData}
      >
        Submit
      </button>
      <h2>{randToken}</h2>
    </div>
  );
}
