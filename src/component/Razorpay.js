
import React, { useState } from "react";

function Razorpay() {
  const [amount, setamount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === "") {
      alert("please enter amount");
    } else {
      var options = {
        key: "rzp_test_ffSb2yIkIflJH9",
        key_secret: "iExGzM7nCvTIo41Rk4iV9kye",
        amount: amount * 100,
        currency: "INR",
        name: "STARTUP_PROJECTS",
        description: "for testing purpose",
        handler: function (response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: "Kalaiselvan P",
          email: "inskalai@gmail.com",
          contact: "8667262074",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };
  return (
    <div className="App">
      <h2>Pizza Order Payment </h2>
      <br />
      <input
        type="text"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setamount(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default Razorpay;
