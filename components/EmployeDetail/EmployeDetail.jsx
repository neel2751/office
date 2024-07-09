import React from "react";

const EmployeDetail = (prop) => {
  const paymentDeatils = [
    {
      name: "Account Name",
      value: "David Forren",
    },
    {
      name: "Account Number",
      value: "34253186",
    },
    {
      name: "Sort Code",
      value: "123-456",
    },
    {
      name: "Last Pay",
      value: "£1240.00",
    },
  ];
  const addressDeatils = [
    {
      name: "Address",
      value: "1234, London, UK",
    },
    {
      name: "City",
      value: "London",
    },
    {
      name: "State",
      value: "ilford",
    },
    {
      name: "Postcode",
      value: "IG1 1AA",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto p-4 pt-6">
      {/* <!-- Media Card --> */}
      <div className="flex shadow-sm rounded-xl overflow-hidden flex-col bg-white border-neutral-200 border">
        {/* <!-- Header --> */}
        <div className="flex items-center py-3 px-5 border-b gap-x-5 justify-between border-neutral-200">
          <h2 className="font-medium inline-block text-base text-neutral-700">
            Personal Information
          </h2>

          <div className="flex items-center gap-x-2 justify-end"></div>
        </div>
        {/* <!-- End Header --> */}

        {/* <!-- Body --> */}
        <div className="p-5">
          {/* <!-- Grid --> */}
          <div className="md:grid-cols-4 grid grid-cols-2 gap-3">
            {/* <!-- Card --> */}
            {/* for images */}
            {/* <!-- End Card --> */}
          </div>
          {/* <!-- End Grid --> */}
          {/* <!-- Drag 'n Drop --> */}
          <div className="space-y-4">
            <div className="space-y-2 p-8 bg-white rounded-xl flex">
              <div className="grid md:grid-cols-5 grid-cols-2 gap-10">
                <div className="text-center col-span-1">
                  <img
                    className="rounded-full size-24 mx-auto"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80"
                    alt="Image Description"
                  />
                  <div className="mt-2 sm:mt-4">
                    <h3 className="font-semibold text-sm tracking-tight  text-gray-800">
                      David Forren
                    </h3>
                    <p className="text-xs text-gray-600">Founder / CEO</p>
                  </div>
                </div>
                <div className=" col-span-2">
                  <dl>
                    <Card name="First Name" value="David" />
                    <Card name="Last Name" value="Forren" />
                    <Card name="Email" value="davidforren@gmail.com" />
                    <Card name="Phone" value="+1 234 567 890" />
                    {/* <Card name="Gender"  value="Male" /> */}
                  </dl>
                </div>
                <div className="col-span-2">
                  <dl>
                    <Card name="Start Date" value="12 May 2024" />
                    <Card name="Visa  Expiry Date" value="12 May 2024" />
                    <Card name="Nationality" value="United Kingdom" />
                    <Card name="NI Number" value="TEST1234" />
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Drag 'n Drop --> */}
        </div>
        {/* <!-- End Body --> */}
      </div>
      <div className="flex shadow-sm rounded-xl overflow-hidden flex-col bg-white border-neutral-200 border mt-10">
        {/* <!-- Header --> */}
        <div className="flex items-center py-3 px-5 border-b gap-x-5 justify-between border-neutral-200">
          <h2 className="font-medium tracking-tight inline-block text-base text-neutral-700">
            Job Details
          </h2>
        </div>
        {/* <!-- End Header --> */}

        {/* <!-- Body --> */}
        <div className="p-5">
          <div className="space-y-4">
            <div className="space-y-2 p-8 bg-white rounded-xl flex">
              <div className="grid md:grid-cols-6 grid-cols-2 gap-10">
                <div className="col-span-3">
                  <dl>
                    <Card name="Job Title" value="Electric" />
                    <Card name="Employement Type" value="CIS" />
                    <Card name="Payment Type" value="Weekly" />
                    <Card name="Pay Rate(hour)" value="£12.00" />
                    {/* <Card name="Gender"  value="Male" /> */}
                  </dl>
                </div>
                <div className="col-span-2">
                  <dl>
                    <Card name="Department" value="Operation" />
                    <Card name="Position" value="-" />
                    <Card name="Project Site" value="Park Road" />
                    <Card name="Status" value="Active" />
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Drag 'n Drop --> */}
        </div>
        {/* <!-- End Body --> */}
      </div>
      {/* Payment Deatils & Address Details */}
      <div className="md:grid-cols-2 grid grid-cols-1 gap-10">
        <DetailCard title="Payment Details" card={paymentDeatils} />
        {/* Address  Details */}
        <DetailCard title="Address Details" card={addressDeatils} />
        {/* End Address Details */}
      </div>
      {/* Payment  Details & Address Deatils end */}
      {/* <!-- End Media Card --> */}
    </div>
  );
};

const DetailCard = (prop) => {
  return (
    <div className="flex shadow-sm rounded-xl overflow-hidden flex-col bg-white border-neutral-200 border mt-10">
      {/* <!-- Header --> */}
      <div
        className={`${
          prop.title ? "flex" : "hidden"
        } items-center py-3 px-5 border-b gap-x-5 justify-between border-neutral-200`}
      >
        <h2 className="font-medium tracking-tight inline-block text-base text-neutral-700">
          {/* Address Details */}
          {prop.title}
        </h2>

        <div className="flex items-center gap-x-2 justify-end"></div>
      </div>
      {/* <!-- End Header --> */}

      {/* <!-- Body --> */}
      <div className="p-5">
        <div className="space-y-4">
          <div className="space-y-2 p-2 bg-white rounded-xl flex">
            <div className="grid grid-cols-1">
              <div>
                <dl>
                  {prop?.card?.map((items) => {
                    return <Card name={items?.name} value={items?.value} />;
                  })}
                </dl>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Drag 'n Drop --> */}
      </div>
      {/* <!-- End Body --> */}
    </div>
  );
};

const Card = ({ name, value }) => {
  return (
    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm leading-6 text-gray-500">{name}</dt>
      <dd className="mt-1 text-sm tracking-tight leading-6 font-semibold text-gray-700 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
};

export default EmployeDetail;
