This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

There are two table first employe and second is attendance . In employee we have id, name, email, phone , address and in attendance we have employeid,date,hour,
breakhour, totalpay , breakminute, totalwork are all calculated from the time difference between checkin and checkout

now we have show all data form database but how to show employe house base on id

Requirement

1. Get all Employe Data with only EmployeId, Name, and payRate
2. Show the attendance Data that match EmployeeID from Attendance Table depend on date (only totalPay and totalhours).
3. We have run two query in one components (getAllEmploye & for attendance )

//chcek for the website pixel
1220267655616224 Facebook Pixel ID
