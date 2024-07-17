import Image from "next/image"
import CloudImage from "../../../public/cloud-hosting.png"

const AboutPabe = () => {
  return (
    <section className="fix-height container m-auto">
      <h1 className="text-3xl font-bold text-gray-800 p-5">About This App</h1>
      <p className="px-5 text-gray-600 text-xl">Cloud Hosting is a state-of-the-art cloud hosting platform designed to provide businesses and individuals with reliable, scalable, and secure web hosting solutions. Whether youre running a personal blog, an e-commerce site, or a large enterprise application, Cloud Hosting offers the infrastructure and tools you need to ensure optimal performance and uptime.</p>

      <div className="container"><h2 className="text-3xl font-bold text-gray-800 p-5">Key Features</h2>
       <ul className="mt-2 list-disc" >
        <li className=" hover:bg-sky-200 "> Scalability: Easily scale your resources up or down based on your website traffic and demand.</li>
        <li className=" hover:bg-sky-200 ">Reliability: Enjoy a robust hosting environment with a guaranteed uptime of 99.9%.</li>
        <li className=" hover:bg-sky-200 "> Security: Protect your data with advanced security measures, including DDoS protection, SSL certificates, and regular backups. </li>
        <li className=" hover:bg-sky-200 ">User-Friendly Control Panel: Manage your hosting environment with an intuitive and easy-to-use control panel.</li>
        <li className=" hover:bg-sky-200 ">24/7 Support: Get round-the-clock support from our team of experienced professionals.</li>
      </ul></div >

      <div className="container">
      <h2 className="text-3xl font-bold text-gray-800 p-5">Target Audience</h2>
        <ul className="mt-2 list-disc" >
        <li className=" hover:bg-sky-200 "> Scalability: Easily scale your resources up or down based on your website traffic and demand.</li>
        <li className=" hover:bg-sky-200 ">Reliability: Enjoy a robust hosting environment with a guaranteed uptime of 99.9%.</li>
        <li className=" hover:bg-sky-200 "> Security: Protect your data with advanced security measures, including DDoS protection, SSL certificates, and regular backups. </li>
        <li className=" hover:bg-sky-200 ">User-Friendly Control Panel: Manage your hosting environment with an intuitive and easy-to-use control panel.</li>
        <li className=" hover:bg-sky-200 ">24/7 Support: Get round-the-clock support from our team of experienced professionals.</li>
      </ul></div >
 
      <div className="container"><h2 className="text-3xl font-bold text-gray-800 p-5">Why Choose Cloud Hosting?</h2>
       <ul className="mt-2 list-disc" >
        <li className=" hover:bg-sky-200 ">Performance: Benefit from our high-speed servers and global CDN to ensure fast load times for your visitors.</li>
        <li className=" hover:bg-sky-200 ">Cost-Efficiency: Pay only for the resources you use with our flexible pricing plans.</li>
        <li className=" hover:bg-sky-200 ">Expert Support: Our dedicated support team is always ready to assist you with any issues or questions.</li>
        <li className=" hover:bg-sky-200 ">Easy Migration: Seamlessly migrate your existing websites to Cloud Hosting with minimal downtime.</li>
      </ul></div >

      <div className="container"><h2 className="text-3xl font-bold text-gray-800 p-5">Contact Us</h2>
      <p className="px-5 text-gray-600 text-xl antialiased " >If you have any questions or need assistance, our support team is available 24/7 to help you. You can reach us through:</p>
     <ul className="mt-2 list-disc" >
        <li className=" hover:bg-sky-200 ">Email: support@cloud-hosting.com</li>
        <li className=" hover:bg-sky-200 ">Phone: +20-123-456-7910</li>
        <li className=" hover:bg-sky-200 ">Live Chat: Available on our website</li>
      </ul></div >


    

     

  



    </section>
  )
}

export default AboutPabe