import Hero from "@/components/home/Hero"
import WebHostingPlan from "@/components/home/WebHostingPlan"
import WebHostingPlanCH from "@/components/home/WebHostingPllanCH"
import WebHostingPlanMD from "@/components/home/WebHostingPllanMD"

const page = () => {
  return (
    <section className="">
      <Hero />
      <h2 className="text-center mt-10 text-3xl">Choose Your Web Hosting Plan</h2>
      <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlanMD />
        <WebHostingPlanCH />
      </div>
    </section>

  )
}

export default page